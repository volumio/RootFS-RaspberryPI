// -*- C++ -*-
#ifndef WIBBLE_EMPTY_H
#define WIBBLE_EMPTY_H

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
class Empty
{
public:
	typedef T value_type;

	class const_iterator : public std::iterator<std::forward_iterator_tag, const T, void, const T*, const T&>
	{
	public:
		const T& operator*() const { return *(T*)0; }
		const T* operator->() const { return 0; }
		const_iterator& operator++() { return *this; }
		bool operator==(const const_iterator&) const { return true; }
		bool operator!=(const const_iterator&) const { return false; }
	};

	class iterator : public std::iterator<std::forward_iterator_tag, T, void, T*, T&>
	{
	public:
		T& operator*() const { return *(T*)0; }
		T* operator->() const { return 0; }
		iterator& operator++() { return *this; }
		bool operator==(const iterator&) const { return true; }
		bool operator!=(const iterator&) const { return false; }
	};

	bool empty() const { return true; }
	size_t size() const { return 0; }

	iterator begin() { return iterator(); }
	iterator end() { return iterator(); }
	const_iterator begin() const { return const_iterator(); }
	const_iterator end() const { return const_iterator(); }
};

}

// vim:set ts=4 sw=4:
#endif
