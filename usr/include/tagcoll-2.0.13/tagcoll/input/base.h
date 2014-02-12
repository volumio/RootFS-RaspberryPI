#ifndef TAGCOLL_INPUT_BASE_H
#define TAGCOLL_INPUT_BASE_H

/** \file
 * Base class for parsers
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

#include <string>
#include <wibble/exception.h>

namespace tagcoll {

namespace input {
class Input;
}

namespace exception {

/**
 * Base exception for parser errors
 */
class Input : public wibble::exception::Consistency
{
protected:
	std::string _file;
	int _line;

	std::string makeContext(const std::string& file, int line);
	
public:
	Input(const tagcoll::input::Input& input, const std::string& message) throw ();
	Input(const std::string& file, int line, const std::string& message) throw ()
		: wibble::exception::Consistency(makeContext(file, line), message),
		 _file(file), _line(line) {}
	Input(int line, const std::string& message) throw ()
		: wibble::exception::Consistency(makeContext(std::string(), line), message),
		 _line(line) {}
	Input(const std::string& message) throw ()
		: wibble::exception::Consistency(makeContext(std::string(), -1), message),
		 _line(-1) {}
	virtual ~Input() throw () {}

	int line() const throw () { return _line; }
	int line(int line) throw () { return _line = line; }

	const std::string& file() const throw () { return _file; }
	std::string file() throw () { return _file; }
	std::string file(const std::string file) throw () { return _file = file; }

	virtual const char* type() const throw () { return "Input"; }
};

/**
 * Exception thrown in case of problems accessing the input of the parser
 */
class Parser : public Input
{
public:
	Parser(const tagcoll::input::Input& input, const std::string& message) throw ()
		: Input(input, message) {}
	virtual ~Parser() throw () {}

	virtual const char* type() const throw ()
	{
		return "Parser";
	}
};

}

namespace input {

/**
 * Generic interface for parser input readers.
 *
 * It encapsulates and hides the reading machinery.  It can be implemented as a
 * file read, a stream read, a decompressing file read, a network read or
 * whatever else is needed.
 */
class Input
{
public:
	static const int Eof = -1;

	Input() {}
	virtual ~Input() {}

	virtual const std::string& fileName() const = 0;
	virtual int lineNumber() const = 0;
	virtual int nextChar()  = 0;
	virtual void pushChar(int c)  = 0;
};

}

}

// vim:set ts=4 sw=4:
#endif
