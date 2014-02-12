#ifndef WIBBLE_LOG_FILTERS_H
#define WIBBLE_LOG_FILTERS_H

#include <wibble/log/stream.h>
#include <vector>

namespace wibble {
namespace log {

/**
 * Prepend timestamps to log lines
 *
 * Timestamps are generated with a strftime format string on POSIX systems, or
 * with simple asctime() on windows.
 *
 * Strftime expands using a buffer 256 characters wide. Please keep that in
 * mind when creating the format string: longer outputs will be truncated.
 */
struct Timestamper : public Sender
{
	Sender* next;
	std::string fmt;

	Timestamper(Sender* next = 0, const std::string& fmt = "%b %e %T ");
	virtual ~Timestamper();

	virtual void send(Level level, const std::string& msg);
};

/**
 * Log only messages whose level is >= minLevel
 */
struct LevelFilter : public log::Sender
{
	Sender* next;
	log::Level minLevel;

	LevelFilter(Sender* next = 0, log::Level minLevel = log::INFO);
	virtual ~LevelFilter();

	virtual void send(log::Level level, const std::string& msg);
};

/**
 * Send the same message to multiple streams
 */
struct Tee : public log::Sender
{
	std::vector<Sender*> next;

	Tee();
	// Shortcut to initialise with two streams
	Tee(Sender* first, Sender* second);
	~Tee();

	virtual void send(log::Level level, const std::string& msg);
};

}
}

// vim:set ts=4 sw=4:
#endif
