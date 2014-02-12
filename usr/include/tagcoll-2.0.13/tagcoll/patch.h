#ifndef TAGCOLL_PATCHES_H
#define TAGCOLL_PATCHES_H

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
#include <wibble/mixin.h>
#include <map>
#include <string>

namespace tagcoll
{

/**
 * Patch for the tagset of a specific item
 */
template <typename ITEM, typename TAG>
struct Patch
{
	ITEM item;
	std::set<TAG> added;
	std::set<TAG> removed;

	Patch(const Patch<ITEM, TAG>& p) : item(p.item), added(p.added), removed(p.removed) {}
	Patch(const ITEM& item) : item(item) {}
	Patch(const ITEM& item, const std::set<TAG>& added, const std::set<TAG>& removed);
	template<typename CONTA, typename CONTB>
	Patch(const ITEM& item, const CONTA& added, const CONTB& removed);
	~Patch() {}

	void add(const TAG& tag)
	{
		using namespace wibble::operators;
		added |= tag; removed -= tag;
	}
	void add(const std::set<TAG>& tags)
	{
		using namespace wibble::operators;
		added |= tags; removed -= tags;
	}
	void remove(const TAG& tag)
	{
		using namespace wibble::operators;
		removed |= tag; added -= tag;
	}
	void remove(const std::set<TAG>& tags)
	{
		using namespace wibble::operators;
		removed |= tags; added -= tags;
	}

	Patch<ITEM, TAG> getReverse() const
	{
		return Patch<ITEM, TAG>(item, removed, added);
	}

	void mergeWith(const Patch<ITEM, TAG>& patch)
	{
		add(patch.added);
		remove(patch.removed);
	}

	std::set<TAG> apply(const std::set<TAG>& ts) const
	{
		using namespace wibble::operators;
		return (ts | added) - removed;
	}

	template<typename TAGS>
	std::set<TAG> apply(const TAGS& tags) const
	{
		using namespace wibble::operators;
		std::set<TAG> ts;
		for (typename TAGS::const_iterator i = tags.begin();
				i != tags.end(); ++i)
			ts.insert(*i);
		return (ts | added) - removed;
	}

	void removeRedundant(const std::set<TAG> ts)
	{
		using namespace wibble::operators;
		// Don't add what already exists
		added -= ts;
		// Don't remove what does not exist
		removed -= (removed - ts);
	}

	bool operator==(const Patch<ITEM, TAG>& p) const
	{
		return p.item == item && p.added == added && p.removed == removed;
	}
	bool operator!=(const Patch<ITEM, TAG>& p) const
	{
		return p.item != item || p.added != added || p.removed != removed;
	}
};

/**
 * List of patches that can be applied to a TaggedCollection
 */
template <class ITEM, class TAG>
class PatchList : public std::map<ITEM, Patch<ITEM, TAG> >
{
public:
	PatchList() {}
	PatchList(const PatchList& pl) : std::map<ITEM, Patch<ITEM, TAG> >(pl) {}

	typedef typename std::map<ITEM, Patch<ITEM, TAG> >::const_iterator const_iterator;
	typedef typename std::map<ITEM, Patch<ITEM, TAG> >::iterator iterator;

	/**
	 * Add to this patchlist the patches needed to transform `im1' in `im2'
	 */
	template<typename COLL1, typename COLL2>
	void addPatch(const COLL1& im1, const COLL2& im2);

	/**
	 * Add `patch' to this PatchList
	 */
	void addPatch(const Patch<ITEM, TAG>& patch);

	/**
	 * Add `patches' to this PatchList
	 */
	void addPatch(const PatchList<ITEM, TAG>& patches);

	/**
	 * Add 'patch' to this PatchList, as tag: +/- package rather than package
	 * +/- tag
	 */
	void addPatchInverted(const Patch<TAG, ITEM>& patch);

	/**
	 * Add 'patches' to this PatchList, as tag: +/- package rather than package
	 * +/- tag
	 */
	void addPatchInverted(const PatchList<TAG, ITEM>& patches);

	/**
	 * If the PatchList contains the give item, invoke
	 * Patch::removeRedundant(tags) on its patch
	 */
	void removeRedundant(const ITEM& item, const std::set<TAG>& tags);

	/**
	 * Patch a tagged item
	 *
	 * @return
	 *   The new (patched) set of tags
	 */
	std::set<TAG> patch(const ITEM& item, const std::set<TAG>& tagset) const;

	// Output the patch list to a TagcollConsumer
	template<typename OUT>
	void output(OUT out) const;

	PatchList<ITEM, TAG> getReverse() const;
};

template<typename ITEM, typename TAG>
class Inserter : public wibble::mixin::OutputIterator< Inserter<ITEM, TAG> >
{
	PatchList<ITEM, TAG>& patches;
public:
	Inserter(PatchList<ITEM, TAG>& patches) : patches(patches) {}

	Inserter<ITEM, TAG>& operator=(const Patch<ITEM, TAG>& patch)
	{
		patches.addPatch(patch);
		return *this;
	}
};

template<typename ITEM, typename TAG>
Inserter<ITEM, TAG> inserter(PatchList<ITEM, TAG>& patches)
{
	return Inserter<ITEM, TAG>(patches);
}

}

// vim:set ts=4 sw=4:
#endif
