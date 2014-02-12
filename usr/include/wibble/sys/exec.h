#ifndef EXEC_H
#define EXEC_H

/*
 * OO wrapper for execve
 *
 * Copyright (C) 2003  Enrico Zini <enrico@debian.org>
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

#include <wibble/sys/childprocess.h>

namespace wibble {
namespace sys {

/**
 * Execute external commands, either forked as a ChildProcess or directly using
 * exec().
 */
class Exec : public ChildProcess
{
protected:
	/**
	 * Used to run the program as a child process, if one of the
	 * ChildProcess::fork functions is called. Simply calls exec()
	 */
	virtual int main();

public:
	virtual ~Exec() {}

	/**
	 * Filename or pathname of the program to execute.
	 *
	 * If searchInPath is true, this just needs to be the file name.
	 * Otherwise, it needs to be the absolute path of the file to execute.
	 */
	std::string pathname;

	/**
	 * Arguments for the process to execute.
	 *
	 * args[0] will be passed as the name of the child process
	 */
	std::vector<std::string> args;

	/**
	 * Custom environment for the child process, if envFromParent is false.
	 */
	std::vector<std::string> env;

	/**
	 * True if the environment is to be taken from the parent, false if it is
	 * explicitly provided in env
	 */
	bool envFromParent;

	/**
	 * Set to true if the file is to be searched in the current $PATH.
	 *
	 * If this is set to true, the environment will always be taken from the
	 * parent regardless of the values of envFromParent and env.
	 */
	bool searchInPath;

	/// Create a new object that will execute program `program'
	Exec(const std::string& pathname)
		: pathname(pathname), envFromParent(true), searchInPath(false)
	{
		args.push_back(pathname);
	}

	/// Import the current environment into env
	void importEnv();

	/// exec the program, never returning if all goes well
	void exec();
};

/**
 * Execute a shell command using /bin/sh -c
 */
class ShellCommand : public Exec
{
public:
	ShellCommand(const std::string& cmd) : Exec("/bin/sh")
	{
		args.push_back("-c");
		args.push_back(cmd);
		searchInPath = false;
		envFromParent = true;
	}
};

}
}

// vim:set ts=4 sw=4:
#endif
