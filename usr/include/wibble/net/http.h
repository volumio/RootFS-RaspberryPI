#ifndef WIBBLE_NET_HTTP_H
#define WIBBLE_NET_HTTP_H

/*
 * net/http - HTTP server utilities
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
#include <wibble/net/mime.h>
#include <iosfwd>
#include <stdexcept>

namespace wibble {
namespace net {
namespace http {

struct Request;

struct error : public std::exception
{
    int code;
    std::string desc;
    std::string msg;

    error(int code, const std::string& desc)
        : code(code), desc(desc) {}
    error(int code, const std::string& desc, const std::string& msg)
        : code(code), desc(desc), msg(msg) {}
    virtual ~error() throw () {}

    virtual const char* what() const throw ();

    virtual void send(Request& req);
};

struct error400 : public error
{
    error400() : error(400, "Bad request") {}
    error400(const std::string& msg) : error(400, "Bad request", msg) {}
};

struct error404 : public error
{
    error404() : error(404, "Not found") {}
    error404(const std::string& msg) : error(404, "Not found", msg) {}

    virtual void send(Request& req);
};

struct Request
{
    // Request does not take ownership of the socket: it is up to the caller to
    // close it
    int sock;
    std::string peer_hostname;
    std::string peer_hostaddr;
    std::string peer_port;
    std::string server_name;
    std::string server_port;
    std::string script_name;
    std::string path_info;
    std::string query_string;
    /// String to use as server software "NAME/version"
    std::string server_software;
    /// true if some response has already been sent to the client
    bool response_started;

    std::string method;
    std::string url;
    std::string version;
    std::map<std::string, std::string> headers;
    wibble::Splitter space_splitter;

    wibble::net::mime::Reader mime_reader;

    std::map<std::string, std::string> extra_response_headers;

    Request();

    /**
     * Read request method and headers from sock
     *
     * Sock will be positioned at the beginning of the request body, after the
     * empty line that follows the header.
     *
     * The request URL will be parsed in script_name, path_info and
     * query_string. At the start, script_name is always / and path_info is the
     * rest of the path in the url. One can move path components from path_info
     * to script_name as the request is processed.
     *
     * @returns true if the request has been read, false if EOF was found
     * before the end of the headers.
     */
    bool read_request();

    /**
     * Read a fixed amount of data from the file descriptor
     *
     * @returns true if all the data were read, false if EOF was encountered
     * before the end of the buffer
     */
    bool read_buf(std::string& res, size_t size);

    // Read HTTP method and its following empty line
    bool read_method();

    /**
     * Read HTTP headers
     *
     * @return true if there still data to read and headers are terminated
     * by an empty line, false if headers are terminated by EOF
     */
    bool read_headers();

    /**
     * Set the CGI environment variables for the current process using this
     * request
     */
    void set_cgi_env();

    /// Send the content of buf, verbatim, to the client
    void send(const std::string& buf);

    /// Send the HTTP status line
    void send_status_line(int code, const std::string& msg, const std::string& version = "HTTP/1.0");

    /// Send the HTTP server header
    void send_server_header();

    /// Send the HTTP date header
    void send_date_header();

    /// Send headers in extra_response_headers
    void send_extra_response_headers();

    /// Send a string as result
    void send_result(const std::string& content, const std::string& content_type="text/html; charset=utf-8", const std::string& filename=std::string());

    /// Discard all input from the socket
    void discard_input();

    /**
     * Remove the first component from path_info, append it to script_name and
     * return it.
     *
     * If path_info if empty or only consisting of '/', returns the empty string.
     */
    std::string pop_path_info();

    /**
     * Return the first component from path_info
     *
     * If path_info if empty or only consisting of '/', returns the empty string.
     */
    std::string path_info_head();
};

/// Base interface for GET or POST parameters
struct Param
{
    virtual ~Param();

    /**
     * Parse the value of this parameter from the given unescaped string value.
     *
     * This can be called more than once, if the value is found multiple
     * times. It can also never be called, if the value is never found.
     */
    virtual void parse(const std::string& str) = 0;
};

/// Single-valued parameter
struct ParamSingle : public std::string, public Param
{
    virtual void parse(const std::string& str);
};

/// Multi-valued parameter
struct ParamMulti : public std::vector<std::string>, public Param
{
    virtual void parse(const std::string& str);
};

/**
 * File upload parameter
 */
struct FileParam
{
    /// Infomation about one uploaded file
    struct FileInfo
    {
        /// File pathname on the local file system
        std::string fname;
        /// File pathname provided by the client
        std::string client_fname;

        /**
         * Handle a file upload from a multipart/form-data file upload part
         */
        bool read(net::mime::Reader& mime_reader,
              std::map<std::string, std::string> headers,
              const std::string& outdir,
              const std::string& fname_blacklist,
              const std::string& client_fname,
              int sock,
              const std::string& boundary,
              size_t inputsize);
    };

    virtual ~FileParam();

    /**
     * Handle a file upload from a multipart/form-data file upload part
     */
    virtual bool read(
            net::mime::Reader& mime_reader,
            std::map<std::string, std::string> headers,
            const std::string& outdir,
            const std::string& fname_blacklist,
            const std::string& client_fname,
            int sock,
            const std::string& boundary,
            size_t inputsize) = 0;
};

/**
 * Single file upload field
 */
struct FileParamSingle : public FileParam
{
    FileInfo info;

    /**
     * If a file name is given, use its base name for storing the file;
     * else, use the file name given by the client, without path
     */
    FileParamSingle(const std::string& fname=std::string());

    virtual bool read(
            net::mime::Reader& mime_reader,
            std::map<std::string, std::string> headers,
            const std::string& outdir,
            const std::string& fname_blacklist,
            const std::string& client_fname,
            int sock,
            const std::string& boundary,
            size_t inputsize);
};

/**
 * Multiple file uploads with the same name
 */
struct FileParamMulti : public FileParam
{
    std::vector<FileInfo> files;

    virtual bool read(
            net::mime::Reader& mime_reader,
            std::map<std::string, std::string> headers,
            const std::string& outdir,
            const std::string& fname_blacklist,
            const std::string& client_fname,
            int sock,
            const std::string& boundary,
            size_t inputsize);
};

/**
 * Parse and store HTTP query parameters
 *
 * It is preconfigured by manipulating the various conf_* fields and using the
 * add() methods, before calling one of the parse_* methods.
 */
struct Params : public std::map<std::string, Param*>
{
    /// File parameters
    std::map<std::string, FileParam*> files;

    /// Maximum size of POST input data
    size_t conf_max_input_size;

    /// Maximum size of field data for one non-file field
    size_t conf_max_field_size;

    /**
     * Whether to accept unknown fields.
     *
     * If true, unkown fields are stored as ParamMulti
     *
     * If false, unknown fields are ignored.
     */
    bool conf_accept_unknown_fields;

    /**
     * Whether to accept unknown file upload fields.
     *
     * If true, unkown fields are stored as FileParamMulti
     *
     * If false, unknown file upload fields are ignored.
     */
    bool conf_accept_unknown_file_fields;

    /**
     * Directory where we write uploaded files
     *
     * @warning: if it is not set to anything, it ignores all file uploads
     */
    std::string conf_outdir;

    /**
     * String containing blacklist characters that are replaced with "_" in
     * the file name. If empty, nothing is replaced.
     *
     * This only applies to the basename: the pathname is ignored when
     * building the local file name.
     */
    std::string conf_fname_blacklist;


    Params();
    ~Params();

    /// Universal, automatic add method
    template<typename TYPE>
    TYPE* add(const std::string& name)
    {
        TYPE* res = new TYPE;
        add(name, res);
        return res;
    }

    /// Add a normal parameter to be parsed from the request
    void add(const std::string& name, Param* param);

    /// Add a file upload parameter to be parsed from the request
    void add(const std::string& name, FileParam* param);

    /**
     * Get a normal fileld during form parsing. Depending on the value of
     * conf_accept_unknown_fields, when handling a field that has not been
     * added before it will either create it if missing, or just return NULL.
     */
    Param* obtain_field(const std::string& name);

    /**
     * Get a normal fileld during form parsing. Depending on the value of
     * conf_accept_unknown_file_fields, when handling a field that has not been
     * added before it will either create it if missing, or just return NULL.
     */
    FileParam* obtain_file_field(const std::string& name);

    /// Get a field by name
    Param* field(const std::string& name);

    /// Get a file field by name
    FileParam* file_field(const std::string& name);

    /// Parse parameters as GET or POST according to request method
    void parse_get_or_post(net::http::Request& req);

    /// Parse parameters from urlencoded form data
    void parse_urlencoded(const std::string& qstring);

    /// Parse parameters from multipart/form-data
    void parse_multipart(net::http::Request& req, size_t inputsize, const std::string& content_type);

    /// Parse parameters from HTTP POST input
    void parse_post(net::http::Request& req);
};


}
}
}

// vim:set ts=4 sw=4:
#endif
