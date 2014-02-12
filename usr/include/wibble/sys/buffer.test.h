/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/sys/buffer.h>

#include <wibble/test.h>
#include <string.h>

using namespace std;
using namespace wibble::sys;

struct TestBuffer {
    Test emptiness() {
        Buffer buf;
        assert_eq(buf.size(), 0u);
        assert_eq(buf.data(), (void*)0);

		// Empty buffers should be equal
		Buffer buf1;
		assert(buf == buf);
		assert(buf == buf1);
		assert(!(buf < buf1));
		assert(!(buf1 < buf));
    }

    Test nonemptiness() {
        // Nonempty buffers should be properly nonempty
        Buffer buf(1);
		((char*)buf.data())[0] = 'a';
        assert_eq(buf.size(), 1u);
        assert(buf.data() != 0);

		// Nonempty buffers should compare by content
		Buffer buf1(1);
		((char*)buf1.data())[0] = 'z';
		assert(buf == buf);
		assert(buf1 == buf1);
		assert(!(buf == buf1));
		assert(buf != buf1);
		assert(buf < buf1);
		assert(!(buf1 < buf));

		((char*)buf1.data())[0] = 'a';
		assert(buf == buf1);
		assert(!(buf != buf1));
		assert(!(buf < buf1));
		assert(!(buf1 < buf));

		// Empty buffers should come before the nonempty ones
		Buffer buf2;
		assert(!(buf == buf2));
		assert(buf != buf2);
		assert(!(buf < buf2));
		assert(buf2 < buf);
    }

// Construct by copy should work
    Test copy() {
        const char* str = "Ciao";
        Buffer buf(str, 4);

        assert_eq(buf.size(), 4u);
        assert(memcmp(str, buf.data(), 4) == 0);
    }

// Resize should work and preserve the contents
    Test resize() {
        const char* str = "Ciao";
        Buffer buf(str, 4);
        
        assert_eq(buf.size(), 4u);
        assert(memcmp(str, buf.data(), 4) == 0);
        
        buf.resize(8);
        assert_eq(buf.size(), 8u);
        assert(memcmp(str, buf.data(), 4) == 0);
    }

// Check creation by taking ownership of another buffer
    Test takeover() {
        char* str = new char[4];
        memcpy(str, "ciao", 4);
        Buffer buf(str, 4, true);
	
        assert_eq(buf.size(), 4u);
        assert_eq((void*)str, buf.data());
    }
};

// vim:set ts=4 sw=4:
