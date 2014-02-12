/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/commandline/doc.h>
#include <sstream>
#include <iostream>

#include <wibble/test.h>

using namespace wibble::commandline;

struct TestCommandlineDoc {

    Test basic() {
        StandardParserWithMandatoryCommand p("test", "1.0", 1, "enrico@enricozini.org");
        //Parser p("test");
        //p.add<BoolOption>("antani", 'a', "antani", "blinda", "supercazzola");
        //p.add<BoolOption>("antani", 'a', "antani", "", "supercazzola");
        //OptionGroup* g = p.addGroup("Test options");
        //g->add<BoolOption>("antani", 'a', "antani", "", "supercazzola");
        Engine* e = p.addEngine("testEngine");
        OptionGroup* g = e->addGroup("Test options");
        g->add<BoolOption>("antani", 'a', "antani", "", "supercazzola");

        Help h("testapp", "1.0");

        std::stringstream str;
        //h.outputHelp(str, p);
        //const char* opts[] = {"test", "help", "testEngine", NULL};
        // XXX p.parse(3, opts);
        //std::cerr << str.str() << std::endl;
    }

};

// vim:set ts=4 sw=4:
