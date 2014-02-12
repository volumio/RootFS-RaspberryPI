#ifndef TAGCOLL_TEXTFORMAT_H
#define TAGCOLL_TEXTFORMAT_H

/** \file
 * Serialize and deserialize a tagged collection to a text file
 */

/*
 * Copyright (C) 2003--2006  Enrico Zini <enrico@debian.org>
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
#include <wibble/empty.h>
#include <wibble/singleton.h>
#include <tagcoll/input/base.h>

#include <stdio.h>

//#define TRACE_PARSE

namespace tagcoll
{
template<class ITEM, class TAG>
class PatchList;
template<class ITEM, class TAG>
class Patch;

namespace textformat
{

/**
 * TagcollConsumer that serializes its input to an output stream
 *
 * The format of the output is:
 *   lines of "comma+space"-separated items, followed by "colon+space",
 *   followed by the corresponding "comma+space"-separated tags.
 * Examples:
 *   ITEM:
 *   ITEM: TAG
 *   ITEM: TAG1, TAG2, TAG3
 *   ITEM1, ITEM2, ITEM3:
 *   ITEM1, ITEM2, ITEM3: TAG1, TAG2, TAG3
 */
class StdioWriter : public wibble::mixin::OutputIterator<StdioWriter>
{
protected:
	FILE* out;

public:
	StdioWriter(FILE* out) : out(out) {}

	template<typename Items, typename Tags>
	StdioWriter& operator=(const std::pair<Items, Tags>& data);
};

class OstreamWriter : public wibble::mixin::OutputIterator<OstreamWriter>
{
protected:
	std::ostream& out;

public:
	OstreamWriter(std::ostream& out) : out(out) {}

	template<typename Items, typename Tags>
	OstreamWriter& operator=(const std::pair<Items, Tags>& data);
};

/**
 * Parse an element from input
 *
 * @retval item
 *   The item found on input
 * @return
 *   the trailing separating char, that can be:
 *   \li input::Input::Eof
 *   \li '\n'
 *   \li ':'
 *   \li ','
 */
int parseElement(input::Input& in, std::string& item);


/**
 * Serialize a patch
 */
template<typename ITEM, typename TAG, typename ITEMSER, typename TAGSER>
void outputPatch(
		ITEMSER& itemconv,
		TAGSER& tagconv,
		const PatchList<ITEM, TAG>& patch,
		FILE* out);

void outputPatch(
		const PatchList<std::string, std::string>& patch,
		FILE* out);


/*
 * Parse a tagged collection, sending the results to out.
 *
 * @param out
 *   An output iterator accepting a std::pair<string, string>
 */
template<typename OUT>
void parse(input::Input& in, OUT out);

/**
 * Assemble a patch from a stream of "item: +added, -removed" items and tags
 */
template<typename OUT>
class PatchAssembler : public wibble::mixin::OutputIterator< PatchAssembler<OUT> >
{
	OUT out;
public:
	PatchAssembler(const OUT& out) : out(out) {}

	template<typename ITEMS, typename TAGS>
	PatchAssembler& operator=(const std::pair<ITEMS, TAGS>& data);
};

template<typename OUT>
PatchAssembler<OUT> patchAssembler(const OUT& out)
{
	return PatchAssembler<OUT>(out);
}

template<typename OUT>
void parsePatch(input::Input& in, OUT out)
{
	parse(in, patchAssembler(out));
}

/**
 * Parse a tagcoll patch
 */
template<typename ITEM, typename TAG, typename ITEMSER, typename TAGSER>
PatchList<ITEM, TAG> parsePatch(
		ITEMSER& itemconv,
		TAGSER& tagconv,
		input::Input& in);

PatchList<std::string, std::string> parsePatch(input::Input& in);



template<typename ITEM, typename TAG, typename ITEMSER, typename TAGSER>
class PatchBuilder : public wibble::mixin::OutputIterator< PatchBuilder<ITEM, TAG, ITEMSER, TAGSER> >
{
protected:
	PatchList<ITEM, TAG>& patch;
	const ITEMSER& itemconv;
	const TAGSER& tagconv;

public:
	PatchBuilder(
			PatchList<ITEM, TAG>& patch,
			const ITEMSER& itemconv,
			const TAGSER& tagconv)
		: patch(patch), itemconv(itemconv), tagconv(tagconv) {}

	template<typename ITEMS, typename TAGS>
	PatchBuilder<ITEM, TAG, ITEMSER, TAGSER>& operator=(const std::pair<ITEMS, TAGS>& data);

	const PatchList<ITEM, TAG>& getPatch() const throw () { return patch; }
};

template<typename ITEM, typename TAG, typename ITEMSER, typename TAGSER>
PatchBuilder<ITEM, TAG, ITEMSER, TAGSER> patchBuilder(
			PatchList<ITEM, TAG>& patch,
			const ITEMSER& itemconv,
			const TAGSER& tagconv)
{
	return PatchBuilder<ITEM, TAG, ITEMSER, TAGSER>(patch, itemconv, tagconv);
}

}
}

// vim:set ts=4 sw=4:
#endif
