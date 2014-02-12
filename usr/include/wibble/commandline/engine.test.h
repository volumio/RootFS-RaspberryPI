/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */
#include <wibble/commandline/engine.h>

#include <wibble/test.h>
#include <string>

using namespace wibble::commandline;
using namespace std;

// Happy trick to get access to protected methods we need to use for the tests
template<typename T>
class Public : public T
{
public:
	Public(MemoryManager* mman = 0, const std::string& name = std::string(),
		   const std::string& usage = std::string(),
		   const std::string& description = std::string(),
		   const std::string& longDescription = std::string())
		: T(mman, name, usage, description, longDescription) {}
	
	ArgList::iterator parseList(ArgList& list) { return T::parseList(list); }
	ArgList::iterator parse(ArgList& list, ArgList::iterator begin)
	{
		return T::parse(list, begin);
	}
};

class Engine1 : public Public<Engine>
{
	MemoryManager mman;
	
public:
	Engine1() : Public<Engine>(&mman)
	{
		antani = add<BoolOption>("antani", 'a', "antani");
		blinda = add<StringOption>("blinda", 'b', "blinda");

		antani->addAlias("an-tani");
	}

	BoolOption* antani;
	StringOption* blinda;
};

class Engine2 : public Public<Engine>
{
	MemoryManager mman;

public:
	Engine2() : Public<Engine>(&mman)
	{
		help = add<BoolOption>("help", 'h', "help", "get help");

		scramble = addEngine("scramble");
		scramble_random = scramble->add<BoolOption>("random", 'r', "random");
		scramble_yell = scramble->add<StringOption>("yell", 0, "yell");
		scramble->aliases.push_back("mess");

		fix = addEngine("fix");
		fix_quick = fix->add<BoolOption>("quick", 'Q', "quick");
		fix_yell = fix->add<StringOption>("yell", 0, "yell");
	}

	BoolOption*		help;
	Engine*			scramble;
	BoolOption*		scramble_random;
	StringOption*	scramble_yell;
	Engine*			fix;
	BoolOption*		fix_quick;
	StringOption*	fix_yell;
};

struct TestCommandlineEngine {
    Test optsAndArgs() {
        ArgList opts;
        opts.push_back("ciaps");
        opts.push_back("-b");
        opts.push_back("cippo");
        opts.push_back("foobar");
        
        Engine1 engine;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.begin());
        assert_eq(opts.size(), 2u);
        assert_eq(string(*opts.begin()), string("ciaps"));
        assert_eq(string(*opts.rbegin()), string("foobar"));
        assert_eq(engine.antani->boolValue(), false);
        assert_eq(engine.blinda->stringValue(), "cippo");
    }

    Test noSwitchesAfterFirstArg() {
        ArgList opts;
        opts.push_back("-b");
        opts.push_back("cippo");
        opts.push_back("foobar");
        opts.push_back("--cabal");
        
        Engine1 engine;
	engine.no_switches_after_first_arg = true;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.begin());
        assert_eq(opts.size(), 2u);
        assert_eq(string(*opts.begin()), string("foobar"));
        assert_eq(string(*opts.rbegin()), string("--cabal"));
        assert_eq(engine.antani->boolValue(), false);
        assert_eq(engine.blinda->stringValue(), "cippo");
    }

    Test optsOnly() {
        ArgList opts;
        opts.push_back("-a");
        opts.push_back("foobar");

        Engine1 engine;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.begin());
        assert_eq(opts.size(), 1u);
        assert_eq(string(*opts.begin()), string("foobar"));
        assert_eq(engine.antani->boolValue(), true);
        assert_eq(engine.blinda->boolValue(), false);
    }

    Test clusteredShortOpts() {
        ArgList opts;
        opts.push_back("-ab");
        opts.push_back("cippo");

        Engine1 engine;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.end());
        assert_eq(opts.size(), 0u);
        assert_eq(engine.antani->boolValue(), true);
        assert_eq(engine.blinda->stringValue(), "cippo");
    }

    Test longOptsWithDashes() {
        ArgList opts;
        opts.push_back("--an-tani");
        opts.push_back("foobar");

        Engine1 engine;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.begin());
        assert_eq(opts.size(), 1u);
        assert_eq(string(*opts.begin()), string("foobar"));
        assert_eq(engine.antani->boolValue(), true);
        assert_eq(engine.blinda->boolValue(), false);
    }

// Test long options with arguments
    Test longOptsWithArgs() {
        ArgList opts;
        opts.push_back("--blinda=cippo");
        opts.push_back("foobar");
        opts.push_back("--antani");

        Engine1 engine;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.begin());
        assert_eq(opts.size(), 1u);
        assert_eq(string(*opts.begin()), string("foobar"));
        assert_eq(engine.antani->boolValue(), true);
        assert_eq(engine.blinda->stringValue(), "cippo");
    }

    Test commandWithArg() {
        ArgList opts;
        opts.push_back("--yell=foo");
        opts.push_back("mess");
        opts.push_back("-r");

        Engine2 engine;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.end());
        assert_eq(opts.size(), 0u);
        assert_eq(engine.foundCommand(), engine.scramble);
        assert_eq(engine.scramble_yell->stringValue(), "foo");
        assert_eq(engine.scramble_random->boolValue(), true);
        assert_eq(engine.fix_yell->stringValue(), string());
        assert_eq(engine.fix_quick->boolValue(), false);
        assert_eq(engine.help->boolValue(), false);
    }

// Test the other command, with overlapping arguments
    Test commandsWithOverlappingArgs() {
        ArgList opts;
        opts.push_back("--yell=foo");
        opts.push_back("fix");
        opts.push_back("--help");
        opts.push_back("-Q");

        Engine2 engine;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.end());
        assert_eq(opts.size(), 0u);
        assert_eq(engine.foundCommand(), engine.fix);
        assert_eq(engine.scramble_yell->stringValue(), string());
        assert_eq(engine.scramble_random->boolValue(), false);
        assert_eq(engine.fix_yell->stringValue(), "foo");
        assert_eq(engine.fix_quick->boolValue(), true);
        assert_eq(engine.help->boolValue(), true);
    }

// Test invocation without command
    Test commandsWithoutCommand() {
        ArgList opts;
        opts.push_back("--help");

        Engine2 engine;
        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.end());
        assert_eq(opts.size(), 0u);
        assert_eq(engine.foundCommand(), (Engine*)0);
        assert_eq(engine.scramble_yell->stringValue(), string());
        assert_eq(engine.scramble_random->boolValue(), false);
        assert_eq(engine.fix_yell->stringValue(), string());
        assert_eq(engine.fix_quick->boolValue(), false);
        assert_eq(engine.help->boolValue(), true);
    }

// Test creation shortcuts
    Test creationShortcuts() {
        MemoryManager mman;
        Public<Engine> engine(&mman, "test", "[options]", "test engine", "this is the long description of a test engine");
        OptionGroup* group = engine.addGroup("test option group");
        BoolOption* testBool = group->add<BoolOption>("tbool", 0, "testbool", "<val>", "a test bool switch");
        IntOption* testInt = group->add<IntOption>("tint", 0, "testint", "<val>", "a test int switch");
        StringOption* testString = group->add<StringOption>("tstring", 0, "teststring", "<val>", "a test string switch");
        BoolOption* testBool1 = engine.add<BoolOption>("tbool", 0, "testbool1", "<val>", "a test bool switch");
        IntOption* testInt1 = engine.add<IntOption>("tint", 0, "testint1", "<val>", "a test int switch");
        StringOption* testString1 = engine.add<StringOption>("tstring", 0, "teststring1", "<val>", "a test string switch");

        ArgList opts;
        opts.push_back("--testbool=true");
        opts.push_back("--testint=3");
        opts.push_back("--teststring=antani");
        opts.push_back("--testbool1=true");
        opts.push_back("--testint1=5");
        opts.push_back("--teststring1=blinda");

        ArgList::iterator i = engine.parseList(opts);
        assert(i == opts.end());
        assert_eq(opts.size(), 0u);
        assert_eq(testBool->boolValue(), true);
        assert_eq(testInt->intValue(), 3);
        assert_eq(testString->stringValue(), "antani");
        assert_eq(testBool1->boolValue(), true);
        assert_eq(testInt1->intValue(), 5);
        assert_eq(testString1->stringValue(), "blinda");
    }

};

// vim:set ts=4 sw=4:
