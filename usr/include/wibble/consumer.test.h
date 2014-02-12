// -*- C++ -*- (c) 2006 Petr Rockai <me@mornfall.net>

#include <wibble/consumer.h>
#include <wibble/operators.h>
#include <list>

namespace {

using namespace wibble::operators;
using namespace wibble;

struct TestConsumer {
    Test stlInserterConsumer() {
        std::list<int> a;
        a.push_back( 10 );
        a.push_back( 20 );
        Range< int > r = range( a.begin(), a.end() );
        std::list<int> b;
        assert( a != b );
        Consumer< int > c = consumer( back_inserter( b ) );
        std::copy( r.begin(), r.end(), c );
        assert( a == b );
    }

    Test stlSetConsumer() {
        std::set< int > s;
        Consumer< int > c = consumer( s );
        c.consume( 1 );
        assert( *s.begin() == 1 );
        assert( s.begin() + 1 == s.end() );
    }

    Test stlVectorConsumer() {
        std::vector< int > v;
        Consumer< int > c = consumer( v );
        c.consume( 2 );
        c.consume( 1 );
        assert( *v.begin() == 2 );
        assert( *(v.begin() + 1) == 1 );
        assert( (v.begin() + 2) == v.end() );
    }

};

}
