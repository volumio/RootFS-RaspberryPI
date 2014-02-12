#ifndef WIBBLE_SYS_FILELOCK_H
#define WIBBLE_SYS_FILELOCK_H

#include <fcntl.h>

namespace wibble {
namespace sys {
namespace fs {

/**
 * RAII fcntl advisory file lock
 *
 * See fcntl(2) for details.
 */
struct FileLock
{
	int fd;
	struct flock lock;

	/**
	 * Create the lockfile with the given name.
	 *
	 * \a lock will be initialised with the parameters and used to unlock
	 * in the destructor. Please feel free to change the contents of the \a
	 * lock structure if you need a different part to be unlocked.
	 *
	 * @param write
	 *   If false, use a read lock, else a write lock.
	 */
	FileLock(int fd, short l_type, short l_whence=SEEK_SET, off_t l_start=0, off_t l_len=0);

	/**
	 * Unlocks using the values in \a lock
	 */
	~FileLock();

private:
	// Disallow copying
	FileLock(const FileLock&);
	FileLock& operator=(const FileLock&);
};

}
}
}

// vim:set ts=4 sw=4:
#endif
