#ifndef WIBBLE_SYS_LOCKFILE_H
#define WIBBLE_SYS_LOCKFILE_H

#include <wibble/sys/macros.h>
#include <string>

namespace wibble {
namespace sys {
namespace fs {

/**
 * RAII lock file
 *
 * It is implemented using fcntl, so that it should also work over network file
 * systems.  It should work at least on NFS and GFS.
 */
struct Lockfile
{
	std::string name;
	int fd;

	/**
	 * Create the lockfile with the given name.
	 *
	 * @param write
	 *   If false, use a read lock, else a write lock.
	 */
	Lockfile(const std::string& name, bool write = true);
	~Lockfile();

private:
	// Disallow copying
	Lockfile(const Lockfile&);
	Lockfile& operator=(const Lockfile&);
};

}
}
}

// vim:set ts=4 sw=4:
#endif
