#ifndef WIBBLE_SYS_DIRECTORY_H
#define WIBBLE_SYS_DIRECTORY_H

#include <string>
#include <dirent.h>		// opendir, closedir
#include <memory>		// auto_ptr
#include <sys/types.h>		// mode_t
#include <sys/stat.h>		// struct stat

struct stat;

namespace wibble {
namespace sys {
namespace fs {

/**
 * stat() the given file and return the struct stat with the results.
 * If the file does not exist, return NULL.
 * Raises exceptions in case of errors.
 */
std::auto_ptr<struct stat> stat(const std::string& pathname);

/// access() a filename
bool access(const std::string& s, int m);

/// Same as access(s, F_OK);
bool exists(const std::string& s);

/**
 * Get the absolute path of a file
 */
std::string abspath(const std::string& pathname);

/// Create the given directory, if it does not already exists.
/// It will complain if the given pathname already exists but is not a
/// directory.
void mkdirIfMissing(const std::string& dir, mode_t mode);

/// Create all the component of the given directory, including the directory
/// itself.
void mkpath(const std::string& dir);

/// Ensure that the path to the given file exists, creating it if it does not.
/// The file itself will not get created.
void mkFilePath(const std::string& file);

/// Read whole file into memory. Throws exceptions on failure.
std::string readFile(const std::string &file);

/// Write \a data to \a file, replacing existing contents if it already exists
void writeFile(const std::string &file, const std::string &data);

/**
 * Delete a file if it exists. If it does not exist, do nothing.
 *
 * @return true if the file was deleted, false if it did not exist
 */
bool deleteIfExists(const std::string& file);

/// Move \a src to \a dst, without raising exception if \a src does not exist
void renameIfExists(const std::string& src, const std::string& dst);

/// Delete the file
void unlink(const std::string& fname);

/// Remove the directory using rmdir(2)
void rmdir(const std::string& dirname);

/// Delete the directory \a dir and all its content
void rmtree(const std::string& dir);

/**
 * Returns true if the given pathname is a directory, else false.
 *
 * It also returns false if the pathname does not exist.
 */
bool isdir(const std::string& pathname);

/// same as isdir, but with a legacy clumsy name
bool isDirectory(const std::string& pathname) __attribute__ ((deprecated));

/// Nicely wrap access to directories
class Directory
{
	std::string m_path;

public:
	class const_iterator
	{
		DIR* dir;
		struct dirent* d;

	public:
		// Create an end iterator
		const_iterator() : dir(0), d(0) {}
		// Create a begin iterator
		const_iterator(DIR* dir) : dir(dir), d(0) { ++(*this); }
		// Cleanup properly
		~const_iterator() { if (dir) closedir(dir); }

		// auto_ptr style copy semantics
		const_iterator(const const_iterator& i)
		{
			dir = i.dir;
			d = i.d;
			const_iterator* wi = const_cast<const_iterator*>(&i);
			wi->dir = 0;
			wi->d = 0;
		}
		const_iterator& operator=(const const_iterator& i)
		{
			// Catch a = a
			if (&i == this) return *this;
			if (dir) closedir(dir);
			dir = i.dir;
			d = i.d;
			const_iterator* wi = const_cast<const_iterator*>(&i);
			wi->dir = 0;
			wi->d = 0;
                        return *this;
		}

		const_iterator& operator++()
		{
			if ((d = readdir(dir)) == 0)
			{
				closedir(dir);
				dir = 0;
			}
			return *this;
		}

		std::string operator*() const { return d->d_name; }
		struct dirent* operator->() { return d; }
		const struct dirent* operator->() const { return d; }

		bool operator==(const const_iterator& iter) const
		{
			return dir == iter.dir && d == iter.d;
		}
		bool operator!=(const const_iterator& iter) const
		{
			return dir != iter.dir || d != iter.d;
		}
	};

	Directory(const std::string& path) : m_path(path) {}

	/// Pathname of the directory
	const std::string& path() const { return m_path; }

	/// Check that the directory exists and is a directory
	bool valid();

	/// Begin iterator
	const_iterator begin();

	/// End iterator
	const_iterator end() const;

    /// @return true if \a i points to a directory, else false
    bool isdir(const const_iterator& i) const;
};

}
}
}

// vim:set ts=4 sw=4:
#endif
