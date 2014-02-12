#ifndef TAGCOLL_COLL_SIMPLE_H
#define TAGCOLL_COLL_SIMPLE_H

/** \file
 * Simple tagged collection.
 *
 * Also used for merging tags of items appearing multiple times in a stream of
 * tagged items
 */

/*
 * Copyright (C) 2003,2004,2005,2006  Enrico Zini <enrico@debian.org>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307  USA
 */

#include <tagcoll/coll/base.h>
#include <set>
#include <map>

namespace tagcoll {
template<typename ITEM, typename TAG>
class PatchList;

namespace coll {

template<typename ITEM, typename TAG>
class Simple;

template<typename ITEM, typename TAG>
struct coll_traits< Simple<ITEM, TAG> >
{
	typedef ITEM item_type;
	typedef TAG tag_type;
	typedef std::set<ITEM> tagset_type;
	typedef std::set<TAG> itemset_type;
};


/**
 * Simple Collection.
 *
 * It can be used to merge input values: if an item is added multiple times,
 * its various tagsets are merged in a single one.
 *
 * It is also a full-featured collection, although not very optimized.
 */
template<typename ITEM, typename TAG>
class Simple : public coll::Collection< Simple<ITEM, TAG> >
{
protected:
	std::map< ITEM, std::set<TAG> > coll;
	
#if 0
	virtual void consumeItem(const ITEM& item, const std::set<TAG>& tags);

	virtual std::set<ITEM> getItemsHavingTags(const std::set<TAG>& tags) const;
#endif

public:
	typedef typename std::map< ITEM, std::set<TAG> >::const_iterator const_iterator;
	typedef typename std::map< ITEM, std::set<TAG> >::iterator iterator;
	typedef typename std::map< ITEM, std::set<TAG> >::value_type value_type;

	const_iterator begin() const { return coll.begin(); }
	const_iterator end() const { return coll.end(); }
	iterator begin() { return coll.begin(); }
	iterator end() { return coll.end(); }

	bool empty() const { return coll.empty(); }

	template<typename ITEMS, typename TAGS>
	void insert(const ITEMS& items, const TAGS& tags);

	bool hasItem(const ITEM& item) const { return coll.find(item) != coll.end(); }

	std::set<TAG> getTagsOfItem(const ITEM& item) const;
	std::set<ITEM> getItemsHavingTag(const TAG& tag) const;
	template<typename TAGS>
	std::set<ITEM> getItemsHavingTags(const TAGS& tag) const;

	template<typename TAGS, typename OUT>
	void outputHavingTags(const TAGS& tags, OUT out) const;

#if 0
	void output(Consumer<ITEM, TAG>& consumer) const;
	void outputHavingTags(const std::set<TAG>& ts, Consumer<ITEM, TAG>& consumer) const;

	/**
	 * Send the merged data to a consumer, but reversed: the tag become items,
	 * and they are tagged with the items that had them
	 */
	void outputReversed(Consumer<TAG, ITEM>& consumer) const;
#endif

	void applyChange(const PatchList<ITEM, TAG>& change);

	std::set<ITEM> getTaggedItems() const;
	
	std::set<TAG> getAllTags() const;

	std::set<TAG> getCompanionTags(const std::set<TAG>& ts) const;

	std::set<ITEM> getRelatedItems(const std::set<TAG>& ts, int maxdistance = 1) const;

	/**
	 * Count the number of items
	 */
	unsigned int itemCount() const;

	unsigned int tagCount() const { return getAllTags().size(); }

	/**
	 * Empty the collection
	 */
	void clear()
	{
		coll.clear();
	}
};

}
}

// vim:set ts=4 sw=4:
#endif
