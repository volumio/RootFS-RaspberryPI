// -*- C++ -*-
#ifndef WIBBLE_STRING_H
#define WIBBLE_STRING_H

/*
 * Various string functions
 *
 * Copyright (C) 2007,2008  Enrico Zini <enrico@debian.org>
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
#include <wibble/sfinae.h>

#include <cstdarg>
#include <cstdio>
#include <string>
#include <set>
#include <vector>
#include <sstream>
#include <cctype>
#ifdef _WIN32
#include <cstring>
#include <cstdlib>
#endif

namespace wibble {
namespace str {

using namespace wibble::operators;

#ifdef _WIN32
static int vasprintf (char **, const char *, va_list);
#endif

std::string fmt( const char* f, ... ) __attribute__ ((deprecated));
std::string fmtf( const char* f, ... );
template< typename T > inline std::string fmt(const T& val);

// Formatting lists -- actually, we need to move list handling into wibble,
// really.
template< typename X >
inline typename TPair< std::ostream, typename X::Type >::First &operator<<(
    std::ostream &o, X list )
{
    if ( list.empty() )
        return o << "[]";

    o << "[ ";
    while( !list.empty() ) {
        o << fmt( list.head() );
        if ( !list.tail().empty() )
            o << ", ";
        list = list.tail();
    }
    return o << " ]";
}

/// Format any value into a string using a std::stringstream
template< typename T >
inline std::string fmt(const T& val)
{
    std::stringstream str;
    str << val;
    return str.str();
}

template<> inline std::string fmt<std::string>(const std::string& val) {
    return val;
}
template<> inline std::string fmt<char*>(char * const & val) { return val; }

template< typename C >
inline std::string fmt_container( const C &c, char f, char l )
{
    std::string s;
    s += f;
    if ( c.empty() )
        return s + l;

    s += ' ';
    for ( typename C::const_iterator i = c.begin(); i != c.end(); ++i ) {
        s += fmt( *i );
        if ( i != c.end() && i + 1 != c.end() )
            s += ", ";
    }
    s += ' ';
    s += l;
    return s;
}

// formatting sets using { ... } notation
template< typename X >
inline std::string fmt(const std::set< X >& val) {
    return fmt_container( val, '{', '}' );
}

// formatting vectors using [ ... ] notation
template< typename X >
inline std::string fmt(const std::vector< X > &val) {
    return fmt_container( val, '[', ']' );
}

/// Given a pathname, return the file name without its path
inline std::string basename(const std::string& pathname)
{
	size_t pos = pathname.rfind("/");
	if (pos == std::string::npos)
		return pathname;
	else
		return pathname.substr(pos+1);
}

/// Given a pathname, return the directory name without the file name
inline std::string dirname(const std::string& pathname)
{
	size_t pos = pathname.rfind("/");
	if (pos == std::string::npos)
		return std::string();
	else if (pos == 0)
		// Handle the case of '/foo'
		return std::string("/");
	else
		return pathname.substr(0, pos);
}

/**
 * Normalise a pathname.
 *
 * For example, A//B, A/./B and A/foo/../B all become A/B.
 */
std::string normpath(const std::string& pathname);

/// Check if a string starts with the given substring
inline bool startsWith(const std::string& str, const std::string& part)
{
	if (str.size() < part.size())
		return false;
	return str.substr(0, part.size()) == part;
}

/// Check if a string ends with the given substring
inline bool endsWith(const std::string& str, const std::string& part)
{
	if (str.size() < part.size())
		return false;
	return str.substr(str.size() - part.size()) == part;
}

inline std::string replace(const std::string& str, char from, char to)
{
	std::string res;
	res.reserve(str.size());
	for (std::string::const_iterator i = str.begin(); i != str.end(); ++i)
		if (*i == from)
			res.append(1, to);
		else
			res.append(1, *i);
	return res;
}

#if !__xlC__ && (! __GNUC__ || __GNUC__ >= 4)
/**
 * Return the substring of 'str' without all leading and trailing characters
 * for which 'classifier' returns true.
 */
template<typename FUN>
inline std::string trim(const std::string& str, const FUN& classifier)
{
	if (str.empty())
		return str;

	size_t beg = 0;
	size_t end = str.size() - 1;
	while (beg < end && classifier(str[beg]))
		++beg;
	while (end >= beg && classifier(str[end]))
		--end;

	return str.substr(beg, end-beg+1);
}

/**
 * Return the substring of 'str' without all leading and trailing spaces.
 */
inline std::string trim(const std::string& str)
{
    return trim(str, ::isspace);
}
#else
/// Workaround version for older gcc
inline std::string trim(const std::string& str)
{
	if (str.empty())
		return str;

	size_t beg = 0;
	size_t end = str.size() - 1;
	while (beg < end && ::isspace(str[beg]))
		++beg;
	while (end >= beg && ::isspace(str[end]))
		--end;

	return str.substr(beg, end-beg+1);
}
#endif

/// Convert a string to uppercase
inline std::string toupper(const std::string& str)
{
	std::string res;
	res.reserve(str.size());
	for (std::string::const_iterator i = str.begin(); i != str.end(); ++i)
		res += ::toupper(*i);
	return res;
}

/// Convert a string to lowercase
inline std::string tolower(const std::string& str)
{
	std::string res;
	res.reserve(str.size());
	for (std::string::const_iterator i = str.begin(); i != str.end(); ++i)
		res += ::tolower(*i);
	return res;
}

/// Return the same string, with the first character uppercased
inline std::string ucfirst(const std::string& str)
{
	if (str.empty()) return str;
	std::string res;
	res += ::toupper(str[0]);
	return res + tolower(str.substr(1));
}

/// Join two paths, adding slashes when appropriate
inline std::string joinpath(const std::string& path1, const std::string& path2)
{
	if (path1.empty())
		return path2;
	if (path2.empty())
		return path1;

	if (path1[path1.size() - 1] == '/')
		if (path2[0] == '/')
			return path1 + path2.substr(1);
		else
			return path1 + path2;
	else
		if (path2[0] == '/')
			return path1 + path2;
		else
			return path1 + '/' + path2;
}

/// Urlencode a string
std::string urlencode(const std::string& str);

/// Decode an urlencoded string
std::string urldecode(const std::string& str);

/// Encode a string in Base64
std::string encodeBase64(const std::string& str);

/// Decode a string encoded in Base64
std::string decodeBase64(const std::string& str);

/**
 * Split a string where a given substring is found
 *
 * This does a similar work to the split functions of perl, python and ruby.
 *
 * Example code:
 * \code
 *   str::Split splitter("/", myString);
 *   vector<string> split;
 *   std::copy(splitter.begin(), splitter.end(), back_inserter(split));
 * \endcode
 */
class Split
{
	std::string sep;
	std::string str;

public:
	// TODO: add iterator_traits
	class const_iterator
	{
		const std::string& sep;
		const std::string& str;
		std::string cur;
		size_t pos;

	public:
		const_iterator(const std::string& sep, const std::string& str) : sep(sep), str(str), pos(0)
		{
			++*this;
		}
		const_iterator(const std::string& sep, const std::string& str, bool) : sep(sep), str(str), pos(std::string::npos) {}

		const_iterator& operator++()
		{
			if (pos == str.size())
				pos = std::string::npos;
			else
			{
				size_t end;
				if (sep.empty())
					if (pos + 1 == str.size())
						end = std::string::npos;
					else
						end = pos + 1;
				else
					end = str.find(sep, pos);
				if (end == std::string::npos)
				{
					cur = str.substr(pos);
					pos = str.size();
				}
				else
				{
					cur = str.substr(pos, end-pos);
					pos = end + sep.size();
				}
			}
			return *this;
		}

		std::string remainder() const
		{
			if (pos == std::string::npos)
				return std::string();
			else
				return str.substr(pos);
		}

		const std::string& operator*() const
		{
			return cur;
		}
		const std::string* operator->() const
		{
			return &cur;
		}
		bool operator==(const const_iterator& ti) const
		{
			// Comparing iterators on different strings is not supported for
			// performance reasons
			return pos == ti.pos;
		}
		bool operator!=(const const_iterator& ti) const
		{
			// Comparing iterators on different strings is not supported for
			// performance reasons
			return pos != ti.pos;
		}
	};

	/**
	 * Create a splitter that uses the given regular expression to find tokens.
	 */
	Split(const std::string& sep, const std::string& str) : sep(sep), str(str) {}

	/**
	 * Split the string and iterate the resulting tokens
	 */
	const_iterator begin() const { return const_iterator(sep, str); }
	const_iterator end() const { return const_iterator(sep, str, false); }
};

template<typename ITER>
std::string join(const ITER& begin, const ITER& end, const std::string& sep = ", ")
{
	std::stringstream res;
	bool first = true;
	for (ITER i = begin; i != end; ++i)
	{
		if (first)
			first = false;
		else
			res << sep;
		res << *i;
	}
	return res.str();
}

/**
 * Parse a record of Yaml-style field: value couples.
 *
 * Parsing stops either at end of record (one empty line) or at end of file.
 *
 * The value is deindented properly.
 *
 * Example code:
 * \code
 *	utils::YamlStream stream;
 *	map<string, string> record;
 *	std::copy(stream.begin(inputstream), stream.end(), inserter(record));
 * \endcode
 */
class YamlStream
{
public:
	// TODO: add iterator_traits
	class const_iterator
	{
		std::istream* in;
		std::pair<std::string, std::string> value;
		std::string line;

	public:
		const_iterator(std::istream& in);
		const_iterator() : in(0) {}

		const_iterator& operator++();

		const std::pair<std::string, std::string>& operator*() const
		{
			return value;
		}
		const std::pair<std::string, std::string>* operator->() const
		{
			return &value;
		}
		bool operator==(const const_iterator& ti) const
		{
			return in == ti.in;
		}
		bool operator!=(const const_iterator& ti) const
		{
			return in != ti.in;
		}
	};

	const_iterator begin(std::istream& in) { return const_iterator(in); }
	const_iterator end() { return const_iterator(); }
};

}
}

// vim:set ts=4 sw=4:
#endif
