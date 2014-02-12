/*
 * Auto-expanding trees and smart hierarchy interface
 *
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

#include <tagcoll/SmartHierarchy.h>
#include <wibble/operators.h>

//#define VERB1 1
//#define VERB_FLATTEN 1

#if VERB1 || VERB_FLATTEN
#include <stdio.h>

static void print_spaces(int n) throw ()
{
	for (int i = 0; i < n; i++)
		fputc(' ', stderr);
}
#endif

using namespace std;
using namespace wibble::operators;

namespace tagcoll {

//template class SmartHierarchyNode<string>;
//template class SmartHierarchyNode<int>;
//template class CleanSmartHierarchyNode<string>;
//template class CleanSmartHierarchyNode<int>;

//namespace Debtags { class Package; }
//template class SmartHierarchyNode<Debtags::Package*>;
//template class CleanSmartHierarchyNode<Debtags::Package*>;

template<typename COLL>
HierarchyNode<COLL>::~HierarchyNode()
{
	if (coll)
		delete coll;
	for (typename vector<HierarchyNode<COLL>*>::iterator i = children.begin();
			i != children.end(); i++)
		delete *i;
}

//#define VERB1

template<typename COLL>
void SmartHierarchyNode<COLL>::expand()
{
	/*
Define the "cardinality" of a tag as the number of items in the collection
having it in the tag set
Add the items with no tags to the tree
Delete the items with no tags from the collection
while (there are items left)
Choose the tag T with the highest cardinality and add it to the nodes in
  the tree, as a new folder called with the name of the tag
Insert into the new folder all associated items
Remove from all the items in the collection the tag T
Remove from all the items in the collection all the items implied by tag T
Delete the items with no tags from the collection
For all newly added folders, repeat this algorithm on the collection of
their items
	*/
	
#ifdef VERB1
	//print_spaces(nest);
	//fprintf(stderr, "%d tags, %d tagsets\n", this->coll->tagCount(), coll->tagsetCount());
	if (this->parent())
		fprintf(stderr, "Down from %s, we are %s: ", this->parent()->tag().c_str(), this->tag().c_str());
	else
		fprintf(stderr, "Toplevel: ");
	fprintf(stderr, "%d tags\n", this->coll->tagCount());
#endif

	if (flattenThreshold > 0 && this->coll->itemCount() < (unsigned)flattenThreshold)
	{
		this->items = unexpandedItems | this->coll->getTaggedItems();
#ifdef VERB_FLATTEN
		fprintf(stderr, "Flattened: threshold: %d, items: %d\n", flattenThreshold, items.size());
#endif
	}
	else
	{
		this->items = unexpandedItems;
	
		COLL workcoll = *this->coll;

		while (1)
		{
			// Choose the tag T with the highest cardinality
			size_t card;
			TAG tag = workcoll.findTagWithMaxCardinality(card);

			// Stop condition: there are no more tags left
			if (card == 0)
				break;

#ifdef VERB1
			/*
			//print_spaces(nest);
			fprintf(stderr, "   Processed: ");
			for (std::set<TAG>::const_iterator i = processed.begin();
					i != processed.end(); i++)
				if (i == processed.begin())
					fprintf(stderr, "%s", i->c_str());
				else
					fprintf(stderr, ", %s", i->c_str());
			fprintf(stderr, "\n");
			//print_spaces(nest);
			*/
			fprintf(stderr, "   Chosen %s[%zd]\n", tag.c_str(), card);
#endif

			// Append the child node
			this->children.push_back(smartHierarchyNode(
						this, tag, workcoll.getChildCollection(tag), flattenThreshold));
			
			// Remove the tag we chosen
			workcoll.removeTag(tag);

			// Also remove tags already fully implied by the chosen one
			std::set<TAG> impls = workcoll.getTagsImplying(tag);
			for (typename std::set<TAG>::const_iterator i = impls.begin();
					i != impls.end(); ++i)
				workcoll.removeTag(*i);
		}
	}

	delete this->coll;
	this->coll = 0;
}

template<typename COLL>
void CleanSmartHierarchyNode<COLL>::expand()
{
	/* Same as SmartHierarchyNode, except it create CleanSmartHierarchyNode
	 * children and performs merging of equivalent tags*/
	// FIXME: eventually go really OO, using a factory class to create subnodes
	// FIXME: another way is to use a virtual HiearchyNode* createChildNode(parms) method

	//fprintf(stderr, "CSHN::expand\n");
	//this->coll->mergeEquivalentTags();
	//fprintf(stderr, "CSHN::merged\n");
	
	if (this->flattenThreshold > 0 && this->coll->itemCount() < (unsigned)this->flattenThreshold)
		this->items = this->unexpandedItems | this->coll->getTaggedItems();
	else
	{
		this->items = this->unexpandedItems;
	
		COLL workcoll = *this->coll;

		while (1)
		{
			// Choose the tag T with the highest cardinality
			size_t card;
			TAG tag = workcoll.findTagWithMaxCardinality(card);

			// Stop condition: there are no more tags left
			if (card == 0)
				break;

			// Append the child node
			this->children.push_back(cleanSmartHierarchyNode(
						this, tag, workcoll.getChildCollection(tag), this->flattenThreshold));

			// Remove the tag we chosen
			workcoll.removeTag(tag);

			// Remove all tags already fully implied by the chosen one
			std::set<TAG> impls = workcoll.getTagsImplying(tag);
			for (typename std::set<TAG>::const_iterator i = impls.begin();
					i != impls.end(); ++i)
				workcoll.removeTag(*i);
		}
	}

	// If we contain only one child node, replace it with his expansion
	while (this->children.size() == 1 && this->items.empty())
	{
		CleanSmartHierarchyNode<COLL>* child = static_cast<CleanSmartHierarchyNode<COLL>*>(this->children[0]);
		this->children.clear();
		
		// Move the child's children to this node
		for (typename CleanSmartHierarchyNode::iterator i = child->begin();
				i != child->end(); i++)
		{
			static_cast<CleanSmartHierarchyNode*>(*i)->setTag(mergeTags(child->tag(), (*i)->tag()));
			static_cast<CleanSmartHierarchyNode*>(*i)->setParent(this);
			this->children.push_back(*i);
		}

		this->items = child->getItems();

		child->children.clear();
		delete child;
	}

	delete this->coll;
	this->coll = 0;
}

//#define VERB1

template<typename COLL>
void DiscHierarchyNode<COLL>::expand()
{
	/*
Sort the tags by discriminance
Take the top and that is a branch, that contains all the items with that tag
Remove all the items with that tag from the collection
Repeat until the collection gets empty
    */
	
#ifdef VERB1
	//print_spaces(nest);
	//fprintf(stderr, "%d tags, %d tagsets\n", this->coll->tagCount(), this->coll->tagsetCount());
	if (this->parent())
		fprintf(stderr, "Down from %s, we are %s: ", this->parent()->tag().c_str(), this->tag().c_str());
	else
		fprintf(stderr, "Toplevel: ");
	fprintf(stderr, "%d tags\n", this->coll->tagCount());
#endif

	if (flattenThreshold > 0 && this->coll->itemCount() < (unsigned)flattenThreshold)
	{
#ifdef VERB_FLATTEN
		fprintf(stderr, "Flattened: threshold: %d, items: %d\n", flattenThreshold, this->coll->itemCount());
#endif
		return;
	}
	else
	{
		COLL workcoll = *this->coll;

		while (!workcoll.empty())
		{
			// Find the tag with maximum discriminance
			TAG tag;
			int disc = 0;
			set<TAG> allTags = workcoll.getAllTags();
			for (typename set<TAG>::const_iterator i = allTags.begin(); i != allTags.end(); ++i)
			{
				int d = workcoll.getDiscriminance(*i);
				if (d > disc)
				{
					disc = d;
					tag = *i;
				}
			}
			// If every tag had zero or one discriminance, end here
			if (disc <= 1)
				break;

#ifdef VERB1
			//print_spaces(nest);
			/*
			fprintf(stderr, "   Processed: ");
			for (typename std::set<TAG>::const_iterator i = processed.begin();
					i != processed.end(); i++)
				if (i == processed.begin())
					fprintf(stderr, "%s", i->c_str());
				else
					fprintf(stderr, ", %s", i->c_str());
			fprintf(stderr, "\n");
			*/
			//print_spaces(nest);
			fprintf(stderr, "   Chosen %s[%d]\n", tag.c_str(), disc);
#endif
			// Append the child node
			this->children.push_back(discHierarchyNode(
						this, tag, workcoll.getChildCollection(tag), flattenThreshold));

			workcoll.removeItemsHavingTag(tag);
		}
	}

	delete this->coll;
	this->coll = 0;
}


}

// vim:set ts=4 sw=4:
