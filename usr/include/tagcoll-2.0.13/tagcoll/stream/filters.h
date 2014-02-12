#ifndef TAGCOLL_STREAM_FILTERS_H
#define TAGCOLL_STREAM_FILTERS_H

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
#include <wibble/singleton.h>

namespace std {
template<typename A, typename B>
class pair;
}

namespace wibble {
template<typename T>
class Empty;
template<typename T>
class Singleton;
}

#include <string>

namespace tagcoll {
namespace stream {

/**
 * Filter that does nothing and just passes on the data
 */
template<typename OUT>
class NullFilter : public wibble::mixin::OutputIterator< NullFilter<OUT> >
{
	OUT out;
	
public:
	NullFilter(const OUT& out) : out(out) {}

	template<typename ITEMS, typename TAGS>
	NullFilter<OUT>& operator=(const std::pair<ITEMS, TAGS>& data)
	{
		*out = data;
		++out;
		return *this;
	}
};

template<typename OUT>
NullFilter<OUT> nullFilter(const OUT& out)
{
	return NullFilter<OUT>(out);
}

/**
 * Filter that does nothing and just passes on the data
 */
template<typename OUT1, typename OUT2>
class TeeFilter : public wibble::mixin::OutputIterator< TeeFilter<OUT1, OUT2> >
{
	OUT1 out1;
	OUT2 out2;
	
public:
	TeeFilter(const OUT1& out1, const OUT2& out2) : out1(out1), out2(out2) {}

	template<typename ITEMS, typename TAGS>
	TeeFilter<OUT1, OUT2>& operator=(const std::pair<ITEMS, TAGS>& data)
	{
		*out1 = data;
		++out1;
		*out2 = data;
		++out2;
		return *this;
	}
};

template<typename OUT1, typename OUT2>
TeeFilter<OUT1, OUT2> teeFilter(const OUT1& out1, const OUT2& out2)
{
	return TeeFilter<OUT1, OUT2>(out1, out2);
}

/**
 * Remove packages with no tags.
 *
 * It can also be used in 'inverse' mode, where in removes the packages which
 * have tags and keeps the packages that have none.
 */
template <typename OUT>
class UntaggedRemover : public wibble::mixin::OutputIterator< UntaggedRemover<OUT> >
{
protected:
	OUT out;
	bool inverse;

public:
	UntaggedRemover(const OUT& out, bool inverse = false) : out(out), inverse(inverse) {}

	template<typename Items, typename Tags>
	UntaggedRemover<OUT>& operator=(const std::pair<Items, Tags>& data);
};

template<typename OUT>
UntaggedRemover<OUT> untaggedRemover(const OUT& out, bool inverse = false)
{
	return UntaggedRemover<OUT>(out, inverse);
}


/**
 * Removes tags which are not inside a facet
 */
template<typename OUT>
class UnfacetedRemover : public wibble::mixin::OutputIterator< UnfacetedRemover<OUT> >
{
protected:
	OUT out;
	std::string separator;
		
public:
	UnfacetedRemover(const OUT& out, const std::string& separator = std::string("::"))
		: out(out), separator(separator) {}

	template<typename Items, typename Tags>
	UnfacetedRemover<OUT>& operator=(const std::pair<Items, Tags>& data);
};

template<typename OUT>
UnfacetedRemover<OUT> unfacetedRemover(const OUT& out, const std::string& separator = std::string("::"))
{
	return UnfacetedRemover<OUT>(out, separator);
}

template<typename OUT>
class ItemsOnly : public wibble::mixin::OutputIterator< ItemsOnly<OUT> >
{
	OUT out;

public:
	ItemsOnly(const OUT& out) : out(out) {}

	template<typename ITEMS, typename TAGS>
	ItemsOnly<OUT>& operator=(const std::pair<ITEMS, TAGS>& data)
	{
		*out = make_pair(data.first, wibble::Empty<typename TAGS::value_type>());
		++out;
		return *this;
	}
};

template<typename OUT>
ItemsOnly<OUT> itemsOnly(const OUT& out)
{
	return ItemsOnly<OUT>(out);
}

template<typename OUT, typename TAG>
class Reverser : public wibble::mixin::OutputIterator< Reverser<OUT, TAG> >
{
	OUT out;
	TAG reversedNull;

public:
	Reverser(const OUT& out, const TAG& reversedNull = TAG())
		: out(out), reversedNull(reversedNull) {}

	template<typename ITEMS>
	Reverser<OUT, TAG>& operator=(const std::pair< ITEMS, wibble::Empty<TAG> >& data);

	template<typename ITEMS, typename TAGS>
	Reverser<OUT, TAG>& operator=(const std::pair<ITEMS, TAGS>& data);
};

template<typename OUT, typename TAG>
Reverser<OUT, TAG> reverser(const TAG& reversedNull, const OUT& out)
{
	return Reverser<OUT, TAG>(out, reversedNull);
}

template<typename OUT>
class UngroupItems : public wibble::mixin::OutputIterator< UngroupItems<OUT> >
{
	OUT out;

public:
	UngroupItems(const OUT& out) : out(out) {}

	template<typename ITEMS, typename TAGS>
	UngroupItems<OUT>& operator=(const std::pair<ITEMS, TAGS>& data);
};

template<typename OUT>
UngroupItems<OUT> ungroupItems(const OUT& out)
{
	return UngroupItems<OUT>(out);
}


/**
 * Replace the tagsets with a wibble::Singleton<size_t> that contains
 * their size
 */
template<typename OUT>
class TagCounter : public wibble::mixin::OutputIterator< TagCounter<OUT> >
{
	OUT out;

public:
	TagCounter(const OUT& out) : out(out) {}

	template<typename ITEMS, typename TAGS>
	TagCounter<OUT>& operator=(const std::pair<ITEMS, TAGS>& data)
	{
		// Cast to size_t in case we are passed a container with a nonstandard
		// size type
		*out = make_pair(data.first, wibble::singleton(static_cast<size_t>(data.second.size())));
		++out;
		return *this;
	}
};

template<typename OUT>
TagCounter<OUT> tagCounter(const OUT& out)
{
	return TagCounter<OUT>(out);
}

}
}

// vim:set ts=4 sw=4:
#endif
