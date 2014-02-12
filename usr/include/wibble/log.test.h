/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/test.h>
#include <wibble/log/stream.h>
#include <wibble/log/null.h>
#include <wibble/log/file.h>
#include <wibble/log/ostream.h>
#include <vector>
#include <iostream>
#include <fstream>

/**
 * TODO: find a way to test the syslog sender, if at all possible
 */

namespace {

using namespace std;
using namespace wibble;
using namespace wibble::log;

struct TestLog {

    // Test sender for log::Streambuf
    struct Sender1 : public log::Sender
    {
        // Here go the log messages
        std::vector< std::pair<Level, std::string> > log;
        
        virtual ~Sender1() {}
        
        // Interface for the streambuf to send messages
        virtual void send(Level level, const std::string& msg)
        {
            log.push_back(make_pair(level, msg));
        }
        
        // Dump all the logged messages to cerr
        void dump()
        {
            for (size_t i = 0; i < log.size(); ++i)
                std::cerr << log[i].first << " -> " << log[i].second << " <-" << std::endl;
        }
    };

    Test streambuf() {
        // Instantiate a Streambuf and write something in it

        Sender1 s;
        {
            log::Streambuf ls(&s);
            ostream o(&ls);
            
            // Send a normal log message
            o << "test" << endl;
            assert_eq(s.log.size(), 1u);
            assert_eq(s.log[0].first, log::INFO);
            assert_eq(s.log[0].second, "test");

            // Send a log message with a different priority
            //o << log::lev(log::WARN) << "test" << endl;
            o << log::WARN << "test" << endl;
            assert_eq(s.log.size(), 2u);
            assert_eq(s.log[1].first, log::WARN);
            assert_eq(s.log[1].second, "test");

            // Ensure that log messages are only sent after a newline
            o << "should eventually appear";
            assert_eq(s.log.size(), 2u);
        }
        // Or at streambuf destruction
        assert_eq(s.log.size(), 3u);
        assert_eq(s.log[2].first, log::INFO);
        assert_eq(s.log[2].second, "should eventually appear");

        //s.dump();
    }

    // Test the NullSender
    Test nullSender() {
        // Null does nothing, so we cannot test the results.

        log::NullSender ns;
        ns.send(log::INFO, "test");
        
        log::Streambuf null(&ns);
        ostream o(&null);
        
        // Send a normal log message
        o << "test" << endl;
        
        // Send a log message with a different priority
        //o << log::lev(log::WARN) << "test" << endl;
        o << log::WARN << "test" << endl;
        
        // Ensure that log messages are only sent after a newline
        o << "should eventually appear";
    }

// Test the FileSender
    Test fileSender() {

        // We send to /dev/null, so we cannot test the results.

        log::FileSender ns("/dev/null");
        ns.send(log::INFO, "test");
        
        log::Streambuf file(&ns);
        ostream o(&file);
        
        // Send a normal log message
        o << "test" << endl;
        
        // Send a log message with a different priority
        //o << log::lev(log::WARN) << "test" << endl;
        o << log::WARN << "test" << endl;
        
        // Ensure that log messages are only sent after a newline
        o << "should eventually appear";
    }

// Test the OstreamSender
    Test ostreamSender() {
        // We send to /dev/null, so we cannot test the results.

        std::ofstream null("/dev/null", std::ios::out);
        assert(!null.fail());

        log::OstreamSender sender(null);
        sender.send(log::INFO, "test");
        
        log::Streambuf log(&sender);
        ostream o(&log);
        
        // Send a normal log message
        o << "test" << endl;
        
        // Send a log message with a different priority
        //o << log::lev(log::WARN) << "test" << endl;
        o << log::WARN << "test" << endl;
        
        // Ensure that log messages are only sent after a newline
        o << "should eventually appear";
    }
    
};

}

// vim:set ts=4 sw=4:
