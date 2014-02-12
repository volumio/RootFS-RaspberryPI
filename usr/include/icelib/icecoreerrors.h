#ifndef ICECORE_ERRORS_H_INCLUDED
#define ICECORE_ERRORS_H_INCLUDED



//! \ingroup IceCore
//! \enum 
//Good results are negative
//errors are non-negative
enum IceCoreResult
{
	IceCoreResult_False = -2,
	IceCoreResult_Ok = -1,
	
	IceCoreResult_Fail = 0,
	IceCoreResult_BadPointer,
	IceCoreResult_UnknownError,
	IceCoreResult_Unimplemented,
	IceCoreResult_FileError
};



#endif //ICECODE_ERRORS_H_INCLUDED