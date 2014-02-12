#ifndef WIBBLE_LOG_STREAM_H
#define WIBBLE_LOG_STREAM_H

#include <streambuf>
#include <string>

namespace wibble {
namespace log {

/// Urgency of a log message
enum Level
{
	DEBUG,
	INFO,
	UNUSUAL,
	WARN,
	ERR,
	CRIT
};

/// Handle sending a log message
struct Sender
{
	virtual ~Sender() {}
	/**
	 * Log one line of text with the given level.
	 *
	 * Do not add a trailing newline
	 */
	virtual void send(Level level, const std::string& msg) = 0;
};

/// Streambuf class for logging
class Streambuf : public std::streambuf
{
protected:
	/// Level to use for messages whose level has not been specified
	static const Level defaultLevel = INFO;
	/// Line buffer with the log message we are building
	std::string line;
	/// Level of the next log message
	Level level;

	/// Sender used to send log messages
	/* Note: we have to use composition instead of overloading because the
	 * sender needs to be called in the destructor, and destructors cannot call
	 * overridden methods */
	Sender* sender;

	/// Send the message "line" with the level "level"
	void send();

public:
	/// Construct a nonworking Streambuf to be initialised later.
	Streambuf();

	/**
	 * @param s
	 *   The sender to use to send log messages.  Streambuf will just use the
	 *   pointer, but will  not take over memory maintenance
	 */
	Streambuf(Sender* s);
	virtual ~Streambuf();

    /// If there is a partial line, send it out
    void send_partial_line();

	/// Set/change the sender to use for this streambuf
	void setSender(Sender* s);

	/// Set the level for the next message, and the next message only
	void setLevel(const Level& level);

	/// override to get data as a std::streambuf
	int overflow(int c);
};

std::ostream& operator<<(std::ostream& s, Level lev);

}
}

// vim:set ts=4 sw=4:
#endif
