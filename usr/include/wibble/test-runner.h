// -*- C++ -*-
#include <wibble/sys/macros.h>

#include <unistd.h>
#ifdef POSIX
#include <wibble/sys/pipe.h>
#endif
#include <cstdio>

#define RUN(x, y) x().y()

struct RunTest {
    const char *name;
    void (*run)();
};

struct RunSuite {
    const char *name;
    RunTest *tests;
    int testCount;

    int findTest( std::string name ) {
        for ( int i = 0; i < testCount; ++i )
            if ( tests[i].name == name )
                return i;
        return -1;
    }

};

struct RunFeedback {
    virtual void status( std::string l ) = 0;
    virtual void waitForAck() = 0;
};

#ifdef POSIX
struct RunAll {
    RunSuite *suites;
    int suiteCount;
    RunFeedback *feedback;

    RunSuite *findSuite( std::string name ) {
        for ( int i = 0; i < suiteCount; ++i )
            if ( suites[i].name == name )
                return suites + i;
        return 0;
    }

    void runSuite( RunSuite &s, int fromTest, int suite, int suiteCount )
    {
        feedback->status( wibble::str::fmtf(
            "s/s: (%d/%d) %s", suite + 1, suiteCount, s.name ) );
        for ( int i = fromTest; i < s.testCount; ++i ) {
            feedback->status( wibble::str::fmtf(
                "t/s: (%d/%d) %s", i, s.testCount, s.tests[i].name ) );
            feedback->waitForAck();
            s.tests[i].run();
            feedback->status( std::string( "t/d: " ) + s.tests[i].name );
            feedback->waitForAck();
            // exit( 0 ); // TODO make this optional; safety vs
                          // performance tradeoff
        }
        feedback->status( std::string( "s/d: " ) + s.name );
    }

    void runTest( RunSuite &s, int test )
    {
        feedback->status( std::string( "s/s: (1/1) " ) + s.name );
        feedback->status( std::string( "t/s: (1/1) " ) + s.tests[test].name );
        feedback->waitForAck();
        s.tests[test].run();
        feedback->status( std::string( "t/d: " ) + s.tests[test].name );
        feedback->waitForAck();
        feedback->status( std::string( "s/d: " ) + s.name );
    }

    void runFrom( int suite, int test )
    {
        for ( int i = suite; i < suiteCount; ++i ) {
            assert( suite <= suiteCount );
            runSuite( suites[i], test, i, suiteCount );
            test = 0;
        }
    }
};
#endif
