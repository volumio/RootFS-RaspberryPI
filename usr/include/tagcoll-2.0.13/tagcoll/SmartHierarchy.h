#ifndef TAGCOLL_SMARTHIERARCHY_H
#define TAGCOLL_SMARTHIERARCHY_H

/** \file
 * Auto-expanding trees and smart hierarchy interface
 */

/* 
 * Copyright (C) 2003--2008  Enrico Zini <enrico@debian.org>
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

#include <tagcoll/coll/base.h>
#include <vector>
#include <set>
#include <string>

namespace tagcoll
{

// Base class for the auto-expanding tree nodes
template<typename COLL>
class HierarchyNode
{
protected:
	typedef typename coll::coll_traits<COLL>::item_type ITEM;
	typedef typename coll::coll_traits<COLL>::tag_type TAG;
	typedef typename coll::coll_traits<COLL>::itemset_type ITEMSET;
	typedef typename coll::coll_traits<COLL>::tagset_type TAGSET;

	// Tag name
	TAG _tag;
	COLL* coll;
	std::vector<HierarchyNode<COLL>*> children;
	ITEMSET items;
	HierarchyNode<COLL>* _parent;

public:
	HierarchyNode(const TAG& tag, const COLL& coll)
		: _tag(tag), coll(new COLL(coll)), _parent(0) {}
	HierarchyNode(HierarchyNode<COLL>* parent, const TAG& tag, const COLL& coll)
		: _tag(tag), coll(new COLL(coll)), _parent(parent) {}
	virtual ~HierarchyNode();

	typedef typename std::vector<HierarchyNode<COLL>*>::iterator iterator;

	// Get the node tag (const version)
	const TAG& tag() const { return _tag; }

	// Get the node tag
	TAG tag() { return _tag; }

	// Get the parent of this node (0 if it is the root node)
	HierarchyNode<COLL>* parent() const { return _parent; }

	// Expand the collection in the children of this node
	virtual void expand() = 0;

	// Get the number of child nodes
	int size()
	{
		if (coll)
			expand();
		return children.size();
	}

	iterator begin()
	{
		if (coll)
			expand();
		return children.begin();
	}

	iterator end()
	{
		if (coll)
			expand();
		return children.end();
	}

	// Get a child node by index
	HierarchyNode<COLL>* operator[](int idx)
	{
		if (coll)
			expand();
		return children[idx];
	}

	// Get the set of items present in this node
	const std::set<ITEM>& getItems()
	{
		if (coll)
			expand();
		return items;
	}
};

// Hierarchy of items where information is replicated to acheive intuitive
// navigability of the resulting structure
template<typename COLL>
class SmartHierarchyNode : public HierarchyNode<COLL>
{
protected:
	typedef typename HierarchyNode<COLL>::ITEM ITEM;
	typedef typename HierarchyNode<COLL>::TAG TAG;
	typedef typename HierarchyNode<COLL>::ITEMSET ITEMSET;
	typedef typename HierarchyNode<COLL>::TAGSET TAGSET;

	typename HierarchyNode<COLL>::ITEMSET unexpandedItems;

	// Threshold of child items below which the child hierarchy is flattened
	// and they all become children of this node
	int flattenThreshold;
	
	// Expand the collection in the children of this node
	virtual void expand();

public:
	SmartHierarchyNode(const TAG& tag, const COLL& coll, int flattenThreshold = 0)
		throw () :
			HierarchyNode<COLL>(tag, coll),
			flattenThreshold(flattenThreshold) {}

	SmartHierarchyNode(
			HierarchyNode<COLL>* parent,
			const TAG& tag,
			const COLL& coll,
			int flattenThreshold = 0)
		throw () :
			HierarchyNode<COLL>(parent, tag, coll),
			flattenThreshold(flattenThreshold)
		{
			std::set<TAG> tags; tags.insert(tag);
			unexpandedItems = coll.getItemsExactMatch(tags);
		}

	virtual ~SmartHierarchyNode() {}
};

template<typename COLL>
inline HierarchyNode<COLL>* smartHierarchyNode(const typename coll::coll_traits<COLL>::tag_type& tag, const COLL& coll, int flattenThreshold)
{
	return new SmartHierarchyNode<COLL>(tag, coll, flattenThreshold);
}
template<typename COLL>
inline HierarchyNode<COLL>* smartHierarchyNode(HierarchyNode<COLL>* parent, const typename coll::coll_traits<COLL>::tag_type& tag, const COLL& coll, int flattenThreshold)
{
	return new SmartHierarchyNode<COLL>(parent, tag, coll, flattenThreshold);
}

template<typename TAG>
TAG mergeTags(const TAG& tag1, const TAG& tag2)
{
	return tag1;
}

template<>
std::string mergeTags(const std::string& tag1, const std::string& tag2);


// SmartHierarchyNode which also does merging of equivalent tags
template<typename COLL>
class CleanSmartHierarchyNode : public SmartHierarchyNode<COLL>
{
protected:
	typedef typename SmartHierarchyNode<COLL>::ITEM ITEM;
	typedef typename SmartHierarchyNode<COLL>::TAG TAG;
	typedef typename SmartHierarchyNode<COLL>::ITEMSET ITEMSET;
	typedef typename SmartHierarchyNode<COLL>::TAGSET TAGSET;

	// Expand the collection in the children of this node
	virtual void expand();

	TAG setTag(const TAG& tag) { return this->_tag = tag; }
	HierarchyNode<COLL>* setParent(HierarchyNode<COLL>* parent) { return this->_parent = parent; }

public:
	CleanSmartHierarchyNode(const TAG& tag, const COLL& coll, int flattenThreshold = 0)
		: SmartHierarchyNode<COLL>(tag, coll, flattenThreshold) {}
	CleanSmartHierarchyNode(HierarchyNode<COLL>* parent, const TAG& tag, const COLL& coll, int flattenThreshold = 0)
		: SmartHierarchyNode<COLL>(parent, tag, coll, flattenThreshold) {}
	virtual ~CleanSmartHierarchyNode() {}
};

template<typename COLL>
inline HierarchyNode<COLL>* cleanSmartHierarchyNode(const typename coll::coll_traits<COLL>::tag_type& tag, const COLL& coll, int flattenThreshold)
{
	return new CleanSmartHierarchyNode<COLL>(tag, coll, flattenThreshold);
}
template<typename COLL>
inline HierarchyNode<COLL>* cleanSmartHierarchyNode(HierarchyNode<COLL>* parent, const typename coll::coll_traits<COLL>::tag_type& tag, const COLL& coll, int flattenThreshold)
{
	return new CleanSmartHierarchyNode<COLL>(parent, tag, coll, flattenThreshold);
}


// HierarchyNode that branches by discriminance
template<typename COLL>
class DiscHierarchyNode : public HierarchyNode<COLL>
{
protected:
	typedef typename HierarchyNode<COLL>::ITEM ITEM;
	typedef typename HierarchyNode<COLL>::TAG TAG;
	typedef typename HierarchyNode<COLL>::ITEMSET ITEMSET;
	typedef typename HierarchyNode<COLL>::TAGSET TAGSET;

	// Threshold of child items below which the child hierarchy is flattened
	// and they all become children of this node
	int flattenThreshold;
	
	// Expand the collection in the children of this node
	virtual void expand();

public:
	DiscHierarchyNode(const TAG& tag, const COLL& coll, int flattenThreshold = 0)
		throw () :
			HierarchyNode<COLL>(tag, coll),
			flattenThreshold(flattenThreshold) {}

	DiscHierarchyNode(
			HierarchyNode<COLL>* parent,
			const TAG& tag,
			const COLL& coll,
			int flattenThreshold = 0)
		throw () :
			HierarchyNode<COLL>(parent, tag, coll),
			flattenThreshold(flattenThreshold)
		{
		}

	virtual ~DiscHierarchyNode() {}
};

template<typename COLL>
inline HierarchyNode<COLL>* discHierarchyNode(const typename coll::coll_traits<COLL>::tag_type& tag, const COLL& coll, int flattenThreshold)
{
	return new DiscHierarchyNode<COLL>(tag, coll, flattenThreshold);
}
template<typename COLL>
inline HierarchyNode<COLL>* discHierarchyNode(HierarchyNode<COLL>* parent, const typename coll::coll_traits<COLL>::tag_type& tag, const COLL& coll, int flattenThreshold)
{
	return new DiscHierarchyNode<COLL>(parent, tag, coll, flattenThreshold);
}

}

// vim:set ts=4 sw=4:
#endif
