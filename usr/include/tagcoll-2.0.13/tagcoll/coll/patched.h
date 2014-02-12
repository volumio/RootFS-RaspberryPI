#ifndef TAGCOLL_COLL_PATCHED_H
#define TAGCOLL_COLL_PATCHED_H

/** \file
 * Wrap a Collection, preserving modifications as patches
 */

/*
 * Copyright (C) 2005,2006  Enrico Zini <enrico@debian.org>
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
#include <tagcoll/patch.h>

namespace tagcoll {
template<typename T1, typename T2> class PatchList;

namespace coll {
template<typename ROCOLL>
class Patched;

template<typename ROCOLL>
struct coll_traits< Patched<ROCOLL> >
{
	typedef typename coll_traits<ROCOLL>::item_type item_type;
	typedef typename coll_traits<ROCOLL>::tag_type tag_type;
	typedef typename coll_traits<ROCOLL>::tagset_type tagset_type;
	typedef typename coll_traits<ROCOLL>::itemset_type itemset_type;
};

/**
 * Wraps a collection by intercepting all changes to it and preserving them as
 * a PatchList.
 */
template<typename ROCOLL>
class Patched : public coll::Collection< Patched<ROCOLL> >
{
public:
	typedef tagcoll::Patch<
		typename coll_traits<ROCOLL>::item_type,
		typename coll_traits<ROCOLL>::tag_type> Patch;
	typedef tagcoll::PatchList<
		typename coll_traits<ROCOLL>::item_type,
		typename coll_traits<ROCOLL>::tag_type> Patches;
	typedef tagcoll::Patch<
		typename coll_traits<ROCOLL>::tag_type,
		typename coll_traits<ROCOLL>::item_type> RPatch;
	typedef tagcoll::PatchList<
		typename coll_traits<ROCOLL>::tag_type,
		typename coll_traits<ROCOLL>::item_type> RPatches;

protected:
	typedef typename coll_traits<ROCOLL>::item_type Item;
	typedef typename coll_traits<ROCOLL>::tag_type Tag;
	typedef typename coll_traits<ROCOLL>::itemset_type ItemSet;
	typedef typename coll_traits<ROCOLL>::tagset_type TagSet;

	const ROCOLL& coll;
	Patches m_changes;
	RPatches m_rchanges;

#if 0
	virtual void consumeItem(const ITEM& item, const std::set<TAG>& tags);

	virtual std::set<ITEM> getItemsHavingTag(const TAG& tag) const;
	virtual std::set<TAG> getTagsOfItem(const ITEM& item) const;
#endif

public:
	typedef std::pair<Item, TagSet> value_type;

	class const_iterator
	{
		const Patched<ROCOLL>& coll;
		typename ROCOLL::const_iterator ci;
		typename Patches::const_iterator pi;
		mutable typename Patched<ROCOLL>::value_type* cached_val;

	protected:
		const_iterator(const Patched<ROCOLL>& coll,
						const typename ROCOLL::const_iterator& ci,
						const typename Patches::const_iterator& pi)
			: coll(coll), ci(ci), pi(pi), cached_val(0) {}
	
	public:
		~const_iterator()
		{
			if (cached_val)
				delete cached_val;
		}
		const typename Patched<ROCOLL>::value_type operator*() const
		{
			if (cached_val)
				return *cached_val;

			if (ci == coll.coll.end() && pi == coll.m_changes.end())
				return *(typename Patched<ROCOLL>::value_type*)0;
			else if (pi == coll.m_changes.end())
				return *ci;
			else if (ci == coll.coll.end())
				return make_pair(pi->first, pi->second.added);
			else if (ci->first < pi->first)
				return *ci;
			else if (ci->first > pi->first)
				return make_pair(pi->first, pi->second.added);
			else
				return make_pair(ci->first, pi->second.apply(ci->second));
		}
		const typename Patched<ROCOLL>::value_type* operator->() const
		{
			if (cached_val)
				return cached_val;
			return cached_val = new typename Patched<ROCOLL>::value_type(*(*this));
		}
		const_iterator& operator++()
		{
			if (ci == coll.coll.end() && pi == coll.m_changes.end())
				;
			else if (pi == coll.m_changes.end())
				++ci;
			else if (ci == coll.coll.end())
				++pi;
			else if (ci->first < pi->first)
				++ci;
			else if (ci->first > pi->first)
				++pi;
			else
			{
				++ci;
				++pi;
			}
			if (cached_val)
			{
				delete cached_val;
				cached_val = 0;
			}
			return *this;
		}
		bool operator==(const const_iterator& iter) const
		{
			return ci == iter.ci && pi == iter.pi;
		}
		bool operator!=(const const_iterator& iter) const
		{
			return ci != iter.ci || pi != iter.pi;
		}
		
		friend class Patched<ROCOLL>;
	};
	const_iterator begin() const { return const_iterator(*this, coll.begin(), m_changes.begin()); }
	const_iterator end() const { return const_iterator(*this, coll.end(), m_changes.end()); }

	Patched(const ROCOLL& coll) : coll(coll) {}

	template<typename ITEMS, typename TAGS>
	void insert(const ITEMS& items, const TAGS& tags);

	template<typename ITEMS>
	void insert(const ITEMS& items, const wibble::Empty<Tag>& tags)
	{
		// Nothing to do in this case
	}

	/**
	 * Removes all items from the collection
	 */
	void clear();

	/**
	 * Get the changes that have been applied to this collection
	 */
	const Patches& changes() const { return m_changes; }

	/**
	 * Throw away all changes previously applied to this collection
	 */
	void resetChanges() { m_changes.clear(); m_rchanges.clear(); }

	/**
	 * Set the changes list to a specific patch list
	 */
	void setChanges(const Patches& changes);

	/**
	 * Add a specific patch list to the changes list
	 */
	void addChanges(const Patches& changes);

    bool hasTag(const Tag& tag) const;

	TagSet getTagsOfItem(const Item& item) const
	{
		return m_changes.patch(item, coll.getTagsOfItem(item));
	}
	ItemSet getItemsHavingTag(const typename coll_traits<ROCOLL>::tag_type& tag) const
	{
		return m_rchanges.patch(tag, coll.getItemsHavingTag(tag));
	}

	ItemSet getTaggedItems() const;
	TagSet getAllTags() const;

	unsigned int tagCount() const { return getAllTags().size(); }

	unsigned int getCardinality(const Tag& tag) const;

	void applyChange(const Patches& change) { this->addChanges(change); }

#if 0
	template<typename OUT>
	void output(OUT out) const
	{
		for (const_iterator i = begin(); i != end(); ++i)
		{
			*out = *i;
			++out;
		}
	}
#endif
};

}
}

// vim:set ts=4 sw=4:
#endif
