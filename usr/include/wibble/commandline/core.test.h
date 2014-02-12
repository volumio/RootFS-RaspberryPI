/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/commandline/core.h>

#include <wibble/test.h>

using namespace wibble::commandline;

struct TestCommandlineCore {

    Test isSwitch() {
        assert_eq(ArgList::isSwitch("-a"), true);
        assert_eq(ArgList::isSwitch("-afdg"), true);
        assert_eq(ArgList::isSwitch("--antani"), true);
        assert_eq(ArgList::isSwitch("--antani-blinda"), true);
        assert_eq(ArgList::isSwitch("-"), false);
        assert_eq(ArgList::isSwitch("--"), false);
        assert_eq(ArgList::isSwitch("antani"), false);
        assert_eq(ArgList::isSwitch("a-ntani"), false);
        assert_eq(ArgList::isSwitch("a--ntani"), false);
    }

    Test eraseAndAdvance()
    {
        ArgList list;
        list.push_back("1");
        list.push_back("2");
        list.push_back("3");
     
        ArgList::iterator begin = list.begin();
        assert_eq(list.size(), 3u);
     
        list.eraseAndAdvance(begin);
        assert(begin == list.begin());
        assert_eq(list.size(), 2u);
     
        list.eraseAndAdvance(begin);
        assert(begin == list.begin());
        assert_eq(list.size(), 1u);
     
        list.eraseAndAdvance(begin);
        assert(begin == list.begin());
        assert_eq(list.size(), 0u);
        assert(begin == list.end());
    }

};

// vim:set ts=4 sw=4:
