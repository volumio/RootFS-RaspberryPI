#ifndef TAGCOLL_DISKINDEX_INT_H
#define TAGCOLL_DISKINDEX_INT_H

/** \file
 * Fast index for tag data, based on integer indexes
 */

/*
 * Copyright (C) 2006  Enrico Zini <enrico@debian.org>
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

#include <tagcoll/diskindex/mmap.h>
#include <vector>
#include <set>

namespace tagcoll {
namespace diskindex {

/**
 * MMap-based index of a -> [x1, x2, x3] mappings
 *
 * The layout is:
 *
 * [offset of mapping for item 0, offset of mapping for item 1...]
 * [size of array][sorted array of ints pointed by index 0]
 * [size of array][sorted array of ints pointed by index 1]
 * [size of array][sorted array of ints pointed by index 2]
 * [...]
 * [number of items in the mapping]
 *
 * This allows fast lookups, as well as fast lookups of unions or intersections
 * of mapped arrays.
 *
 * The number of items for an ID not present in the index is assumed to be 0.
 */
class Int : public MMap
{
protected:
	inline int* buf() const { return (int*)m_buf; }
	inline size_t ofs(int val) const { return buf()[val]; }

public:
	Int() {}
	Int(const MasterMMap& master, int idx) : MMap(master, idx) {}

	const int* data(int val) const { return (val >= 0 && (unsigned)val < size()) ? buf() + ofs(val) + 1 : 0; }
	size_t size(int val) const { return (val >= 0 && (unsigned)val < size()) ? buf()[ofs(val)] : 0; }
	size_t size() const { return m_buf ? ofs(0) : 0; }
};

/**
 * Creates an on-disk index to use for IntIndex
 */
class IntIndexer : public MMapIndexer, public std::vector<std::set<int> >
{
public:
	/// Store the key->val mapping into the indexer
	void map(unsigned int key, int val)
	{
		if (size() <= key)
			resize(key + 1);
		(*this)[key].insert(val);
	}
	
	/// Return the size of the encoded index data
	virtual int encodedSize() const;

	/// Write the index data in the given buffer, which should be at least
	/// encodedSize bytes
	virtual void encode(char* buf) const;
};

}
}

// vim:set ts=4 sw=4:
#endif
