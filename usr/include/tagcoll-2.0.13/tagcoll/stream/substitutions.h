#ifndef TAGCOLL_STREAM_SUBSTITUTIONS_H
#define TAGCOLL_STREAM_SUBSTITUTIONS_H

/* \file
 * Collection of filters to modify streams of tagged items
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
#include <set>
#include <map>
#include <string>

namespace tagcoll {
namespace stream {

/**
 * Store a list of substitutions to operate on std::set
 *
 * It uses a Consumer interface to allow to be populated using a decoder for
 * collections such as TextFormat.
 */
template<typename T>
class Substitutions
{
protected:
	typedef std::map<T, T> changes_t;
	changes_t changes;

public:
	template<typename IT>
	class SubstitutionsInserter : public wibble::mixin::OutputIterator< SubstitutionsInserter<IT> >
	{
		Substitutions<IT>& out;

	public:
		SubstitutionsInserter(Substitutions<IT>& out)
			: out(out) {}

		template<typename NewItems, typename OldItems>
		SubstitutionsInserter& operator=(const std::pair<NewItems, OldItems>& data)
		{
			for (typename NewItems::const_iterator i = data.first.begin();
					i != data.first.end(); ++i)
				for (typename OldItems::const_iterator j = data.second.begin();
						j != data.second.end(); ++j)
					out.add(*j, *i);
			return *this;
		}
	};

	/// Change all the items in a set
	template<typename Items>
	std::set<T> change(const Items& values) const
	{
		std::set<T> res;
		for (typename Items::const_iterator t = values.begin();
				t != values.end(); ++t)
			res.insert(change(*t));
		return res;
	}

	/// Change a single value
	T change(const T& v) const
	{
		typename changes_t::const_iterator i = changes.find(v);

		return (i == changes.end()) ? v : i->second;
	}

	/// Add one substitution to the list
	void add(const T& oldItem, const T& newItem)
	{
		changes.insert(make_pair(oldItem, newItem));
	}

	/// Create an inserter for this class
	SubstitutionsInserter<T> inserter()
	{
		return SubstitutionsInserter<T>(*this);
	}
};

/**
 * Filter replacing tags according to a list of Substitutions
 *
 * Example:
 *
 * \code
 *   Substitute<Item, Tag> filter(consumer);
 *
 *   // Parse substitutions from a file into the filter
 *   TextFormat<Item, Tag>::parse(itemconv, tagconv, input, filter.substitutions());
 *
 *   // Filter the collection
 *   coll.output(filter);
 * \endcode
 */
template<typename T, typename OUT>
class Substitute : public wibble::mixin::OutputIterator< Substitute<T, OUT> >
{
protected:
	Substitutions<T> changes;
	OUT out;
	
public:
	Substitute(const OUT& out) : out(out) {}
	Substitute(const Substitutions<T>& changes, const OUT& out) : changes(changes), out(out) {}

	/**
	 * Access the internal Substitution list
	 */
	Substitutions<T>& substitutions() { return changes; }

	/**
	 * Access the internal Substitution list (const version)
	 */
	const Substitutions<T>& substitutions() const { return changes; }

	template<typename Items, typename Tags>
	Substitute<T, OUT>& operator=(const std::pair<Items, Tags>& data)
	{
		*out = make_pair(data.first, changes.change(data.second));
		++out;
		return *this;
	}
};

template<typename T, typename OUT>
Substitute<T, OUT> substitute(const Substitutions<T>& changes, const OUT& out)
{
	return Substitute<T, OUT>(changes, out);
}

}
}

// vim:set ts=4 sw=4:
#endif
