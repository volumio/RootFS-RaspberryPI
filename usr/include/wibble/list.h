// -*- C++ -*-
#include <memory>
#include <vector>
#include <iterator>
#include <algorithm>
#include <cstddef>

#ifndef WIBBLE_LIST_H
#define WIBBLE_LIST_H

namespace wibble {
namespace list {

template< typename List >
struct ListIterator
{
    typedef std::forward_iterator_tag iterator_category;
    typedef typename List::Type value_type;
    typedef ptrdiff_t difference_type;
    typedef value_type &pointer;
    typedef value_type &reference;

    List l;

    ListIterator &operator++() {
        l = l.tail();
        return *this;
    }

    ListIterator operator++(int) {
        ListIterator i = *this;
        operator++();
        return i;
    }

    typename List::Type operator*() {
        return l.head();
    }

    bool operator==( const ListIterator &o ) const {
        return l.empty() && o.l.empty();
    }

    bool operator!=( const ListIterator &o ) const {
        return !(l.empty() && o.l.empty());
    }

    ListIterator( List _l = List() ) : l( _l )
    {}

};

template< typename List >
struct Sorted
{
    typedef std::vector< typename List::Type > Vec;
    struct SharedVec {
        int refs;
        Vec vec;
        SharedVec() : refs( 1 ) {}
        void _ref() { ++refs; }
        void _deref() { --refs; }
    };

    struct SharedPtr {
        SharedVec *vec;
        SharedPtr( bool a = false ) { vec = a ? new SharedVec : 0; }

        SharedPtr( const SharedPtr &o ) {
            vec = o.vec;
            if ( vec )
                vec->_ref();
        }

        SharedPtr &operator=( const SharedPtr &o ) {
            vec = o.vec;
            if ( vec )
                vec->_ref();
            return *this;
        }

        operator bool() { return vec; }
        Vec &operator*() { return vec->vec; }
        Vec *operator->() { return &(vec->vec); }

        ~SharedPtr() {
            if ( vec ) {
                vec->_deref();
                if ( !vec->refs )
                    delete vec;
            }
        }
    };

    typedef typename List::Type Type;
    List m_list;
    mutable SharedPtr m_sorted;
    size_t m_pos;

    void sort() const {
        if ( m_sorted )
            return;
        m_sorted = SharedPtr( true );
        std::copy( ListIterator< List >( m_list ), ListIterator< List >(),
                   std::back_inserter( *m_sorted ) );
        std::sort( m_sorted->begin(), m_sorted->end() );
    }

    Type head() const {
        sort();
        return (*m_sorted)[ m_pos ];
    }

    Sorted tail() const {
        sort();
        Sorted s = *this;
        s.m_pos ++;
        return s;
    }

    bool empty() const {
        sort();
        return m_pos == m_sorted->size();
    }

    Sorted( const Sorted &o ) : m_list( o.m_list ), m_sorted( o.m_sorted ),
                                m_pos( o.m_pos ) {}

    Sorted &operator=( const Sorted &o ) {
        m_sorted = o.m_sorted;
        m_list = o.m_list;
        m_pos = o.m_pos;
        return *this;
    }

    Sorted( List l = List() ) : m_list( l ), m_sorted( 0 ), m_pos( 0 ) {}
};

template< typename List, typename Predicate >
struct Filtered
{
    typedef typename List::Type Type;
    mutable List m_list;
    Predicate m_pred;

    bool empty() const {
        seek();
        return m_list.empty();
    }

    Type head() const {
        seek();
        return m_list.head();
    }

    void seek() const
    {
        while ( !m_list.empty() && !m_pred( m_list.head() ) )
            m_list = m_list.tail();
    }

    Filtered tail() const
    {
        Filtered r = *this;
        r.seek();
        r.m_list = r.m_list.tail();
        return r;
    }

    Filtered( List l, Predicate p )
        : m_list( l ), m_pred( p )
    {
    }

    Filtered() {}
};

template< typename List >
struct Unique
{
    typedef typename List::Type Type;
    mutable List m_list;

    bool empty() const {
        seek();
        return m_list.empty();
    }

    Type head() const {
        seek();
        return m_list.head();
    }

    void seek() const
    {
        if ( m_list.empty() )
            return;
        if ( m_list.tail().empty() )
            return;
        if ( m_list.head() == m_list.tail().head() ) {
            m_list = m_list.tail();
            return seek();
        }
    }

    Unique tail() const
    {
        Unique r = *this;
        r.seek();
        r.m_list = r.m_list.tail();
        return r;
    }

    Unique( List l = List() )
        : m_list( l )
    {
    }
};

template< typename List >
struct Take {
    List l;
    int remaining;

    typedef typename List::Type Type;

    Type head() const {
        return l.head();
    }

    bool empty() const {
        return l.empty() || remaining == 0;
    }

    Take tail() const {
        Take t;
        t.remaining = remaining - 1;
        t.l = l.tail();
        return t;
    }

    Take( List _l, int m ) : l( _l ), remaining( m ) {}
    Take() : remaining( 0 ) {}
};

template< typename List, typename F >
struct Map {
    List l;

    char f_space[ sizeof( F ) ];
    F &f() {
        return *(F *)f_space;
    }
    const F &f() const {
        return *(const F *)f_space;
    }

    typedef typename F::result_type Type;

    Type head() const {
        return f()( l.head() );
    }

    Map tail() const {
        Map m;
        m.l = l.tail();
        m.f() = f();
        return m;
    }

    bool empty() const {
        return l.empty();
    }

    Map() {}
    Map( const List &_l, const F &_f ) 
        : l( _l )
    {
        f() = _f;
    }
};

template< typename T >
struct Empty {
    typedef T Type;
    T head() const { return T(); }
    bool empty() const { return true; }
    Empty tail() const { return Empty(); }
};

template< typename T >
struct Singular {
    typedef T Type;
    T m_value;
    bool m_empty;

    Singular() : m_empty( true ) {}
    Singular( T i ) : m_value( i ), m_empty( false ) {}
    T head() const { return m_value; }
    bool empty() const { return m_empty; }
    Singular tail() const { return Singular(); }
};

template< typename T1, typename T2 >
struct Append {
    typedef typename T1::Type Type;
    T1 m_1;
    T2 m_2;

    Append() {}
    Append( T1 a, T2 b ) : m_1( a ), m_2( b ) {}
    Type head() const {
        if ( m_1.empty() )
            return m_2.head();
        return m_1.head();
    }

    bool empty() const { return m_1.empty() && m_2.empty(); }
    Append tail() const {
        Append t = *this;
        if ( !t.m_1.empty() )
            t.m_1 = t.m_1.tail();
        else
            t.m_2 = t.m_2.tail();
        return t;
    }

};

template< typename X >
Singular< X > singular( const X &x ) {
    return Singular< X >( x );
}

template< typename X, typename Y >
Append< X, Y > append( const X &x, const Y &y ) {
    return Append< X, Y >( x, y );
}

template< typename List >
size_t count( List l ) {
    size_t count = 0;
    while ( !l.empty() ) {
        l = l.tail();
        ++ count;
    }
    return count;
}

#undef foreach // Work around Qt braindamage.

template< typename List, typename F >
void foreach( List l, F f ) {
    size_t count = 0;
    while ( !l.empty() ) {
        f( l.head() );
        l = l.tail();
    }
}

template< typename List, template< typename > class F >
void foreach( List l, F< typename List::Type > f ) {
    size_t count = 0;
    while ( !l.empty() ) {
        f( l.head() );
        l = l.tail();
    }
}

template< typename List, typename Pred >
Filtered< List, Pred > filter( List l, Pred p )
{
    return Filtered< List, Pred >( l, p );
}

template< typename List, template< typename > class Pred >
Filtered< List, Pred< List > > filter( List l, Pred< List > p )
{
    return Filtered< List, Pred< List > >( l, p );
}

template< typename List, typename F >
Map< List, F > map( const List &l, const F &f )
{
    return Map< List, F >( l, f );
}

template< typename List >
Sorted< List > sort( List l )
{
    return Sorted< List >( l );
}

template< typename List >
Unique< List > unique( List l )
{
    return Unique< List >( l );
}

template< typename List >
Take< List > take( int t, List l )
{
    return Take< List >( l, t );
}

template< typename List >
List drop( int t, List l )
{
    while ( t > 0 ) {
        l = l.tail();
        -- t;
    }
    return l;
}

template< typename List, typename Out >
void output( List l, Out it ) {
    std::copy( ListIterator< List >( l ), ListIterator< List >(), it );
}

template< typename List >
ListIterator< List > begin( List l ) {
    return ListIterator< List >( l );
}

template< typename List >
ListIterator< List > end( List ) {
    return ListIterator< List >();
}

}
}

#endif
