// -*- C++ -*-
#ifndef WIBBLE_GRCAL_GRCAL_H
#define WIBBLE_GRCAL_GRCAL_H

/*
 * Gregorian calendar functions
 *
 * Copyright (C) 2007--2008  Enrico Zini <enrico@debian.org>
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

/**
 * @file
 *
 * This header provides functions to handle Gregorian calendar dates and times.
 *
 * The data type used through the module to represent a date is an int[6],
 * containing:
 * \l year
 * \l month (starting from 1)
 * \l day of month (starting from 1)
 * \l hour
 * \l minute
 * \l second
 *
 * The int[6] array does not need to be completely filled, and any value except
 * for the year can be left missing, with the value of -1.  However, if a
 * value is set to -1, all the following values in the array must also be -1.
 * For example, 'March 2008' can be represented as { 2008, 3, -1, -1, -1, -1 },
 * but something like { 2008, 3, -1, 12, -1, -1 } is not a valid date, as there
 * can only be the value -1 after the first -1.
 *
 * The date+time in the int[6] array is always stored in UTC: the module does
 * not attempt to work with timezones or daylight saving.
 *
 * The full range of the Gregorian calendar is accepted, so years like 1789
 * will work fine, although pay extra attention if you are comparing historical
 * events of countries that adopted the Gregorian calendar in different times,
 * like Russia or Greece.
 *
 * Some functions work with the time of day only: those functions will work
 * with int[3] parameters.  The time of the day can also have missing values,
 * with the same rules as the int[6] dates: this is midday: { 12, -1, -1 }, but
 * this is not valid: { 12, -1, 30 }.  However, in the case of int[3] times the
 * hour can also be missing, so { -1, -1, -1 } is a valid time.
 *
 * Some function represent the time as a single integer: that is intended to be
 * the number of seconds after the start of the day.  Therefore, midnight would
 * be 0, and midday would be 43200 (12*3600).
 */

struct tm;

namespace wibble {
namespace grcal {

/**
 * Functions that work with int[6] datetime values
 */
namespace date {

/**
 * Fill in an int[6] with the UTC values for today (leaving the time of day elements to -1)
 */
void today(int* dst);

/// Fill in an int[6] with the UTC values for now
void now(int* dst);

/// Return the number of days in a month
int daysinmonth(int year, int month);

/// Return the number of days in a year
int daysinyear(int year);

/**
 * Compute the day of Easter.
 *
 * The algorithm used is the Meeus/Jones/Butcher Gregorian algorithm described
 * at http://en.wikipedia.org/wiki/Computus
 */
void easter(int year, int* month, int* day);

/**
 * Make a copy of the datetime, filling in missing values with the lowest
 * possible value they can have
 */
void lowerbound(const int* src, int* dst);

/**
 * Fill in the missing values of a datetime with the lowest possible value they
 * can have
 */
void lowerbound(int* val);

/**
 * Make a copy of the datetime, filling in missing values with the highest
 * possible value they can have
 */
void upperbound(const int* src, int* dst);

/**
 * Fill in the missing values of a datetime with the highest possible value they
 * can have
 */
void upperbound(int* val);

/**
 * Normalise a datetime, in place.
 *
 * This function takes in input a datetime with no missing values, but some
 * values can be arbitrarily out of range.  The datetime will be normalised so
 * that all the elements will be within range, and it will still represent the
 * same instant.
 *
 * For example (remember that months and days start from 1, so a day of 0 means
 * "last day of previous month"):
 *
 * \l normalise({2007, 0, 1, 0, 0, 0}) gives {2006, 12, 1, 0, 0, 0}
 * \l normalise({2007, -11, 1, 0, 0, 0}) gives {2006, 1, 1, 0, 0, 0}
 * \l normalise({2007, 1, -364, 0, 0, 0}) gives {2006, 1, 1, 0, 0, 0}
 * \l normalise({2007, 1, 366, 0, 0, 0}) gives {2008, 1, 1, 0, 0, 0}
 * \l normalise({2009, 1, -364, 0, 0, 0}) gives {2008, 1, 2, 0, 0, 0}, because
 *    2008 is a leap year
 * \l normalise({2008, 1, 1, 0, 0, -3600}) gives {2007, 12, 31, 23, 0, 0}
 */
void normalise(int* res);

/**
 * Compute the number of seconds that elapsed from the beginning of the given
 * year until the given datetime.
 *
 * It is assumed that year <= val[0]: giving a year greather than val[0] will
 * give unpredictable results.
 */
long long int secondsfrom(int year, const int* val);

/**
 * Give the duration in seconds of the interval between begin and end.
 *
 * The result can be negative if end is an earlier date than begin.
 */
long long int duration(const int* begin, const int* end);

/**
 * Make a copy of \a date, with the time part taken from \a time.
 *
 * \note \a time is an int[3] time value;
 */
void mergetime(const int* date, const int* time, int* dst);

/**
 * Replace the time part of \a date with the values from time.
 *
 * \note \a time is an int[3] time value;
 */
void mergetime(int* date, const int* time);

/**
 * Copy the values from an int[6] datetime into a struct tm.
 */
void totm(const int* src, struct tm* dst);

/**
 * Copy the values from a struct tm to the first \a count values of the int[6]
 * \a dst.
 */
void fromtm(const struct tm& src, int* dst, int count = 6);

/**
 * Convert a datetime to a string
 */
std::string tostring(const int* val);

}

/**
 * Functions that work with int[3] time of day values
 */
namespace dtime {

/**
 * Make a copy of the time, filling in missing values with the lowest
 * possible value they can have
 */
void lowerbound(const int* src, int* dst);

/**
 * Fill in the missing values of a time of day with the lowest possible value
 * they can have
 */
void lowerbound(int* val);

/**
 * Convert a time of day in second, filling the missing values with the lowest
 * possible value they can have.
 */
int lowerbound_sec(const int* src);


/**
 * Make a copy of the time, filling in missing values with the highest possible
 * value they can have
 */
void upperbound(const int* src, int* dst);

/**
 * Fill in the missing values of a time of day with the highest possible value
 * they can have
 */
void upperbound(int* val);

/**
 * Convert a time of day in second, filling the missing values with the highest
 * possible value they can have.
 */
int upperbound_sec(const int* src);

/**
 * Give the duration in seconds of the interval between the end of begin
 * and the beginning of end.
 *
 * The result can be negative if end is an earlier time than begin.
 */
int duration(const int* begin, const int* end);

/**
 * Format a time of day to a string
 */
std::string tostring(const int* val);

/**
 * Format a time of day expressed in seconds to a string
 */
std::string tostring(int val);

}

}
}

// vim:set ts=4 sw=4:
#endif
