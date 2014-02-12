#ifndef WIBBLE_SYS_BUFFER_H
#define WIBBLE_SYS_BUFFER_H

/*
 * Variable-size, reference-counted memory buffer
 *
 * Copyright (C) 2003--2006  Enrico Zini <enrico@debian.org>
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

#include <stddef.h> // for size_t

namespace wibble {
namespace sys {

/**
 * Variable-size, reference-counted memory buffer.
 */
class Buffer
{
public:
	class Data
	{
	protected:
		mutable int _ref;
		size_t _size;
		void* _data;

	public:
		Data() throw () : _ref(0), _size(0), _data(0) {}
		Data(size_t size);
		// if own == true, take possession of the memory buffer, else copy it
		Data(void* buf, size_t size, bool own = true);
		Data(const void* buf, size_t size);
		~Data();

		/// Increment the reference count for this object
		void ref() const throw () { ++_ref; }

		/// Decrement the reference count for this object, returning true when it
		/// reaches 0
		bool unref() const throw () { return --_ref == 0; }

		/// Resize (enlarging or shrinking it) the buffer to `size' bytes
		void resize(size_t size);

		/// Compare the contents of two buffers
		bool operator==(const Data& d) const throw();

		/// Compare the contents of two buffers
		bool operator<(const Data& d) const throw();

		friend class Buffer;
	};

	Data* item;
	
public:
	/// Create a 0-lenght buffer
	Buffer() throw () : item(0) {}

	/// Create a buffer with the specified size
	Buffer(size_t size) : item(0)
	{
		if (size)
		{
			item = new Data(size);
			item->ref();
		}
	}

	/**
	 * Create a buffer from existing data
	 *
	 * @param buf
	 *   The data to put in this buffer
	 * @param size
	 *   The dimension of buf
	 * @param own
	 *   If true, take ownership of buf, else make a copy of it.
	 */
	Buffer(void* buf, size_t size, bool own = true) : item(0)
	{
		if (size)
		{
			item = new Data(buf, size, own);
			item->ref();
		}
	}

	/**
	 * Create a buffer with a copy of the given data
	 *
	 * It will always make a copy of the contents of buf.
	 */
	Buffer(const void* buf, size_t size) : item(0)
	{
		if (size)
		{
			item = new Data(buf, size);
			item->ref();
		}
	}

	Buffer(const Buffer& buf) throw ()
	{
		if (buf.item)
			buf.item->ref();
		item = buf.item;
	}
	~Buffer()
	{
		if (item && item->unref())
			delete item;
	}
	Buffer& operator=(const Buffer& buf)
	{
		if (buf.item)
			buf.item->ref();  // Do it early to correctly handle the case of x = x;
		if (item && item->unref())
			delete item;
		item = buf.item;
		return *this;
	}

	/// Return a pointer to the buffer
	void* data() throw () { return item ? item->_data : 0; }

	/// Return a pointer to the buffer
	const void* data() const throw () { return item ? item->_data : 0; }

	/// Return the buffer size
	size_t size() const throw () { return item ? item->_size : 0; }

	/// Resize the buffer to hold exactly the specified amount of bytes
	void resize(size_t newSize)
	{
		if (size() == newSize)
			return;
		if (!newSize)
		{
			if (item && item->unref())
				delete item;
			item = 0;
		} else if (item) {
			item->resize(newSize);
		} else {
			item = new Data(newSize);
			item->ref();
		}
	}

	/// Compare the contents of two buffers
	bool operator==(const Buffer& buf) const throw ()
	{
		if (item == 0 && buf.item == 0)
			return true;
		if (item == 0 || buf.item == 0)
			return false;
		return *item == *buf.item;
	}

	bool operator!=(const Buffer& buf) const throw ()
	{
		return !operator==(buf);
	}

	/// Compare the contents of two buffers
	bool operator<(const Buffer& buf) const throw ()
	{
		if (item == 0 && buf.item == 0)
			return false;
		if (item == 0)
			return true;
		if (buf.item == 0)
			return false;
		return *item < *buf.item;
	}
};

}
}

// vim:set ts=4 sw=4:
#endif
