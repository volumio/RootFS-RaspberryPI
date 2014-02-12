/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
   (c) 2007 Enrico Zini <enrico@enricozini.org> */
#include <wibble/sys/childprocess.h>

#ifdef POSIX
#include <wibble/sys/process.h>
#include <wibble/sys/exec.h>
#include <cstdlib>
#include <iostream>
#include <unistd.h>

#include <wibble/test.h>


using namespace std;
using namespace wibble::sys;

class EndlessChild : public ChildProcess
{
protected:
    int main()
    {
        while (true)
            sleep(60);
        return 0;
    }
};

class TestChild : public ChildProcess
{
protected:
    int main()
    {
        cout << "antani" << endl;
        return 0;
    }
};

std::string suckFd(int fd)
{
    std::string res;
    char c;
    while (true)
    {
        int r = read(fd, &c, 1);
        if (r == 0)
            break;
        if (r < 0)
            throw wibble::exception::System("reading data from file descriptor");
        res += c;
    }
    return res;
}

struct TestChildprocess {

    // Try running the child process and kill it
    Test kill() {
        EndlessChild child;

        // Start the child
        pid_t pid = child.fork();

        // We should get a nonzero pid
        assert(pid != 0);

        // Send SIGQUIT
        child.kill(2);

        // Wait for the child to terminate
        int res = child.wait();

        // Check that it was indeed terminated by signal 2
        assert(WIFSIGNALED(res));
        assert_eq(WTERMSIG(res), 2);
    }

    // Try getting the output of the child process
    Test output() {
        TestChild child;
        int out;

        // Fork the child redirecting its stdout
        pid_t pid = child.forkAndRedirect(0, &out, 0);
        assert(pid != 0);

        // Read the child output
        assert_eq(suckFd(out), "antani\n");

        // Wait for the child to terminate
        assert_eq(child.wait(), 0);
    }

    Test redirect() {
        Exec child("/bin/echo");
        child.args.push_back("antani");
        int out;
	
        // Fork the child redirecting its stdout
        pid_t pid = child.forkAndRedirect(0, &out, 0);
        assert(pid != 0);

        // Read the child output
        assert_eq(suckFd(out), "antani\n");

        // Wait for the child to terminate
        assert_eq(child.wait(), 0);
    }

    Test shellCommand() {
        ShellCommand child("A=antani; echo $A");
        int out;
	
        // Fork the child redirecting its stdout
        pid_t pid = child.forkAndRedirect(0, &out, 0);
        assert(pid != 0);

        // Read the child output
        assert_eq(suckFd(out), "antani\n");

        // Wait for the child to terminate
        assert_eq(child.wait(), 0);
    }

};
#endif
// vim:set ts=4 sw=4:
