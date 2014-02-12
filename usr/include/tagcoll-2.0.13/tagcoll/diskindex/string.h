#ifndef TAGCOLL_DISKINDEX_STRING_H
#define TAGCOLL_DISKINDEX_STRING_H

/** \file
 * Fast mapping from its to strings
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

namespace tagcoll {
namespace diskindex {

/**
 * MMap-based index of int -> string mappings
 *
 * The layout is:
 *
 * [offset of string for item 0, offset of string for item 1...]
 * [0-terminated string 1][0-terminated string 2][...]
 * [number of items in the mapping]
 *
 * The index of a string not present in the index is assumed to be -1
 * The string corresponding to an invalid index is ""
 */
//class String : public MMap, public Converter<int, std::string>, public Converter<std::string, int>
class String : public MMap
{
protected:
	int offset(int val) const { return ((const int*)m_buf)[val]; }
	mutable std::vector<std::string> stringCache;

public:
	String(const MasterMMap& master, int idx) : MMap(master, idx), stringCache(size()) {}
	virtual ~String() {}

	virtual std::string operator()(const int& id) const
	{
		if (id < 0)
			return std::string();
		if (stringCache.size() <= (unsigned)id)
			stringCache.resize(id + 1);
		if (stringCache[id].empty())
			if (const char* s = data(id))
				stringCache[id] = std::string(s, size(id));
		return stringCache[id];
	}
	virtual int operator()(const std::string& item) const { return data(item.c_str()); }

	const char* data(int val) const { return (val >= 0 && (unsigned)val < size()) ? m_buf + offset(val) : ""; }
	size_t size(int val) const
	{
		if (val < 0 || (unsigned)val >= size())
			return 0;
		if ((unsigned)val == size() - 1)
			return m_size - offset(val) - 1;
		else
			return offset(val + 1) - offset(val) - 1;
	}
	int data(const char* str) const;
	size_t size() const { return *(unsigned int*)m_buf / sizeof(int); }
};

/**
 * Creates an on-disk index to use for Int
 */
//class StringIndexer : public MMapIndexer, public Converter<int, std::string>, public Converter<std::string, int>
class StringIndexer : public MMapIndexer
{
protected:
	std::vector<std::string> data;

public:
	virtual std::string operator()(const int& item) const { return data[item]; }
	virtual int operator()(const std::string& item) const;

	/// Store the key->val mapping into the indexer
	void map(const std::string& str);
	
	/// Return the size of the encoded index data
	int encodedSize() const;

	/// Write the index data in the given buffer, which should be at least
	/// encodedSize bytes
	void encode(char* buf) const;
};

}
}

// vim:set ts=4 sw=4:
#endif
