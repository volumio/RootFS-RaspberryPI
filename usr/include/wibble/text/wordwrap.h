#include <string>

using namespace std;

namespace wibble {
namespace text {

/**
 * Simple string wrapper.
 *
 * wibble::text::Wrap takes a string and splits it in lines of the give length
 * with proper word wrapping.
 *
 * Example:
 * \code
 * WordWrap ww("The quick brown fox jumps over the lazy dog");
 * ww.get(5);  // Returns "The"
 * ww.get(14); // Returns "quick brown"
 * ww.get(3);  // Returns "fox"
 * // A line always gets some text, to avoid looping indefinitely in case of
 * // words that are too long.  Words that are too long are split crudely.
 * ww.get(2);  // Returns "ju"
 * ww.get(90); // Returns "mps over the lazy dog"
 * \endcode
 */
class WordWrap
{
	std::string s;
	size_t cursor;

public:
	/**
	 * Creates a new word wrapper that takes data from the given string
	 */
	WordWrap(const std::string& s) : s(s), cursor(0) {}

	/**
	 * Rewind the word wrapper, restarting the output from the beginning of the
	 * string
	 */
	void restart() { cursor = 0; }

	/**
	 * Returns true if there is still data to be read in the string
	 */
	bool hasData() const { return cursor < s.size(); }

	/**
	 * Get a line of text from the string, wrapped to a maximum of \c width
	 * characters
	 */
	std::string get(unsigned int width);
};

}
}


// vim:set ts=4 sw=4:
