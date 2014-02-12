#ifndef WIBBLE_LOG_FILE_H
#define WIBBLE_LOG_FILE_H

#include <wibble/log/stream.h>

namespace wibble {
namespace log {

/// Discard all messages
struct FileSender : public Sender
{
protected:
	int out;
	std::string name;

public:
	FileSender(const std::string& filename);
	virtual ~FileSender();

	virtual void send(Level level, const std::string& msg);
};

}
}

// vim:set ts=4 sw=4:
#endif
