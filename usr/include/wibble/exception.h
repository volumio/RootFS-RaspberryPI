// -*- C++ -*-
#ifndef WIBBLE_EXCEPTION_H
#define WIBBLE_EXCEPTION_H

/*
 * Generic base exception hierarchy
 *
 * Copyright (C) 2003,2004,2005,2006  Enrico Zini <enrico@debian.org>
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

#include <wibble/test.h> // for assert
#include <exception>
#include <typeinfo>
#include <string>
#include <sstream>
#include <iterator>
#include <vector>

/*! \file
 * This file provides the root of the exception hierarchy.  The goal of this
 * hierarchy is to provide the most possible information on what caused the
 * exception at the least possible cost for the programmer.
 * 
 * Every exception is the descendent of Exception that, in turn, extends the
 * std::exception class of the STL.
 *
 * Further descendents of Exception add functionality and automatisms to error
 * message generation:
 *
 *  - ContextException extends Exception to provide informations on the context
 *    in which the exception was raised
 *  - ConsistencyCheckException extends ContextException to be a base class for
 *    all exception raised on failure of a consistency check;
 *    IndexOutOfRangeException is one example of such exceptions, to be used
 *    when checking that a value (such as an index) fails betweed two given
 *    bounds.
 *  - SystemException extends ContextException to carry informations about
 *    error conditions reported by external services, like the Operating
 *    System, a database interface or an interface used to communicate to some
 *    network server.  In particular, it provides the logic needed to make use
 *    of the error descriptions provided by the external services, as
 *    strerror(3) does for the operating system's error conditions.
 *    FileException is an example of such exceptions, to be used to report
 *    error conditions happened during File I/O.
 * 
 * Example exception raising:
 * \code
 * 		void MyFile::open(const char* fname) throw (FileException)
 * 		{
 * 			if ((fd = open(fname, O_RDONLY)) == -1)
 * 				throw FileException(errno, stringf::fmt("opening %s read-only", fname));
 * 		}
 * \endcode
 *
 * Example exception catching:
 * \code
 *      try {
 * 			myfile.open("/tmp/foo");
 * 		} catch (FileException& e) {
 * 			fprintf(stderr, "%.*s: aborting.\n", PFSTR(e.toString()));
 * 			exit(1);
 * 		}
 * \endcode
 */

namespace wibble {
namespace exception {

/// Basic unexpected handler
/**
 * This is an unexpected handler provided by the library.  It prints to stderr
 * a stack trace and all possible available informations about the escaped
 * exception.
 *
 * To have the function names in the stack trace, the executables need to be
 * linked using the -rdynamic flag.
 */
void DefaultUnexpected();

/// Install an unexpected handler for the duration of its scope.  Install
/// DefaultUnexpected if no handler is provided.
class InstallUnexpected
{
protected:	
	void (*old)();
public:
	InstallUnexpected(void (*func)() = DefaultUnexpected);
	~InstallUnexpected();
};

// TODO this needs to be made useful with threading as well
struct AddContext {
    static std::vector< std::string > *s_context;

    static std::vector< std::string > &context() {
        if ( s_context )
            return *s_context;
        s_context = new std::vector< std::string >();
        return *s_context;
    }

    template< typename O >
    static void copyContext( O out ) {
        std::copy( context().begin(), context().end(), out );
    }

    std::string m_context;

    AddContext( std::string s )
        : m_context( s )
    {
        context().push_back( s );
    }

    ~AddContext() {
        assert_eq( context().back(), m_context );
        context().pop_back();
    }
};

/// Store context information for an exception
class Context
{
protected:
	std::vector<std::string> m_context;

public:
    Context() throw ()
    {
        AddContext::copyContext( std::back_inserter( m_context ) );
    }

    Context(const std::string& context) throw ()
    {
        AddContext::copyContext( std::back_inserter( m_context ) );
        addContext(context);
    }

    void addContext(const std::string& c) throw () { m_context.push_back(c); }
    std::string formatContext() const throw ()
    {
        if (m_context.empty())
            return "no context information available";
        
        std::stringstream res;
        std::copy( m_context.begin(), m_context.end(),
                   std::ostream_iterator< std::string >( res, ", \n    " ) );
        std::string r = res.str();
        return std::string( r, 0, r.length() - 7 );
    }

    const std::vector<std::string>& context() const throw ()
    {
        return m_context;
    }
};

/// Base class for all exceptions
/**
 * This is the base class for all exceptions used in the system.  It provides
 * an interface to get a (hopefully detailed) textual description of the
 * exception, and a tag describing the type of exception.  Further
 * functionality will be provided by subclassers
 */
class Generic : public std::exception, public Context
{
protected:
	mutable std::string m_formatted;

public:
	Generic() throw () {}
	Generic(const std::string& context) throw () : Context(context) {}
	virtual ~Generic() throw () {}

	/// Get a string tag identifying the exception type
	virtual const char* type() const throw () { return "Generic"; }

	/// Get a string describing what happened that threw the exception
	virtual std::string desc() const throw ()
	{
		return "an unspecified problem happened; if you see this message, please report a bug to the maintainer";
	}

	/**
	 * Format in a string all available information about the exception.
	 * 
	 * The formatted version is cached because this function is used to
	 * implement the default what() method, which needs to return a stable
	 * c_str() pointer.
	 */
	virtual const std::string& fullInfo() const throw ()
	{
		if (m_formatted.empty())
			m_formatted = desc() + ". Context:\n    "
                                      + formatContext();
		return m_formatted;
	}

	virtual const char* what() const throw () { return fullInfo().c_str(); }
};

/// Exception thrown when some long event is interrupted by an external event
/// (like a system call being interrupted by a signal)
/**
 * It is a direct child of ContextException, and has the very same semantics.
 *
 * \warning Any function throwing InterruptedException must allow to be called
 * again with the same parameters to retry the operation
 */
class Interrupted : public Generic
{
public:
	Interrupted() throw () {}
	Interrupted(const std::string& context) throw () : Generic(context) {}

	virtual const char* type() const throw () { return "Interrupted"; }
};

/// Exception thrown when some system wait is interrupted by a signal
/**
 * It is a direct child of InterruptedException, and has the very same
 * semantics.
 *
 * \warning Any function throwing WaitInterruptedException must allow to be
 * called again with the same parameters to retry the operation
 */
class WaitInterrupted : public Interrupted
{
public:
	WaitInterrupted(const std::string& context) throw () :
		Interrupted(context) {}

	virtual const char* type() const throw () { return "WaitInterrupted"; }
};

/// Exception thrown when some consistency check fails
/**
 * It is a direct child of ContextException, and has the very same semantics.
 */
class Consistency : public Generic
{
	std::string m_error;

public:
	Consistency(const std::string& context, const std::string& error = std::string()) throw () :
		Generic(context), m_error(error) {}
	~Consistency() throw () {}

	virtual const char* type() const throw () { return "Consistency"; }

	virtual std::string desc() const throw ()
	{
		if (m_error.empty())
			return "consistency check failed";
		return m_error;
	}
};

struct BadCast : public Consistency
{
    BadCast( const std::string &context ) throw()
        : Consistency( context )
    {}
    ~BadCast() throw() {}
    virtual std::string typeinfo() const throw() { return "unknown types"; }
    virtual std::string desc() const throw() {
        return std::string( "bad cast: " ) + typeinfo();
    }
};

template< typename From, typename To >
struct BadCastExt : public BadCast
{
    BadCastExt( const std::string &error = std::string() ) throw()
        : BadCast( error )
    {}
    ~BadCastExt() throw() {}
    virtual std::string typeinfo() const throw() { return std::string( "from " )
                                                       + typeid( From ).name()
                                                       + " to "
                                                       + typeid( To ).name(); }
};

/**
 * Exception thrown when some value is out of range
 *
 * Usage:
 * \code
 * if (age < 200)
 *   throw OutOfRange("age", "ensuring that no mere mortal is using the system");
 * \endcode
 */
class OutOfRange : public Consistency
{
protected:
	std::string m_var_desc;

public:
	OutOfRange(const std::string& var_desc, const std::string& context) throw ()
		: Consistency(context), m_var_desc(var_desc) {}
	~OutOfRange() throw () {}

	virtual const char* type() const throw () { return "OutOfRange"; }

	/// Get a short description of the variable that has been checked
	virtual std::string var_desc() const throw () { return m_var_desc; }

	virtual std::string desc() const throw () { return m_var_desc + " out of range"; }
};

/// Exception thrown when index checking fails
/**
 * This exception is to be thrown when an index checking fails, providing
 * informations on the acceptable index range and on the offending value.
 * The context should be a description of the index, possibly preceeded by a
 * description of in what context did the index checking happen.
 * 
 * Example:
 * \code
 *  if (age < 18)
 *     throw IndexOutOfRangeException("age", age, 18, 0, "obtaining driver license");
 *
 *  if (i < 0 || i > 100)
 *  	throw IndexOutOfRangeException("percentage of items sold", i, 0, 100, "checking input consistency");
 * \endcode
 */
template <class C>
class ValOutOfRange : public OutOfRange
{
protected:
	C m_val;
	C m_inf;
	C m_sup;

public:
	/** Construct the exception; minBound and maxBound are the bounds of the
	 * valid index range (inclusive).
	 */
	ValOutOfRange(const std::string& var_desc, C val, C inf, C sup,
			const std::string& context) throw ()
					: OutOfRange(var_desc, context),
						m_val(val), m_inf(inf), m_sup(sup) {}
	
	///@name Methods used to get informations about the index and its bounds
	//@{
	/// Get the value that caused the index to go out-of-bounds
	virtual C val() const throw () { return m_val; }
	/// Get the minimum allowed value for this index
	virtual C inf() const throw () { return m_inf; }
	/// Get the maximum allowed value for this index
	virtual C sup() const throw () { return m_sup; }
	//@}

	virtual const char* type() const throw ()
	{
		return "ValOutOfRange<>";
	}

	virtual std::string desc() const throw ();
};

/// Base class for system exceptions
/**
 * This is the base class for exceptions that depend on system events, like
 * exceptions on file or network I/O, on database access and so on.
 * SystemExceptions introduces the keeping of an error code with an associated
 * string description, and by defaults provides the textual description for
 * Unix errno error codes.
 * The exception context should be phrased like "doing X".
 *
 * Example:
 * \code
 * 		const char* fname = "foo.bar";
 * 		if ((fd = open(fname, O_RDONLY)) == -1)
 * 			// Should not throw SystemException, but a more specialized derived
 * 			// class like FileException
 * 			throw SystemException(errno, stringf::fmt("opening %s read-only", fname));
 * \endcode
 */
class System : public Generic
{
protected:
	int m_errno;

public:
	System(const std::string& context) throw ();
	System(int code, const std::string& context) throw ();

	virtual const char* type() const throw () { return "System"; }

	/// Get the system error code associated to the exception
	virtual int code() const throw () { return m_errno; }

	/// Get the description of the error code
	virtual std::string desc() const throw ();
};

/// Base class for exceptions for file I/O
/**
 * It is a direct child of SystemException, and has the very same semantics.
 * Like in SystemException, the error code description provided is a
 * description for errno values.
 */
class File : public System
{
protected:
	std::string m_name;

public:
	File(const std::string& name, const std::string& context)	throw () :
		System(context), m_name(name) {}
	~File() throw () {}

	virtual const char* type() const throw () { return "File"; }

	virtual std::string desc() const throw () { return m_name + ": " + System::desc(); }
};

}
}

// vim:set ts=4 sw=4:
#endif
