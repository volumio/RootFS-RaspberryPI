#ifndef WIBBLE_SYS_NETBUFFER_H
#define WIBBLE_SYS_NETBUFFER_H

/*
 * Variable-size, reference-counted memory buffer used to access network
 * packets
 *
 * Copyright (C) 2003--2006 Enrico Zini <enrico@debian.org>
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

#include <wibble/sys/buffer.h>
#include <wibble/exception.h>

namespace wibble {
namespace sys {

/**
 * Buffer whose starting can be moved back and forth, useful to decapsulate
 * stacked network packets
 */
class NetBuffer : public Buffer
{
public:
	/**
	 * Offset in bytes of the NetBuffer start, from the beginning of the memory
	 * area we manage
	 */
	size_t cursor;
	
public:
	NetBuffer() throw () : Buffer(), cursor(0) {}
	NetBuffer(size_t size) : Buffer(size), cursor(0) {}
	NetBuffer(void* buf, size_t size, bool own = true)
		: Buffer(buf, size, own), cursor(0) {}
	NetBuffer(const void* buf, size_t size)
		: Buffer(buf, size), cursor(0) {}

	NetBuffer(const Buffer& buf) throw () : Buffer(buf), cursor(0) {}
	NetBuffer(const NetBuffer& buf) throw ()
		: Buffer(buf), cursor(buf.cursor) {}

	NetBuffer& operator=(const Buffer& buf)
	{
		Buffer::operator=(buf);
		cursor = 0;
		return *this;
	}

	NetBuffer& operator=(const NetBuffer& buf)
	{
		Buffer::operator=(buf);
		cursor = buf.cursor;
		return *this;
	}

	/// Return a pointer to the buffer
	const void* data(size_t ofs = 0) const throw () { return static_cast<const char*>(Buffer::data()) + cursor + ofs; }

	/// Return a pointer to the buffer
	void* data(size_t ofs = 0) throw () { return static_cast<char*>(Buffer::data()) + cursor + ofs; }

	/// Return the buffer size
	size_t size() const throw () { return Buffer::size() - cursor; }

	/**
	 * Check if the buffer is long enough to contain a structure T at the given
	 * offset
	 */
	template<class T>
	bool fits(size_t ofs = 0) const throw ()
	{
		return cursor + ofs + sizeof(T) < size();
	}
	
	/**
	 * Access the buffer contents as a structure T at the given offset
	 */
	template<class T>
	const T* cast(size_t ofs = 0) const throw (wibble::exception::Consistency)
	{
		if (cursor + ofs + sizeof(T) >= size())
			throw wibble::exception::Consistency("reading from buffer", "tried to read past the end of the buffer");
		return (const T*)data(ofs);
	}

	/**
	 * Return another NetBuffer starting ofs bytes from the beginning of this one
	 */
	NetBuffer operator+(size_t ofs) throw (wibble::exception::Consistency)
	{
		return after(ofs);
	}
	
	/**
	 * Return another NetBuffer starting ofs bytes from the beginning of this one
	 */
	const NetBuffer after(size_t ofs) const throw (wibble::exception::Consistency)
	{
		NetBuffer res(*this);
		res.skip(ofs);
		return res;
	}
	
	/**
	 * Return another NetBuffer starting just after sizeof(T) from the
	 * beginning of this one
	 */
	template<class T>
	const NetBuffer after() const throw (wibble::exception::Consistency)
	{
		NetBuffer res(*this);
		res.skip(sizeof(T));
		return res;
	}

	/**
	 * Move the starting point of this buffer ofs bytes from the beginning
	 */
	NetBuffer& operator+=(size_t ofs) throw (wibble::exception::Consistency)
	{
		skip(ofs);
		return *this;
	}
	
	/**
	 * Move the starting point of this buffer sizeof(T) bytes from the
	 * beginning
	 */
	template<class T>
	void skip() throw (wibble::exception::Consistency)
	{
		skip(sizeof(T));
	}

	/**
	 * Move the starting point of this buffer ofs bytes from the beginning
	 */
	void skip(size_t t) throw (wibble::exception::Consistency)
	{
		if (cursor + t >= size())
			throw wibble::exception::Consistency("reading from buffer", "tried to skip past the end of the buffer");
		cursor += t;
	}
};

}
}

// vim:set ts=4 sw=4:
#endif
