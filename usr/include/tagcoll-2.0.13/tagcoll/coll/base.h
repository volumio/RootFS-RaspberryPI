#ifndef TAGCOLL_COLL_BASE_H
#define TAGCOLL_COLL_BASE_H

/** \file
 * Base mixins for tagged collections
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

#include <wibble/mixin.h>
#include <vector>

namespace std {
template<typename A, typename B> class pair;
}

namespace tagcoll {
namespace coll {

template<typename T>
class coll_traits;
	
/**
 * Interface for all collections of tagged items.
 *
 * \note The point of a collection is to track the tags attached to items, and
 * not to store the items themselves.  This means that collections are not
 * required to keep track of items with no tags.
 */
template<typename Self>
class ReadonlyCollection
{
	const Self& self() const { return *static_cast<const Self*>(this); }

	class CardinalityOrder
	{
		const Self& coll;
	public:
		CardinalityOrder(const Self& coll) : coll(coll) {}
		bool operator()(const typename coll_traits<Self>::tag_type& t1, const typename coll_traits<Self>::tag_type& t2)
		{
			// Returns true if t1 precedes t2, and false otherwise
			return coll.getCardinality(t1) < coll.getCardinality(t2);
		}
	};

	class DiscriminanceOrder
	{
		const Self& coll;
	public:
		DiscriminanceOrder(const Self& coll) : coll(coll) {}
		bool operator()(const typename coll_traits<Self>::tag_type& t1, const typename coll_traits<Self>::tag_type& t2)
		{
			// Returns true if t1 precedes t2, and false otherwise
			return coll.getDiscriminance(t1) < coll.getDiscriminance(t2);
		}
	};

	template<typename COLL>
	class RelevanceOrder
	{
		const COLL& first;
		const Self& second;
	public:
		RelevanceOrder(const COLL& first, const Self& second)
			: first(first), second(second) {}
		bool operator()(const typename coll_traits<Self>::tag_type& t1, const typename coll_traits<Self>::tag_type& t2);
	};

	/**
	 * Get the items which are tagged with at least the tag `tag'
	 *
	 * \return
	 *   The items found, or an empty set if no items have that tag
	 */
	//virtual std::set<ITEM> getItemsHavingTag(const TAG& tag) const = 0;

	/**
	 * Get the tags attached to an item.
	 *
	 * \param item
	 *   The item to query
	 * \return 
	 *   The set of tags, or an empty set if the item has no tags or it does
	 *   not exist.
	 */
	//virtual std::set<TAG> getTagsOfItem(const ITEM& item) const = 0;

public:
	/**
	 * Check if the collection contains a tag
	 *
	 * \param tag
	 *   The tag to look for
	 * \return 
	 *   true if the collection contains tag, false otherwise
	 */
	bool hasTag(const typename coll_traits<Self>::tag_type& tag) const;

	/**
	 * Get the tags of item `item'.  Return an empty set if `item' does not exist
	 */
	//std::set<Self::tag_type> getTags(const typename Self::item_type& item) const = 0;

	/**
	 * Get all the tags attached to the items in a set.
	 *
	 * \param items
	 *   The items to query
	 * \return 
	 *   The set of tags, or an empty set if the items have no tags or do not
	 *   exist.
	 */
	template<typename ITEMS>
	typename coll_traits<Self>::tagset_type getTagsOfItems(const ITEMS& items) const;

	/**
	 * Get the items with tag `tag'.  Return an empty set if `tag' does not exist
	 */
	//std::set<typename Self::item_type> getItems(const TAG& tag) const { return getItemsHavingTag(tag); }

	/**
	 * Get the items which are tagged with at least the tags `tags'
	 *
	 * \return
	 *   The items found, or an empty set if no items have that tag
	 */
	template<typename TAGS>
	typename coll_traits<Self>::itemset_type getItemsHavingTags(const TAGS& tags) const;

	/**
	 * Get the set of all the items that have tags according to this collection
	 */
	//virtual std::set<Self::item_type> getTaggedItems() const = 0;

	/**
	 * Get the set of all the tags in this collection
	 */
	//virtual std::set<Self::tag_type> getAllTags() const = 0;
	
	/**
	 * Get all the tags in the collectin, as a vector
	 */
	std::vector<typename coll_traits<Self>::tag_type> getAllTagsAsVector() const;

	/**
	 * Get the cardinality of tag `tag' (that is, the number of items who have it)
	 */
	unsigned int getCardinality(const typename coll_traits<Self>::tag_type& tag) const;

	/**
	 * Return the discriminance value for this tag, that is, the minimum number
	 * of packages that would be eliminated by selecting only those tagged with
	 * this tag or only those not tagged with this tag.
	 */
	unsigned int getDiscriminance(const typename coll_traits<Self>::tag_type& tag) const
	{
		return self().getCardinality(tag) < self().tagCount() - self().getCardinality(tag) ?
				self().getCardinality(tag) :
				self().tagCount() - self().getCardinality(tag);
	}

	/**
	 * Get the set of all tags in this collection that appear in tagsets
	 * containing `tags'
	 *
	 * Example:
	 * \code
	 * void refineSelection(const std::set<Tag>& selection)
	 * {
	 *    std::set<Tag> extraTags = collection.getCompanionTags(selection);
	 *    tagMenu.setAvailableOptions(extraTags);
	 * }
	 * \endcode
	 */
	template<typename TAGS>
	typename coll_traits<Self>::tagset_type getCompanionTags(const TAGS& tags) const;

	/**
	 * Get the related items at the given maximum distance
	 *
	 * Examples:
	 * \code
	 * // Get the items related to a given one, at the given distance
	 * std::set<Item> getRelated(const Item& item, int distance)
	 * {
	 *    std::set<Item> res = collection.getRelatedItems(collection.getTags(item), distance);
	 *    return res - item;
	 * }
	 *
	 * // Get the items related to the given ones, at the given distance
	 * std::set<Item> getRelated(const std::set<Item>& items, int distance)
	 * {
	 *    std::set<Item> res = collection.getRelatedItems(collection.getTags(items), distance);
	 *    return res - items;
	 * }
	 *
	 * // Get the related items, increasing the distance until it finds at
	 * // least 'minimum' items
	 * std::set<Item> getRelated(const Item& item, int minimum)
	 * {
	 *    std::set<Tag> tags = collection.getTags(item);
	 *    std::set<Item> res;
	 *    for (int i = 0; i < tags.size() && res.size() < minimum; i++)
	 *    	 res += collection.getRelatedItems(tags, i);
	 *	  return res - item;
	 * }
	 * \endcode
	 */
	template<typename TAGS>
	typename coll_traits<Self>::itemset_type getRelatedItems(const TAGS& tags, int maxdistance = 1) const;

	/**
	 * Output all the contents of the collection to an output iterator
	 */
	template<typename OUT>
	void output(OUT out) const;

	/**
	 * Send to a consumer all the items which are tagged with at least the
	 * given tags
	 */
	template<typename TAGS, typename OUT>
	void outputHavingTags(const TAGS& tags, OUT out) const;

	/**
	 * Get a vector containing all tags in this collection, sorted by
	 * increasing cardinality
	 */
	std::vector<typename coll_traits<Self>::tag_type> tagsInCardinalityOrder() const;

	/**
	 * Get a vector containing all tags in this collection, sorted by
	 * increasing discriminance value (@see getDiscriminance)
	 */
	std::vector<typename coll_traits<Self>::tag_type> tagsInDiscriminanceOrder() const;

	/**
	 * Get a vector containing all tags in this collection, sorted by
	 * increasing relevance to the filtering applied between coll and this
	 * collection
	 */
	template<typename COLL>
	std::vector<typename coll_traits<Self>::tag_type> tagsInRelevanceOrder(const COLL& coll) const;
};


/**
 * Interface for all collections of tagged items.
 *
 * \note The point of a collection is to track the tags attached to items, and
 * not to store the items themselves.  This means that collections are not
 * required to keep track of items with no tags.
 */
template<typename Self>
class Collection : public ReadonlyCollection<Self>
{
//protected:
	/*
	 * Implementation note: to avoid problems with classes implementing only
	 * some of the virtual methods, they are given different names.  The common
	 * 'comsume' methods are just inlined calls to the right virtual functions,
	 * and are a way of keeping the unoverridden methods from being hidden.
	 */

	//void consumeItemUntagged(const ITEM&) {}
	//void consumeItemsUntagged(const std::set<ITEM>&) {}

public:
	//virtual ~Collection() {}
	
	/**
	 * Apply a patch to the collection
	 *
	 * Example:
	 * \code
	 * void perform(const PatchList<ITEM, TAG>& change)
	 * {
	 *    collection.applyChange(change);
	 *    undo.push_back(change.getReverse());
	 * }
	 * \endcode
	 */
//	void applyChange(
//			const PatchList<
//				typename coll_traits<Self>::item_type,
//				typename coll_traits<Self>::tag_type>& change);
};


template<typename COLL>
class Inserter : public wibble::mixin::OutputIterator< Inserter<COLL> >
{
	COLL& coll;

public:
	Inserter(COLL& coll) : coll(coll) {}

	template<typename Items, typename Tags>
	Inserter<COLL>& operator=(const std::pair<Items, Tags>& data)
	{
		coll.insert(data.first, data.second);
		return *this;
	}
};

template<typename COLL>
Inserter<COLL> inserter(COLL& target)
{
	return Inserter<COLL>(target);
}

}
}

// vim:set ts=4 sw=4:
#endif
