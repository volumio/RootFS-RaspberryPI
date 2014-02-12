// -*- C++ -*- (c) 2007 Peter Rockai <me@mornfall.net>

#ifndef WIBBLE_MIXIN_H
#define WIBBLE_MIXIN_H

#include <cstddef>
#include <bits/stl_iterator_base_types.h>

namespace wibble {
namespace mixin {

template< typename Self >
struct Comparable {

    const Self &cmpSelf() const {
        return *static_cast< const Self * >( this );
    }

    bool operator!=( const Self &o ) const {
        return not( cmpSelf() == o );
    }

    bool operator==( const Self &o ) const {
        return cmpSelf() <= o && o <= cmpSelf();
    }

    bool operator<( const Self &o ) const {
        return cmpSelf() <= o && cmpSelf() != o;
    }

    bool operator>( const Self &o ) const {
        return o <= cmpSelf() && cmpSelf() != o;
    }

    bool operator>=( const Self &o ) const {
        return o <= cmpSelf();
    }

    // you implement this one in your class
    // bool operator<=( const Self &o ) const { return this <= &o; }
};

/**
 * Mixin with output iterator paperwork.
 *
 * To make an output iterator, one just needs to inherit from this
 * template and implement Self& operator=(const WhaToAccept&)
 */
template< typename Self >
struct OutputIterator :
        public std::iterator<std::output_iterator_tag, void, void, void, void>
{
    Self& operator++() {
        return *static_cast<Self*>(this);
    }

    Self operator++(int)
    {
   	Self res = *static_cast<Self*>(this);
	++*this;
	return res;
    }

    Self& operator*() {
        return *static_cast<Self*>(this);
    }
};

}
}

#endif
