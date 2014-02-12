#ifndef WIBBLE_COMMANDLINE_ENGINE_H
#define WIBBLE_COMMANDLINE_ENGINE_H

#include <wibble/commandline/options.h>
#include <string>
#include <vector>
#include <map>
#include <iosfwd>

namespace wibble {
namespace commandline {

#if 0
  -- This help is left around to be reintegrated when I found something
	 appropriate.  It documents the general behavior of functions in the form
	 ArgList::iterator parse(ArgList& list, ArgList::iterator begin);

	/**
	 * Parse the list of arguments, starting at 'begin' and removing the
	 * arguments it successfully parses.
	 *
	 * The 'begin' iterator can be invalidated by this function.
	 *
	 * @returns
	 *   An iterator to the first unparsed argument (can be list.end())
	 */
#endif

/**
 * Parse commandline options.
 *
 * Normally it parses short or long switches all starting with '-'
 *
 * If other engines are added, then looks in the commandline for a non-switch
 * command to select the operation mode.  This allow to have a custom set of
 * commandline options for every non-switch command.
 */
class Engine : public Managed
{
	MemoryManager* m_manager;
	std::string m_name;

protected:
	// Elements added to this engine
	std::vector<OptionGroup*> m_groups;
	std::vector<Option*> m_options;
	std::vector<Engine*> m_commands;

	// Parse tables for commandline options
	std::map<char, Option*> m_short;
	std::map<std::string, Option*> m_long;
	std::map<std::string, Engine*> m_aliases;

	// Command selected with the non-switch command, if any were found, else
	// NULL
	Engine* m_found_command;

	void addWithoutAna(Option* o);
	void addWithoutAna(const std::vector<Option*>& o);
	void add(const std::string& alias, Engine* o);

	// Rebuild the parse tables
	void rebuild();

	/**
	 * Handle the commandline switch at 'begin'.
	 *
	 * If the switch at 'begin' cannot be handled, the list is untouched and
	 * 'begin',false is returned.  Else, the switch is removed and the new begin is
	 * returned.
	 */
	std::pair<ArgList::iterator, bool> parseFirstIfKnown(ArgList& list, ArgList::iterator begin);

#if 0
	/// Parse a consecutive sequence of switches
	ArgList::iterator parseConsecutiveSwitches(ArgList& list, ArgList::iterator begin);
#endif

	/// Parse all known Options and leave the rest in list
	ArgList::iterator parseKnownSwitches(ArgList& list, ArgList::iterator begin);

	/**
	 * Parse the list of arguments, starting at the beginning and removing the
	 * arguments it successfully parses.
	 *
	 * @returns
	 *   An iterator to the first unparsed argument (can be list.end())
	 */
	ArgList::iterator parseList(ArgList& list) { return parse(list, list.begin()); }

	/**
	 * Parse all the switches in list, leaving only the non-switch arguments or
	 * the arguments following "--"
	 */
	ArgList::iterator parse(ArgList& list, ArgList::iterator begin);


	Engine(MemoryManager* mman = 0, const std::string& name = std::string(),
					const std::string& usage = std::string(),
					const std::string& description = std::string(),
					const std::string& longDescription = std::string())
		: m_manager(mman), m_name(name), m_found_command(0), primaryAlias(name),
			usage(usage), description(description), longDescription(longDescription), hidden(false),
			no_switches_after_first_arg(false) {}

public:
	const std::string& name() const { return m_name; }

	/// Add an Option to this engine
	Option* add(Option* o);

	/// Add an OptionGroup to this engine
	OptionGroup* add(OptionGroup* group);

	/// Add a Engine to this engine
	Engine* add(Engine* o);

	/**
	 * Create an option
	 */
	template<typename T>
	T* create(const std::string& name,
			char shortName,
			const std::string& longName,
			const std::string& usage = std::string(),
			const std::string& description = std::string())
	{
		T* item = new T(name, shortName, longName, usage, description);
		if (m_manager) m_manager->add(item);
		return item;
	}

	/**
	 * Create an option and add to this engine
	 */
	template<typename T>
	T* add(const std::string& name,
			char shortName,
			const std::string& longName,
			const std::string& usage = std::string(),
			const std::string& description = std::string())
	{
		T* res = create<T>(name, shortName, longName, usage, description);
		add(res);
		return res;
	}

	/**
	 * Create an OptionGroup
	 */
	OptionGroup* createGroup(const std::string& description)
	{
		OptionGroup* g = new OptionGroup(m_manager, description);
		if (m_manager) m_manager->add(g);
		return g;
	}

	/**
	 * Create an OptionGroup and add it to this engine
	 */
	OptionGroup* addGroup(const std::string& description)
	{
		return add(createGroup(description));
	}

	/**
	 * Create a Engine
	 */
	Engine* createEngine(const std::string& name,
					const std::string& usage = std::string(),
					const std::string& description = std::string(),
					const std::string& longDescription = std::string())
	{
		Engine* item = new Engine(m_manager, name, usage, description, longDescription);
		if (m_manager) m_manager->add(item);
		return item;
	}

	/**
	 * Create a Engine and add it to this engine as a command
	 */
	Engine* addEngine(const std::string& name,
					const std::string& usage = std::string(),
					const std::string& description = std::string(),
					const std::string& longDescription = std::string())
	{
		return add(createEngine(name, usage, description, longDescription));
	}

	/// Get the OptionGroups that have been added to this engine
	const std::vector<OptionGroup*>& groups() const { return m_groups; }

	/// Get the Options that have been added to this engine
	const std::vector<Option*>& options() const { return m_options; }

	/// Get the Engines that have been added to this engine
	const std::vector<Engine*>& commands() const { return m_commands; }

	Engine* command(const std::string& name) const
	{
		std::map<std::string, Engine*>::const_iterator i = m_aliases.find(name);
		if (i == m_aliases.end())
			return 0;
		else
			return i->second;
	}

	/// Returns true if this Engine has options to parse
	bool hasOptions() const { return !m_groups.empty() || !m_options.empty(); }

	/**
	 * Return the command that has been found in the commandline, or NULL if
	 * none have been found
	 */
	Engine* foundCommand() const { return m_found_command; }


	void dump(std::ostream& out, const std::string& prefix = std::string());

	std::string primaryAlias;
	std::vector<std::string> aliases;
	std::string usage;
	std::string description;
	std::string longDescription;
	std::string examples;

	// Set to true if the engine should not be documented
	bool hidden;

	// Set to true if no switches should be parsed after the first
	// non-switch argument, and they should be just left in the argument
	// list
	bool no_switches_after_first_arg;


	friend class Parser;
};

}
}

// vim:set ts=4 sw=4:
#endif
