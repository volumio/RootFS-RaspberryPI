/* -*- C++ -*-
 * OO encapsulation of Posix threads
 *
 * Copyright (C) 2003--2008  Enrico Zini <enrico@debian.org>
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

#ifndef WIBBLE_SYS_THREAD_H
#define WIBBLE_SYS_THREAD_H

#include <wibble/sys/macros.h>
#include <wibble/exception.h>
#include <unistd.h>
#ifdef POSIX
#include <pthread.h>
#endif

#ifdef _WIN32
#include <windows.h>
#include <process.h>
#endif
#include <signal.h>

namespace wibble {
namespace sys {

static inline void sleep( int secs ) {
#ifdef _WIN32
    Sleep( secs * 1000 );
#else
    ::sleep( secs );
#endif
}

static inline void usleep( int usecs ) {
#ifdef _WIN32
    Sleep( usecs / 1000 );
#else
    ::usleep( usecs );
#endif
}

/**
 * Encapsulates a thread
 *
 * FIXME:  C++ resource management and thread cancellation
 *         C++ uses the "resource allocation is instantiation" way of managing
 *         resources: when a function exits, either by terminating or because
 *         an exception has been raised, destructors are called.
 *
 *         However, when a thread is canceled, the flow of control is
 *         interrupted and no exceptions are thrown.  Cleanup should be
 *         performed by registering cleanup functions, but a cleanup function
 *         can't usefully throw exceptions nor call destructors.
 *         At the moment, I don't know what to do to correctly release
 *         resources on thread cancellation.  I'm waiting for new ideas.
 *
 *         The current way out is not to use cancelation, but explicitly set
 *         some boolean exit condition:
 *
 * \code
 *         class MyThread
 *         {
 *             bool interrupted;
 *             void* main()
 *             {
 *                // do things
 *                if (interrupted)
 *                    throw MyInterruptedException();
 *                // do things
 *                while (!interrupted)
 *                {
 *                   // do things
 *                }
 *             }
 *             MyThread() : interrupted(false) {}
 *         }
 * \endcode
 */
class Thread
{
protected:
#ifdef POSIX
	pthread_t thread;
#endif

#ifdef _WIN32
  unsigned int thread;
  HANDLE hThread;
#endif

	/**
	 * Short tag describing this thread, used in error messages and
	 * identification
	 */
	virtual const char* threadTag() { return "generic"; }
	
	/** Main thread function, executed in the new thread after creation.
	 * When main() exits, the new thread ends and main() result will be the
	 * thread exit result
	 */
	virtual void* main() = 0;

	/// Callback function used to start the thread
#ifdef POSIX
	static void* Starter(void* parm);
#endif

#ifdef _WIN32
  static unsigned __stdcall Starter(void* parm);
#endif

	void testcancel();

public:
	virtual ~Thread() {}

	/// Start the thread
	void start();

	/// Start the thread in the detached state
	void startDetached();

	/// Join the thread
	void* join();

	/// Put the thread in the detached state
	void detach();

	/// Send a cancellation request to the thread
	void cancel();

	/// Sent a signal to the thread
	void kill(int signal);
};

}
}

// vim:set ts=4 sw=4:
#endif
