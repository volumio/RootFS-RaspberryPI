#ifndef ICEACHIEVEMENTMANAGER_HEADER_INCLUDED
#define ICEACHIEVEMENTMANAGER_HEADER_INCLUDED

//-----------------------------------------------------------------------------
// Copyright (c) 2011 IndieCity.com
//! \file iceachievementmanager.h
//! \brief achievements interface definition
//-----------------------------------------------------------------------------


#include <iceachievementresults.h>


#ifdef __cplusplus
extern "C"
{
#endif

//-----------------------------------------------------------------------------
//! \class iceAchievementManager
//! \brief Central class for achievements
//-----------------------------------------------------------------------------
struct iceAchievementsManager;


	void iceAchievementManagerAddReference(iceAchievementManager* pAchManager);
	void iceAchievementManagerRelease(iceAchievementManager* pAchManager);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	store session and register interest in server events
	//!			
	//! \param	pSession 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	iceAchievementManager* iceAchievementManagerCreate(iceGameSession* pSession);

	
	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Setup the achievements manager
	//!			
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	iceAchievementResult iceAchievementManagerInitialise(iceAchievementManager* pAchManager);	

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Update achievement manager - currently does nothing
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	iceAchievementResult iceAchievementManagerUpdate(iceAchievmentManager* pAchManager);

	//-----------------------------------------------------------------------------
	//!	\internal
	//! \brief	Save out the achievements init file
	//!			
	//! \param	filename 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	//iceAchievementResult iceAchievementManagerWriteAchievements(iceAchievementManager* pAchManager, const char* filename);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	unlocks an achievement for the current user 
	//!			
	//! \param	achievementId 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	iceAchievementResult iceAchievementManagerUnlockAchievement(iceAchievmentManager* pAchManager, iceAchievementId achievementId);	
	

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	gets an achievementlist for the given user
	//!	
	//! \param	userId the id of the user you want the achievement list for
	//! \param	ppList address of an IUserAchievementList pointer that will be set if successful.
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	iceUsersAchievements* iceAchievementManagerGetUsersAchievements(iceAchievmentManager* pAchManager, iceUserId userId);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	get the achievement set for the game
	//!			
	//! \param	pAchManager 
	//!			
	//! \return	pointer to achivementSet object - NULL on error
	//-----------------------------------------------------------------------------
	iceAchievementSet* iceAchievementManagerGetAchievementSet(iceAchievmentManager* pAchManager);

	
	
	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Backup method just in case more than one achievement group is ever needed
	//!			
	//! \param	pAchManager  
	//! \param	groupId 
	//!			
	//! \return	a pointer to an achievement set- NULL on error
	//-----------------------------------------------------------------------------
	iceAchievementSet* iceAchievementManagerGetAchievementSetFromId(iceAchievementManager* pAchManager, iceAchievementGroupId groupId);



	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Obtain an event object to register interest in an achievement event
	//!			
	//! \param	pAchManager  
	//! \param	eventId 
	//!			
	//! \return	A pointer to an iceEventObject
	//-----------------------------------------------------------------------------
	iceEvent* iceAchievementManagerGetEvent(iceAchievementManager* pAchManager, iceAchievementEventId eventId);
	
///////////////////////////////////////////////////////////////////////////	
#ifdef __cplusplus
}
#endif	
#endif //ICEACHIEVEMENTMANAGER_HEADER_INCLUDED