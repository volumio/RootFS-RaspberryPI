/*
 * Merge tags of items appearing multiple times in a stream of tagged items
 *
 * Copyright (C) 2003--2006  Enrico Zini <enrico@debian.org>
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

#ifndef TAGCOLL_COLL_SIMPLE_TCC
#define TAGCOLL_COLL_SIMPLE_TCC

#include <tagcoll/utils/set.h>
#include <tagcoll/coll/simple.h>
#include <tagcoll/patch.h>

#include <wibble/operators.h>

using namespace std;
using namespace wibble::operators;

namespace tagcoll {
namespace coll {


template<class ITEM, class TAG> template<typename ITEMS, typename TAGS>
void Simple<ITEM, TAG>::insert(const ITEMS& items, const TAGS& tags)
{
	using namespace wibble::operators;

	if (tags.empty())
		return;
	for (typename ITEMS::const_iterator i = items.begin();
			i != items.end(); ++i)
	{
		typename std::map< ITEM, std::set<TAG> >::iterator iter = coll.find(*i);
		if (iter == coll.end())
			coll.insert(std::make_pair(*i, std::set<TAG>() | tags));
		else
			iter->second |= tags;
	}
}

template<class ITEM, class TAG>
std::set<TAG> Simple<ITEM, TAG>::getTagsOfItem(const ITEM& item) const
{
	typename map< ITEM, std::set<TAG> >::const_iterator i = coll.find(item);
	
	if (i == coll.end())
		return std::set<TAG>();
	else
		return i->second;
}

template<class ITEM, class TAG>
std::set<ITEM> Simple<ITEM, TAG>::getItemsHavingTag(const TAG& tag) const
{
	std::set<ITEM> res;
	for (typename map< ITEM, std::set<TAG> >::const_iterator i = coll.begin();
			i != coll.end(); i++)
		if (i->second.find(tag) != i->second.end())
			res |= i->first;
	return res;
}

template<class ITEM, class TAG> template<typename TAGS>
std::set<ITEM> Simple<ITEM, TAG>::getItemsHavingTags(const TAGS& tags) const
{
	std::set<ITEM> res;
	for (typename map< ITEM, std::set<TAG> >::const_iterator i = coll.begin();
			i != coll.end(); i++)
		if (utils::set_contains(i->second, tags))
			res |= i->first;
	return res;
}

#if 0
template<class T, class Tag>
void Simple<T, Tag>::outputReversed(Consumer<Tag, T>& consumer) const
{
	for (typename map< T, std::set<Tag> >::const_iterator i = coll.begin();
			i != coll.end(); i++)
	{
		std::set<T> items;
		items |= i->first;
		consumer.consume(i->second, items);
	}
}
#endif

template<class ITEM, class TAG> template<typename TAGS, typename OUT>
void Simple<ITEM, TAG>::outputHavingTags(const TAGS& ts, OUT out) const
{
	for (typename map< ITEM, std::set<TAG> >::const_iterator i = coll.begin();
			i != coll.end(); ++i)
		if (utils::set_contains(i->second, ts))
		{
			*out = *i;
			++out;
		}
}
	


template<class T, class Tag>
void Simple<T, Tag>::applyChange(const PatchList<T, Tag>& change)
{
	for (typename PatchList<T, Tag>::const_iterator i = change.begin(); i != change.end(); i++)
	{
		typename map< T, std::set<Tag> >::iterator it = coll.find(i->first);
		if (it == coll.end())
		{
			// If the item doesn't exist, create it
			coll.insert(make_pair(i->first, i->second.added));
		} else {
			it->second = i->second.apply(it->second);
		}
	}
}

template<typename ITEM, typename TAG>
std::set<ITEM> Simple<ITEM, TAG>::getTaggedItems() const
{
	std::set<ITEM> res;
	for (typename std::map< ITEM, std::set<TAG> >::const_iterator i = coll.begin();
			i != coll.end(); i++)
		res.insert(i->first);
	return res;
}

template<class T, class Tag>
std::set<Tag> Simple<T, Tag>::getAllTags() const
{
	std::set<Tag> tags;

	for (typename map< T, std::set<Tag> >::const_iterator i = coll.begin();
			i != coll.end(); i++)
		tags |= i->second;
	
	return tags;
}

template<class T, class Tag>
std::set<Tag> Simple<T, Tag>::getCompanionTags(const std::set<Tag>& ts) const
{
	std::set<Tag> tags;

	for (typename map< T, std::set<Tag> >::const_iterator i = coll.begin();
			i != coll.end(); i++)
		if (utils::set_contains(i->second, (ts)))
			tags |= i->second - ts;
	
	return tags;
}

template<class T, class Tag>
std::set<T> Simple<T, Tag>::getRelatedItems(const std::set<Tag>& tags, int maxdistance) const
{
	std::set<T> res;

	for (typename map< T, std::set<Tag> >::const_iterator i = coll.begin();
			i != coll.end(); i++)
	{
		int dist = utils::set_distance(tags, i->second);
		if (dist >= 0 && dist <= maxdistance)
			res |= i->first;
	}
	
	return res;
}

template<class T, class Tag>
unsigned int Simple<T, Tag>::itemCount() const
{
	return coll.size();
}

}
}

#include <tagcoll/coll/base.tcc>

#endif

// vim:set ts=4 sw=4:
