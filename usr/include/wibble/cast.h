// -*- C++ -*-
#include <wibble/exception.h>
#ifndef WIBBLE_CAST_H
#define WIBBLE_CAST_H

namespace wibble {

template <typename T, typename X> T &downcast(X *v) {
    if (!v)
        throw exception::BadCastExt< X, T >( "downcast on null pointer" );
    T *x = dynamic_cast<T *>(v);
    if (!x)
        throw exception::BadCastExt< X, T >( "dynamic downcast failed" );
    return *x;
}

template< typename T >
typename T::WrappedType &unwrap( const T &x ) {
    return x.unwrap();
}

template< typename T >
T &unwrap( T &x ) { return x; }

template< typename _T, typename In > struct IsType {
    typedef _T T;
};

}

#endif
