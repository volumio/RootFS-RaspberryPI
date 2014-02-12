	
#ifndef ICEUSERSACHIEVEMENTS_HEADER_INCLUDED
#define ICEUSERSACHIEVEMENTS_HEADER_INCLUDED

	
	
	
	
	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the user id this list is for
	//!			
	//! \param	pId 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	[propget] HRESULT UserId([out,retval] UserId* pId);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the number of achievements in the list
	//!			
	//! \param	pCount 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	[propget] HRESULT NumberAchievements([out,retval] UINT* pCount);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get a particular achievement given its index in the list
	//!			
	//! \param	index 
	//! \param	ppAchievement 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT GetAchievementFromIndex([in] UINT index, [out,retval] IAchievement** ppAchievement);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	get a particular achievement given its id
	//!			
	//! \param	id 
	//! \param	ppAchievement 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT GetAchievementFromId([in] AchievementId id, [out,retval] IAchievement** ppAchievement);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the achievement with the given tag string. - NOT IMPLEMENTED do not use
	//!			
	//! \param	tag 
	//! \param	ppAchievement 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT GetAchievementFromTag([in] BSTR tag, [out,retval] IAchievement** ppAchievement);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Refresh the achievements stored in this list
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT Refresh();


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get whether the list is populating or not
	//!			
	//! \param	pState 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	[propget] HRESULT PopulationState([out,retval] LeaderboardPopulationState* pState);


	

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Returns true if the list has the achievement with given id in it
	//!			
	//! \param	id 
	//! \param	pIsUnlocked 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT IsAchievementUnlocked([in] AchievementId id, [out,retval] VARIANT_BOOL* pIsUnlocked);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Returns true if the list has the achivement with given tag in it - NOT IMPLEMENTED do not use
	//!			
	//! \param	tag 
	//! \param	pIsUnlocked 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT IsAchievementUnlockedFromTag([in] BSTR tag, [out,retval] VARIANT_BOOL* pIsUnlocked);
	
	
#endif //ICEUSERSACHIEVEMENTS_HEADER_INCLUDED