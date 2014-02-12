#ifndef ICEUSERSTORE_H_INCLUDED
#define ICEUSERSTORE_H_INCLUDED

#include "icecoreerrors.h"
#include "icetypes.h"




#ifdef __cplusplus
extern "C"
{
#endif


//! \ingroup ICECore
//! \defgroup iceUserList iceUserList
//! \brief a container of users
//! \{


//! \class iceUserList
//! \brief A container of users
struct iceUserList;

struct iceUserInfo;

	//-----------------------------------------------------------------------------		
	//! \brief	create a empty UserList object
	//!	\relates iceUserList	
	//!			
	//!	Use iceUserListRelease to delete the object		
	//! \return	
	//-----------------------------------------------------------------------------
	iceUserList* iceUserListCreate();
	
	
	//-----------------------------------------------------------------------------		
	//! \brief	create a empty UserList object
	//!	\relates iceUserList
	//! \param[in] pList pointer to user list object
	int iceUserListAddReference(iceUserList* pList);
	
	//-----------------------------------------------------------------------------		
	//! \brief	create a empty UserList object
	//!	\relates iceUserList
	//! \param[in] pList pointer to user list object
	int iceUserListRelease(iceUserList* pList);


	//-----------------------------------------------------------------------------		
	//! \brief	load the contents of the user list from a file
	//!	\relates iceUserList
	//! \param[in] pList pointer to user list object		
	//! \param	filename 
	//! \param  key encryption string
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	IceCoreResult iceUserListLoad(iceUserList* pList, const char* filename, const char* key);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Write the contents of the userstore to a file
	//!	\relates iceUserList
	//! \param[in] pList pointer to user list object			
	//! \param[in]	filename 
	//! \param[in]	key encryption string used to encrypt the file
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	IceCoreResult iceUserListSave(const iceUserList* pList, const char* filename, const char* key);
	
	
	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the number of users in the store
	//!	\relates iceUserList	
	//! \param[in] pList pointer to user list object		
	//!			
	//! \return	the user count
	//-----------------------------------------------------------------------------
	unsigned int  iceUserListGetUserCount(const iceUserList* pList);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	returns true if the userstore is empty
	//!	\relates iceUserList	
	//! \param[in] pList pointer to user list object		
	//!			
	//! \return	true if the userstore is empty, false otherwise
	//-----------------------------------------------------------------------------
	bool iceUserListIsEmpty(const iceUserList* pList);
	
	
	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get a IUserInfo interface to the user at the given zero based index in the list
	//!	\relates iceUserList	
	//! \param[in] pList pointer to user list object			
	//! \param[in] userIndex 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	iceUserInfo* iceUserListGetUserFromIndex(const iceUserList* pList, unsigned int userIndex);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get an IUserInfo interface for the user with the given user id.
	//!	\relates iceUserList	
	//! \param[in] pList pointer to user list object
	//! \param[in]	userId 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	iceUserInfo* iceUserListGetUserFromId(const iceUserList* pList, iceUserId userId);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Add a user to the store
	//!	\relates iceUserList	
	//! \param[in] pList pointer to user list object		
	//! \param[in] pUserInfo pointer to a user object to add to list
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	IceCoreResult iceUserListAddUser(iceUserList* pList, iceUserInfo* pUserInfo);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Remove the user at the given index in the store
	//!	\relates iceUserList	
	//! \param[in] pList pointer to user list object			
	//! \param[in] userIndex zero based index of user in list to remove
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	IceCoreResult iceUserListRemoveUserAtIndex(iceUserList* pList, unsigned int userIndex);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Remove the user with given id from the store
	//!	\relates iceUserList	
	//! \param[in] pList pointer to user list object		
	//! \param[in] userId id of user to remove from list
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	IceCoreResult iceUserListRemoveUserWithId(iceUserList* pList, iceUserId userId);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Clear the store of all users
	//!	\memberof iceUserList	
	//! \param[in] pList pointer to user list object		
	//! \return	
	//-----------------------------------------------------------------------------
	IceCoreResult iceUserListClear(iceUserList* pList);
	
//! \}
	
#ifdef __cplusplus
}
#endif


#endif //ICEUSERSTORE_H_INCLUDED