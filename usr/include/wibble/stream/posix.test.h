/* -*- C++ -*- (c) 2008 Petr Rockai <me@mornfall.net>
               (c) 2008 Enrico Zini <enrico@enricozini.org> */

#include <wibble/test.h>
#include <wibble/stream/posix.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

namespace {

using namespace std;
using namespace wibble;
using namespace wibble::stream;

struct TestStreamPosix {

    Test basicMatch() {
		int fd = open("/dev/null", O_WRONLY);
		assert(fd != -1);

		PosixBuf buf(fd);
		ostream os(&buf);

		os << "Foo";
		os << "Bar";
		os << endl;
    }

};

}

// vim:set ts=4 sw=4:
