#ifndef WIBBLE_LOG_OSTREAM_H
#define WIBBLE_LOG_OSTREAM_H

#include <wibble/log/stream.h>
#include <ostream>

namespace wibble {
namespace log {

/// Discard all messages
struct OstreamSender : public Sender
{
protected:
	std::ostream& out;

public:
	OstreamSender(std::ostream& out);
	virtual ~OstreamSender() {}

	virtual void send(Level level, const std::string& msg);
};

}
}

// vim:set ts=4 sw=4:
#endif
