#ifndef TAGCOLL_STREAM_SINK_H
#define TAGCOLL_STREAM_SINK_H

/** \file
 * Consumer interface for a stream of tagged items
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
#include <utility>

namespace tagcoll {
namespace stream {

/**
 * Consumer that discards its input
 */
class Sink : public wibble::mixin::OutputIterator<Sink>
{
public:
	template<typename Data>
	const Sink& operator=(const Data&) const { return *this; }
};

inline Sink sink()
{
	return Sink();
}


/**
 * Consumer that discards its input
 */
template<typename COUNTER>
class CountingSink : public wibble::mixin::OutputIterator< CountingSink<COUNTER> >
{
	COUNTER& countItems;
	COUNTER& countTags;

public:
	CountingSink(COUNTER& countItems, COUNTER& countTags) :
		countItems(countItems), countTags(countTags) {}

	// TODO: see if there's a way of implementing the count using size() when
	// the method actually exists
	template<typename ITEMS, typename TAGS>
	CountingSink& operator=(const std::pair<ITEMS, TAGS>& data)
	{
		countItems += data.first.size();
		countTags += data.second.size();
		return *this;
	}
};

template<typename COUNTER>
inline CountingSink<COUNTER> countingSink(COUNTER& countItems, COUNTER& countTags)
{
	return CountingSink<COUNTER>(countItems, countTags);
}


}
}

// vim:set ts=4 sw=4:
#endif
