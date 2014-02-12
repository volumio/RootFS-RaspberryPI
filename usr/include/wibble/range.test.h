// -*- C++ -*- (c) 2005, 2006, 2007 Petr Rockai <me@mornfall.net>

#include <wibble/range.h>
#include <wibble/operators.h>
#include <list>
#include <functional>

namespace {

using namespace wibble;
using namespace operators;

struct TestRange {

    Test iteratorRange() {
        std::list<int> a;
        a.push_back( 10 );
        a.push_back( 20 );
        Range< int > r = range( a.begin(), a.end() );
        Range< int >::iterator i = r.begin();
        assert_eq( *i, 10 );
        assert_eq( *(i + 1), 20 );
        assert( i + 2 == r.end() );
    }

    Test copy() {
        std::list<int> a;
        a.push_back( 10 );
        a.push_back( 20 );
        Range< int > r = range( a.begin(), a.end() );
        std::list<int> b;
        assert( a != b );
        std::copy( r.begin(), r.end(), back_inserter( b ) );
        assert( a == b );
    }

    Test copyToConsumer() {
        // std::vector< int > &vec = *new (GC) std::vector< int >;
        std::vector< int > vec;
        std::list< int > a;
        a.push_back( 10 );
        a.push_back( 20 );
        Range< int > r = range( a.begin(), a.end() );
        std::copy( r.begin(), r.end(), consumer( vec ) );
        Range< int > r1 = range( vec );
        assert_eq( *r1.begin(), 10 );
        assert_eq( *(r1.begin() + 1), 20 );
        assert( r1.begin() + 2 == r1.end() );
        while ( !r.empty() ) {
            assert_eq( r.head(), r1.head() );
            r = r.tail();
            r1 = r1.tail();
        }
        assert( r1.empty() );
    }

    Test _filteredRange() {
        std::vector< int > v;
        std::list<int> a;
        a.push_back( 10 );
        a.push_back( 20 );
        Range< int > r = range( a.begin(), a.end() );
        r.output( consumer( v ) );
        
        Range<int> fr =
            filteredRange( range( v ),
                           std::bind1st( std::equal_to< int >(), 10 ) );
        assert_eq( fr.head(), 10 );
        fr = fr.tail();
        assert( fr.empty() );
    }

    Test sort() {
        std::vector< int > v;
        std::list<int> a;
        a.push_back( 20 );
        a.push_back( 10 );
        a.push_back( 30 );
        Range< int > r = range( a.begin(), a.end() );
        r.output( consumer( v ) );
        std::sort( v.begin(), v.end() );
        assert_eq( *(v.begin()), 10 );
        assert_eq( *(v.begin() + 1), 20 );
        assert_eq( *(v.begin() + 2), 30 );
        assert( v.begin() + 3 == v.end() );
    }

    Test assignment() {
        std::vector< int > vec;
        Range< int > a;
        a = range( vec );
        assert( a.empty() );
        vec.push_back( 4 );
        Range< int > b = range( vec );
        assert_eq( b.head(), 4 );
        a = b;
        assert( !a.empty() );
        assert_eq( a.head(), 4 );
    }
    
    Test _transformedRange() {
        Range< int > a;
        std::vector< int > xv;
        Consumer< int > x = consumer( xv );
        x.consume( 4 );
        x.consume( 8 );
        a = transformedRange( range( xv ),
                              std::bind1st( std::plus< int >(), 2 ) );
        assert_eq( a.head(), 6 );
        a.removeFirst();
        assert_eq( a.head(), 10 );
        a.removeFirst();
        assert( a.empty() );
    }

    Test _transformedRange2() {
        Range< int > a;
        std::vector< unsigned > xv;
        Consumer< unsigned > x = consumer( xv );
        x.consume( 4 );
        x.consume( 8 );
        a = transformedRange(
            range( xv ), std::bind1st( std::plus< int >(), 2 ) );
        assert_eq( a.head(), 6 );
        a.removeFirst();
        assert_eq( a.head(), 10 );
        a.removeFirst();
        assert( a.empty() );
    }

    Test tailOfIteratorRange() {
        std::vector<int> a;
        a.insert( a.begin(), 30 );
        a.insert( a.begin(), 10 );
        a.insert( a.begin(), 20 );
        Range< int > r = range( a.begin(), a.end() );
        assert_eq( r.head(), 20 );
        r = r.tail();
        assert_eq( r.head(), 10 );
        r = r.tail();
        assert_eq( r.head(), 30 );
        r = r.tail();
        assert( r.empty() );
    }

    Test _castedRange()
    {
        std::vector<int> a;
        a.insert( a.begin(), 30 );
        a.insert( a.begin(), 10 );
        a.insert( a.begin(), 20 );
        Range< unsigned > r = castedRange< unsigned >(
            range( a.begin(), a.end() ) );
        assert_eq( r.head(), 20u );
        r = r.tail();
        assert_eq( r.head(), 10u );
        r = r.tail();
        assert_eq( r.head(), 30u );
        r = r.tail();
        assert( r.empty() );
    }

    static void removeFirst( int &i ) {
        ++i;
    }

    static bool isEnd( const int &i ) {
        return i >= 5;
    }

    Test _generatedRange() {
        Range< int > r = generatedRange( 0, removeFirst, isEnd );
        assert( !r.empty() );
        assert_eq( *(r.begin() + 0), 0 );
        assert_eq( *(r.begin() + 1), 1 );
        assert_eq( *(r.begin() + 2), 2 );
        assert_eq( *(r.begin() + 3), 3 );
        assert_eq( *(r.begin() + 4), 4 );
        assert( (r.begin() + 5) == r.end() );
    }

};

}
