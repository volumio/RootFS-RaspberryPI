/* -*- C++ -*-
 * Generic base exception hierarchy
 * 
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
#include <wibble/exception.h>

#include <sstream>
#include <iostream>

namespace wibble {
namespace exception {

template<typename C>
std::string ValOutOfRange<C>::desc() const throw ()
{
	std::stringstream str;
	str << m_var_desc << "(" << m_val << ") out of range (" <<
			m_inf << "-" << m_sup << ")";
	return str.str();
}

}
}

// vim:set ts=4 sw=4:
