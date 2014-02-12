/** -*- C++ -*-
    @file wibble/range.h
    @author Peter Rockai <me@mornfall.net>
*/

#include <iostream> // for noise
#include <iterator>
#include <vector>
#include <set>
#include <algorithm>
#include <ext/algorithm>

#include <wibble/iterator.h>
#include <wibble/exception.h>

#ifndef WIBBLE_RANGE_H
#define WIBBLE_RANGE_H

namespace wibble {

template< typename _ > struct Range;
template< typename _ > struct Consumer;

// FOO: there was no test catching that we don't implement ->
// auxilliary class, used as Range< T >::iterator
template< typename R >
struct RangeIterator : mixin::Comparable< RangeIterator< R > > {
    typedef typename R::ElementType T;

    struct Proxy {
        Proxy( T _x ) : x( _x ) {}
        T x;
        const T *operator->() const { return &x; }
    };

    RangeIterator() {}
    RangeIterator( const R &r ) : m_range( r ) {}

    typedef std::forward_iterator_tag iterator_category;
    typedef T value_type;
    typedef ptrdiff_t difference_type;
    typedef T *pointer;
    typedef T &reference;
    typedef const T &const_reference;

    Proxy operator->() const { return Proxy( *(*this) ); }

    RangeIterator next() const { RangeIterator n( *this ); ++n; return n; }
    typename R::ElementType operator*() const { return m_range.head(); }
    typename R::ElementType current() const { return *(*this); }
    RangeIterator &operator++() { m_range.removeFirst(); return *this; }
    RangeIterator operator++(int) { return m_range.removeFirst(); }
    bool operator<=( const RangeIterator &r ) const {
        return m_range.operator<=( r.m_range );
    }
protected:
    R m_range;
};

// the common functionality of all ranges
template< typename T, typename Self >
struct RangeMixin : mixin::Comparable< Self >
{
    typedef Self RangeImplementation;
    typedef T ElementType;
    const Self &self() const { return *static_cast< const Self * >( this ); }
    typedef IteratorMixin< T, Self > Base;
    typedef RangeIterator< Self > iterator;
    friend struct RangeIterator< Self >;

    iterator begin() const { return iterator( this->self() ); } // STL-style iteration
    iterator end() const { Self e( this->self() ); e.setToEmpty(); return iterator( e ); }

    // range terminology
    T head() { return self().head(); }
    Self tail() const { Self e( this->self() ); e.removeFirst(); return e; }
    // Self &tail() { return self().tail(); }

    void output( Consumer< T > t ) const {
        std::copy( begin(), end(), t );
    }

    bool empty() const {
        return begin() == end();
    }

    ~RangeMixin() {}
};

// interface to be implemented by all range implementations
// refinement of IteratorInterface (see iterator.h)
// see also amorph.h on how the Morph/Amorph classes are designed
template< typename T >
struct RangeInterface {
    virtual T head() const = 0;
    virtual void removeFirst() = 0;
    virtual void setToEmpty() = 0;
    virtual ~RangeInterface() {}
};

template< typename T, typename W >
struct RangeMorph: Morph< RangeMorph< T, W >, W, RangeInterface< T > >
{
    typedef typename W::RangeImplementation Wrapped;
    RangeMorph( const Wrapped &w ) : Morph< RangeMorph, Wrapped, RangeInterface< T > >( w ) {}
    virtual void setToEmpty() { this->wrapped().setToEmpty(); }
    virtual void removeFirst() { this->wrapped().removeFirst(); }
    virtual T head() const { return this->wrapped().head(); }
};

// the Amorph of Ranges... if you still didn't check amorph.h, go and
// do it... unless you don't care in which case i am not sure why you
// are reading this anyway

/*
  Range< T > (and all its Morphs (implementations) alike) work as an
  iterable, immutable range of items -- in a way like STL
  const_begin(), const_end() pair of iterators. However, Range packs
  these two in a single object, which you can then pass as a single
  argument or return as a value. There are many Range implementations,
  some of them use STL containers (or just a pair of iterators) as
  backing (IteratorRange, BackedRange), some use other ranges.

  The latter are slightly more interesting, since they provide an
  "adapted" view on the underlying range(s). See FilteredRange,
  TransformedRange, UniqueRange, CastedRange , IntersectionRange.

  GeneratedRange has no "real" backing at all, but use a pair of
  functors and "generates" (by calling those functors) the complete
  range as it is iterated.

  Example usage:

  // create a range from a pair of STL iterators
  Range< int > i = range( myIntVector.begin(), myIntVector.end() );
  // create a range that is filtered view of another range
  Range< int > j = filteredRange( i, predicate );
  std::vector< int > vec;
  // copy out items in j into vec; see also consumer.h
  j.output( consumer( vec ) );
  // vec now contains all items from i (and thus myIntVector) that
  // match 'predicate'

  You don't have to use Range< int > all the time, since it's fairly
  inefficient (adding level of indirection). However in common cases
  it is ok. In the uncommon cases you can use the specific
  implementation type and there you won't suffer the indirection
  penalty. You can also write generic functions that have type of
  range as their template parameter and these will work more
  efficiently if Morph is used directly and less efficiently when the
  Amorph Range is used instead.
 */
template< typename T >
struct Range : Amorph< Range< T >, RangeInterface< T > >,
               RangeMixin< T, Range< T > >
{
    typedef Amorph< Range< T >, RangeInterface< T > > Super;

    template< typename C >
    Range( const C &i, typename IsType< int, typename C::RangeImplementation >::T fake = 0 )
        : Super( RangeMorph< T, C >( i ) ) { (void)fake; }
    Range() {}

    T head() const { return this->implementation()->head(); }
    void removeFirst() { this->implementation()->removeFirst(); }
    void setToEmpty() { this->implementation()->setToEmpty(); }

    template< typename C > operator Range< C >();
};

/* template< typename R >
Range< typename R::ElementType > rangeMorph( R r ) {
    return Range< typename R::ElementType > uRangeMorph< typename R::ElementType, R >( r );
    } */

}

// ----- individual range implementations follow
#include <wibble/consumer.h>

namespace wibble {

// a simple pair of iterators -- suffers the same invalidation
// semantics as normal STL iterators and also same problems when the
// backing storage goes out of scope

// this is what you get when using range( iterator1, iterator2 )
// see also range()
template< typename It >
struct IteratorRange : public RangeMixin<
    typename std::iterator_traits< It >::value_type,
    IteratorRange< It > >
{
    typedef typename std::iterator_traits< It >::value_type Value;

    IteratorRange() {}
    IteratorRange( It c, It e )
        : m_current( c ), m_end( e ) {}

    Value head() const { return *m_current; }
    void removeFirst() { ++m_current; }

    bool operator<=( const IteratorRange &r ) const {
        return r.m_current == m_current && r.m_end == m_end;
    }

    void setToEmpty() {
        m_current = m_end;
    }

protected:
    It m_current, m_end;
};

// first in the series of ranges that use another range as backing
// this one just does static_cast to specified type on all the
// returned elements

// this is what you get when casting Range< S > to Range< T > and S is
// static_cast-able to T

template< typename T, typename Casted >
struct CastedRange : public RangeMixin< T, CastedRange< T, Casted > >
{
    CastedRange() {}
    CastedRange( Range< Casted > r ) : m_casted( r ) {}
    T head() const {
        return static_cast< T >( m_casted.head() );
    }
    void removeFirst() { m_casted.removeFirst(); }

    bool operator<=( const CastedRange &r ) const {
        return m_casted <= r.m_casted;
    }

    void setToEmpty() {
        m_casted.setToEmpty();
    }

protected:
    Range< Casted > m_casted;
};

// explicit range-cast... probably not very useful explicitly, just
// use the casting operator of Range
template< typename T, typename C >
Range< T > castedRange( C r ) {
    return CastedRange< T, typename C::ElementType >( r );
}

// old-code-compat for castedRange... slightly silly
template< typename T, typename C >
Range< T > upcastRange( C r ) {
    return CastedRange< T, typename C::ElementType >( r );
}

// the range-cast operator, see castedRange and CastedRange
template< typename T > template< typename C >
Range< T >::operator Range< C >() {
    return castedRange< C >( *this );
}

// range( iterator1, iterator2 ) -- see IteratorRange
template< typename In >
Range< typename In::value_type > range( In b, In e ) {
    return IteratorRange< In >( b, e );
}

template< typename C >
Range< typename C::iterator::value_type > range( C &c ) {
    return range( c.begin(), c.end() );
}

template< typename T >
struct IntersectionRange : RangeMixin< T, IntersectionRange< T > >
{
    IntersectionRange() {}
    IntersectionRange( Range< T > r1, Range< T > r2 )
        : m_first( r1 ), m_second( r2 ),
        m_valid( false )
    {
    }

    void find() const {
        if (!m_valid) {
            while ( !m_first.empty() && !m_second.empty() ) {
                if ( m_first.head() < m_second.head() )
                    m_first.removeFirst();
                else if ( m_second.head() < m_first.head() )
                    m_second.removeFirst();
                else break; // equal
            }
            if ( m_second.empty() ) m_first.setToEmpty();
            else if ( m_first.empty() ) m_second.setToEmpty();
        }
        m_valid = true;
    }

    void removeFirst() {
        find();
        m_first.removeFirst();
        m_second.removeFirst();
        m_valid = false;
    }

    T head() const {
        find();
        return m_first.head();
    }

    void setToEmpty() {
        m_first.setToEmpty();
        m_second.setToEmpty();
    }

    bool operator<=( const IntersectionRange &f ) const {
        find();
        f.find();
        return m_first == f.m_first;
    }

protected:
    mutable Range< T > m_first, m_second;
    mutable bool m_valid:1;
};

template< typename R >
IntersectionRange< typename R::ElementType > intersectionRange( R r1, R r2 ) {
    return IntersectionRange< typename R::ElementType >( r1, r2 );
}

template< typename R, typename Pred >
struct FilteredRange : RangeMixin< typename R::ElementType,
                                  FilteredRange< R, Pred > >
{
    typedef typename R::ElementType ElementType;
    // FilteredRange() {}
    FilteredRange( const R &r, Pred p ) : m_range( r ), m_current( r.begin() ), m_pred( p ),
        m_valid( false ) {}

    void find() const {
        if (!m_valid)
            m_current = std::find_if( m_current, m_range.end(), pred() );
        m_valid = true;
    }

    void removeFirst() {
        find();
        ++m_current;
        m_valid = false;
    }

    ElementType head() const {
        find();
        return *m_current;
    }

    void setToEmpty() {
        m_current = m_range.end();
    }

    bool operator<=( const FilteredRange &f ) const {
        find();
        f.find();
        return m_current == f.m_current;
        // return m_pred == f.m_pred && m_range == f.m_range;
    }

protected:
    const Pred &pred() const { return m_pred; }
    R m_range;
    mutable typename R::iterator m_current;
    Pred m_pred;
    mutable bool m_valid:1;
};

template< typename R, typename Pred >
FilteredRange< R, Pred > filteredRange(
    R r, Pred p ) {
    return FilteredRange< R, Pred >( r, p );
}

template< typename T >
struct UniqueRange : RangeMixin< T, UniqueRange< T > >
{
    UniqueRange() {}
    UniqueRange( Range< T > r ) : m_range( r ), m_valid( false ) {}

    void find() const {
        if (!m_valid)
            while ( !m_range.empty()
                    && !m_range.tail().empty()
                    && m_range.head() == m_range.tail().head() )
                m_range = m_range.tail();
        m_valid = true;
    }

    void removeFirst() {
        find();
        m_range.removeFirst();
        m_valid = false;
    }

    T head() const {
        find();
        return m_range.head();
    }

    void setToEmpty() {
        m_range.setToEmpty();
    }

    bool operator<=( const UniqueRange &r ) const {
        find();
        r.find();
        return m_range == r.m_range;
    }

protected:
    mutable Range< T > m_range;
    mutable bool m_valid:1;
};

template< typename R >
UniqueRange< typename R::ElementType > uniqueRange( R r1 ) {
    return UniqueRange< typename R::ElementType >( r1 );
}

template< typename Transform >
struct TransformedRange : RangeMixin< typename Transform::result_type,
                                     TransformedRange< Transform > >
{
    typedef typename Transform::argument_type Source;
    typedef typename Transform::result_type Result;
    TransformedRange( Range< Source > r, Transform t )
        : m_range( r ), m_transform( t ) {}

    bool operator<=( const TransformedRange &o ) const {
        return m_range <= o.m_range;
    }

    Result head() const { return m_transform( m_range.head() ); }
    void removeFirst() { m_range.removeFirst(); }
    void setToEmpty() { m_range.setToEmpty(); }

protected:
    Range< Source > m_range;
    Transform m_transform;
};

template< typename Trans >
TransformedRange< Trans > transformedRange(
    Range< typename Trans::argument_type > r, Trans t ) {
    return TransformedRange< Trans >( r, t );
}

template< typename T, typename _Advance, typename _End >
struct GeneratedRange : RangeMixin< T, GeneratedRange< T, _Advance, _End > >
{
    typedef _Advance Advance;
    typedef _End End;

    GeneratedRange() {}
    GeneratedRange( const T &t, const Advance &a, const End &e )
        : m_current( t ), m_advance( a ), m_endPred( e ), m_end( false )
    {
    }

    void removeFirst() {
        m_advance( m_current );
    }

    void setToEmpty() {
        m_end = true;
    }

    T head() const { return m_current; }

    bool isEnd() const { return m_end || m_endPred( m_current ); }

    bool operator<=( const GeneratedRange &r ) const {
        if ( isEnd() == r.isEnd() && !isEnd() )
            return m_current <= r.m_current;
        return isEnd() <= r.isEnd();
    }

protected:
    T m_current;
    Advance m_advance;
    End m_endPred;
    bool m_end;
};

template< typename T, typename A, typename E >
GeneratedRange< T, A, E > generatedRange( T t, A a, E e )
{
    return GeneratedRange< T, A, E >( t, a, e );
}

}

#endif
