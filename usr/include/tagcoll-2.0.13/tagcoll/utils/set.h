#ifndef TAGCOLL_UTILS_SET_H
#define TAGCOLL_UTILS_SET_H

/** \file
 * Extra useful set operations
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

#include <wibble/operators.h>
#include <set>

namespace tagcoll {
namespace utils {

template<typename T>
int set_distance(const std::set<T>& set1, const std::set<T>& set2)
{
	int res = 0;
	int intCount = 0;

	typename std::set<T>::const_iterator a = set1.begin();
	typename std::set<T>::const_iterator b = set2.begin();

	while (a != set1.end() || b != set2.end())
		if ((b == set2.end()) || (a != set1.end() && *a < *b))
		{
			res++;
			a++;
		}
		else if ((a == set1.end()) || (b != set2.end() && *b < *a))
		{
			res++;
			b++;
		}
		else
		{
			a++;
			b++;
			intCount++;
		}
	
	return intCount ? res : -1;
}

template<typename T>
bool set_contains(const std::set<T>& set1, const std::set<T>& set2)
{
	typename std::set<T>::const_iterator b = set2.begin();

	for (typename std::set<T>::const_iterator a = set1.begin(); a != set1.end(); ++a)
		if (b == set2.end())
			return true;
		else if (*a == *b)
			b++;
		else if (*b < *a)
			return false;

	return b == set2.end();
}

template<typename T>
bool set_contains(const std::set<T>& set1, const T& item)
{
	return set1.find(item) != set1.end();
}

}
}

// vim:set ts=4 sw=4:
#endif
