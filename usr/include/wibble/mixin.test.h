// -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>

#include <wibble/test.h>
#include <wibble/mixin.h>
#include <vector>

namespace {

using namespace std;

class Integer : public wibble::mixin::Comparable<Integer>
{
	int val;
public:
	Integer(int val) : val(val) {}
	bool operator<=( const Integer& o ) const { return val <= o.val; }
};

class Discard : public wibble::mixin::OutputIterator<Discard>
{
public:
	Discard& operator=(const int&)
	{
		return *this;
	}
};

struct TestMixin {

// Test Comparable mixin
    Test comparable() {
        Integer i10(10);
        Integer i10a(10);
        Integer i20(20);

// Test the base method first
        assert(i10 <= i10a);
        assert(i10a <= i10);
        assert(i10 <= i20);
        assert(! (i20 <= i10));
        
// Test the other methods
        assert(i10 != i20);
        assert(!(i10 != i10a));
        
        assert(i10 == i10a);
        assert(!(i10 == i20));
        
        assert(i10 < i20);
        assert(!(i20 < i10));
        assert(!(i10 < i10a));
        
        assert(i20 > i10);
        assert(!(i10 > i20));
        assert(!(i10 > i10a));
        
        assert(i10 >= i10a);
        assert(i10a >= i10);
        assert(i20 >= i10);
        assert(! (i10 >= i20));
    }
    
    Test output() {
        vector<int> data;
        data.push_back(1);
        data.push_back(2);
        data.push_back(3);
        
        std::copy(data.begin(), data.end(), Discard());
    }

};

}
