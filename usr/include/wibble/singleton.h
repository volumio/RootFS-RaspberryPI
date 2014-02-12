// -*- C++ -*-
#ifndef WIBBLE_SINGLETON_H
#define WIBBLE_SINGLETON_H

/*
 * Degenerated container to hold a single value
 *
 * Copyright (C) 2006  Enrico Zini <enrico@debian.org>
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

#include <cstddef>
#include <iterator>

namespace wibble {

template<typename T>
class Singleton
{
protected:
	T value;

public:
	typedef T value_type;

	class const_iterator : public std::iterator<std::forward_iterator_tag, const T, void, const T*, const T&>
	{
		const T* value;

	protected:
		const_iterator(const T* value) : value(value) {}

	public:
		const_iterator() : value(0) {}

		const T& operator*() const { return *value; }
		const T* operator->() const { return value; }
		const_iterator& operator++() { value = 0; return *this; }
		bool operator==(const const_iterator& iter) const { return value == iter.value; }
		bool operator!=(const const_iterator& iter) const { return value != iter.value; }

		friend class Singleton<T>;
	};

	class iterator : public std::iterator<std::forward_iterator_tag, T, void, T*, T&>
	{
		T* value;

	protected:
		iterator(T* value) : value(value) {}

	public:
		iterator() : value(0) {}

		T& operator*() { return *value; }
		T* operator->() { return value; }
		iterator& operator++() { value = 0; return *this; }
		bool operator==(const iterator& iter) const { return value == iter.value; }
		bool operator!=(const iterator& iter) const { return value != iter.value; }

		friend class Singleton<T>;
	};

	explicit Singleton(const T& value) : value(value) {}

	bool empty() const { return false; }
	size_t size() const { return 1; }

	iterator begin() { return iterator(&value); }
	iterator end() { return iterator(); }
	const_iterator begin() const { return const_iterator(&value); }
	const_iterator end() const { return const_iterator(); }
};

template<typename T>
Singleton<T> singleton(const T& value)
{
	return Singleton<T>(value);
}

}

// vim:set ts=4 sw=4:
#endif
