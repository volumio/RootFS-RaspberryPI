#ifndef TAGCOLL_COLL_FAST_H
#define TAGCOLL_COLL_FAST_H

/** \file
 * Fast index for tag data
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

#include <wibble/singleton.h>
#include <tagcoll/coll/base.h>
#include <set>
#include <map>

namespace tagcoll {
template<typename T1, typename T2> class PatchList;

namespace coll {
template<typename ITEM, typename TAG>
class Fast;

template<typename ITEM, typename TAG>
struct coll_traits< Fast<ITEM, TAG> >
{
	typedef ITEM item_type;
	typedef TAG tag_type;
	typedef std::set<ITEM> itemset_type;
	typedef std::set<TAG> tagset_type;
};

/**
 * In-memory collection with both item->tags and tag->items mappings.
 */
template<class ITEM, class TAG>
class Fast : public coll::Collection< Fast<ITEM, TAG> >
{
protected:
	std::map<ITEM, std::set<TAG> > items;
	std::map<TAG, std::set<ITEM> > tags;

#if 0
	virtual void consumeItem(const ITEM& item, const std::set<TAG>& tags);
	virtual void consumeItems(const std::set<ITEM>& items, const std::set<TAG>& tags);

	virtual std::set<ITEM> getItemsHavingTag(const TAG& tag) const;
	virtual std::set<TAG> getTagsOfItem(const ITEM& item) const;
#endif

public:
	typedef typename std::map< ITEM, std::set<TAG> >::const_iterator const_iterator;
	typedef typename std::map< ITEM, std::set<TAG> >::iterator iterator;
	typedef typename std::map< ITEM, std::set<TAG> >::value_type value_type;

	typedef typename std::map< TAG, std::set<ITEM> >::const_iterator const_tag_iterator;
	typedef typename std::map< TAG, std::set<ITEM> >::iterator tag_iterator;

	const_iterator begin() const { return items.begin(); }
	const_iterator end() const { return items.end(); }
	iterator begin() { return items.begin(); }
	iterator end() { return items.end(); }

	const_tag_iterator tagBegin() const { return tags.begin(); }
	const_tag_iterator tagEnd() const { return tags.end(); }
	tag_iterator tagBegin() { return tags.begin(); }
	tag_iterator tagEnd() { return tags.end(); }

	template<typename ITEMS, typename TAGS>
	void insert(const ITEMS& items, const TAGS& tags);

	void insert(const wibble::Singleton<ITEM>& item, const std::set<TAG>& tags);

	void insert(const std::set<ITEM>& items, const wibble::Singleton<TAG>& tag);

	void clear() { items.clear(); tags.clear(); }

	std::set<TAG> getTagsOfItem(const ITEM& item) const;
	std::set<ITEM> getItemsHavingTag(const TAG& tag) const;

	bool empty() const { return items.empty(); }

    bool hasItem(const ITEM& item) const { return items.find(item) != items.end(); }
    bool hasTag(const TAG& tag) const { return tags.find(tag) != tags.end(); }
	std::set<ITEM> getTaggedItems() const;
	std::set<TAG> getAllTags() const;
	std::vector<TAG> getAllTagsAsVector() const;

	unsigned int itemCount() const { return items.size(); }
	unsigned int tagCount() const { return tags.size(); }

	/**
	 * Output all the contents of the reversed collection to an output iterator
	 */
	template<typename OUT>
	void outputReversed(OUT out) const;

#if 0
	void output(Consumer<ITEM, TAG>& consumer) const;
#endif
	void applyChange(const PatchList<ITEM, TAG>& change);

	// tag1 implies tag2 if the itemset of tag1 is a subset of the itemset of
	// tag2
	std::set<TAG> getTagsImplying(const TAG& tag) const;

	// Return the items which have the exact tagset 'tags'
	std::set<ITEM> getItemsExactMatch(const std::set<TAG>& tags) const;

	TAG findTagWithMaxCardinality(size_t& card) const;

	/**
	 * Return the collection with only those items that have this tag, but with
	 * the given tag removed
	 */
	Fast<ITEM, TAG> getChildCollection(const TAG& tag) const;

	void removeTag(const TAG& tag);
	void removeTagsWithCardinalityLessThan(size_t card);
	void removeItemsHavingTag(const TAG& tag);
};

}
}

// vim:set ts=4 sw=4:
#endif
