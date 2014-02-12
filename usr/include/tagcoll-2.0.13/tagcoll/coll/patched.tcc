/*
 * Wrap a Collection, preserving modifications as patches
 *
 * Copyright (C) 2005,2006  Enrico Zini <enrico@debian.org>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

#ifndef TAGCOLL_COLL_PATCHED_TCC
#define TAGCOLL_COLL_PATCHED_TCC

#include <tagcoll/coll/patched.h>
#include <tagcoll/utils/set.h>

#include <wibble/operators.h>

using namespace std;
using namespace wibble::operators;

namespace tagcoll {
namespace coll {

template<typename ROCOLL> template<typename ITEMS, typename TAGS>
void Patched<ROCOLL>::insert(const ITEMS& items, const TAGS& tags)
{
	Patches changes;
	for (typename ITEMS::const_iterator i = items.begin();
			i != items.end(); ++i)
		changes.addPatch(Patch(*i, tags, TagSet()));
	addChanges(changes);
}


template<typename ROCOLL>
void Patched<ROCOLL>::clear()
{
	// Remove all patches
	m_changes.clear();
	m_rchanges.clear();

	// Add all tagsets of the underlying collection as removed tags in the patch
	for (typename ROCOLL::const_iterator i = coll.begin();
			i != coll.end(); ++i)
	{
		m_changes.addPatch(Patch(i->first, std::set<Tag>(), i->second));

		for (typename TagSet::const_iterator j = i->second.begin();
				j != i->second.end(); ++j)
			m_rchanges.addPatch(Patch(*j, wibble::Empty<Tag>(), wibble::singleton(i->first)));
	}
}

template<typename ROCOLL>
void Patched<ROCOLL>::setChanges(const Patches& changes)
{
	this->m_changes.clear();
	this->m_rchanges.clear();
	
	addChanges(changes);
}

template<typename ROCOLL>
void Patched<ROCOLL>::addChanges(const Patches& changes)
{
	// Simplify the patch against the contents of `coll' before adding it.
	for (typename Patches::const_iterator i = changes.begin(); i != changes.end(); ++i)
		// Consider only valid items
		if (i->first != Item())
		{
			// Merge with existing patches
			this->m_changes.addPatch(i->second);
			// Simplify the result
			this->m_changes.removeRedundant(i->first, coll.getTagsOfItem(i->first));
		}

	RPatches rchanges;
	rchanges.addPatchInverted(changes);
	for (typename RPatches::const_iterator i = rchanges.begin(); i != rchanges.end(); ++i)
		// Consider only valid tags
		if (i->first != Tag())
		{
			// Merge with existing patches
			this->m_rchanges.addPatch(i->second);
			// Simplify the result
			this->m_rchanges.removeRedundant(i->first, coll.getItemsHavingTag(i->first));
		}
}

template<typename ROCOLL>
bool Patched<ROCOLL>::hasTag(const Tag& tag) const
{
	typename RPatches::const_iterator i = m_rchanges.find(tag);
	if (i == m_rchanges.end())
		return coll.hasTag(tag);
	if (! i->second.added.empty())
		return true;
	return !this->getItemsHavingTag(tag).empty();
}

template<typename ROCOLL>
typename coll_traits<ROCOLL>::itemset_type Patched<ROCOLL>::getTaggedItems() const
{
	ItemSet res(coll.getTaggedItems());
	for (typename Patches::const_iterator i = m_changes.begin();
			i != m_changes.end(); ++i)
		if (!i->second.added.empty())
			// Add packages for which tags are added
			res |= i->first;
		else if (getTagsOfItem(i->first).empty())
			// Remove the packages to which the patch removes all tags
			res -= i->first;
	return res;
}

template<typename ROCOLL>
typename coll_traits<ROCOLL>::tagset_type Patched<ROCOLL>::getAllTags() const
{
	TagSet res(coll.getAllTags());
	for (typename RPatches::const_iterator i = m_rchanges.begin();
			i != m_rchanges.end(); ++i)
		if (!i->second.added.empty())
			// Add tags for which packages are added
			res |= i->first;
		else if (coll.getCardinality(i->first) - i->second.removed.size() <= 0)
			// Remove the tags to which the patch removes all items
			res -= i->first;
	return res;
}

#if 0
template<typename ITEM, typename TAG, typename OUT>
class UnpatchedOnly : public wibble::mixin::OutputIterator< UnpatchedOnly<ITEM, TAG, OUT> >
{
protected:
	OUT out;
	const PatchList<ITEM, TAG>& changes;

public:	
	UnpatchedOnly(const PatchList<ITEM, TAG>& changes, const OUT& out) : out(out), changes(changes) {}

	UnpatchedOnly<ITEM, TAG, OUT>& operator++() { return *this; }
	
	template<typename Items, typename Tags>
	UnpatchedOnly<ITEM, TAG, OUT>& operator=(const std::pair<Items, Tags>& data)
	{
		for (typename Items::const_iterator i = data.first.begin();
				i != data.first.end(); ++i)
			if (changes.find(*i) == changes.end())
			{
				*out = data;
				++out;
			}
		return *this;
	}
};

template<typename ITEM, typename TAG, typename OUT>
UnpatchedOnly<ITEM, TAG, OUT> unpatchedOnly(const PatchList<ITEM, TAG>& changes, const OUT& out)
{
	return UnpatchedOnly<ITEM, TAG, OUT>(changes, out);
}

template<class ITEM, class TAG>
void Patched<ITEM, TAG>::output(Consumer<ITEM, TAG>& cons) const
{
	// First, only pass the unpatched items
	coll.outputToIterator(unpatchedOnly(changes, consumer(cons)));

	// Then output the items in the patch
	for (typename PatchList<ITEM, TAG>::const_iterator i = changes.begin();
			i != changes.end(); i++)
		cons.consume(i->first,
				changes.patch(i->first, coll.getTags(i->first)));
}
#endif

template<typename ROCOLL>
unsigned int Patched<ROCOLL>::getCardinality(const Tag& tag) const
{
	typename RPatches::const_iterator i = m_rchanges.find(tag);
	if (i == m_rchanges.end())
		return coll.getCardinality(tag);
	else
		return coll.getCardinality(tag) + i->second.added.size() - i->second.removed.size();
}

}
}

#include <tagcoll/coll/base.tcc>
#include <tagcoll/patch.tcc>

#endif

// vim:set ts=4 sw=4:
