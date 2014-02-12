/* -*- C++ -*- (c) 2007 Petr Rockai <me@mornfall.net>
               (c) 2007 Enrico Zini <enrico@enricozini.org> */

#include <wibble/test.h>
#include <wibble/grcal/grcal.h>

namespace {

using namespace std;
using namespace wibble;
using namespace wibble::grcal;

#define assert_dt_eq(x, ...) assert_dt_eq_fn( LOCATION( #x " == " #__VA_ARGS__ ), x, __VA_ARGS__)
void assert_dt_eq_fn( Location l, const int* val, int ye, int mo=-1, int da=-1, int ho=-1, int mi=-1, int se=-1 )
{
    int cmp[6] = { ye, mo, da, ho, mi, se };
    std::string a = date::tostring(val);
    std::string b = date::tostring(cmp);
	
    if ( !( a == b ) ) {
        AssertFailed f( l );
        f << " got ["
          << a << "] != [" << b
          << "] instead";
    }
}

// This is copied from grcal.cpp, which is dangerous as I may forget to keep
// in sync; however, it's not a function I'd like to export, but it's a
// function I'd like to test
static inline void normalN(int& lo, int& hi, int N)
{
	if (lo < 0)
	{
		int m = (-lo)/N;
		if (lo % N) ++m;
		hi -= m;
		lo = (lo + (m*N)) % N;
	} else {
		hi += lo / N;
		lo = lo % N;
	}
}

#define assert_nn_eq(x, y, N, x1, y1) assert_nn_eq_fn( LOCATION( #x ", " #y " mod " #N " == " #x1 ", " #y1 ), x, y, N, x1, y1)
void assert_nn_eq_fn( Location l, int x, int y, int N, int x1, int y1)
{
	int vx = x;
	int vy = y;
	normalN(vx, vy, N);
	
        if (vx == x1 && vy == y1)
            return;

        AssertFailed f( l );
         f << " got ["
           << vx << ", " << vy << "] != ["
           << x1 << ", " << y1 << "] instead";
}


struct TestGrcalDate {
	void fill(int* dst, int ye, int mo=-1, int da=-1, int ho=-1, int mi=-1, int se=-1)
	{
		dst[0] = ye;
		dst[1] = mo;
		dst[2] = da;
		dst[3] = ho;
		dst[4] = mi;
		dst[5] = se;
	}

	Test normaln()
	{
		assert_nn_eq(0, 0, 60, 0, 0);
		assert_nn_eq(-1, 0, 60, 59, -1);
		assert_nn_eq(60, 60, 60, 0, 61);
		assert_nn_eq(60, 0, 60, 0, 1);
		assert_nn_eq(0, 60, 60, 0, 60);
		assert_nn_eq(-3600, 0, 60, 0, -60);
		assert_nn_eq(-61, 1, 60, 59, -1);
		assert_nn_eq(-0, 0, 60, 0, 0);
	}

    Test daysinmonth()
    {
		// Trenta giorni ha novembre
        assert_eq(date::daysinmonth(2008, 11), 30);
		// Con april, giugno e settembre
        assert_eq(date::daysinmonth(2008, 4), 30);
        assert_eq(date::daysinmonth(2008, 6), 30);
        assert_eq(date::daysinmonth(2008, 9), 30);
		// Di ventotto ce n'è uno
        assert_eq(date::daysinmonth(2001, 2), 28);
        assert_eq(date::daysinmonth(2004, 2), 29);
        assert_eq(date::daysinmonth(2100, 2), 28);
        assert_eq(date::daysinmonth(2000, 2), 29);
		// Tutti gli altri ne han trentuno
        assert_eq(date::daysinmonth(2008, 1), 31);
        assert_eq(date::daysinmonth(2008, 3), 31);
        assert_eq(date::daysinmonth(2008, 5), 31);
        assert_eq(date::daysinmonth(2008, 7), 31);
        assert_eq(date::daysinmonth(2008, 8), 31);
        assert_eq(date::daysinmonth(2008, 10), 31);
        assert_eq(date::daysinmonth(2008, 12), 31);
    }

    Test daysinyear()
	{
        assert_eq(date::daysinyear(2001), 365);
        assert_eq(date::daysinyear(2004), 366);
        assert_eq(date::daysinyear(2100), 365);
        assert_eq(date::daysinyear(2000), 366);
	}

	Test easter()
	{
		int month, day;
		date::easter(2008, &month, &day);
		assert_eq(month, 3);
		assert_eq(day, 23);
	}

	Test tostring()
	{
		int val[6];
		fill(val, 2008);
		assert_eq(date::tostring(val), "2008");
		fill(val, 2008, 3);
		assert_eq(date::tostring(val), "2008-03");
		fill(val, 2008, 3, 31);
		assert_eq(date::tostring(val), "2008-03-31");
		fill(val, 2008, 3, 31, 3);
		assert_eq(date::tostring(val), "2008-03-31 03");
		fill(val, 2008, 3, 31, 3, 21);
		assert_eq(date::tostring(val), "2008-03-31 03:21");
		fill(val, 2008, 3, 31, 3, 21, 0);
		assert_eq(date::tostring(val), "2008-03-31 03:21:00");
	}

	Test lowerbound()
	{
		int src[6];
		int dst[6];
		fill(src, 2008);
		date::lowerbound(src, dst);
		assert_dt_eq(dst, 2008, 1, 1, 0, 0, 0);

		date::lowerbound(src);
		assert_dt_eq(src, 2008, 1, 1, 0, 0, 0);
	}

	Test normalise()
	{
		int val[6];
		fill(val, 2008, 1, 1, 0, 0, 0);
		date::normalise(val);
		assert_dt_eq(val, 2008, 1, 1, 0, 0, 0);

		fill(val, 2008, 1, 1, 0, 0, 0);
		val[1] -= 12;
		date::normalise(val);
		assert_dt_eq(val, 2007, 1, 1, 0, 0, 0);

		fill(val, 2008, 3, 1, 0, 0, 0);
		val[5] -= 1;
		date::normalise(val);
		assert_dt_eq(val, 2008, 2, 29, 23, 59, 59);

		fill(val, 2008, 2, 28, 23, 0, 0);
		val[5] += 3600;
		date::normalise(val);
		assert_dt_eq(val, 2008, 2, 29, 0, 0, 0);

		fill(val, 2008, 2, 28, 23, 0, 0);
		val[5] += 3600;
		val[0] += 1;
		date::normalise(val);
		assert_dt_eq(val, 2009, 3, 1, 0, 0, 0);

		fill(val, 2008, 2, 28, 23, 0, 0);
		val[5] += 3600;
		val[1] += 12;
		date::normalise(val);
		assert_dt_eq(val, 2009, 3, 1, 0, 0, 0);
	}

	Test upperbound()
	{
		int src[6];
		int dst[6];
		fill(src, 2008);
		date::upperbound(src, dst);
		assert_dt_eq(dst, 2008, 12, 31, 23, 59, 59);

		date::upperbound(src);
		assert_dt_eq(src, 2008, 12, 31, 23, 59, 59);

		fill(src, 2008, 2);
		date::upperbound(src);
		assert_dt_eq(src, 2008, 2, 29, 23, 59, 59);
	}

	Test duration()
	{
		int val1[6];
		int val2[6];

		fill(val1, 2007, 12, 25);
		fill(val2, 2007, 12, 26);
		assert_eq(date::duration(val1, val2), 3600*24);


		fill(val1, 2007, 1, 2, 3, 4, 5);
		assert_eq(date::secondsfrom(2006, val1), 3600*24*365+3600*24+3*3600+4*60+5);

		fill(val2, 2007, 1, 1, 0, 0, 0);
		assert_eq(date::secondsfrom(2006, val2), 3600*24*365);

		fill(val2, 2006, 12, 31, 23, 59, 59);
		assert_eq(date::secondsfrom(2006, val2), 3600*24*365-1);

		fill(val1, 2006, 12, 31, 23, 59, 59);
		fill(val2, 2007, 1, 2, 3, 4, 5);
		assert_eq(date::duration(val1, val2), 1+3600*24+3*3600+4*60+5);
	}
};

struct TestGrcalTime {
	void fill(int* dst, int ho=-1, int mi=-1, int se=-1)
	{
		dst[0] = ho;
		dst[1] = mi;
		dst[2] = se;
	}

	Test tostring()
	{
		int val[3];
		fill(val);
		assert_eq(dtime::tostring(val), "");
		fill(val, 9);
		assert_eq(dtime::tostring(val), "09");
		fill(val, 10, 9);
		assert_eq(dtime::tostring(val), "10:09");
		fill(val, 11, 10, 9);
		assert_eq(dtime::tostring(val), "11:10:09");
	}
	Test tostring_sec()
	{
		assert_eq(dtime::tostring(3600), "01:00:00");
		assert_eq(dtime::tostring(3661), "01:01:01");
	}
};

}

// vim:set ts=4 sw=4:
