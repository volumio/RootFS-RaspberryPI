/*
 * Classes handling tag patches
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

#ifndef TAGCOLL_PATCHES_TCC
#define TAGCOLL_PATCHES_TCC

#include <tagcoll/patch.h>
#include <wibble/singleton.h>
#include <wibble/empty.h>

using namespace std;
using namespace wibble::operators;

namespace tagcoll {

template <typename ITEM, typename TAG>
Patch<ITEM, TAG>::Patch(const ITEM& item, const std::set<TAG>& added, const std::set<TAG>& removed)
	: item(item), added(added-removed), removed(removed-added)
{
}

template <typename ITEM, typename TAG> template<typename CONTA, typename CONTB>
Patch<ITEM, TAG>::Patch(const ITEM& item, const CONTA& added, const CONTB& removed)
	: item(item)
{
	std::copy(added.begin(), added.end(), inserter(this->added, this->added.begin()));
	std::copy(removed.begin(), removed.end(), inserter(this->removed, this->removed.begin()));
}

template <class ITEM, class TAG>
void PatchList<ITEM, TAG>::addPatch(const Patch<ITEM, TAG>& patch)
{
	// Filter out empty patches
	if (patch.added.empty() && patch.removed.empty())
		return;

	iterator i = this->find(patch.item);
	if (i == this->end())
		this->insert(make_pair<ITEM, Patch<ITEM, TAG> >(patch.item, patch));
	else
		i->second.mergeWith(patch);
}

template <class ITEM, class TAG>
void PatchList<ITEM, TAG>::addPatch(const PatchList<ITEM, TAG>& patches)
{
	for (typename PatchList<ITEM, TAG>::const_iterator i = patches.begin();
			i != patches.end(); i++)
		addPatch(i->second);
}

template <class ITEM, class TAG>
void PatchList<ITEM, TAG>::addPatchInverted(const Patch<TAG, ITEM>& patch)
{
	// Filter out empty patches
	if (patch.added.empty() && patch.removed.empty())
		return;

	for (typename std::set<ITEM>::const_iterator i = patch.added.begin();
			i != patch.added.end(); ++i)
		addPatch(Patch<ITEM, TAG>(*i, wibble::singleton(patch.item), wibble::Empty<TAG>()));
	for (typename std::set<ITEM>::const_iterator i = patch.removed.begin();
			i != patch.removed.end(); ++i)
		addPatch(Patch<ITEM, TAG>(*i, wibble::Empty<TAG>(), wibble::singleton(patch.item)));
}

template <class ITEM, class TAG>
void PatchList<ITEM, TAG>::addPatchInverted(const PatchList<TAG, ITEM>& patches)
{
	for (typename PatchList<TAG, ITEM>::const_iterator i = patches.begin();
			i != patches.end(); i++)
		addPatchInverted(i->second);
}


template <class ITEM, class TAG> template<typename COLL1, typename COLL2>
void PatchList<ITEM, TAG>::addPatch(const COLL1& im1, const COLL2& im2)
{
	// FIXME: if I could implement the guarantee that the collection iterators
	// iterate in sorted item order, then I wouldn't need to extract all the
	// items of im2
	std::set<ITEM> im2items = im2.getTaggedItems();
	for (typename COLL1::const_iterator i1 = im1.begin();
			i1 != im1.end(); ++i1)
	{
		im2items.erase(i1->first);
		std::set<TAG> ts2 = im2.getTagsOfItem(i1->first);
		std::set<TAG> added = ts2 - i1->second;
		std::set<TAG> removed = i1->second - ts2;
		if (!added.empty() || !removed.empty())
			addPatch(Patch<ITEM, TAG>(i1->first, added, removed));
	}
	for (typename std::set<ITEM>::const_iterator i = im2items.begin();
			i != im2items.end(); ++i)
	{
		addPatch(Patch<ITEM, TAG>(*i, im2.getTagsOfItem(*i), wibble::Empty<TAG>()));
	}
}

template <class ITEM, class TAG>
void PatchList<ITEM, TAG>::removeRedundant(const ITEM& item, const std::set<TAG>& tags)
{
	iterator i = this->find(item);
	if (i == this->end()) return;
	i->second.removeRedundant(tags);
}

template <class ITEM, class TAG>
std::set<TAG> PatchList<ITEM, TAG>::patch(const ITEM& item, const std::set<TAG>& tagset) const
{
	// Find the patch record for this item
	const_iterator p = this->find(item);
	if (p == this->end())
		// If there are no patches, return the tagset unchanged
		return tagset;

	// There are patches: apply them:
	return p->second.apply(tagset);
}

template <class ITEM, class TAG>
PatchList<ITEM, TAG> PatchList<ITEM, TAG>::getReverse() const
{
	PatchList<ITEM, TAG> res;
	for (typename PatchList<ITEM, TAG>::const_iterator i = this->begin();
			i != this->end(); i++)
		res.addPatch(i->second.getReverse());
	return res;
}

template<typename ITEM, typename TAG> template<typename OUT>
void PatchList<ITEM, TAG>::output(OUT out) const
{
	for (typename PatchList<ITEM, TAG>::const_iterator i = this->begin();
			i != this->end(); ++i)
	{
		*out = i->second;
		++out;
	}
}


}

#endif

// vim:set ts=4 sw=4:
