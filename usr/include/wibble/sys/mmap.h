#ifndef WIBBLE_SYS_MMAP_H
#define WIBBLE_SYS_MMAP_H

/** \file
 * Simple mmap support
 */

/*
 * Copyright (C) 2006--2008  Enrico Zini <enrico@enricozini.org>
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

#include <wibble/sys/macros.h>
#include <string>

namespace wibble {
namespace sys {

/**
 * Map a file into memory.
 *
 * Currently, this is only read-only.
 *
 * Copy semanthics are the same as auto_ptr
 */
struct MMap
{
public:
	MMap();
	MMap(const MMap& mmap);
	MMap(const std::string& filename);
	~MMap();
	
	MMap& operator=(const MMap& mmap);

	void map(const std::string& filename);
	void unmap();
	
	std::string filename;
	size_t size;
	int fd;
	const char* buf;

};

}
}

// vim:set ts=4 sw=4:
#endif
