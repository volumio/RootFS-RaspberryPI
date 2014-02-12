#ifndef ICEUSERINFO_H_INCLUDED
#define ICEUSERINFO_H_INCLUDED


#include "icecoreerrors.h"
#include "icetypes.h"



	
	
#ifdef __cplusplus
extern "C"
{
#endif

//! \ingroup ICECore
//! \defgroup iceUserInfo iceUserInfo
//! \brief a container of users
//! \{

//! \class iceUserInfo
//! \brief stores user properties
struct iceUserInfo;


//! \name Reference Counting
//! \{

	
	//! \brief increment the ref count
	//! \relates iceUserInfo
	//! \param[in] pUserInfo pointer to userinfo object
	int	iceUserInfoAddRef(iceUserInfo* pUserInfo);

	
	//! \brief indicate that the userinfo object has been finished with;
	//! \relates iceUserInfo
	//! \param[in] pUserInfo pointer to userinfo object
	int iceUserInfoRelease(iceUserInfo* pUserInfo);
	
//! \}
	
	
//! \name Properties
//! \{
	
	
	//! \brief Obtain name in utf8 format
	//! \relates iceUserInfo
	//! \param[in] pUserInfo pointer to userinfo object
	//! \param[in] buffer to write name to 
	//! \param[in] maxBufferSize maximum num of chars that can be writting including space for nul terminator. The maximum name length is currently 15 unicode characters. A utf8 buffer might have to be 6 times this to contain exotic symbols.
	//! \param[out] pNameLength pointer to variable to write how many characters were written.
	//! \return result code
	IceCoreResult 	iceUserInfoGetName(const iceUserInfo* pUserInfo,  char* buffer, size_t maxBufferSize, size_t* pNameLength = NULL);
	

	//! \brief Get the IndieCity user id	
	//! \relates iceUserInfo
	//! \param[in] pUserInfo pointer to userinfo object
	//! \return the user's IndieCity id.
	iceUserId 	iceUserInfoGetId(const iceUserInfo* pUserInfo);	
	
	
	//! \}
//! \}

#ifdef __cplusplus
}
#endif




#endif //ICEUSERINFO_H_INCLUDED