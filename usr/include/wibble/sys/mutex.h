#ifndef WIBBLE_SYS_MUTEX_H
#define WIBBLE_SYS_MUTEX_H

/*
 * Encapsulated pthread mutex and condition
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

#include <wibble/sys/macros.h>
#include <wibble/exception.h>
#ifdef POSIX
#include <pthread.h>
#endif

#ifdef _WIN32
#include <windows.h>
#include <queue>
#include <time.h>
struct timespec 
{
  time_t   tv_sec;        /* seconds */
  long     tv_nsec;       /* nanoseconds */
};
#endif
#include <errno.h>

namespace wibble {
namespace sys {

/**
 * pthread mutex wrapper; WARNING: the class allows copying and assignment,
 * but this is not always safe. You should never copy a locked mutex. It is
 * however safe to copy when there is no chance of any of the running threads
 * using the mutex.
 */
class Mutex
{
protected:
#ifdef POSIX
	pthread_mutex_t mutex;
#endif

#ifdef _WIN32
  HANDLE mutex;
  bool singlylocking;
#endif
	
public:
  Mutex(bool recursive = false)
	{
    int res = 0;
#ifdef POSIX
            pthread_mutexattr_t attr;
            pthread_mutexattr_init( &attr );
            if ( recursive ) {
#if (__APPLE__ || __xlC__)
                pthread_mutexattr_settype( &attr, PTHREAD_MUTEX_RECURSIVE );
#else
                pthread_mutexattr_settype( &attr, PTHREAD_MUTEX_RECURSIVE_NP );
#endif
            }
    res = pthread_mutex_init(&mutex, &attr);
#endif

#ifdef _WIN32
    mutex = CreateMutex( NULL, FALSE, NULL );
    singlylocking = false;
    
    if (mutex == NULL)
      res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "creating pthread mutex");
	}

  Mutex( const Mutex & m )
	{
    int res = 0;
#ifdef POSIX
            pthread_mutexattr_t attr;
            pthread_mutexattr_init( &attr );
            res = pthread_mutex_init(&mutex, &attr);
#endif

#ifdef _WIN32
    mutex = CreateMutex(NULL, FALSE, NULL);
    singlylocking = false;
    
    if(mutex == NULL)
      res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "creating pthread mutex");
	}

	~Mutex()
	{
		int res = 0;
#ifdef POSIX
		res = pthread_mutex_destroy(&mutex);
#endif

#ifdef _WIN32
      if(!CloseHandle(mutex))
        res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "destroying pthread mutex");
	}

        bool trylock()
        {
    		int res = 0;
#ifdef POSIX
    		res = pthread_mutex_trylock(&mutex);
    		if ( res == EBUSY )
    			return false;
    		if ( res == 0 )
    		  return true;
#endif

#ifdef _WIN32
		DWORD dwWaitResult = !singlylocking ? WaitForSingleObject(mutex, 0) : WAIT_TIMEOUT;
		if(dwWaitResult == WAIT_OBJECT_0)
		  return true;
		if(dwWaitResult == WAIT_TIMEOUT)
      return false;
    res = (int)GetLastError();		  
#endif
    		throw wibble::exception::System(res, "(try)locking pthread mutex");
        }

	/// Lock the mutex
	/// Normally it's better to use MutexLock
	void lock()
	{
		int res = 0;
#ifdef POSIX
		res = pthread_mutex_lock(&mutex);
#endif

#ifdef _WIN32
    while(singlylocking)
      Sleep(1);
    if(WaitForSingleObject(mutex, INFINITE) != WAIT_OBJECT_0)
      res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "locking pthread mutex");
	}

	/// Unlock the mutex
	/// Normally it's better to use MutexLock
	void unlock()
	{
		int res = 0;
#ifdef POSIX
		res = pthread_mutex_unlock(&mutex);
#endif

#ifdef _WIN32
	  if(!ReleaseMutex(mutex))
      res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "unlocking pthread mutex");
	}

	/// Reinitialize the mutex
	void reinit()
	{
#ifdef POSIX
		if (int res = pthread_mutex_init(&mutex, 0))
			throw wibble::exception::System(res, "reinitialising pthread mutex");
#endif
	}

	friend class Condition;
};

/**
 * Acquire a mutex lock, RAII-style
 */
template< typename Mutex >
class MutexLockT
{
private:
	// Disallow copy
	MutexLockT(const MutexLockT&);
	MutexLockT& operator=(const MutexLockT&);

public:
	Mutex& mutex;
        bool locked;
        bool yield;

        MutexLockT(Mutex& m) : mutex(m), locked( false ), yield( false ) {
            mutex.lock();
            locked = true;
        }

	~MutexLockT() {
            if ( locked ) {
                mutex.unlock();
                checkYield();
            }
        }

        void drop() {
            mutex.unlock();
            locked = false;
            checkYield();
        }
        void reclaim() { mutex.lock(); locked = true; }
        void setYield( bool y ) {
            yield = y;
        }

        void checkYield() {

            if ( yield )
#ifdef POSIX
                sched_yield();
#elif _WIN32
                Sleep(0);
#else
		;
#endif
        }

	friend class Condition;
};

typedef MutexLockT< Mutex > MutexLock;

/*
 * pthread condition wrapper.
 *
 * It works in association with a MutexLock.
 *
 * WARNING: the class allows copying and assignment; see Mutex: similar caveats
 * apply. Do not copy or assign a Condition that may be in use.
 */
class Condition
{
protected:
#ifdef POSIX
  pthread_cond_t cond;
#endif

#ifdef _WIN32
  int waiters_count_; // number of waiting threads
  CRITICAL_SECTION waiters_count_lock_;
  HANDLE sema_; // semaphore used to queue up threads waiting for the condition
  HANDLE waiters_done_;
  // An auto-reset event used by the broadcast/signal thread to wait
  // for all the waiting thread(s) to wake up and be released from the
  // semaphore. 

  bool was_broadcast_;
  // Keeps track of whether we were broadcasting or signaling.  This
  // allows us to optimize the code if we're just signaling.
#endif

public:
	Condition()
	{
		int res = 0;
#ifdef POSIX
		res = pthread_cond_init(&cond, 0);
#endif

#ifdef _WIN32
    waiters_count_ = 0;
	  was_broadcast_ = false;
    sema_ = CreateSemaphore(NULL, 0, 0x7fffffff, NULL);
	  InitializeCriticalSection(&waiters_count_lock_);
	  waiters_done_ = CreateEvent(NULL, FALSE, FALSE, NULL);

    if(sema_ == NULL || waiters_done_ == NULL)
      res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "creating pthread condition");
	}

  Condition( const Condition & con )
	{
		int res = 0;
#ifdef POSIX
		res = pthread_cond_init(&cond, 0);
#endif

#ifdef _WIN32
    waiters_count_ = 0;
	  was_broadcast_ = false;
    sema_ = CreateSemaphore(NULL, 0, 0x7fffffff, NULL);
	  InitializeCriticalSection(&waiters_count_lock_);
	  waiters_done_ = CreateEvent(NULL, FALSE, FALSE, NULL);

    if(sema_ == NULL || waiters_done_ == NULL)
      res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "creating pthread condition");
	}

	~Condition()
	{
		int res = 0;
#ifdef POSIX
		res = pthread_cond_destroy(&cond);
#endif

#ifdef _WIN32
    DeleteCriticalSection(&waiters_count_lock_);
    if(!CloseHandle(sema_) || !CloseHandle(waiters_done_))
      res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "destroying pthread condition");
	}

	/// Wake up one process waiting on the condition
	void signal()
	{
		int res = 0;
#ifdef POSIX
		res = pthread_cond_signal(&cond);
#endif

#ifdef _WIN32
    EnterCriticalSection(&waiters_count_lock_);
      bool have_waiters = waiters_count_ > 0;
	  LeaveCriticalSection(&waiters_count_lock_);

	  // if there aren't any waiters, then this is a no-op
	  if(have_waiters && !ReleaseSemaphore(sema_, 1, 0))
		  res = (int)GetLastError();
#endif
		if (res != 0)
			throw wibble::exception::System(res, "signaling on a pthread condition");
	}

	/// Wake up all processes waiting on the condition
	void broadcast()
	{
    int res = 0;
#ifdef POSIX
		res = pthread_cond_broadcast(&cond);
#endif

#ifdef _WIN32
    for(bool once = true; once; once = false)
    {
      EnterCriticalSection(&waiters_count_lock_);
	    bool have_waiters = false;

	    if(waiters_count_ > 0) {
        was_broadcast_ = true;
        have_waiters = true;
	    }

	    if(have_waiters) {
        if(!ReleaseSemaphore(sema_, waiters_count_, 0)) {
          res = (int)GetLastError();
          break;
        }
		    LeaveCriticalSection(&waiters_count_lock_); 
		    if(WaitForSingleObject(waiters_done_, INFINITE) != WAIT_OBJECT_0) {
          res = (int)GetLastError();
          break;
        }
		    was_broadcast_ = false;
      }
	    else
		    LeaveCriticalSection(&waiters_count_lock_);
		}
#endif
		if (res != 0)
			throw wibble::exception::System(res, "broadcasting on a pthread condition");
	}

	/**
	 * Wait on the condition, locking with l.  l is unlocked before waiting and
	 * locked again before returning.
	 */
    void wait(MutexLock& l)
	{
		int res = 0;
#ifdef POSIX
		res = pthread_cond_wait(&cond, &l.mutex.mutex);
#endif

#ifdef _WIN32
    for(bool once = true; once; once = false)
    {
      EnterCriticalSection (&waiters_count_lock_);
        waiters_count_++;
	    LeaveCriticalSection (&waiters_count_lock_);

	    if(SignalObjectAndWait(l.mutex.mutex, sema_, INFINITE, FALSE) != WAIT_OBJECT_0) {
	      res = (int)GetLastError();
	      break;
	    }

	    EnterCriticalSection (&waiters_count_lock_);
        waiters_count_--;
	      bool last_waiter = was_broadcast_ && waiters_count_ == 0;
	    LeaveCriticalSection (&waiters_count_lock_);

      if (last_waiter) {
		    if(SignalObjectAndWait (waiters_done_, l.mutex.mutex, INFINITE, FALSE) != WAIT_OBJECT_0)
        {
	        res = (int)GetLastError();
	        break;
	      }
	    }
	    else {
		    if(WaitForSingleObject (l.mutex.mutex, INFINITE) != WAIT_OBJECT_0)
        {
	        res = (int)GetLastError();
	        break;
	      }
	    }
    }
#endif
		if (res != 0)
			throw wibble::exception::System(res, "waiting on a pthread condition");
	}

	void wait(Mutex& l)
	{
		int res = 0;
#ifdef POSIX
		res = pthread_cond_wait(&cond, &l.mutex);
#endif

#ifdef _WIN32
    for(bool once = true; once; once = false)
    {
      if(WaitForSingleObject(l.mutex, 0) == WAIT_OBJECT_0) {
        l.singlylocking = true;
        while(ReleaseMutex(l.mutex)) ;
        if ((res = ((int)GetLastError() != 288))) //288 -> MUTEX_NOT_OWNED
          break;
      }
      if(WaitForSingleObject(l.mutex, INFINITE) != WAIT_OBJECT_0) {
        res = (int)GetLastError();
        break;
      }
      l.singlylocking = false;
      
      EnterCriticalSection (&waiters_count_lock_);
        waiters_count_++;
	    LeaveCriticalSection (&waiters_count_lock_);

	    if(SignalObjectAndWait(l.mutex, sema_, INFINITE, FALSE) != WAIT_OBJECT_0) {
	      res = (int)GetLastError();
	      break;
	    }

	    EnterCriticalSection (&waiters_count_lock_);
        waiters_count_--;
	      bool last_waiter = was_broadcast_ && waiters_count_ == 0;
	    LeaveCriticalSection (&waiters_count_lock_);

      if(last_waiter) {
		    if(SignalObjectAndWait (waiters_done_, l.mutex, INFINITE, FALSE) != WAIT_OBJECT_0) {
	        res = (int)GetLastError();
	        break;
	      }
	    }
	    else {
		    if(WaitForSingleObject(l.mutex, INFINITE) != WAIT_OBJECT_0) {
	        res = (int)GetLastError();
	        break;
	      }
	    }
    }
#endif
		if (res != 0)
			throw wibble::exception::System(res, "waiting on a pthread condition");
	}

	/**
	 * Wait on the condition, locking with l.  l is unlocked before waiting and
	 * locked again before returning.  If the time abstime is reached before
	 * the condition is signaled, then l is locked and the function returns
	 * false.
	 *
	 * @returns
	 *   true if the wait succeeded, or false if the timeout was reached before
	 *   the condition is signaled.
	 */
	bool wait(MutexLock& l, const struct timespec& abstime);
};

}
}

// vim:set ts=4 sw=4:
#endif
