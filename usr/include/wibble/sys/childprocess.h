#ifndef WIBBLE_SYS_CHILDPROCESS_H
#define WIBBLE_SYS_CHILDPROCESS_H

/*
 * OO base class for process functions and child processes
 *
 * Copyright (C) 2003--2006  Enrico Zini <enrico@debian.org>
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

#include <sys/types.h>
#include <wibble/exception.h>
#include <wibble/sys/macros.h>

struct rusage;

namespace wibble {
namespace sys {

/**
 * Fork a child process
 */
class ChildProcess
{
protected:
	pid_t _pid;
        int m_status;
        void waitError();

	/**
	 * Main function to be called in the child process after it has forked
	 */
	// TODO: since the destructor is called twice (one in the parent and one in
	// the child), it could be useful to add a bool isChild() method to let the
	// destructor and other functions know where they are operating.  The value
	// returned can be set by ChildProcess::fork.
	virtual int main() = 0;

public:
	ChildProcess() : _pid(-1) {}
	virtual ~ChildProcess() {}

	/// For a subprocess to run proc.
	pid_t fork();

	/// Fork a subprocess to run proc.  If one of the std*fd variables is
	/// non-null, create a pipe connected to the corresponding file descriptor
	/// of the child process and store the parent end in the std*fd variable.
	pid_t forkAndRedirect(int* stdinfd = 0, int* stdoutfd = 0, int* stderrfd = 0);

    /**
     * Get the pid of the child process or (pid_t)-1 if no child is running
     *
     * Note: while ChildProcess::kill() has a safeguard against killing pid -1,
     * if you are going to run ::kill on the output of pid() make sure to check
     * what is the semanthics of kill() when pid is -1.
     */
    pid_t pid() const { return _pid; }

	/// Wait for the child to finish, returing its exit status.  Return -1 if
	/// no child is running.
	/// TODO: gracefully handle the EINTR error code
	int wait();

        bool running();
        int exitStatus();
        void waitForSuccess();

	/// Wait for the child to finish, returing its exit status and storing
	/// resource usage informations in `ru'.  Return -1 if no child is running.
	/// TODO: gracefully handle the EINTR error code
	int wait(struct rusage* ru);

	/// Send the given signal to the process
	void kill(int signal);
};

}
}

// vim:set ts=4 sw=4:
#endif
