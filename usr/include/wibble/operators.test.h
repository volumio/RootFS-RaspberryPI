/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/test.h>
#include <wibble/operators.h>

namespace {

using namespace std;
using namespace wibble::operators;

static set<int> mkset(int i1)
{
	set<int> a; a.insert(i1); return a;
}
static set<int> mkset(int i1, int i2)
{
	set<int> a; a.insert(i1); a.insert(i2); return a;
}
#if 0
static set<int> mkset(int i1, int i2, int i3)
{
	set<int> a; a.insert(i1); a.insert(i2); a.insert(i3); return a;
}
static set<int> mkset(int i1, int i2, int i3, int i4)
{
	set<int> a; a.insert(i1); a.insert(i2); a.insert(i3); a.insert(i4); return a;
}
#endif

struct TestOperators {

    Test binarySetOperations() {
        set< int > a = mkset(4, 5);
	set< int > b = mkset(5);
        set< int > c = a & b;
        assert_eq( c.size(), 1u );
        assert( c.find( 4 ) == c.end() );
        assert( c.find( 5 ) != c.end() );
        c = a | b;
        assert_eq( c.size(), 2u );
        assert( c.find( 4 ) != c.end() );
        assert( c.find( 5 ) != c.end() );
        c = a - b;
        assert_eq( c.size(), 1u );
        assert( c.find( 4 ) != c.end() );
        assert( c.find( 5 ) == c.end() );
    }

    Test mutatingSetOperations() {
        set< int > a = mkset(4, 3);
	set< int > b = mkset(5);
        b |= 3;
        assert_eq( b.size(), 2u );
        assert( b.find( 2 ) == b.end() );
        assert( b.find( 3 ) != b.end() );
        assert( b.find( 4 ) == b.end() );
        assert( b.find( 5 ) != b.end() );
        b |= a;
        assert_eq( b.size(), 3u );
        assert( b.find( 3 ) != b.end() );
        assert( b.find( 4 ) != b.end() );
        assert( b.find( 5 ) != b.end() );
        b &= a;
        assert_eq( b.size(), 2u );
        assert( b.find( 3 ) != b.end() );
        assert( b.find( 4 ) != b.end() );
        assert( b.find( 5 ) == b.end() );
        b.insert( b.begin(), 2 );
        b -= a;
        assert_eq( b.size(), 1u );
        assert( b.find( 2 ) != b.end() );
        assert( b.find( 3 ) == b.end() );
        assert( b.find( 4 ) == b.end() );
    }
    
    Test specialContainerOperations() {
        set< int > a;

        a = a | wibble::Empty<int>();
        assert_eq( a.size(), 0u );
        
        a = a | wibble::Singleton<int>(1);
        assert_eq( a.size(), 1u );
        assert( a.find( 1 ) != a.end() );
        
        a = a - wibble::Empty<int>();
        assert_eq( a.size(), 1u );
        assert( a.find( 1 ) != a.end() );
        
        a = a - wibble::Singleton<int>(1);
        assert_eq( a.size(), 0u );
        assert( a.find( 1 ) == a.end() );
        
        a |= wibble::Empty<int>();
        assert_eq( a.size(), 0u );
        
        a |= wibble::Singleton<int>(1);
        assert_eq( a.size(), 1u );
        assert( a.find( 1 ) != a.end() );
        
        a -= wibble::Empty<int>();
        assert_eq( a.size(), 1u );
        assert( a.find( 1 ) != a.end() );
        
        a -= wibble::Singleton<int>(1);
        assert_eq( a.size(), 0u );
        assert( a.find( 1 ) == a.end() );
    }
    
    Test emptySetInclusion() {
        set< int > a, b;
        assert( a <= b );
        assert( b <= a );
    }

    Test mutatingIntersectionBug() {
	// Catches a past bug of in-place intersection that would delete too many
	// items if the second set had items not present in the first
	set<int> a = mkset(2);
	set<int> b = mkset(1, 2);
	set<int> c = mkset(2);

	set<int> d = a & b;
	assert(c == d);

	d = a;
	d &= b;
	assert(c == d);
    }
    
};

}

// vim:set ts=4 sw=4:
