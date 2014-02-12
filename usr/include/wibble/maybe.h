// -*- C++ -*-
#ifndef WIBBLE_MAYBE_H
#define WIBBLE_MAYBE_H

namespace wibble {

/*
  A Maybe type. Values of type Maybe< T > can be either Just T or
  Nothing.

  Maybe< int > foo;
  foo = Maybe::Nothing();
  // or
  foo = Maybe::Just( 5 );
  if ( !foo.nothing() ) {
    int real = foo;
  } else {
    // we haven't got anythig in foo
  }

  Maybe takes a default value, which is normally T(). That is what you
  get if you try to use Nothing as T.
*/

template <typename T>
struct Maybe : mixin::Comparable< Maybe< T > > {
    bool nothing() const { return m_nothing; }
    T &value() { return m_value; }
    const T &value() const { return m_value; }
    Maybe( bool n, const T &v ) : m_nothing( n ), m_value( v ) {}
    Maybe( const T &df = T() )
       : m_nothing( true ), m_value( df ) {}
    static Maybe Just( const T &t ) { return Maybe( false, t ); }
    static Maybe Nothing( const T &df = T() ) {
        return Maybe( true, df ); }
    operator T() const { return value(); }

    bool operator <=( const Maybe< T > &o ) const {
        if (o.nothing())
            return true;
        if (nothing())
            return false;
        return value() <= o.value();
    }
protected:
    bool m_nothing:1;
    T m_value;
};

template<>
struct Maybe< void > {
    Maybe() {}
    static Maybe Just() { return Maybe(); }
    static Maybe Nothing() { return Maybe(); }
};

}

#endif
