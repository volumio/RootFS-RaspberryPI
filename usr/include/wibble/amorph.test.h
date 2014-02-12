// -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>

#include <wibble/amorph.h>

namespace {

using namespace wibble;

struct TInterface {
    virtual int value() = 0;
};

template< typename W >
struct TMorph : Morph< TMorph< W >, W, TInterface >
{
    TMorph() {}
    TMorph( const W &w ) : Morph< TMorph, W, TInterface >( w ) {}

    virtual int value() { return this->wrapped().value(); }
};

struct T : Amorph< T, TInterface >
{
    T( const MorphInterface< TInterface > &i )
        : Amorph< T, TInterface >( i ) {}
    T() {}

    int value() {
        return this->implementation()->value();
    }
};

struct T1 : VirtualBase {
    virtual int value() const { return 1; }
    bool operator<=( const T1 &o ) const {
        return value() <= o.value();
    }

};

struct T3 : T1 {
    virtual int value() const { return 3; }
};

struct T2 : VirtualBase {
    int value() const { return 2; }
    bool operator<=( const T2 &o ) const {
        return value() <= o.value();
    }
};

struct ExtractT1Value {
    typedef int result_type;
    typedef T1 argument_type;
    int operator()( const T1 &t ) {
        return t.value();
    }
};

template< typename T >
TMorph< T > testMorph( T t ) {
    return TMorph< T >( t );
}

struct TestAmorph {
    Test basic()
    {
        T1 t1;
        T2 t2;
        T3 t3;
        T t = testMorph( t1 );
        assert_eq( t.value(), 1 );
        assert_eq( t.ifType( ExtractT1Value() ), Maybe< int >::Just( 1 ) );
        t = testMorph( t2 );
        assert_eq( t.value(), 2 );
        assert_eq( t.ifType( ExtractT1Value() ), Maybe< int >::Nothing() );
        t = testMorph( t3 );
        assert_eq( t.value(), 3 );
        assert_eq( t.ifType( ExtractT1Value() ), Maybe< int >::Just( 3 ) );
    }
};

}
