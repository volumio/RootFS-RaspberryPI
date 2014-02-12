#ifndef WIBBLE_NET_SERVER_H
#define WIBBLE_NET_SERVER_H

/*
 * net/server - Network server infrastructure
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
#include <vector>
#include <signal.h>

namespace wibble {
namespace net {

/**
 * Generic bind/listen/accept internet server
 */
struct Server
{
    // Human readable server hostname
    std::string host;
    // Human readable server port
    std::string port;
    // Type of server socket (default SOCK_STREAM)
    int socktype;
    // Server socket
    int sock;

    // Saved signal handlers before accept
    struct sigaction *old_signal_actions;
    // Signal handlers in use during accept
    struct sigaction *signal_actions;

    Server();
    ~Server();

    // Bind to a given port (and optionally interface hostname)
    void bind(const char* port, const char* host=NULL);

    // Set socket to listen, with given backlog
    void listen(int backlog = 16);

    // Set FD_CLOEXEC option on master socket, so it does not propagate to
    // children. The master socket is not FD_CLOEXEC by default.
    void set_sock_cloexec();
};

struct TCPServer : public Server
{
    // Signals used to stop the server's accept loop
    std::vector<int> stop_signals;

    TCPServer();
    virtual ~TCPServer();

    /** Loop accepting connections on the socket, until interrupted by a
     * signal in stop_signals
     *
     * @returns the signal number that stopped the loop
     */
    int accept_loop();

    virtual void handle_client(int sock, const std::string& peer_hostname, const std::string& peer_hostaddr, const std::string& peer_port) = 0;

protected:
    static void signal_handler(int sig);
    static int last_signal;

    // Initialize signal handling structures
    void signal_setup();
    void signal_install();
    void signal_uninstall();
};

}
}

// vim:set ts=4 sw=4:
#endif
