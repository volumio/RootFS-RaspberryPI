#ifndef TAGCOLL_DERIVEDTAGS_H
#define TAGCOLL_DERIVEDTAGS_H

/** \file
 * Model a collection of derived tags and a TagcollFilter to add them to a
 * collection
 */

/*
 * Copyright (C) 2003  Enrico Zini <enrico@debian.org>
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

#include <tagcoll/expression.h>

#include <wibble/operators.h>
#include <wibble/mixin.h>
#include <map>
#include <string>

#include <stdio.h>

namespace tagcoll
{

/**
 * List of changes to apply to tag names with a tagged collection is being
 * parsed
 */
class DerivedTags : public std::map<std::string, Expression>
{
public:
	virtual ~DerivedTags() {}

	/**
	 * Add a new derived tag to the list
	 */
	void add(const std::string& tag, const Expression& expr)
	{
		insert(make_pair(tag, expr));
	}

	/**
	 * Return the tags in `tags', plus all the derived tags that matched `tags'
	 */
	std::set<std::string> derivedTags(const std::set<std::string>& tags) const
	{
		std::set<std::string> res;
		for (const_iterator i = begin(); i != end(); i++)
		{
			TagexprContext context(tags, *this);
			if (i->second(context))
				res.insert(i->first);
		}
		return res;
	}

	template<typename TAGS>
	std::set<std::string> derivedTags(const TAGS& tags) const
	{
		std::set<std::string> tagset;
		for (typename TAGS::const_iterator i = tags.begin();
				i != tags.end(); ++i)
			tagset.insert(*i);

		std::set<std::string> res;
		for (const_iterator i = begin(); i != end(); i++)
		{
			TagexprContext context(tagset, *this);
			if (i->second(context))
				res.insert(i->first);
		}
		return res;
	}
};

/**
 * Filter that adds derived tags to a collection
 */
template <typename OUT>
class AddDerived : public wibble::mixin::OutputIterator< AddDerived<OUT> >
{
protected:
	const DerivedTags& dtags;
	OUT out;

public:
	AddDerived(const DerivedTags& dtags, const OUT& out)
		: dtags(dtags), out(out) {}

	template<typename ITEMS, typename TAGS>
	AddDerived<OUT>& operator=(const std::pair<ITEMS, TAGS>& data)
	{
		using namespace wibble::operators;
		std::set<typename TAGS::value_type> newts;
		for (typename TAGS::const_iterator i = data.second.begin();
				i != data.second.end(); ++i)
			newts.insert(*i);
		newts |= dtags.derivedTags(data.second);
		*out = make_pair(data.first, newts);
		++out;
		return *this;
	}
};

template<class OUT>
AddDerived<OUT> addDerived(const DerivedTags& dtags, const OUT& out)
{
	return AddDerived<OUT>(dtags, out);
}

/**
 * Filter that removes redundant derived tags from a collection
 */
template <typename OUT>
class RemoveDerived : public wibble::mixin::OutputIterator< RemoveDerived<OUT> >
{
protected:
	DerivedTags dtags;
	OUT out;

public:
	RemoveDerived(const DerivedTags& dtags, const OUT& out)
		: dtags(dtags), out(out) {}

	template<typename ITEM, typename TAGS>
	RemoveDerived<OUT>& operator=(const std::pair<ITEM, TAGS>& data)
	{
		using namespace wibble::operators;
		std::set<typename TAGS::value_type> newts;
		for (typename TAGS::const_iterator i = data.second.begin();
				i != data.second.end(); ++i)
			newts.insert(*i);
		*out = make_pair(data.first, newts - dtags.derivedTags(data.second));
		++out;
		return *this;
	}
};

template<class OUT>
RemoveDerived<OUT> removeDerived(const DerivedTags& dtags, const OUT& out)
{
	return RemoveDerived<OUT>(dtags, out);
}

};

// vim:set ts=4 sw=4:
#endif
