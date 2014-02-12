#ifndef TAGCOLL_INPUT_MEMORY_H
#define TAGCOLL_INPUT_MEMORY_H

/** \file
 * Parser input using a buffer as input
 */

/*
 * Copyright (C) 2003-2006  Enrico Zini <enrico@debian.org>
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

#include <tagcoll/input/base.h>
#include <string>

namespace tagcoll {
namespace input {

/**
 * Parser input using a std::string as input
 */
class Memory : public Input
{
protected:
	const std::string fname;
	const char* buf;
	int pos;
	int len;
	int _line;
	
public:
	Memory(const std::string& fname, const char* buf, int len) throw ();
	Memory(const char* buf, int len) throw ();
	virtual ~Memory() throw () {}
	
	virtual const std::string& fileName() const throw () { return fname; }
	virtual int lineNumber() const throw () { return _line; }

	virtual int nextChar() throw ();
	virtual void pushChar(int c) throw ();
};

}
}

// vim:set ts=4 sw=4:
#endif
