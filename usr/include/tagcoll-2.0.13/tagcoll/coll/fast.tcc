/*
 * Fast index for tag data
 *
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

#ifndef TAGCOLL_COLL_FAST_TCC
#define TAGCOLL_COLL_FAST_TCC

#include <tagcoll/coll/fast.h>
#include <tagcoll/utils/set.h>
#include <tagcoll/patch.h>

#include <wibble/operators.h>

using namespace std;
using namespace wibble::operators;

namespace tagcoll {
namespace coll {

template<class ITEM, class TAG> template<typename ITEMS, typename TAGS>
void Fast<ITEM, TAG>::insert(const ITEMS& items, const TAGS& tags)
{
	using namespace wibble::operators;

	if (tags.empty())
		return;

	for (typename ITEMS::const_iterator i = items.begin();
			i != items.end(); ++i)
	{
		typename std::map< ITEM, std::set<TAG> >::iterator iter = this->items.find(*i);
		if (iter == this->items.end())
			this->items.insert(std::make_pair(*i, std::set<TAG>() | tags));
		else
			iter->second |= tags;
	}

	for (typename TAGS::const_iterator i = tags.begin();
			i != tags.end(); ++i)
	{
		typename std::map< TAG, std::set<ITEM> >::iterator iter = this->tags.find(*i);
		if (iter == this->tags.end())
			this->tags.insert(std::make_pair(*i, std::set<ITEM>() | items));
		else
			iter->second |= items;
	}
}

template<class ITEM, class TAG>
void Fast<ITEM, TAG>::insert(const wibble::Singleton<ITEM>& item, const std::set<TAG>& tags)
{
	using namespace wibble::operators;

	if (tags.empty())
		return;

	typename std::map< ITEM, std::set<TAG> >::iterator iter = this->items.find(*item.begin());
	if (iter == this->items.end())
		this->items.insert(std::make_pair(*item.begin(), tags));
	else
		iter->second |= tags;

	for (typename std::set<TAG>::const_iterator i = tags.begin();
			i != tags.end(); ++i)
	{
		typename std::map< TAG, std::set<ITEM> >::iterator iter = this->tags.find(*i);
		if (iter == this->tags.end())
			this->tags.insert(std::make_pair(*i, std::set<ITEM>() | *item.begin()));
		else
			iter->second |= *item.begin();
	}
}

template<class ITEM, class TAG>
void Fast<ITEM, TAG>::insert(const std::set<ITEM>& items, const wibble::Singleton<TAG>& tag)
{
	using namespace wibble::operators;

	for (typename std::set<ITEM>::const_iterator i = items.begin();
			i != items.end(); ++i)
	{
		typename std::map< ITEM, std::set<TAG> >::iterator iter = this->items.find(*i);
		if (iter == this->items.end())
			this->items.insert(std::make_pair(*i, std::set<TAG>() | *tag.begin()));
		else
			iter->second |= *tag.begin();
	}

	typename std::map< TAG, std::set<ITEM> >::iterator iter = this->tags.find(*tag.begin());
	if (iter == this->tags.end())
		this->tags.insert(std::make_pair(*tag.begin(), items));
	else
		iter->second |= items;
}

template<class ITEM, class TAG>
std::set<ITEM> Fast<ITEM, TAG>::getItemsHavingTag(const TAG& tag) const
{
	typename map<TAG, std::set<ITEM> >::const_iterator i = tags.find(tag);
	if (i != tags.end())
		return i->second;
	else
		return std::set<ITEM>();
}

template<class ITEM, class TAG>
std::set<TAG> Fast<ITEM, TAG>::getTagsOfItem(const ITEM& item) const
{
	typename map<ITEM, std::set<TAG> >::const_iterator i = items.find(item);
	if (i != items.end())
		return i->second;
	else
		return std::set<TAG>();
}

template<class ITEM, class TAG>
std::set<ITEM> Fast<ITEM, TAG>::getTaggedItems() const
{
	std::set<ITEM> res;
	for (typename map<ITEM, std::set<TAG> >::const_iterator i = items.begin();
			i != items.end(); i++)
		res |= i->first;
	return res;
}

template<class ITEM, class TAG>
std::set<TAG> Fast<ITEM, TAG>::getAllTags() const
{
	std::set<TAG> res;
	for (typename map<TAG, std::set<ITEM> >::const_iterator i = tags.begin();
			i != tags.end(); i++)
		res |= i->first;
	return res;
}

template<class ITEM, class TAG>
std::vector<TAG> Fast<ITEM, TAG>::getAllTagsAsVector() const
{
	std::vector<TAG> res;
	for (typename map<TAG, std::set<ITEM> >::const_iterator i = tags.begin();
			i != tags.end(); i++)
		res.push_back(i->first);
	return res;
}

#if 0
template<class ITEM, class TAG>
void Fast<ITEM, TAG>::output(Consumer<ITEM, TAG>& consumer) const
{
	for (typename map<ITEM, std::set<TAG> >::const_iterator i = items.begin();
			i != items.end(); i++)
		consumer.consume(i->first, i->second);
}
#endif

template<class ITEM, class TAG> template<typename OUT>
void Fast<ITEM, TAG>::outputReversed(OUT out) const
{
	for (typename std::map<TAG, std::set<ITEM> >::const_iterator i = tags.begin();
			i != tags.end(); ++i)
	{
		*out = make_pair(wibble::singleton(i->first), i->second);
		++out;
	}
}


template<class ITEM, class TAG>
void Fast<ITEM, TAG>::applyChange(const PatchList<ITEM, TAG>& change)
{
	for (typename PatchList<ITEM, TAG>::const_iterator i = change.begin(); i != change.end(); i++)
	{
		// Save the previous tagset in `rev'
		std::set<TAG> prevTags = getTagsOfItem(i->first);
		std::set<TAG> nextTags = i->second.apply(prevTags);

		// Set the new tagset in the item
		items[i->first] = nextTags;

		// Fix the itemsets in the involved tags
		std::set<TAG> t = prevTags - nextTags;
		for (typename std::set<TAG>::const_iterator j = t.begin(); j != t.end(); j++)
		{
			std::set<ITEM> items = getItemsHavingTag(*j) - i->first;
			if (items.empty())
				tags.erase(*j);
			else
				tags[*j] = items;
		}
		t = nextTags - prevTags;
		for (typename std::set<TAG>::const_iterator j  = t.begin(); j != t.end(); j++)
			tags[*j] |= i->first;
	}
}

template<class ITEM, class TAG>
std::set<TAG> Fast<ITEM, TAG>::getTagsImplying(const TAG& tag) const
{
	// tag1 implies tag2 if the itemset of tag1 is a subset of the itemset of tag2
	std::set<TAG> res;
	std::set<ITEM> itemsToCheck = getItemsHavingTag(tag);
	// TODO: choose which one is the most efficient implementation
#if 0
	// Roughly:
	// O(n[pkgs per tag] * log(nitems) * log(n[items per pkg]) + n[tags per item] * n[items per tag])
	std::set<TAG> tagsToCheck;
	for (std::set<ITEM>::const_iterator i = itemsToCheck.begin();
			i != itemsToCheck.end(); ++i)
		tagsToCheck |= getTags(*i);
	for (std::set<TAG>::const_iterator i = tagsToCheck.begin();
			i != tagsToCheck.end(); ++i)
		if (utils::set_contains(itemsToCheck, getItems(*i)))
			res |= *i;
#else
	// O(ntags * n[items per tag])
	for (typename std::map<TAG, std::set<ITEM> >::const_iterator i = tags.begin();
			i != tags.end(); ++i)
		if (utils::set_contains(itemsToCheck, getItemsHavingTag(i->first)))
			res |= i->first;
#endif
	return res - tag;
}

template<class ITEM, class TAG>
std::set<ITEM> Fast<ITEM, TAG>::getItemsExactMatch(const std::set<TAG>& tags) const
{
	std::set<ITEM> res = this->getItemsHavingTags(tags);
	typename std::set<ITEM>::iterator i = res.begin();
	while (i != res.end())
	{
		typename std::map<ITEM, std::set<TAG> >::const_iterator t = items.find(*i);
		if (t != items.end() && t->second != tags)
		{
			typename std::set<ITEM>::iterator j = i;
			++i;
			res.erase(j);
		} else
			++i;
	}
	return res;
}

template<class ITEM, class TAG>
TAG Fast<ITEM, TAG>::findTagWithMaxCardinality(size_t& card) const
{
	card = 0;
	TAG res = TAG();
	for (typename std::map<TAG, std::set<ITEM> >::const_iterator i = tags.begin();
			i != tags.end(); ++i)
		if (i->second.size() > card)
		{
			card = i->second.size();
			res = i->first;
		}
	return res;
}
     
template<class ITEM, class TAG>
void Fast<ITEM, TAG>::removeTag(const TAG& tag)
{
	typename std::map<TAG, std::set<ITEM> >::iterator itag = tags.find(tag);
	for (typename std::set<ITEM>::const_iterator iitemset = itag->second.begin();
			iitemset != itag->second.end(); ++iitemset)
	{
		typename std::map<ITEM, std::set<TAG> >::iterator iitem = items.find(*iitemset);
		iitem->second -= tag;
		if (iitem->second.empty())
			items.erase(iitem);
	}
	tags.erase(itag);
}

template<class ITEM, class TAG>
Fast<ITEM, TAG> Fast<ITEM, TAG>::getChildCollection(const TAG& tag) const
{
	Fast<ITEM, TAG> res;

	typename std::map<TAG, std::set<ITEM> >::const_iterator itag = tags.find(tag);
	for (typename std::set<ITEM>::const_iterator i = itag->second.begin();
			i != itag->second.end(); ++i)
	{
		typename std::map<ITEM, std::set<TAG> >::const_iterator iitem = items.find(*i);
		res.insert(wibble::singleton(*i), iitem->second);
	}

	res.removeTag(tag);
	return res;
}

template<class ITEM, class TAG>
void Fast<ITEM, TAG>::removeTagsWithCardinalityLessThan(size_t card)
{
	typename std::map<TAG, std::set<ITEM> >::const_iterator i = tags.begin();
	while (i != tags.end())
	{
		if (i->second.size() < card)
		{
			typename std::map<TAG, std::set<ITEM> >::const_iterator j = i;
			++i;
			removeTag(j->first);
		} else
			++i;
	}
}

template<class ITEM, class TAG>
void Fast<ITEM, TAG>::removeItemsHavingTag(const TAG& tag)
{
	typename std::map<TAG, std::set<ITEM> >::iterator itag = tags.find(tag);
	PatchList<ITEM, TAG> change;
	for (typename std::set<ITEM>::const_iterator iitemset = itag->second.begin();
			iitemset != itag->second.end(); ++iitemset)
	{
		typename std::map<ITEM, std::set<TAG> >::iterator iitem = items.find(*iitemset);
		change.addPatch(Patch<ITEM, TAG>(iitem->first, set<TAG>(), iitem->second));
	}
	this->applyChange(change);
}



#if 0
template<class ITEM, class TAG>
void Fast<ITEM, TAG>::consumeItem(const ITEM& item, const std::set<TAG>& tags)
{
	// Add the tags to the item
	items[item] |= tags;

	// Add the item to the tags
	for (typename std::set<TAG>::const_iterator i = tags.begin(); i != tags.end(); i++)
		this->tags[*i] |= item;
}

template<class ITEM, class TAG>
void Fast<ITEM, TAG>::consumeItems(const std::set<ITEM>& items, const std::set<TAG>& tags)
{
	for (typename std::set<ITEM>::const_iterator i = items.begin(); i != items.end(); i++)
		// Add the tags to the item
		this->items[*i] |= tags;

	for (typename std::set<TAG>::const_iterator i = tags.begin(); i != tags.end(); i++)
		// Add the items to the tag
		this->tags[*i] |= items;
}
#endif

}
}

#include <tagcoll/coll/base.tcc>

#endif

// vim:set ts=4 sw=4:
