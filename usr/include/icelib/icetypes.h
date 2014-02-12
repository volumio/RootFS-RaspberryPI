#ifndef ICETYPES_H_INCLUDED
#define ICETYPES_H_INCLUDED

#include <stdint.h>
#include <cstring>


	
#ifndef ICE_INT8_DEFINED
#define ICE_INT8_DEFINED
	typedef signed char iceInt8;
#endif //!IC_INT8_DEFINED

#ifndef ICE_INT16_DEFINED
#define ICE_INT16_DEFINED
	typedef signed short iceInt16;
#endif //!IC_INT16_DEFINED	
	
#ifndef ICE_INT32_DEFINED
#define ICE_INT32_DEFINED
	typedef int32_t iceInt32;
#endif //!IC_INT32_DEFINED
	
#ifndef ICE_INT64_DEFINED
#define ICE_INT64_DEFINED
	typedef int64_t iceInt64;
#endif //!IC_INT64_DEFINED
	
	
#ifndef ICE_UINT8_DEFINED
#define ICE_UINT8_DEFINED
	typedef unsigned char		UInt8;
#endif //!IC_UINT8_DEFINED

#ifndef ICE_UINT16_DEFINED
#define ICE_UINT16_DEFINED
	typedef unsigned short		iceUInt16;
#endif //!IC_UINT16_DEFINED
	
#ifndef ICE_UINT32_DEFINED
#define ICE_UINT32_DEFINED
	typedef uint32_t	iceUInt32;
#endif //!IC_UINT32_DEFINED

#ifndef ICE_UINT64_DEFINED
#define ICE_UINT64_DEFINED
	typedef uint64_t	iceUInt64;
#endif //!IC_UINT64_DEFINED

#ifndef ICE_DWORD_DEFINED
#define ICE_DWORD_DEFINED
	typedef uint32_t iceDWord;
#endif //!IC_DWORD_DEFINED
	
#ifndef ICE_QWORD_DEFINED
#define ICE_QWORD_DEFINED
	typedef uint64_t iceQWord;
#endif //!IC_QWORD_DEFINED





	//char types
#ifndef ICE_CHAR_DEFINED
#define ICE_CHAR_DEFINED
	typedef char iceChar;
#endif //!IC_CHAR_DEFINED

#ifndef ICE_UCHAR_DEFINED
#define ICE_UCHAR_DEFINED
	typedef unsigned char iceUChar;
#endif //!IC_UCHAR_DEFINED

#ifndef ICE_WCHAR_DEFINED
#define ICE_WCHAR_DEFINED
	typedef wchar_t WChar;
#endif //!IC_WCHAR_DEFINED
	
#ifndef ICE_USHORT_DEFINED
#define ICE_USHORT_DEFINED
	typedef unsigned short iceUshort;
#endif //!IC_USHORT_DEFINED

#ifndef ICE_LONG_DEFINED
#define ICE_LONG_DEFINED
	typedef unsigned long iceUlong;
#endif //!IC_LONG_DEFINED

#ifndef ICE_UINT_DEFINED
#define ICE_UINT_DEFINED
	typedef unsigned int iceUint;
#endif //!IC_UINT_DEFINED

	//data types
#ifndef ICE_BYTE_DEFINED
#define ICE_BYTE_DEFINED
	typedef unsigned char iceByte;
#endif //!IC_BYTE_DEFINED

#ifndef ICE_WORD_DEFINED
#define ICE_WORD_DEFINED
	typedef unsigned short iceWord;
#endif //!IC_WORD_DEFINED



	//boolean types
#ifndef ICE_BOOL_DEFINED
#define ICE_BOOL_DEFINED
	typedef bool iceBool;
#endif //!IC_BOOL_DEFINED

#ifndef ICE_REAL_DEFINED
#define ICE_REAL_DEFINED
	typedef float iceReal;
#endif //!IC_REAL_DEFINED

#ifndef ICE_FLOAT_DEFINED
#define ICE_FLOAT_DEFINED
	typedef float iceFloat;
#endif //!IC_FLOAT_DEFINED

#ifndef ICE_DOUBLE_DEFINED
#define ICE_DOUBLE_DEFINED
	typedef double iceDouble;
#endif //!IC_DOUBLE_DEFINED


#ifndef ICE_USERID_DEFINED
#define ICE_USERID_DEFINED
	typedef iceInt32 iceUserId;
#endif


#ifndef ICE_SERVICEID_DEFINED
#define ICE_SERVICEID_DEFINED
	typedef iceInt32 iceServiceId;
#endif


#endif //ICETYPES_H_INCLUDED