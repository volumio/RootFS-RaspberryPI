#ifndef WIBBLE_NET_MIME_H
#define WIBBLE_NET_MIME_H

/*
 * net/mime - MIME utilities
 *
 * Copyright (C) 2010  Enrico Zini <enrico@enricozini.org>
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

#include <string>
#include <map>
#include <wibble/regexp.h>
#include <iosfwd>

namespace wibble {
namespace net {
namespace mime {

struct Reader
{
    wibble::ERegexp header_splitter;

    Reader();

    /**
     * Read a line from the file descriptor.
     *
     * The line is terminated by <CR><LF>. The line terminator is not
     * included in the resulting string.
     *
     * @returns true if a line was read, false if EOF
     *
     * Note that if EOF is returned, res can still be filled with a partial
     * line. This may happen if the connection ends after some data has
     * been sent but before <CR><LF> is sent.
     */
    bool read_line(int sock, std::string& res);

    /**
     * Read MIME headers
     *
     * @return true if there still data to read and headers are terminated
     * by an empty line, false if headers are terminated by EOF
     */
    bool read_headers(int sock, std::map<std::string, std::string>& headers);

    /**
     * Read until boundary is found, sending data to the given ostream
     *
     * @param max Maximum number of bytes to read, or 0 for unilimited until boundary
     *
     * @returns true if another MIME part follows, false if it is the last part
     * (boundary has trailing --)
     */
    bool read_until_boundary(int sock, const std::string& boundary, std::ostream& out, size_t max=0);

    /**
     * Read until boundary is found, sending data to the given ostream
     *
     * @returns true if another MIME part follows, false if it is the last part
     * (boundary has trailing --)
     */
    bool discard_until_boundary(int sock, const std::string& boundary);

    /**
     * Skip until the end of the boundary line
     *
     * @return true if the boundary does not end with --, else false
     */
    bool readboundarytail(int sock);
};

}
}
}

// vim:set ts=4 sw=4:
#endif
