/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */
#include <wibble/sys/fs.h>
#include <cstdlib>
#include <set>
#include <cstdlib>
#include <unistd.h>

#include <wibble/test.h>

using namespace std;
using namespace wibble::sys::fs;

struct TestFs {

// Test directory iteration
    Test directoryIterate() {
        Directory dir("/");

        set<string> files;
        for (Directory::const_iterator i = dir.begin(); i != dir.end(); ++i)
            files.insert(*i);
    
        assert(files.size() > 0);
        assert(files.find(".") != files.end());
        assert(files.find("..") != files.end());
        assert(files.find("etc") != files.end());
        assert(files.find("usr") != files.end());
        assert(files.find("tmp") != files.end());
    }

    // Ensure that nonexisting directories and files are reported as not valid
    Test invalidDirectories() {
        Directory dir1("/antaniblindalasupercazzola123456");
        assert(!dir1.valid());

        Directory dir2("/etc/passwd");
        assert(!dir2.valid());
    }

    Test _mkPath() {
        // Mkpath should succeed on existing directory
        mkpath(".");

        // Mkpath should succeed on existing directory
        mkpath("./.");

        // Mkpath should succeed on existing directory
        mkpath("/");
    }

    Test _mkPath2() {
        // Try creating a path with mkpath
        system("rm -rf test-mkpath");
        mkpath("test-mkpath/test-mkpath");
        assert(wibble::sys::fs::access("test-mkpath", F_OK));
        assert(wibble::sys::fs::access("test-mkpath/test-mkpath", F_OK));
        system("rm -rf test-mkpath");
    }

    Test _mkFilePath() {
        // Try creating a path with mkFilePath
        system("rm -rf test-mkpath");
        mkFilePath("test-mkpath/test-mkpath/file");
        assert(wibble::sys::fs::access("test-mkpath", F_OK));
        assert(wibble::sys::fs::access("test-mkpath/test-mkpath", F_OK));
        assert(!wibble::sys::fs::access("test-mkpath/test-mkpath/file", F_OK));
        system("rm -rf test-mkpath");
    }

    Test _deleteIfExists() {
	system("rm -f does-not-exist");
	assert(!deleteIfExists("does-not-exist"));
	system("touch does-exist");
	assert(deleteIfExists("does-exist"));
    }

    Test _isDirectory() {
	system("rm -rf testdir");
	assert(!isDirectory("testdir"));
	system("touch testdir");
	assert(!isDirectory("testdir"));
	system("rm testdir; mkdir testdir");
	assert(isDirectory("testdir"));
    }
};

// vim:set ts=4 sw=4:
