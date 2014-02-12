/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/test.h>
#include <wibble/empty.h>

using namespace wibble;

struct TestEmpty {
    Test basic() {
        Empty<int> container;

        assert_eq(container.size(), 0u);
        
        Empty<int>::iterator i = container.begin();
        assert(i == container.end());
        assert(!(i != container.end()));
    }
};
