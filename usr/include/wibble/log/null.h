#ifndef WIBBLE_LOG_NULL_H
#define WIBBLE_LOG_NULL_H

#include <wibble/log/stream.h>

namespace wibble {
namespace log {

/// Discard all messages
struct NullSender : public Sender
{
	virtual ~NullSender() {}
	virtual void send(Level level, const std::string& msg) {}
};

}
}

// vim:set ts=4 sw=4:
#endif
