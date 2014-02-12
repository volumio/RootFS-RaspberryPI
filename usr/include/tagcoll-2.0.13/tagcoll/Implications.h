#ifndef TAGCOLL_IMPLICATIONS_H
#define TAGCOLL_IMPLICATIONS_H

/** \file
 * Collection of tag implications and a Filter to apply or compress them
 */

/*
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

#include <wibble/operators.h>
#include <wibble/mixin.h>
#include <tagcoll/coll/simple.h>
#include <map>

namespace tagcoll
{

/**
 * List of explicit implications that can be applied to a tagged collection.
 *
 * The underlying Simple collection goes as "{Item} implies {Tags}"
 */
template <class TAG>
class Implications : public coll::Simple<TAG, TAG>
{
protected:
	/// Get the set of all tags seen when walking through all parent lists
	std::set<TAG> getDestinations(const TAG& tag, const std::set<TAG>& seen = std::set<TAG>()) const;

	/// Return true if tag1 can reach tag2 walking through some path in its parent list
	bool reaches(const TAG& tag1, const TAG& tag2, const std::set<TAG>& seen = std::set<TAG>()) const;

public:
	/// Expand a single tag
	std::set<TAG> expand(const TAG& tag) const
	{
		using namespace wibble::operators;
		return getDestinations(tag) | tag;
	}


	/// Expand a full tagset
	template<typename IN>
	std::set<TAG> expand(const IN& tags) const
	{
		std::set<TAG> res;

		for (typename IN::const_iterator t = tags.begin();
				t != tags.end(); ++t)
		{
			res |= *t;
			res |= expand(*t);
		}

		return res;
	}

	/// Compress a tagset removing implied tags
	template<typename IN>
	std::set<TAG> compress(const IN& tags) const
	{
		using namespace wibble::operators;

		// Create the union of the expansion sets of each single tag, without the tag
		// tags = tags - this union
		std::set<TAG> initial;
		std::set<TAG> redundant;
		for (typename IN::const_iterator t = tags.begin();
				t != tags.end(); ++t)
		{
			initial.insert(*t);
			std::set<TAG> expanded = expand(*t);
			for (typename std::set<TAG>::const_iterator i = expanded.begin();
					i != expanded.end(); i++)
				if (*i != *t)
					redundant.insert(*i);
		}
		return initial - redundant;
	}

	// Remove unnecessary arcs from the dag
	void pack();

	template<typename COLL>
	void addFrom(const COLL& coll)
	{
		std::set<TAG> allTags = coll.getAllTags();
		for (typename std::set<TAG>::const_iterator t = allTags.begin();
				t != allTags.end(); t++)
		{
			typename std::set<TAG> implying = coll.getTagsImplying(*t);
			for (typename std::set<TAG>::const_iterator i = implying.begin();
					i != implying.end(); ++i)
				this->insert(wibble::singleton(*i), wibble::singleton(*t));
		}
	}

	// Output the fully expanded implication dag to a TagcollConsumer
	template<typename OUT>
	void outputFull(OUT out) const
	{
		for (typename coll::Simple<TAG, TAG>::const_iterator i = this->begin();
				i != this->end(); ++i)
		{
			std::set<TAG> destinations = getDestinations(i->first);

			if (!destinations.empty())
			{
				*out = make_pair(wibble::singleton(i->first), destinations);
				++out;
			}
		}
	}
};

/**
 * Add implied tags to a stream of tagged items
 */
template <typename TAG, typename OUT>
class AddImplied : public wibble::mixin::OutputIterator< AddImplied<TAG, OUT> >
{
protected:
	const Implications<TAG>& impls;
	OUT out;

public:
	AddImplied(const Implications<TAG>& impls, const OUT& out)
		: impls(impls), out(out) {}

	template<typename ITEMS, typename TAGS>
	AddImplied<TAG, OUT>& operator=(const std::pair<ITEMS, TAGS>& data)
	{
		*out = make_pair(data.first, impls.expand(data.second));
		++out;
		return *this;
	}
};

template<typename TAG, typename OUT>
AddImplied<TAG, OUT> addImplied(const Implications<TAG>& impls, const OUT& out)
{
	return AddImplied<TAG, OUT>(impls, out);
}

/**
 * Remove redundant implied tags to a stream of tagged items
 */
template <typename TAG, typename OUT>
class RemoveImplied : public wibble::mixin::OutputIterator< RemoveImplied<TAG, OUT> >
{
protected:
	const Implications<TAG>& impls;
	OUT out;

public:
	RemoveImplied(const Implications<TAG>& impls, const OUT& out) 
		: impls(impls), out(out) {}

	template<typename ITEMS, typename TAGS>
	RemoveImplied<TAG, OUT>& operator=(const std::pair<ITEMS, TAGS>& data)
	{
		*out = make_pair(data.first, impls.compress(data.second));
		++out;
		return *this;
	}
};

template<typename TAG, typename OUT>
RemoveImplied<TAG, OUT> removeImplied(const Implications<TAG>& impls, const OUT& out)
{
	return RemoveImplied<TAG, OUT>(impls, out);
}

};

// vim:set ts=4 sw=4:
#endif
