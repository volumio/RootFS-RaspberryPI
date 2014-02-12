/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/commandline/options.h>

#include <wibble/test.h>

using namespace std;
using namespace wibble::commandline;

struct TestCommandlineOptions {

    // Happy trick to get access to protected methods we need to use for the tests
    template<typename T>
    class Public : public T
    {
    public:
        Public(const std::string& name)
            : T(name) {}
        Public(const std::string& name,
               char shortName,
               const std::string& longName,
               const std::string& usage = std::string(),
               const std::string& description = std::string())
            : T(name, shortName, longName, usage, description) {}
        
        virtual ArgList::iterator parse(ArgList& a, ArgList::iterator begin) {
            return T::parse(a, begin);
        }
        virtual bool parse(const std::string& str) {
            return T::parse(str);
        }
    };

    Test boolOpt() {
        Public<BoolOption> opt("test");
        
        assert_eq(opt.name(), string("test"));
        assert_eq(opt.isSet(), false);
        assert_eq(opt.boolValue(), false);
        assert_eq(opt.stringValue(), string("false"));
        
        assert_eq(opt.parse(string()), false);
        assert_eq(opt.isSet(), true);
        assert_eq(opt.boolValue(), true);
        assert_eq(opt.stringValue(), string("true"));
    }

    Test intOpt() {
        Public<IntOption> opt("test");
        
        assert_eq(opt.name(), string("test"));
        assert_eq(opt.isSet(), false);
        assert_eq(opt.boolValue(), false);
        assert_eq(opt.intValue(), 0);
        assert_eq(opt.stringValue(), string("0"));
        
        assert_eq(opt.parse("42"), true);
        assert_eq(opt.isSet(), true);
        assert_eq(opt.boolValue(), true);
        assert_eq(opt.intValue(), 42);
        assert_eq(opt.stringValue(), string("42"));
    }
    
    Test stringOpt() {
        Public<StringOption> opt("test");

        assert_eq(opt.name(), string("test"));
        assert_eq(opt.isSet(), false);
        assert_eq(opt.boolValue(), false);
        assert_eq(opt.stringValue(), string());
        
        assert_eq(opt.parse("-a"), true);
        assert_eq(opt.isSet(), true);
        assert_eq(opt.boolValue(), true);
        assert_eq(opt.stringValue(), "-a");
    }

	Test vectorBoolOpt() {
		Public< VectorOption<Bool> > opt("test");
        assert_eq(opt.name(), string("test"));
        assert_eq(opt.isSet(), false);
        assert_eq(opt.boolValue(), false);
        assert_eq(opt.values().size(), 0u);
        
        assert_eq(opt.parse("yes"), true);
        assert_eq(opt.isSet(), true);
        assert_eq(opt.boolValue(), true);
        assert_eq(opt.values().size(), 1u);
        assert_eq(opt.values()[0], true);
        
        assert_eq(opt.parse("no"), true);
        assert_eq(opt.isSet(), true);
        assert_eq(opt.boolValue(), true);
        assert_eq(opt.values().size(), 2u);
        assert_eq(opt.values()[0], true);
        assert_eq(opt.values()[1], false);
	}

	Test vectorStringOpt() {
		Public< VectorOption<String> > opt("test");
        assert_eq(opt.name(), string("test"));
        assert_eq(opt.isSet(), false);
        assert_eq(opt.boolValue(), false);
        assert_eq(opt.values().size(), 0u);
        
        assert_eq(opt.parse("-a"), true);
        assert_eq(opt.isSet(), true);
        assert_eq(opt.boolValue(), true);
        assert_eq(opt.values().size(), 1u);
        assert_eq(opt.values()[0], "-a");
        
        assert_eq(opt.parse("foo"), true);
        assert_eq(opt.isSet(), true);
        assert_eq(opt.boolValue(), true);
        assert_eq(opt.values().size(), 2u);
        assert_eq(opt.values()[0], "-a");
        assert_eq(opt.values()[1], "foo");
	}
};

// vim:set ts=4 sw=4:
