/* -*- C++ -*- (c) 2009 Enrico Zini <enrico@enricozini.org> */
#include <wibble/sys/signal.h>
#include <set>
#include <cstdlib>
#include <unistd.h>

#include <wibble/test.h>

using namespace std;
using namespace wibble::sys;

static int counter;
static void test_signal_action(int signum)
{
	++counter;
}

struct TestSignal {
    Test sigAction() {
	    struct sigaction a;
	    a.sa_handler = test_signal_action;
	    sigemptyset(&a.sa_mask);
	    a.sa_flags = 0;

	    counter = 0;

	    sig::Action act(SIGUSR1, a);
	    kill(getpid(), SIGUSR1);
	    assert_eq(counter, 1);
    }

    Test sigProcMask() {
	    sigset_t blocked;
	    struct sigaction a;
	    a.sa_handler = test_signal_action;
	    sigemptyset(&a.sa_mask);
	    a.sa_flags = 0;

	    sigemptyset(&blocked);
	    sigaddset(&blocked, SIGUSR1);

	    counter = 0;

	    sig::Action act(SIGUSR1, a);
	    {
		    sig::ProcMask mask(blocked);
		    kill(getpid(), SIGUSR1);
		    assert_eq(counter, 0);
	    }
	    assert_eq(counter, 1);
    }
};

// vim:set ts=4 sw=4:
