#ifndef TAGCOLL_EXPRESSION_H
#define TAGCOLL_EXPRESSION_H

/*
 * Expression that can match tagsets
 * 
 * Copyright (C) 2003,2004,2005,2006  Enrico Zini <enrico@debian.org>
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

#include <string>
#include <set>
#include <map>
#include <wibble/singleton.h>
#include <wibble/mixin.h>

namespace tagcoll
{

class TagexprContext;

/**
 * Interface for parsed tag expressions
 */
class ExpressionImpl
{
protected:
	int _ref;

public:
	ExpressionImpl() : _ref(0) {}
	virtual ~ExpressionImpl() {}

	/// Increment the reference count for this object
	void ref() throw () { ++_ref; }

	/// Decrement the reference count for this object, returning true when it
	/// reaches 0
	bool unref() throw () { return --_ref == 0; }

	/**
	 * Provide a string representation of this expression
	 */
	virtual std::string format() const = 0;

	/**
	 * Evaluates the expression on a recursive context
	 *
	 * \see TagexprContext
	 */
	virtual bool eval(const TagexprContext& context) const = 0;

	/**
	 * Evaluates the expression on a set of tags
	 *
	 * \return
	 *   true if the expression matches the tags, false otherwise
	 */
	virtual bool eval(const std::set<std::string>& tags) const = 0;

	/**
	 * Return a clone of this tag expression
	 */
	//virtual Tagexpr* clone() const = 0;
};

class Expression
{
protected:
	ExpressionImpl* m_impl;

	Expression(ExpressionImpl* impl) : m_impl(impl) { m_impl->ref(); }

	const ExpressionImpl* impl() const { return m_impl; }
	ExpressionImpl* impl() { return m_impl; }

public:
	Expression();
	Expression(const std::string& expr);

	Expression(const Expression& e)
	{
		if (e.m_impl)
			e.m_impl->ref();
		m_impl = e.m_impl;
	}
	~Expression() { if (m_impl->unref()) delete m_impl; }

	Expression& operator=(const Expression& e)
	{
		if (e.m_impl)
			e.m_impl->ref();  // Do it early to correctly handle the case of x = x;
		if (m_impl && m_impl->unref())
			delete m_impl;
		m_impl = e.m_impl;
		return *this;
	}

	Expression operator and (const Expression& e);
	Expression operator or (const Expression& e);
	Expression operator not ();

	template<typename Tags>
	bool operator()(const Tags& tags) const
	{
		std::set<std::string> stags;
		for (typename Tags::const_iterator i = tags.begin();
				i != tags.end(); ++i)
			stags.insert(*i);
		return m_impl->eval(stags);
	}
	bool operator()(const std::set<std::string>& tags) const { return m_impl->eval(tags); }

	bool operator()(const TagexprContext& context) const { return m_impl->eval(context); }

	std::string format() const { return m_impl->format(); }

	static Expression matchTag(const std::string& pattern);
};

/**
 * Context for evaluating expressions of derived tags.
 *
 * A derived tag is a tag which is automatically inferred when a tag expression
 * is matched on a tagset.
 *
 * TagexprContext allows the inference engine to distinguish between a normal
 * tag or a derived tag.
 *
 * This class is mainly used to support DerivedTags and has probably little
 * applications elsewhere.
 */
class TagexprContext
{
protected:
	const std::set<std::string>& tags;
	const std::map<std::string, Expression>& derivedTags;
	// Tags "visited" during tag evaluation: used to break circular loops
	mutable std::set<std::string> seen;

public:
	/**
	 * Create a context for recursive tagset evaluation
	 *
	 * Evaluation happens using a derivation table, which can list a tag as an
	 * alias for another tag expression.  Whenever a tag is matched for
	 * equality with a derived tag, the match is performed with the derived tag
	 * expression instead.
	 * 
	 * \param tags
	 *   The tags to evaluate
	 * \param derivedTags
	 *   The table of derived tags to use in the evaluation
	 */
	TagexprContext(const std::set<std::string>& tags, const std::map<std::string, Expression>& derivedTags)
		: tags(tags), derivedTags(derivedTags) {}

	/**
	 * Evaluates the input tags on the contents to see if they contain the
	 * given tag, or if they match its associated tag expression if tag is a
	 * derived tag
	 */
	bool eval(const std::string& tag) const;
};

};

// vim:set ts=4 sw=4:
#endif
