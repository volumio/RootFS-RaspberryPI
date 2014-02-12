#ifndef TAGCOLL_INPUT_STDIO_H
#define TAGCOLL_INPUT_STDIO_H

/** \file
 * Parser input using libc standard I/O functions
 */

/*
 * Copyright (C) 2003-2006 Enrico Zini <enrico@debian.org>
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

#include <wibble/exception.h>
#include <tagcoll/input/base.h>
#include <stdio.h>

#include <string>

namespace tagcoll {
namespace input {

/**
 * Parser input using libc standard I/O functions
 */
class Stdio : public Input
{
protected:
	std::string _file;
	int _line;
	FILE* _in;
	bool _close_on_exit;
	
public:
	Stdio(FILE* in, const std::string& fname, int line = 1);
	explicit Stdio(const std::string& fname);
	virtual ~Stdio();
	
	virtual const std::string& fileName() const throw () { return _file; }
	virtual int lineNumber() const throw () { return _line; }

	virtual int nextChar();
	virtual void pushChar(int c);
};

}
}

// vim:set ts=4 sw=4:
#endif
