/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/test.h>
#include <wibble/singleton.h>

namespace {

using namespace std;
using namespace wibble;

struct TestSingleton {

    Test simple() {
        Singleton<int> container = singleton(5);

        assert_eq(container.size(), 1u);

        Singleton<int>::iterator i = container.begin();
        assert(!(i == container.end()));
        assert(i != container.end());
        assert_eq(*i, 5);
        
        ++i;
        assert(i == container.end());
        assert(!(i != container.end()));
    }

};

}
