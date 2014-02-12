/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/test.h>
#include <wibble/string.h>
#include <wibble/list.h>

namespace {

using namespace std;
using namespace wibble;

struct TestString {

    Test fmt()
    {
        assert_eq(str::fmt(5), "5");
        assert_eq(str::fmt(5.123), "5.123");
        assert_eq(str::fmtf("ciao"), "ciao");
    }

    Test fmtSet()
    {
        std::set< int > a;
        assert_eq(str::fmt(a), "{}");
        a.insert( a.begin(), 2 );
        assert_eq(str::fmt(a), "{ 2 }");
        a.insert( a.begin(), 5 );
        assert_eq(str::fmt(a), "{ 2, 5 }");
        a.insert( a.begin(), 1 );
        assert_eq(str::fmt(a), "{ 1, 2, 5 }");
    }

    Test fmtVec()
    {
        std::vector< int > a;
        assert_eq(str::fmt(a), "[]");
        a.push_back( 2 );
        assert_eq(str::fmt(a), "[ 2 ]");
        a.push_back( 5 );
        assert_eq(str::fmt(a), "[ 2, 5 ]");
        a.push_back( 1 );
        assert_eq(str::fmt(a), "[ 2, 5, 1 ]");
    }

    Test fmtList()
    {
        assert_eq( str::fmt( list::Empty< int >() ), "[]" );
        assert_eq( str::fmt( list::singular( 0 ) ), "[ 0 ]" );
        assert_eq( str::fmt( list::append(
                                 list::singular( 0 ),
                                 list::singular( 2 ) ) ), "[ 0, 2 ]" );
    }

    Test basename()
    {
        assert_eq(str::basename("ciao"), "ciao");
        assert_eq(str::basename("a/ciao"), "ciao");
        assert_eq(str::basename("a/b/c/c/d/e/ciao"), "ciao");
        assert_eq(str::basename("/ciao"), "ciao");
    }

    Test dirname()
    {
        assert_eq(str::dirname("ciao"), "");
        assert_eq(str::dirname("a/ciao"), "a");
        assert_eq(str::dirname("a/b/c/c/d/e/ciao"), "a/b/c/c/d/e");
        assert_eq(str::dirname("/a/ciao"), "/a");
        assert_eq(str::dirname("/ciao"), "/");
    }

    Test trim()
    {
        assert_eq(str::trim("   "), "");
        assert_eq(str::trim(" c  "), "c");
        assert_eq(str::trim("ciao"), "ciao");
        assert_eq(str::trim(" ciao"), "ciao");
        assert_eq(str::trim("    ciao"), "ciao");
        assert_eq(str::trim("ciao "), "ciao");
        assert_eq(str::trim("ciao    "), "ciao");
        assert_eq(str::trim(" ciao "), "ciao");
        assert_eq(str::trim("      ciao    "), "ciao");
    }

    Test trim2()
    {
        assert_eq(str::trim(string("ciao"), ::isalpha), "");
        assert_eq(str::trim(" ", ::isalpha), " ");
    }

    Test tolower()
    {
        assert_eq(str::tolower("ciao"), "ciao");
        assert_eq(str::tolower("CIAO"), "ciao");
        assert_eq(str::tolower("Ciao"), "ciao");
        assert_eq(str::tolower("cIAO"), "ciao");
    }

    Test toupper()
    {
        assert_eq(str::toupper("ciao"), "CIAO");
        assert_eq(str::toupper("CIAO"), "CIAO");
        assert_eq(str::toupper("Ciao"), "CIAO");
        assert_eq(str::toupper("cIAO"), "CIAO");
    }

    Test ucfirst()
    {
        assert_eq(str::ucfirst("ciao"), "Ciao");
        assert_eq(str::ucfirst("CIAO"), "Ciao");
        assert_eq(str::ucfirst("Ciao"), "Ciao");
        assert_eq(str::ucfirst("cIAO"), "Ciao");
    }

// Check startsWith
    Test startsWith()
    {
        assert(str::startsWith("ciao", "ci"));
        assert(str::startsWith("ciao", ""));
        assert(str::startsWith("ciao", "ciao"));
        assert(!str::startsWith("ciao", "ciaoa"));
        assert(!str::startsWith("ciao", "i"));
    }

    Test endsWith()
    {
        assert(str::endsWith("ciao", "ao"));
        assert(str::endsWith("ciao", ""));
        assert(str::endsWith("ciao", "ciao"));
        assert(!str::endsWith("ciao", "aciao"));
        assert(!str::endsWith("ciao", "a"));
    }

    Test joinpath()
    {
        assert_eq(str::joinpath("a", "b"), "a/b");
        assert_eq(str::joinpath("a/", "b"), "a/b");
        assert_eq(str::joinpath("a", "/b"), "a/b");
        assert_eq(str::joinpath("a/", "/b"), "a/b");
    }

    Test urlencode()
    {
        assert_eq(str::urlencode(""), "");
        assert_eq(str::urlencode("antani"), "antani");
        assert_eq(str::urlencode("a b c"), "a%20b%20c");
        assert_eq(str::urlencode("a "), "a%20");

        assert_eq(str::urldecode(""), "");
        assert_eq(str::urldecode("antani"), "antani");
        assert_eq(str::urldecode("a%20b"), "a b");
        assert_eq(str::urldecode("a%20"), "a ");
        assert_eq(str::urldecode("a%2"), "a");
        assert_eq(str::urldecode("a%"), "a");

        assert_eq(str::urldecode(str::urlencode("àá☣☢☠!@#$%^&*(\")/A")), "àá☣☢☠!@#$%^&*(\")/A");
        assert_eq(str::urldecode(str::urlencode("http://zz:ss@a.b:31/c?d=e&f=g")), "http://zz:ss@a.b:31/c?d=e&f=g");
    }

	Test split1()
	{
		string val = "";
		str::Split split("/", val);
		str::Split::const_iterator i = split.begin();
		assert(i == split.end());
	}

	Test split2()
	{
		string val = "foo";
		str::Split split("/", val);
		str::Split::const_iterator i = split.begin();
		assert(i != split.end());
		assert_eq(*i, "foo");
		assert_eq(i.remainder(), "");
		++i;
		assert(i == split.end());
	}

	Test split3()
	{
		string val = "foo";
		str::Split split("", val);
		str::Split::const_iterator i = split.begin();
		assert(i != split.end());
		assert_eq(*i, "f");
		assert_eq(i.remainder(), "oo");
		++i;
		assert_eq(*i, "o");
		assert_eq(i.remainder(), "o");
		++i;
		assert_eq(*i, "o");
		assert_eq(i.remainder(), "");
		++i;
		assert(i == split.end());
	}

	Test split4()
	{
		string val = "/a//foo/";
		str::Split split("/", val);
		str::Split::const_iterator i = split.begin();
		assert(i != split.end());
		assert_eq(*i, "");
		assert_eq(i.remainder(), "a//foo/");
		++i;
		assert(i != split.end());
		assert_eq(*i, "a");
		assert_eq(i.remainder(), "/foo/");
		++i;
		assert(i != split.end());
		assert_eq(*i, "");
		assert_eq(i.remainder(), "foo/");
		++i;
		assert(i != split.end());
		assert_eq(*i, "foo");
		assert_eq(i.remainder(), "");
		++i;
		assert(i == split.end());
	}

	Test join()
	{
		string val = "/a//foo/";
		str::Split split("/", val);
		string res = str::join(split.begin(), split.end(), ":");
		assert_eq(res, ":a::foo");
	}

	Test normpath()
	{
		assert_eq(str::normpath(""), ".");
		assert_eq(str::normpath("/"), "/");
		assert_eq(str::normpath("foo"), "foo");
		assert_eq(str::normpath("foo/"), "foo");
		assert_eq(str::normpath("/foo"), "/foo");
		assert_eq(str::normpath("foo/bar"), "foo/bar");
		assert_eq(str::normpath("foo/./bar"), "foo/bar");
		assert_eq(str::normpath("././././foo/./././bar/././././"), "foo/bar");
		assert_eq(str::normpath("/../../../../../foo"), "/foo");
		assert_eq(str::normpath("foo/../foo/../foo/../foo/../"), ".");
		assert_eq(str::normpath("foo//bar"), "foo/bar");
		assert_eq(str::normpath("foo/./bar"), "foo/bar");
		assert_eq(str::normpath("foo/foo/../bar"), "foo/bar");
	}

	Test base64()
	{
		using namespace str;
		assert_eq(encodeBase64(""), "");
		assert_eq(encodeBase64("c"), "Yw==");
		assert_eq(encodeBase64("ci"), "Y2k=");
		assert_eq(encodeBase64("cia"), "Y2lh");
		assert_eq(encodeBase64("ciao"), "Y2lhbw==");
		assert_eq(encodeBase64("ciao "), "Y2lhbyA=");
		assert_eq(encodeBase64("ciao c"), "Y2lhbyBj");
		assert_eq(encodeBase64("ciao ci"), "Y2lhbyBjaQ==");
		assert_eq(encodeBase64("ciao cia"), "Y2lhbyBjaWE=");
		assert_eq(encodeBase64("ciao ciao"), "Y2lhbyBjaWFv");

		assert_eq(decodeBase64(encodeBase64("")), "");
		assert_eq(decodeBase64(encodeBase64("c")), "c");
		assert_eq(decodeBase64(encodeBase64("ci")), "ci");
		assert_eq(decodeBase64(encodeBase64("cia")), "cia");
		assert_eq(decodeBase64(encodeBase64("ciao")), "ciao");
		assert_eq(decodeBase64(encodeBase64("ciao ")), "ciao ");
		assert_eq(decodeBase64(encodeBase64("ciao c")), "ciao c");
		assert_eq(decodeBase64(encodeBase64("ciao ci")), "ciao ci");
		assert_eq(decodeBase64(encodeBase64("ciao cia")), "ciao cia");
		assert_eq(decodeBase64(encodeBase64("ciao ciao")), "ciao ciao");
	}

	Test yaml()
	{
		string data = 
			"Name: value\n"
			"Multiline: value1\n"
			"  value2\n"
			"   value3\n"
			"Multifield:\n"
			"  Field1: val1\n"
			"  Field2: val2\n"
			"   continue val2\n"
			"\n"
			"Name: second record\n";
		stringstream input(data, ios_base::in);
		str::YamlStream yamlStream;
		str::YamlStream::const_iterator i = yamlStream.begin(input);
		assert(i != yamlStream.end());
		assert_eq(i->first, "Name");
		assert_eq(i->second, "value");

		++i;
		assert(i != yamlStream.end());
		assert_eq(i->first, "Multiline");
		assert_eq(i->second,
			"value1\n"
			"value2\n"
			" value3\n");

		++i;
		assert(i != yamlStream.end());
		assert_eq(i->first, "Multifield");
		assert_eq(i->second,
			"Field1: val1\n"
			"Field2: val2\n"
			" continue val2\n");

		++i;
		assert(i == yamlStream.end());

		i = yamlStream.begin(input);
		assert(i != yamlStream.end());
		assert_eq(i->first, "Name");
		assert_eq(i->second, "second record");

		++i;
		assert(i == yamlStream.end());

		i = yamlStream.begin(input);
		assert(i == yamlStream.end());
	}

	Test yamlComments()
	{
		string data = 
			"# comment\n"
			"Name: value # comment\n"
			"# comment\n"
			"Multiline: value1          #   comment \n"
			"  value2 # a\n"
			"   value3#b\n"
			"\n"
			"# comment\n"
			"\n"
			"Name: second record\n";
		stringstream input(data, ios_base::in);
		str::YamlStream yamlStream;
		str::YamlStream::const_iterator i = yamlStream.begin(input);
		assert(i != yamlStream.end());
		assert_eq(i->first, "Name");
		assert_eq(i->second, "value");

		++i;
		assert(i != yamlStream.end());
		assert_eq(i->first, "Multiline");
		assert_eq(i->second,
			"value1\n"
			"value2 # a\n"
			" value3#b\n");

		++i;
		assert(i == yamlStream.end());

		i = yamlStream.begin(input);
		assert(i != yamlStream.end());
		assert_eq(i->first, "Name");
		assert_eq(i->second, "second record");

		++i;
		assert(i == yamlStream.end());

		i = yamlStream.begin(input);
		assert(i == yamlStream.end());
	}
};

}

// vim:set ts=4 sw=4:
