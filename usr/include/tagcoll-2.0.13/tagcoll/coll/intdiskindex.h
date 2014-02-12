#ifndef TAGCOLL_COLL_INT_DISK_INDEX_H
#define TAGCOLL_COLL_INT_DISK_INDEX_H

/** \file
 * Fast on-disk index for tag data
 */

/*
 * Copyright (C) 2006  Enrico Zini <enrico@debian.org>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

#include <tagcoll/coll/base.h>
#include <tagcoll/diskindex/int.h>

namespace tagcoll {
template<typename ITEM, typename TAG>
class PatchList;

namespace coll {

class IntDiskIndex;

template<>
struct coll_traits< IntDiskIndex >
{
	typedef int item_type;
	typedef int tag_type;
	typedef std::set<int> tagset_type;
	typedef std::set<int> itemset_type;
};

/**
 * Full TaggedCollection implementation on top of a persistent on-disk TDB
 * database.
 *
 * It allows to efficiently query a collection without having to store it all
 * into memory.
 *
 * If used for heavy modifications, the performance is slower compared to other
 * in-memory collections.  If database writes are mainly used for populating
 * the index, then TDBIndexer should be used to create the index and
 * TDBDiskIndex to access it afterwards.
 */
class IntDiskIndex : public coll::ReadonlyCollection< IntDiskIndex >

{
protected:
	diskindex::Int pkgidx;
	diskindex::Int tagidx;

public:
	class const_iterator
	{
		const IntDiskIndex& index;
		int idx;
		mutable std::pair< int, std::set<int> >* cached;

	public:
		// Builds an iterator
		const_iterator(const IntDiskIndex& index, int idx)
			: index(index), idx(idx), cached(0) {}
		// Builds the end iterator
		const_iterator(const IntDiskIndex& index)
			: index(index), idx(index.pkgidx.size()), cached(0) {}
		~const_iterator() { if (cached) delete cached; }

		std::pair< int, std::set<int> > operator*() const
		{
			return std::make_pair(idx, index.getTagsOfItem(idx));
		}
		std::pair< int, std::set<int> >* operator->() const
		{
			if (!cached)
				cached = new std::pair< int, std::set<int> >(operator*());
			return cached;
		}

		const_iterator operator++()
		{
			++idx;
			if (cached) { delete cached; cached = 0; }
			return *this;
		}
		bool operator==(const const_iterator& iter) const
		{
			return idx == iter.idx;
		}
		bool operator!=(const const_iterator& iter) const
		{
			return idx != iter.idx;
		}
	};
	const_iterator begin() const { return const_iterator(*this, 0); }
	const_iterator end() const { return const_iterator(*this); }

	/**
	 * Create a new IntDiskIndex
	 *
	 * @param filename
	 *   The file name of the package index
	 * @param tagidx
	 *   The file name of the tag index
	 * @param fromitem, fromtag, toitem, totag
	 *   The Converter-s used to convert int and int to and from strings.
	 *   If 0 is passed, this TDBDiskIndex will only be able to work with
	 *   string items and string tags.
	 * @param write
	 *   Set to false if the index should be opened in read-only mode.  If
	 *   opened in read-only mode, all non-const methods of this class will
	 *   throw an exception if invoked.
	 *   It defaults to true.
	 */
	IntDiskIndex() {}
	IntDiskIndex(
			const diskindex::MasterMMap& master,
			int pkgindex, int tagindex)
		:   pkgidx(master, pkgindex), tagidx(master, tagindex) {}

	void init(const diskindex::MasterMMap& master, int pkgindex, int tagindex)
	{
		pkgidx.init(master, pkgindex);
		tagidx.init(master, tagindex);
	}

	std::set<int> getItemsHavingTag(const int& tag) const;
	std::set<int> getItemsHavingTags(const std::set<int>& tags) const;
	std::set<int> getTagsOfItem(const int& item) const;
	std::set<int> getTagsOfItems(const std::set<int>& items) const;

    bool hasTag(const int& tag) const
	{
		return tagidx.size(tag) > 0;
	}

	std::set<int> getTaggedItems() const;

	std::set<int> getAllTags() const;
	std::vector<int> getAllTagsAsVector() const;

	unsigned int itemCount() const { return pkgidx.size(); }
	unsigned int tagCount() const { return tagidx.size(); }

	unsigned int getCardinality(const int& tag) const
	{
		return tagidx.size(tag);
	}

	std::set<int> getCompanionTags(const std::set<int>& tags) const;

	//void output(Consumer<int, int>& consumer) const;
};

class IntDiskIndexer
{
protected:
	diskindex::IntIndexer pkgidx;
	diskindex::IntIndexer tagidx;

public:
	const diskindex::MMapIndexer& pkgIndexer() const { return pkgidx; }
	const diskindex::MMapIndexer& tagIndexer() const { return tagidx; }

	template<typename ITEMS, typename TAGS>
	void insert(const ITEMS& items, const TAGS& tags)
	{
		if (tags.empty())
			return;
		for (typename ITEMS::const_iterator it = items.begin();
				it != items.end(); ++it)
			for (typename TAGS::const_iterator ta = tags.begin();
					ta != tags.end(); ++ta)
			{
				pkgidx.map(*it, *ta);
				tagidx.map(*ta, *it);
			}
	}
};


}
}

// vim:set ts=4 sw=4:
#endif
