#ifndef WIBBLE_COMMANDLINE_DOC_H
#define WIBBLE_COMMANDLINE_DOC_H

#include <wibble/commandline/parser.h>
#include <string>
#include <vector>
#include <ostream>

namespace wibble {
namespace commandline {

class HelpWriter;

class DocMaker
{
protected:
	std::string m_app;
	std::string m_ver;

public:
	DocMaker(const std::string& app, const std::string& ver)
		: m_app(app), m_ver(ver) {}
};

class Help : public DocMaker
{
protected:
	void outputOptions(std::ostream& out, HelpWriter& writer, const Engine& cp);

public:
	Help(const std::string& app, const std::string& ver)
		: DocMaker(app, ver) {}
	
	void outputVersion(std::ostream& out);
	void outputHelp(std::ostream& out, const Engine& cp);
};

class Manpage : public DocMaker
{
public:
	enum where { BEFORE, BEGINNING, END };

private:
	struct Hook
	{
		std::string section;
		where placement;
		std::string text;

		Hook(const std::string& section, where placement, const std::string& text)
			: section(section), placement(placement), text(text) {}
	};

	int m_section;
	std::string m_author;

	std::vector<Hook> hooks;
	std::string lastSection;
	
	void outputParagraph(std::ostream& out, const std::string& str);
	void outputOption(std::ostream& out, const Option* o);
	void outputOptions(std::ostream& out, const Engine& p);
	void runHooks(std::ostream& out, const std::string& section, where where);
	void startSection(std::ostream& out, const std::string& name);
	void endSection(std::ostream& out);


public:
	Manpage(const std::string& app, const std::string& ver, int section, const std::string& author)
		: DocMaker(app, ver), m_section(section), m_author(author) {}

	void addHook(const std::string& section, where placement, const std::string& text)
	{
		hooks.push_back(Hook(section, placement, text));
	}
	void readHooks(const std::string& file);

	void output(std::ostream& out, const Engine& cp);
};

}
}

// vim:set ts=4 sw=4:
#endif
