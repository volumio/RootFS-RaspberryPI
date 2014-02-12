/* -*- C++ -*-
 * Generic base exception hierarchy
 * 
 * Copyright (C) 2003,2004,2005,2006  Enrico Zini <enrico@debian.org>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307  USA
 */

#include <wibble/test.h>
#include <wibble/exception.h>
#include <errno.h>
#include <unistd.h>

using namespace std;
namespace wex = wibble::exception;

struct TestException {
    Test generic()
    {
        try {
            throw wex::Generic("antani");
        } catch ( std::exception& e ) {
            assert(string(e.what()).find("antani") != string::npos);
        }
        
        try {
            throw wex::Generic("antani");
        } catch ( wex::Generic& e ) {
            assert(e.fullInfo().find("antani") != string::npos);
        }
    }

    Test system() 
    {
        try {
            assert_eq(access("does-not-exist", F_OK), -1);
            throw wex::System("checking for existance of nonexisting file");
        } catch ( wibble::exception::System& e ) {
            // Check that we caught the right value of errno
            assert_eq(e.code(), ENOENT);
        }
        
        try {
            assert_eq(access("does-not-exist", F_OK), -1);
            throw wex::File("does-not-exist", "checking for existance of nonexisting file");
        } catch ( wex::File& e ) {
            // Check that we caught the right value of errno
            assert_eq(e.code(), ENOENT);
            assert(e.fullInfo().find("does-not-exist") != string::npos);
        }
    }

    Test badCast()
    {
        int check = -1;
        try {
            check = 0;
            throw wex::BadCastExt< int, const char * >( "test" );
            check = 1;
        } catch ( wex::BadCast& e ) {
            assert_eq( e.fullInfo(),
                       "bad cast: from i to PKc. Context:\n    test" );
            check = 2;
        }
        assert_eq( check, 2 );
    }

    Test addContext() {
        wex::AddContext ctx( "toplevel context" );
        int check = -1;
        try {
            wex::AddContext ctx( "first context" );
            check = 0;
            {
                wex::AddContext ctx( "second context" );
                throw wex::Generic( "foobar" );
            }
        } catch( wex::Generic &e ) {
            assert_eq( e.formatContext(), "toplevel context, \n    "
                       "first context, \n    "
                       "second context, \n    "
                       "foobar" );
            check = 2;
        }
        assert_eq( check, 2 );
    }
};

// vim:set ts=4 sw=4:
