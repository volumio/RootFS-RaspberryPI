#ifndef TAGCOLL_TAGEXPR_PARSER_H
#define TAGCOLL_TAGEXPR_PARSER_H

/* \file
 * Parser for tag expressions
 */

/*
 * Copyright (C) 2003,2004,2005  Enrico Zini <enrico@debian.org>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307  USA
 */

#include <tagcoll/expression.h>
#include <string>

namespace tagcoll
{

/**
 * Parser for tag expressions.
 *
 * This is a singleton class.  It is not intended to be instantiated directly,
 * but accessed using the instance() method.
 */
/*
 * Design note: it needs to be a singleton class to be accessed by bison's
 * global parse function.
 */
class TagexprParser
{
private:
	TagexprParser() {}

protected:
	static TagexprParser* _instance;

	Expression result;
	std::string errorMessage;
	
public:
	// For use by the bison+yacc code
	void setResult(const Expression& result) { this->result = result; }
	void addError(const std::string& message) { errorMessage += message; }

	/**
	 * Parse a string into a Tagexpr object
	 *
	 * \param buffer
	 *   The string with the expression to parse
	 * \return
	 *   The parsed expression
	 * \throw ConsistencyCheckException
	 *   if parsing fails.
	 */
	Expression parse(const std::string& buffer);

	/**
     * Access the global instance of the parser
	 */
	static TagexprParser* instance();
};

};

// vim:set ts=4 sw=4:
#endif
