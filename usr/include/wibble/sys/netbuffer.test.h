/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/sys/netbuffer.h>

#include <wibble/test.h>
#include <cstring>

using namespace std;
using namespace wibble::sys;

struct TestNetBuffer {

    // Ensure that a plain NetBuffer starts from the beginning of the string
    Test startAtBeginning() {
        NetBuffer buf("antani", 6);

        assert_eq(buf.size(), 6u);
        assert(memcmp(buf.data(), "antani", 6) == 0);

        assert_eq(*buf.cast<char>(), 'a');
        assert(buf.fits<short int>());
        assert(!buf.fits<long long int>());
    }

    // Try skipping some bytes
    Test skipBytes() {
        NetBuffer buf("antani", 6);

        NetBuffer buf1(buf);
        
        assert_eq(buf1.size(), 6u);
        assert(memcmp(buf1.data(), "antani", 6) == 0);

        buf1 += 2;
        assert_eq(buf1.size(), 4u);
        assert(memcmp(buf1.data(), "tani", 4) == 0);
        assert_eq(*buf1.cast<char>(), 't');

        buf1 = buf + 2;
        assert_eq(buf1.size(), 4u);
        assert(memcmp(buf1.data(), "tani", 4) == 0);
        assert_eq(*buf1.cast<char>(), 't');
        
        buf1 = buf;
        buf1.skip(2);
        assert_eq(buf1.size(), 4u);
        assert(memcmp(buf1.data(), "tani", 4) == 0);
        assert_eq(*buf1.cast<char>(), 't');
        
        buf1 = buf.after(2);
        assert_eq(buf1.size(), 4u);
        assert(memcmp(buf1.data(), "tani", 4) == 0);
        assert_eq(*buf1.cast<char>(), 't');
        
        buf1 = buf;
        buf1.skip<short int>();
        assert_eq(buf1.size(), 4u);
        assert(memcmp(buf1.data(), "tani", 4) == 0);
        assert_eq(*buf1.cast<char>(), 't');
        
        buf1 = buf.after<short int>();
        assert_eq(buf1.size(), 4u);
        assert(memcmp(buf1.data(), "tani", 4) == 0);
        assert_eq(*buf1.cast<char>(), 't');
    }
    
};

// vim:set ts=4 sw=4:
