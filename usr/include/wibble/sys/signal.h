// -*- C++ -*-
#ifndef WIBBLE_SYS_SIGNAL_H
#define WIBBLE_SYS_SIGNAL_H

#include <wibble/sys/macros.h>
#include <wibble/exception.h>
#include <signal.h>

namespace wibble {
namespace sys {
namespace sig {

/**
 * RAII-style sigprocmask wrapper
 */
struct ProcMask
{
#ifdef POSIX
	sigset_t oldset;
#else
#define SIG_BLOCK 0 // FIXME, is this reasonable?
#endif
	ProcMask(const sigset_t& newset, int how = SIG_BLOCK)
	{
#ifdef POSIX
		if (sigprocmask(how, &newset, &oldset) < 0)
			throw wibble::exception::System("setting signal mask");
#else
                assert_die();
#endif
	}
	~ProcMask()
	{
#ifdef POSIX
		if (sigprocmask(SIG_SETMASK, &oldset, NULL) < 0)
			throw wibble::exception::System("restoring signal mask");
#endif
	}
};

struct Action
{
	int signum;
#ifdef POSIX
	struct sigaction oldact;
#endif

	Action(int signum, const struct sigaction& act) : signum(signum)
	{
#ifdef POSIX
		if (sigaction(signum, &act, &oldact) < 0)
			throw wibble::exception::System("setting signal action");
#else
                assert_die();
#endif
	}
	~Action()
	{
#ifdef POSIX
		if (sigaction(signum, &oldact, NULL) < 0)
			throw wibble::exception::System("restoring signal action");
#endif
	}
};

}
}
}

// vim:set ts=4 sw=4:
#endif
