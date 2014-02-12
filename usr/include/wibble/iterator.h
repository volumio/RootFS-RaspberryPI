/** -*- C++ -*-
    @file wibble/iterator.h
    @author Peter Rockai <me@mornfall.net>
*/

#include <wibble/amorph.h>
#include <wibble/mixin.h>

#ifndef WIBBLE_ITERATOR_H
#define WIBBLE_ITERATOR_H

namespace wibble {

typedef bool SortabilityTag;

template< typename T, typename I >
struct IteratorTraits {
    typedef SortabilityTag Unsorted;
};

template< typename T >
struct IteratorTraits< T, typename std::set< T >::iterator > {
    typedef SortabilityTag Sorted;
};

template< typename T >
struct IteratorTraits< T, typename std::multiset< T >::iterator > {
    typedef SortabilityTag Sorted;
};

template< typename T >
struct IteratorInterface {
    virtual T current() const = 0;
    virtual void advance() = 0;
    virtual ~IteratorInterface() {}
};

template< typename T >
struct IteratorProxy {
    IteratorProxy( T _x ) : x( _x ) {}
    T x;
    const T *operator->() const { return &x; }
};

template< typename T, typename W >
struct IteratorMorph : Morph< IteratorMorph< T, W >, W, IteratorInterface< T > >
{
    typedef W Wrapped;
    IteratorMorph() {}
    IteratorMorph( const Wrapped &w )
        : Morph< IteratorMorph, Wrapped, IteratorInterface< T > >( w ) {}
    virtual void advance() { this->wrapped().advance(); }
    virtual T current() const { return this->wrapped().current(); }
};

template< typename T, typename Self >
struct IteratorMixin : mixin::Comparable< Self >
{
    Self &self() { return *static_cast< const Self * >( this ); }
    const Self &self() const { return *static_cast< const Self * >( this ); }
    typedef T ElementType;

    typedef std::forward_iterator_tag iterator_category;
    typedef T value_type;
    typedef ptrdiff_t difference_type;
    typedef T *pointer;
    typedef T &reference;
    typedef const T &const_reference;

    IteratorProxy< T > operator->() const {
        return IteratorProxy< T >(self().current()); }
    Self next() const { Self n( self() ); n.advance(); return n; }
    T operator*() const { return self().current(); }

    Self &operator++() { self().advance(); return self(); }
    Self operator++(int) {
        Self tmp = self();
        self().advance();
        return tmp;
    }
};

template< typename T, typename I >
typename IteratorTraits< T, I >::Unsorted isSortedT( I, I ) {
    return false;
}

template< typename T, typename I >
typename IteratorTraits< T, I >::Sorted isSortedT( I, I ) {
    return true;
}

template< typename T >
struct Iterator : Amorph< Iterator< T >, IteratorInterface< T >, 0 >,
    IteratorMixin< T, Iterator< T > >
{
    typedef Amorph< Iterator< T >, IteratorInterface< T >, 0 > Super;
    typedef T ElementType;

    Iterator( const IteratorInterface< T > &i ) : Super( i ) {}
    Iterator() {}
    bool operator<=( const Iterator &i ) const { return leq( i ); }

    T current() const { return this->implInterface()->current(); }
    virtual void advance() { this->implInterface()->advance(); }

    template< typename C > operator Iterator< C >();
};

template< typename It >
struct StlIterator : IteratorMixin< typename It::value_type, StlIterator< It > >
{
    typedef typename std::iterator_traits< It >::value_type Value;
    StlIterator( It i ) : m_iterator( i ) {}
    virtual void advance() { ++m_iterator; }
    virtual Value current() const { return *m_iterator; }
    bool operator==( const StlIterator< It > &o ) { return m_iterator == o.m_iterator; }
protected:
    It m_iterator;
};

template< typename I >
Iterator< typename I::value_type > iterator( I i ) {
    return StlIterator< I >( i );
}

}

#endif
