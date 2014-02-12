// -*- C++ -*-

#include <wibble/string.h>
#include <iostream>
#include <cstdlib>

#ifndef WIBBLE_TEST_H
#define WIBBLE_TEST_H

// TODO use TLS
extern int assertFailure;

struct Location {
    const char *file;
    int line, iteration;
    const char *stmt;
    Location( const char *f, int l, const char *st, int iter = -1 )
        : file( f ), line( l ), iteration( iter ), stmt( st ) {}
};

#define LOCATION(stmt) Location( __FILE__, __LINE__, stmt )

#ifndef NDEBUG
#define LOCATION_I(stmt, i) Location( __FILE__, __LINE__, stmt, i )
#define assert(x) assert_fn( LOCATION( #x ), x )
#define assert_pred(p, x) assert_pred_fn( \
        LOCATION( #p "( " #x " )" ), x, p( x ) )
#define assert_eq(x, y) assert_eq_fn( LOCATION( #x " == " #y ), x, y )
#define assert_leq(x, y) assert_leq_fn( LOCATION( #x " <= " #y ), x, y )
#define assert_eq_l(i, x, y) assert_eq_fn( LOCATION_I( #x " == " #y, i ), x, y )
#define assert_neq(x, y) assert_neq_fn( LOCATION( #x " != " #y ), x, y )
#define assert_list_eq(x, y) \
    assert_list_eq_fn( LOCATION( #x " == " #y ), \
                       sizeof( y ) / sizeof( y[0] ), x, y )
#else
#define assert(x) ((void)0)
#define assert_pred(p, x) ((void)0)
#define assert_eq(x, y) ((void)0)
#define assert_leq(x, y) ((void)0)
#define assert_eq_l(i, x, y) ((void)0)
#define assert_neq(x, y) ((void)0)
#define assert_list_eq(x, y) ((void)0)
#endif

#define assert_die() assert_die_fn( LOCATION( "forbidden code path tripped" ) )

struct AssertFailed {
    std::ostream &stream;
    std::ostringstream str;
    bool expect;
    AssertFailed( Location l, std::ostream &s = std::cerr )
        : stream( s )
    {
        expect = assertFailure > 0;
        str << l.file << ": " << l.line;
        if ( l.iteration != -1 )
            str << " (iteration " << l.iteration << ")";
        str << ": assertion `" << l.stmt << "' failed;";
    }

    ~AssertFailed() {
        if ( expect )
            ++assertFailure;
        else {
            stream << str.str() << std::endl;
            abort();
        }
    }
};

template< typename X >
inline AssertFailed &operator<<( AssertFailed &f, X x )
{
    f.str << x;
    return f;
}

template< typename X >
void assert_fn( Location l, X x )
{
    if ( !x ) {
        AssertFailed f( l );
    }
}

void assert_die_fn( Location l ) __attribute__((noreturn));

template< typename X, typename Y >
void assert_eq_fn( Location l, X x, Y y )
{
    if ( !( x == y ) ) {
        AssertFailed f( l );
        f << " got ["
          << x << "] != [" << y
          << "] instead";
    }
}

template< typename X, typename Y >
void assert_leq_fn( Location l, X x, Y y )
{
    if ( !( x <= y ) ) {
        AssertFailed f( l );
        f << " got ["
          << x << "] > [" << y
          << "] instead";
    }
}

template< typename X >
void assert_pred_fn( Location l, X x, bool p )
{
    if ( !p ) {
        AssertFailed f( l );
        f << " for " << x;
    }
}

template< typename X >
void assert_list_eq_fn(
    Location loc, int c, X l, const typename X::Type check[] )
{
    int i = 0;
    while ( !l.empty() ) {
        if ( l.head() != check[ i ] ) {
            AssertFailed f( loc );
            f << " list disagrees at position "
              << i << ": [" << wibble::str::fmt( l.head() )
              << "] != [" << wibble::str::fmt( check[ i ] )
              << "]";
        }
        l = l.tail();
        ++ i;
    }
    if ( i != c ) {
        AssertFailed f( loc );
        f << " got ["
          << i << "] != [" << c << "] instead";
    }
}

template< typename X, typename Y >
void assert_neq_fn( Location l, X x, Y y )
{
    if ( x != y )
        return;
    AssertFailed f( l );
    f << " got ["
      << x << "] == [" << y << "] instead";
}

inline void beginAssertFailure() {
    assertFailure = 1;
}

inline void endAssertFailure() {
    int f = assertFailure;
    assertFailure = 0;
    assert( f > 1 );
}

struct ExpectFailure {
    ExpectFailure() { beginAssertFailure(); }
    ~ExpectFailure() { endAssertFailure(); }
};

typedef void Test;

#endif
