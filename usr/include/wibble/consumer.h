/** -*- C++ -*-
    @file wibble/consumer.h
    @author Peter Rockai <me@mornfall.net>
*/

#include <iterator>

#include <wibble/amorph.h>
#include <wibble/range.h>
#include <wibble/cast.h>

#ifndef WIBBLE_CONSUMER_H
#define WIBBLE_CONSUMER_H

namespace wibble {

template< typename T > struct Consumer;

template< typename T >
struct ConsumerInterface
{
    typedef T InputType;
    virtual void consume( const T &a ) = 0;
    virtual void consume( Range< T > s ) = 0;
    virtual ~ConsumerInterface() {}
};

template< typename T, typename W >
struct ConsumerMorph : Morph< ConsumerMorph< T, W >, W, ConsumerInterface< T > >
{
    ConsumerMorph() {}
    ConsumerMorph( const W &w ) : Morph< ConsumerMorph, W, ConsumerInterface< T > >( w ) {}

    virtual void consume( const T &a ) {
        return this->wrapped().consume( a );
    }

    virtual void consume( Range< T > s ) {
        while ( !s.empty() ) {
            consume( s.head() );
            s = s.tail();
        }
    }
};

template< typename T, typename Self >
struct ConsumerMixin : mixin::Comparable< Self >
{
    Self &self() { return *static_cast< Self * >( this ); }
    const Self &self() const { return *static_cast< const Self * >( this ); }
    typedef std::output_iterator_tag iterator_category;
    typedef T ConsumedType;

    bool operator<=( const Self &o ) const { return this <= &o; }
    Consumer< T > &operator++() { return self(); }
    Consumer< T > &operator++(int) { return self(); }
    Consumer< T > &operator*() { return self(); }
    Consumer< T > &operator=( const T &a ) {
        self()->consume( a );
        return self();
    }
};

template< typename T >
struct Consumer: Amorph< Consumer< T >, ConsumerInterface< T > >,
                 ConsumerMixin< T, Consumer< T > >
{
    typedef Amorph< Consumer< T >, ConsumerInterface< T > > Super;

    typedef void value_type;
    typedef void difference_type;
    typedef void pointer;
    typedef void reference;

    Consumer( const MorphInterface< ConsumerInterface< T > > &i ) : Super( i ) {}
    Consumer() {}

    void consume( const T &a ) {
        return this->implementation()->consume( a );
    }

    Consumer< T > &operator=( const T &a ) {
        consume( a );
        return *this;
    }
    // output iterator - can't read or move
};

template< typename T, typename Out >
struct ConsumerFromIterator : ConsumerMixin< T, ConsumerFromIterator< T, Out > >
{
    ConsumerFromIterator( Out out ) : m_out( out ) {}
    void consume( const T& a ) {
        *(*m_out) = a;
        ++(*m_out);
    }
protected:
    Out m_out;
};

template< typename R >
Consumer< typename R::ConsumedType > consumerMorph( R r ) {
    return ConsumerMorph< typename R::ConsumedType , R >( r );
}

// insert iterators
template< typename Out >
Consumer< typename Out::container_type::value_type > consumer( Out out ) {
    return consumerMorph(
        ConsumerFromIterator< typename Out::container_type::value_type, Out >( out ) );
}

// containers
template< typename T >
typename IsType< Consumer< typename T::value_type >, typename T::iterator >::T consumer( T &c ) {
    return consumer( std::inserter( c, c.end() ) );
}

// consumers
template< typename T >
Consumer< T > consumer( const ConsumerInterface< T > &t ) {
    return t;
}

}

#endif
