#ifndef TAGCOLL_STREAM_EXPRESSION_H
#define TAGCOLL_STREAM_EXPRESSION_H

/* \file
 * Collection of filters to modify streams of tagged items
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

#include <wibble/mixin.h>
#include <tagcoll/expression.h>
#include <set>
#include <string>

namespace tagcoll {
namespace stream {

class ExpressionFilter
{
public:
	enum MatchType { PLAIN, INVERTED };

protected:
	Expression expr;
	MatchType matchType;

	template<typename Tags>
	bool match(const Tags& tags)
	{
		if (matchType == PLAIN)
			return expr(tags);
		else
			return !expr(tags);
	}

public:
	/**
	 * @param type
	 *   PLAIN: only keep the items that match the expression
	 *   INVERTED: only keep the items that do not match the expression
	 */
	ExpressionFilter(const std::string& expr, MatchType type)
		: expr(expr), matchType(type) {}
	ExpressionFilter(const Expression& expr, MatchType type)
		: expr(expr), matchType(type) {}
};

/**
 * Remove the items that do not match a tag expression.
 */
template<class OUT>
class FilterItemsByExpression : public ExpressionFilter, public wibble::mixin::OutputIterator< FilterItemsByExpression<OUT> >
{
protected:
	OUT out;

public:
	FilterItemsByExpression(const std::string& expr, ExpressionFilter::MatchType type, const OUT& out)
		: ExpressionFilter(expr, type), out(out) {}
	FilterItemsByExpression(const Expression& expr, ExpressionFilter::MatchType type, const OUT& out)
		: ExpressionFilter(expr, type), out(out) {}
	
	// output iterator interface

	template<typename Items, typename Tags>
	FilterItemsByExpression& operator=(const std::pair<Items, Tags>& data)
	{
		if (match(data.second))
		{
			*out = data;
			++out;
		}
		return *this;
	}
};

template<typename EXPR, typename OUT>
inline FilterItemsByExpression<OUT> filterItemsByExpression(const EXPR& expr, ExpressionFilter::MatchType type, const OUT& out)
{
	return FilterItemsByExpression<OUT>(expr, type, out);
}

template<typename EXPR, typename OUT>
inline FilterItemsByExpression<OUT> filterItemsByExpression(const EXPR& expr, const OUT& out)
{
	return FilterItemsByExpression<OUT>(expr, ExpressionFilter::PLAIN, out);
}

/**
 * Remove the tags that do not singularly match a tag expression.
 *
 * This is a slight abuse of tag expressions, but it can prove useful to remove
 * tags matching, for example, "special::not-yet-tagged*" or
 * "!(use::gaming || game::*)".
 */
template<class OUT>
class FilterTagsByExpression : public ExpressionFilter, public wibble::mixin::OutputIterator< FilterTagsByExpression<OUT> >

{
protected:
	OUT out;

public:
	FilterTagsByExpression(const std::string& expression, ExpressionFilter::MatchType type, const OUT& out) :
		ExpressionFilter(expression, type), out(out) {}
	FilterTagsByExpression(const Expression& expression, ExpressionFilter::MatchType type, const OUT& out) :
		ExpressionFilter(expression, type), out(out) {}

	// output iterator interface

	template<typename Items, typename Tags>
	FilterTagsByExpression& operator=(const std::pair<Items, Tags>& data)
	{
		// TODO:
		// We can use a vector since we know the input is sorted, and we
		// remove elements without altering the order of the remaining ones
		std::set<typename Tags::value_type> filtered;
		bool changed = false;

		for (typename Tags::const_iterator i = data.second.begin();
				i != data.second.end(); ++i)
		{
			if (match(wibble::singleton(*i)))
				filtered.insert(*i);
			else
				changed = true;
		}
		if (!changed)
			*out = data;
		else
			*out = std::make_pair(data.first, filtered);
		++out;
		return *this;
	}
};

template<typename EXPR, typename OUT>
inline FilterTagsByExpression<OUT> filterTagsByExpression(const EXPR& expr, ExpressionFilter::MatchType type, const OUT& out)
{
	return FilterTagsByExpression<OUT>(expr, type, out);
}

template<typename EXPR, typename OUT>
inline FilterTagsByExpression<OUT> filterTagsByExpression(const EXPR& expr, const OUT& out)
{
	return FilterTagsByExpression<OUT>(expr, ExpressionFilter::PLAIN, out);
}

}
}

// vim:set ts=4 sw=4:
#endif
