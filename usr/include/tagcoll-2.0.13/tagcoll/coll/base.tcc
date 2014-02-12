#ifndef TAGCOLL_COLL_BASE_TCC
#define TAGCOLL_COLL_BASE_TCC

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

#include <tagcoll/coll/base.h>
#include <tagcoll/utils/set.h>
#include <algorithm>

namespace tagcoll {
namespace coll {

template<typename T>
class coll_traits;

template<typename Self> template<typename COLL>
bool ReadonlyCollection<Self>::RelevanceOrder<COLL>::operator()(
		const typename coll_traits<Self>::tag_type& t1,
		const typename coll_traits<Self>::tag_type& t2)
{
	// New cardinality divided by the square root of the old cardinality.
	// The square root is used to downplay the very common tags a bit
	int csub1 = second.getCardinality(t1);
	float cfull1 = first.getCardinality(t1);
	int csub2 = second.getCardinality(t2);
	float cfull2 = first.getCardinality(t2);
	float rel1 = (float)(csub1 * csub1) / cfull1;
	float rel2 = (float)(csub2 * csub2) / cfull2;

	return rel1 < rel2;
//	return 10000 * second.getCardinality(t1) / first.getCardinality(t1)
//		 < 10000 * second.getCardinality(t2) / first.getCardinality(t2);
}

	
template<typename Self>
bool ReadonlyCollection<Self>::hasTag(const typename coll_traits<Self>::tag_type& tag) const
{
	return !self().getItemsHavingTag(tag).empty();
}

template<typename Self> template<typename ITEMS>
typename coll_traits<Self>::tagset_type ReadonlyCollection<Self>::getTagsOfItems(const ITEMS& items) const
{
	using namespace wibble::operators;
	typename coll_traits<Self>::tagset_type res;
	for (typename ITEMS::const_iterator i = items.begin();
			i != items.end(); i++)
		res |= self().getTagsOfItem(*i);
	return res;
}

template<typename Self> template<typename TAGS>
typename coll_traits<Self>::itemset_type ReadonlyCollection<Self>::getItemsHavingTags(const TAGS& tags) const 
{
	using namespace wibble::operators;
	if (tags.empty())
		return typename coll_traits<Self>::itemset_type();

	typename TAGS::const_iterator i = tags.begin();
	typename coll_traits<Self>::itemset_type res = self().getItemsHavingTag(*i);

	for (++i ; i != tags.end(); ++i)
		res &= self().getItemsHavingTag(*i);

	return res;
}

template<typename Self>
std::vector<typename coll_traits<Self>::tag_type> ReadonlyCollection<Self>::getAllTagsAsVector() const
{
	std::set<typename coll_traits<Self>::tag_type> asSet = self().getAllTags();
	std::vector<typename coll_traits<Self>::tag_type> res;
	res.reserve(asSet.size());
	std::copy(asSet.begin(), asSet.end(), back_inserter(res));
	return res;
}

template<typename Self>
unsigned int ReadonlyCollection<Self>::getCardinality(const typename coll_traits<Self>::tag_type& tag) const
{
	return self().getItemsHavingTag(tag).size();
}

template<typename Self> template<typename TAGS>
typename coll_traits<Self>::tagset_type ReadonlyCollection<Self>::getCompanionTags(const TAGS& tags) const
{
	using namespace wibble::operators;
	return self().getTagsOfItems(self().getItemsHavingTags(tags)) - tags;
}

template<typename Self> template<typename TAGS>
typename coll_traits<Self>::itemset_type ReadonlyCollection<Self>::getRelatedItems(const TAGS& tags, int maxdistance) const
{
	using namespace wibble::operators;

	typename coll_traits<Self>::itemset_type packages;
	typename coll_traits<Self>::itemset_type res;

	// First get a list of packages that have a non-empty intersection with `tags'
	for (typename TAGS::const_iterator i = tags.begin(); i != tags.end(); i++)
		packages |= self().getItemsHavingTag(*i);

	// Then keep only those within the given distance
	for (typename coll_traits<Self>::itemset_type::const_iterator i = packages.begin(); i != packages.end(); i++)
	{
		int dist = utils::set_distance(tags, self().getTagsOfItem(*i));
		if (dist >= 0 && dist <= maxdistance)
			res |= *i;
	}

	return res;
}

template<typename Self> template<typename OUT>
void ReadonlyCollection<Self>::output(OUT out) const
{
	for (typename Self::const_iterator i = self().begin();
			i != self().end(); ++i)
	{
		*out = make_pair(wibble::singleton(i->first), i->second);
		++out;
	}
}

template<typename Self> template<typename TAGS, typename OUT>
void ReadonlyCollection<Self>::outputHavingTags(const TAGS& tags, OUT out) const
{
	typename coll_traits<Self>::itemset_type items = self().getItemsHavingTags(tags);
	for (typename coll_traits<Self>::itemset_type::const_iterator i = items.begin();
			i != items.end(); ++i)
	{
		*out = std::make_pair(wibble::singleton(*i), self().getTagsOfItem(*i));
		++out;
	}
}

template<typename Self>
std::vector<typename coll_traits<Self>::tag_type> ReadonlyCollection<Self>::tagsInCardinalityOrder() const
{
	std::vector<typename coll_traits<Self>::tag_type> res = self().getAllTagsAsVector();
	std::sort(res.begin(), res.end(), CardinalityOrder(self()));
	return res;
}

template<typename Self>
std::vector<typename coll_traits<Self>::tag_type> ReadonlyCollection<Self>::tagsInDiscriminanceOrder() const
{
	std::vector<typename coll_traits<Self>::tag_type> res = self().getAllTagsAsVector();
	std::sort(res.begin(), res.end(), DiscriminanceOrder(self()));
	return res;
}

/**
 * Get a vector containing all tags in this collection, sorted by
 * increasing relevance to the filtering applied between coll and this
 * collection
 */
template<typename Self> template<typename COLL>
std::vector<typename coll_traits<Self>::tag_type> ReadonlyCollection<Self>::tagsInRelevanceOrder(const COLL& coll) const
{
	std::vector<typename coll_traits<Self>::tag_type> res = self().getAllTagsAsVector();
	std::sort(res.begin(), res.end(), RelevanceOrder<COLL>(coll, self()));
	return res;
}

}
}

// vim:set ts=4 sw=4:
#endif
