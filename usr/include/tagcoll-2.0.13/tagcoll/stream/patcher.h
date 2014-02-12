#ifndef TAGCOLL_STREAM_PATCHER_H
#define TAGCOLL_STREAM_PATCHER_H

/** \file
 * Classes handling tag patches
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

#include <wibble/operators.h>
#include <wibble/singleton.h>
#include <wibble/mixin.h>
#include <tagcoll/patch.h>

namespace tagcoll {
namespace stream {

template<typename ITEM, typename TAG, typename OUT>
class Patcher : public wibble::mixin::OutputIterator< Patcher<ITEM, TAG, OUT> >
{
	OUT out;
	const PatchList<ITEM, TAG>& patches;
	std::set<ITEM> newItems;

public:
	Patcher(const PatchList<ITEM, TAG>& patches, const OUT& out)
		: out(out), patches(patches)
	{
		// Take note of the items that could possibly be introduced by the patch
		for (typename PatchList<ITEM, TAG>::const_iterator i = patches.begin();
				i != patches.end(); ++i)
			if (!i->second.added.empty())
				newItems.insert(i->first);
	}
	~Patcher()
	{
		// Insert the items that were not present in the collection we got in
		// input
		for (typename std::set<ITEM>::const_iterator i = newItems.begin();
				i != newItems.end(); ++i)
		{
			typename PatchList<ITEM, TAG>::const_iterator j = patches.find(*i);
			*out = make_pair(wibble::singleton(*i), j->second.added);
			++out;
		}
	}

	template<typename Items, typename Tags>
	Patcher<ITEM, TAG, OUT>& operator=(const std::pair<Items, Tags>& data)
	{
		for (typename Items::const_iterator i = data.first.begin();
				i != data.first.end(); ++i)
		{
			newItems.erase(*i);
			// Find the patch record for this item
			typename PatchList<ITEM, TAG>::const_iterator p = patches.find(*i);
			if (p == patches.end())
				// If there are no patches, return the tagset unchanged
				*out = data;
			else
				*out = make_pair(wibble::singleton(*i), p->second.apply(data.second));
			++out;
		}
		return *this;
	}
};

template<typename ITEM, typename TAG, typename OUT>
Patcher<ITEM, TAG, OUT> patcher(const PatchList<ITEM, TAG>& patches, const OUT& out)
{
	return Patcher<ITEM, TAG, OUT>(patches, out);
}

}
}

// vim:set ts=4 sw=4:
#endif
