#ifndef TAGCOLL_DISKINDEX_MMAP_H
#define TAGCOLL_DISKINDEX_MMAP_H

/** \file
 * Basic infrastructure for implementing mmapped indexes
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

#include <string>

namespace tagcoll {
namespace diskindex {

class mmap;

/**
 * Performs the memory management and mmapping tasks for mmapped indexes.
 *
 * One MMap can contain many indexes.  Indexes come chained one after the
 * other, prefixed by an int that specifies their length:
 *
 * [size of index 1][index1][size of index 2][index]...
 *
 * Every index must make sure that its size is int-aligned, otherwise accessing
 * it would cause a bus error in many architectures.
 */
class MasterMMap
{
protected:
	std::string m_filename;
	size_t m_size;
	int m_fd;
	const char* m_buf;

public:
	MasterMMap();
	MasterMMap(const std::string& filename);
	~MasterMMap();

	void init(const std::string& filename);
	
	friend class MMap;
};

class MMap
{
protected:
	const MasterMMap* m_master;
	const char* m_buf;
	size_t m_size;

public:
	MMap();
	MMap(const char* buf, int size);
	MMap(const MasterMMap& master, size_t idx);

	void init(const char* buf, int size);
	void init(const MasterMMap& master, size_t idx);

	/// Round a value to the next word size in the current architecture
	template<class INT>
	static inline INT align(INT val)
	{
		return (val + sizeof(int) - 1) & ~(sizeof(int) - 1);
	}
};

/**
 * Interface for indexers.
 */
class MMapIndexer
{
public:
	virtual ~MMapIndexer() {}

	/// Return the size of the encoded index data (in bytes)
	virtual int encodedSize() const = 0;

	/// Write the index data in the given buffer, which should be at least
	/// encodedSize bytes
	virtual void encode(char* buf) const = 0;
};

/**
 * Master index writer.  It allows to write many indexes in the same file,
 * atomically: the file will be created as a tempfile and atomically renamed to
 * the destination filename on class destruction.
 */
class MasterMMapIndexer
{
protected:
	std::string finalname;
	std::string tmpname;
	int fd;

public:
	MasterMMapIndexer(const std::string& filename);
	~MasterMMapIndexer();

	/// Close the file and perform the final rename
	void commit();

	/// Append one subindex
	void append(const MMapIndexer& idx);
};


}
}

// vim:set ts=4 sw=4:
#endif
