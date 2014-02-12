#include <wibble/sys/macros.h>

#ifdef POSIX
#ifndef WIBBLE_LOG_SYSLOG_H
#define WIBBLE_LOG_SYSLOG_H

#include <wibble/log/stream.h>
#include <syslog.h>

namespace wibble {
namespace log {

/// Discard all messages
struct SyslogSender : public Sender
{
protected:
	void* out;
	std::string name;

public:
	SyslogSender(const std::string& ident, int option = LOG_PID, int facility = LOG_USER);
	virtual ~SyslogSender();

	virtual void send(Level level, const std::string& msg);
};

}
}

// vim:set ts=4 sw=4:
#endif
#endif
