// -*- C++ -*-
#include <wibble/sys/macros.h>

#ifdef POSIX

#include <unistd.h>
#include <sys/wait.h>
#include <cstring>
#include <sys/socket.h>
#include <cstdio>

#include <wibble/sys/pipe.h>

struct Main : RunFeedback {

    int suite, test;
    wibble::sys::Pipe p_status;
    wibble::sys::Pipe p_confirm;
    int status_fds[2];
    int confirm_fds[2];
    pid_t pid;
    int argc;
    char **argv;
    pid_t finished;
    int status_code;
    int test_ok;

    int suite_ok, suite_failed;
    int total_ok, total_failed;

    int announced_suite;
    std::string current;
    bool want_fork;

    RunAll all;

    Main() : suite(0), test(0) {
        suite_ok = suite_failed = 0;
        total_ok = total_failed = 0;
        test_ok = 0;
        announced_suite = -1;
    }

    void child() {
        close( status_fds[0] );
        close( confirm_fds[1] );
        p_confirm = wibble::sys::Pipe( confirm_fds[0] );
        if ( argc > 1 ) {
            RunSuite *s = all.findSuite( argv[1] );
            if (!s) {
                std::cerr << "No such suite " << argv[1] << std::endl;
                // todo dump possible suites?
                exit(250);
            }
            if ( argc > 2 ) {
                if ( !test ) {
                    char *end;
                    int t = strtol( argv[2], &end, 0 );
                    if ( end == argv[2] && t == 0 ) {
                        t = s->findTest( argv[2] );
                        if ( t < 0 ) {
                            std::cerr << "No such test " << argv[2]
                                      << " in suite " << argv[1] << std::endl;
                            // todo dump possible suites?
                            exit(250);
                        }
                    }
                    all.runTest( *s, t );
                }
            } else
                all.runSuite( *s, test, 0, 1 );
        }
        if ( argc == 1 ) {
            all.runFrom( suite, test );
        }
        status( "done" );
        exit( 0 );
    }

    void testDied()
    {
        /* std::cerr << "test died: " << test << "/"
           << suites[suite].testCount << std::endl; */
        if ( WIFEXITED( status_code ) ) {
            if ( WEXITSTATUS( status_code ) == 250 )
                exit( 3 );
            if ( WEXITSTATUS( status_code ) == 0 )
                return;
        }
        std::cout << "--> FAILED: "<< current;
        if ( WIFEXITED( status_code ) )
            std::cout << " (exit status " << WEXITSTATUS( status_code ) << ")";
        if ( WIFSIGNALED( status_code ) )
            std::cout << " (caught signal " << WTERMSIG( status_code ) << ")";
        std::cout << std::endl;
        // re-announce the suite
        announced_suite --;
        ++ test; // continue with next test
        test_ok = 0;
        suite_failed ++;
    }

    void processStatus( std::string line ) {
        // std::cerr << line << std::endl;
        if ( line == "done" ) { // finished
            if ( want_fork ) {
                finished = waitpid( pid, &status_code, 0 );
                assert_eq( pid, finished );
                assert( WIFEXITED( status_code ) );
                assert_eq( WEXITSTATUS( status_code ), 0 );
            }
            std::cout << "overall " << total_ok << "/"
                      << total_ok + total_failed
                      << " ok" << std::endl;
            exit( total_failed == 0 ? 0 : 1 );
        }

        if ( test_ok ) {
            /* std::cerr << "test ok: " << test << "/"
               << suites[suite].testCount << std::endl; */
            std::cout << "." << std::flush;
            suite_ok ++;
            ++ test;
            test_ok = 0;
        }

        if ( line[0] == 's' ) {
            if ( line[2] == 'd' ) {
                std::cout << " " << suite_ok << "/" << suite_ok + suite_failed
                          << " ok" << std::endl;
                ++ suite; test = 0;
                assert( !test_ok );
                total_ok += suite_ok;
                total_failed += suite_failed;
                suite_ok = suite_failed = 0;
            }
            if ( line[2] == 's' ) {
                if ( announced_suite < suite ) {
                    std::cout << std::string( line.begin() + 5, line.end() )
                              << ": " << std::flush;
                    announced_suite = suite;
                }
            }
        }
        if ( line[0] == 't' ) {
            if ( line[2] == 'd' ) {
                confirm();
                test_ok = 1;
            }
            if ( line[2] == 's' ) {
                confirm();
                current = std::string( line.begin() + 5, line.end() );
            }
        }
    }

    void parent() {
        close( status_fds[1] );
        close( confirm_fds[0] );
        p_status = wibble::sys::Pipe( status_fds[ 0 ]);
        std::string line;

        while ( true ) {
            if ( p_status.eof() ) {
                finished = waitpid( pid, &status_code, 0 );
                if ( finished < 0 ) {
                    perror( "waitpid failed" );
                    exit( 5 );
                }
                assert_eq( pid, finished );
                testDied();
                return;
            }

            line = p_status.nextLineBlocking();
            processStatus( line );
        }
    }

    void status( std::string line ) {
        // std::cerr << "status: " << line << std::endl;
        if ( want_fork ) {
            line += "\n";
            ::write( status_fds[ 1 ], line.c_str(), line.length() );
        } else
            processStatus( line );
    }

    void confirm() {
        std::string line( "ack\n" );
        if ( want_fork )
            ::write( confirm_fds[ 1 ], line.c_str(), line.length() );
    }

    void waitForAck() {
        if ( want_fork ) {
            std::string line = p_confirm.nextLineBlocking();
            assert_eq( std::string( "ack" ), line );
        }
    }

    int main( int _argc, char **_argv )
    {
        argc = _argc;
        argv = _argv;

        all.suiteCount = sizeof(suites)/sizeof(RunSuite);
        all.suites = suites;
        all.feedback = this;
        want_fork = argc <= 2;

        while (true) {
            if ( socketpair( PF_UNIX,SOCK_STREAM, 0, status_fds ) )
                return 1;
            if ( socketpair( PF_UNIX,SOCK_STREAM, 0, confirm_fds ) )
                return 1;
            if ( want_fork ) {
                pid = fork();
                if ( pid < 0 )
                    return 2;
                if ( pid == 0 ) { // child
                    child();
                } else {
                    parent();
                }
            } else
                child();
        }
    }
};

int main( int argc, char **argv ) {
    return Main().main( argc, argv );
}

#else
#include <iostream>

int main( int argc, char **argv ) {
    std::cerr << "Sorry, test runner not implemented on this non-POSIX platform." << std::endl;
    return 0;
}

#endif
