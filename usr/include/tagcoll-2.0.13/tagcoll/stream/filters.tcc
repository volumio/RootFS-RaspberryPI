#ifndef TAGCOLL_STREAM_FILTERS_TCC
#define TAGCOLL_STREAM_FILTERS_TCC

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

#include <tagcoll/stream/filters.h>
#include <wibble/mixin.h>
#include <wibble/singleton.h>
#include <wibble/empty.h>
#include <set>
#include <utility>
#include <string>

namespace tagcoll {
namespace stream {

template<typename OUT> template<typename Items, typename Tags>
UntaggedRemover<OUT>& UntaggedRemover<OUT>::operator=(const std::pair<Items, Tags>& data)
{
	if (data.second.begin() == data.second.end())
	{
		if (inverse)
		{
			*out = data;
			++out;
		}
	} else {
		if (!inverse)
		{
			*out = data;
			++out;
		}
	}
	return *this;
}

/**
 * Removes tags which are not inside a facet
 */
template<typename OUT> template<typename Items, typename Tags>
UnfacetedRemover<OUT>& UnfacetedRemover<OUT>::operator=(const std::pair<Items, Tags>& data)
{
	std::set<std::string> patched;
	bool changed = false;

	for (typename Tags::const_iterator i = data.second.begin();
			i != data.second.end(); ++i)
		if (i->find(separator) != std::string::npos)
			patched.insert(*i);
		else
			changed = true;

	if (changed)
		*out = make_pair(data.first, patched);
	else
		*out = data;
	++out;

	return *this;
}

template<typename OUT, typename TAG> template<typename ITEMS>
Reverser<OUT, TAG>& Reverser<OUT, TAG>::operator=(const std::pair< ITEMS, wibble::Empty<TAG> >& data)
{
	*out = make_pair(wibble::singleton(reversedNull), data.first);
	++out;
	return *this;
}

template<typename OUT, typename TAG> template<typename ITEMS, typename TAGS>
Reverser<OUT, TAG>& Reverser<OUT, TAG>::operator=(const std::pair<ITEMS, TAGS>& data)
{
	if (data.second.begin() == data.second.end())
		*out = make_pair(wibble::singleton(reversedNull), data.first);
	else
		*out = make_pair(data.second, data.first);
	++out;
	return *this;
}

template<typename OUT> template<typename ITEMS, typename TAGS>
UngroupItems<OUT>& UngroupItems<OUT>::operator=(const std::pair<ITEMS, TAGS>& data)
{
	for (typename ITEMS::const_iterator i = data.first.begin();
			i != data.first.end(); ++i)
	{
		*out = make_pair(wibble::singleton(*i), data.second);
		++out;
	}
	return *this;
}

}
}

// vim:set ts=4 sw=4:
#endif
