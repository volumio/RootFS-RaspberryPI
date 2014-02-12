/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/sys/mutex.h>
#include <wibble/sys/thread.h>

#include <wibble/test.h>

using namespace std;
using namespace wibble::sys;

struct TestThread {
    
    // Test threads that just assigns a value to an int and exists
    class Thread1 : public Thread
    {
    protected:
        int& res;
        int val;
        
        void* main()
        {
            res = val;
            return (void*)val;
        }
    public:
        Thread1(int& res, int val) : res(res), val(val) {}
    };
    
    // Thread that continuously increments an int value
    class Thread2 : public Thread
    {
    protected:
        int& res;
        Mutex& mutex;
        bool done;

        void* main()
        {
            while (!done)
            {
                MutexLock lock(mutex);
                ++res;
            }
            return 0;
        }

    public:
        Thread2(int& res, Mutex& mutex) :
            res(res), mutex(mutex), done(false) {}
        void quit() { done = true; }
    };

    // Test that threads are executed
    Test execution() {
	int val = 0;

	Thread1 assigner(val, 42);
	assigner.start();
	assert_eq(assigner.join(), (void*)42);
	assert_eq(val, 42);
    }

    // Use mutexes to access shared memory
    Test sharedMemory() {
        int val = 0;
        Mutex mutex;

        Thread2 incrementer(val, mutex);
        incrementer.start();

        bool done = false;
        while (!done)
        {
            MutexLock lock(mutex);
            if (val > 100)
		done = true;
        }
        incrementer.quit();
        assert_eq(incrementer.join(), (void*)0);
    }

};

// vim:set ts=4 sw=4:
