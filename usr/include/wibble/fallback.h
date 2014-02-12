/** -*- C++ -*-
    @file wibble/fallback.h
    @author Peter Rockai <me@mornfall.net>
*/

#include <wibble/exception.h>

#ifndef WIBBLE_FALLBACK_H
#define WIBBLE_FALLBACK_H

namespace wibble {

struct Error {};

template< typename T >
struct Fallback {
    const T *value;
    Fallback( const T &v ) : value( &v ) {}
    Fallback( Error = Error() ) : value( 0 ) {}

    template< typename E > const T &get( const E &e ) {
        if ( !value ) throw e;
        return *value;
    }

    const T &get() {
        if ( !value ) throw exception::Consistency( "tried to use undefined fallback value" );
        return *value;
    }
};

}

#endif
