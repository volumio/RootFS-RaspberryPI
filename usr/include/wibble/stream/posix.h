#ifndef WIBBLE_STREAM_POSIX_H
#define WIBBLE_STREAM_POSIX_H

#include <wibble/exception.h>
#include <streambuf>
#include <unistd.h>
#include <cstdio>

// http://www.icce.rug.nl/documents/cplusplus/cplusplus21.html#CONCRETE
// 21.2.1: Classes for output operations

namespace wibble {
namespace stream {

class PosixBuf : public std::streambuf
{
private:
	// The output buffer
	char* m_buf;
	size_t m_buf_size;
	int m_fd;

	// Disallow copy
	PosixBuf(const PosixBuf&);
	PosixBuf& operator=(const PosixBuf&);

public:
	// PosixBuf functions

	PosixBuf() : m_buf(0), m_buf_size(0), m_fd(-1) {}
	PosixBuf(int fd, size_t bufsize = 4096) : m_buf(0), m_buf_size(0), m_fd(-1)
	{
		attach(fd, bufsize);
	}
	~PosixBuf()
	{
		if (m_buf)
		{
			sync();
			delete[] m_buf;
		}
		if (m_fd != -1)
		{
			::close(m_fd);
		}
	}

	/**
	 * Attach the stream to a file descriptor, using the given stream size.
	 *
	 * Management of the file descriptor will be taken over by the PosixBuf,
	 * and the file descriptor will be closed with PosixBuf goes out of scope.
	 */
	void attach(int fd, size_t bufsize = 4096)
	{
		m_buf = new char[1024];
		if (!m_buf)
			throw wibble::exception::Consistency("allocating 1024 bytes for posix stream buffer", "allocation failed");
		m_fd = fd;
		m_buf_size = 1024;
		setp(m_buf, m_buf + m_buf_size);
	}

	/**
	 * Sync the PosixBuf and detach it from the file descriptor.  PosixBuf will
	 * not touch the file descriptor anymore, and it is the responsibility of
	 * the caller to close it.
	 *
	 * @returns The file descriptor
	 */
	int detach()
	{
		sync();
		int res = m_fd;
		delete[] m_buf;
		m_buf = 0;
		m_buf_size = 0;
		m_fd = -1;
		// TODO: setp or anything like that, to tell the streambuf that there's
		// no buffer anymore?
		setp(0, 0);
		return res;
	}

	/// Access the underlying file descriptor
	int fd() const { return m_fd; }


	// Functions from strbuf

	int overflow(int c)
	{
		sync();
		if (c != EOF)
		{
			*pptr() = c;
			pbump(1);
		}
		return c;
	}
	int sync()
	{
		if (pptr() > pbase())
		{
			int amount = pptr() - pbase();
			int res = ::write(m_fd, m_buf, amount);
			if (res != amount)
				throw wibble::exception::System("writing to file");
			setp(m_buf, m_buf + m_buf_size);
		}
		return 0;
	}
}; 

}
}

#endif
