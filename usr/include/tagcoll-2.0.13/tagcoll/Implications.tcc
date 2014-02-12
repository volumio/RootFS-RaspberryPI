/*
 * Collection of tag implications and a Filter to apply or compress them
 *
 * Copyright (C) 2003,2004,2005  Enrico Zini <enrico@debian.org>
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

#ifndef TAGCOLL_IMPLICATIONS_TCC
#define TAGCOLL_IMPLICATIONS_TCC

#include <tagcoll/utils/set.h>
#include <tagcoll/Implications.h>
#include <wibble/operators.h>

using namespace std;
using namespace wibble::operators;

namespace tagcoll {

template<class TAG>
std::set<TAG> Implications<TAG>::getDestinations(const TAG& tag, const std::set<TAG>& seen) const
{
	typename Implications<TAG>::const_iterator i = this->coll.find(tag);
	if (i == this->coll.end())
		return std::set<TAG>();

	// res <- the union of all the destinations of the tag
	std::set<TAG> res;
	for (typename std::set<TAG>::const_iterator t = i->second.begin();
			t != i->second.end(); t++)
	{
		// If the tag is already in res, then also all his destinations are
		// already there
		if (!utils::set_contains(res, *t) && !utils::set_contains(seen, *t))
		{
			res |= *t;
			res |= getDestinations(*t, seen | tag);
		}
	}

	return res;
}

template<class TAG>
bool Implications<TAG>::reaches(const TAG& tag1, const TAG& tag2, const std::set<TAG>& seen) const
{
	// Check if we've reached the target
	if (tag1 == tag2)
		return true;
	
	// No: see if we have other paths to follow
	typename Implications<TAG>::const_iterator i = this->coll.find(tag1);
	if (i == this->coll.end())
		return false;

	// Try all paths
	for (typename std::set<TAG>::const_iterator t = i->second.begin();
			t != i->second.end(); t++)
		if (!utils::set_contains(seen, *t) && reaches(*t, tag2, seen | tag1))
			return true;

	// Nothing has been found
	return false;
}

// Remove unnecessary arcs from the dag
template <class TAG>
void Implications<TAG>::pack()
{
	// For every tag
	for (typename Implications<TAG>::iterator i = this->coll.begin();
			i != this->coll.end(); i++)
	{
		std::set<TAG> redundant;

		// For every couple of parents A and B, if A -> B but not B -> A, then B is redundant
		// I need to check every combination; however, I can ignore in the
		// search items that have already been found as redundant

		std::set<TAG> candidates = i->second;
		while (candidates.size() > 1)
		{
			typename std::set<TAG>::const_iterator a = candidates.begin();
			typename std::set<TAG>::const_iterator b = a;
			std::set<TAG> got;
			for (++b; b != candidates.end(); b++)
			{
				bool ab = reaches(*a, *b);
				bool ba = reaches(*b, *a);
				if (ab && !ba)
				{
					got |= *b;
					break;
				} else if (ba && !ab) {
					got |= *a;
					break;
				}
			}
			candidates -= got;
			redundant |= got;
			if (!candidates.empty())
				candidates.erase(candidates.begin());
		}

		i->second -= redundant;
	}
}

}

#endif

// vim:set ts=4 sw=4:
