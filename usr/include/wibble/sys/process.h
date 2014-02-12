#ifndef WIBBLE_SYS_PROCESS_H
#define WIBBLE_SYS_PROCESS_H

/*
 * OO base class for process functions and child processes
 *
 * Copyright (C) 2003--2010  Enrico Zini <enrico@debian.org>
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
#include <sys/types.h>

namespace wibble {
namespace sys {
namespace process {

/// Pretty-print the return value of a process into a string
std::string formatStatus(int status);

/// Change working directory
void chdir(const std::string& dir);

/// Get the absolute path of the current working directory
std::string getcwd();

/// Change root directory
void chroot(const std::string& dir);

/// Change umask (always succeeds and returns the previous umask)
mode_t umask(mode_t mask);

/// Set user and group permissions
void setPerms(const std::string& user);
void setPerms(const std::string& user, const std::string& group);
void setPerms(uid_t user);
void setPerms(uid_t user, gid_t group);

/// Get current resource limits; store also maximum resource limits in max
/// if nonzero
int getCPUTimeLimit(int* max = 0);
int getFileSizeLimit(int* max = 0);
int getDataMemoryLimit(int* max = 0);
int getChildrenLimit(int* max = 0);
int getOpenFilesLimit(int* max = 0);
int getCoreSizeLimit(int* max = 0);

/// Set resource limits
void setCPUTimeLimit(int value);
void setFileSizeLimit(int value);
void setDataMemoryLimit(int value);
void setChildrenLimit(int value);
void setOpenFilesLimit(int value);
void setCoreSizeLimit(int value);

/// Close stdin, stdout and stderr and detach from the tty
void detachFromTTY();

/**
 * Call from main() if you intend to set a different process title later on
 *
 * On Linux, this function moves the environment to a different location to
 * allow its memory to be reused for the process title
 */
void initproctitle(int argc, char **argv);

/**
 * Change the process title, overwriting the contents of argv
 *
 * This is currently only implemented for Linux: on other systems it does not
 * do anything.
 */
void setproctitle(const std::string& title);

}
}
}

#endif

// vim:set ts=4 sw=4:
#endif
