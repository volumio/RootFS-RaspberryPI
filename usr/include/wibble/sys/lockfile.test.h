/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */
#include <wibble/sys/lockfile.h>
#include <cstdlib>
#include <set>

#include <wibble/test.h>

using namespace std;
using namespace wibble::sys::fs;

struct TestLockfile {
	// Cannot test the locks without forking, as reacquiring the lock from the
	// same process is just an update of the previous lock
    Test readlock() {
		Lockfile lk1("testlock", false);
    }

    Test writelock() {
		Lockfile lk1("testlock", true);
    }
};

// vim:set ts=4 sw=4:
