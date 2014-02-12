/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/test.h>
#include <wibble/regexp.h>

namespace {

using namespace std;
using namespace wibble;

struct TestRegexp {

    Test basicMatch() {
        Regexp re("^fo\\+bar()$");
        assert(re.match("fobar()"));
        assert(re.match("foobar()"));
        assert(re.match("fooobar()"));
        assert(!re.match("fbar()"));
        assert(!re.match(" foobar()"));
        assert(!re.match("foobar() "));
    }

    Test extendedMatch() {
        ERegexp re("^fo+bar()$");
        assert(re.match("fobar"));
        assert(re.match("foobar"));
        assert(re.match("fooobar"));
        assert(!re.match("fbar"));
        assert(!re.match(" foobar"));
        assert(!re.match("foobar "));
    }

    Test capture() {
        ERegexp re("^f(o+)bar([0-9]*)$", 3);
        assert(re.match("fobar"));
        assert_eq(re[0], string("fobar"));
        assert_eq(re[1], string("o"));
        assert_eq(re[2], string(""));
        assert_eq(re.matchStart(0), 0u);
        assert_eq(re.matchEnd(0), 5u);
        assert_eq(re.matchLength(0), 5u);
        assert_eq(re.matchStart(1), 1u);
        assert_eq(re.matchEnd(1), 2u);
        assert_eq(re.matchLength(1), 1u);

        assert(re.match("foobar42"));
        assert_eq(re[0], string("foobar42"));
        assert_eq(re[1], string("oo"));
        assert_eq(re[2], string("42"));
    }

    Test tokenize() {
        string str("antani blinda la supercazzola!");
        Tokenizer tok(str, "[a-z]+", REG_EXTENDED);
        Tokenizer::const_iterator i = tok.begin();

        assert(i != tok.end());
        assert_eq(*i, "antani");
        ++i;
        assert(i != tok.end());
        assert_eq(*i, "blinda");
        ++i;
        assert(i != tok.end());
        assert_eq(*i, "la");
        ++i;
        assert(i != tok.end());
        assert_eq(*i, "supercazzola");
        ++i;
        assert(i == tok.end());
    }

    Test splitter()
    {
        Splitter splitter("[ \t]+or[ \t]+", REG_EXTENDED | REG_ICASE);
        Splitter::const_iterator i = splitter.begin("a or b OR c   or     dadada");
        assert_eq(*i, "a");
        assert_eq(i->size(), 1u);
        ++i;
        assert_eq(*i, "b");
        assert_eq(i->size(), 1u);
        ++i;
        assert_eq(*i, "c");
        assert_eq(i->size(), 1u);
        ++i;
        assert_eq(*i, "dadada");
        assert_eq(i->size(), 6u);
        ++i;
        assert(i == splitter.end());
    }

    Test emptySplitter()
    {
        Splitter splitter("Z*", REG_EXTENDED | REG_ICASE);
        Splitter::const_iterator i = splitter.begin("ciao");
        assert_eq(*i, "c");
        assert_eq(i->size(), 1u);
        ++i;
        assert_eq(*i, "i");
        assert_eq(i->size(), 1u);
        ++i;
        assert_eq(*i, "a");
        assert_eq(i->size(), 1u);
        ++i;
        assert_eq(*i, "o");
        assert_eq(i->size(), 1u);
        ++i;
        assert(i == splitter.end());
    }

};

}

// vim:set ts=4 sw=4:
