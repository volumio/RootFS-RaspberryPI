//-----------------------------------------------------------------------------
// Copyright (c) 2011 IndieCity.com
//! \file AchievementGroup.idl
//! \brief IAchievementGroup interface definition

//-----------------------------------------------------------------------------
//!			
//! \brief	IAchievementSet interface
//! 
//! Contains a set of achievements
//! \ingroup ICEAchievements
//!	
[
	object,
	uuid(7949AE76-EE22-49e0-9815-8B62E43C2419),
	helpstring("Stores all the achievements available for a game.")
]
interface IAchievementGroup: IUnknown
{	
	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get group id - This is the id of the game
	//!			 
	//! \param	pId 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	[propget] HRESULT GroupId([out,retval] AchievementGroupId* pId);
	

	

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the image data for the group as a whole - This method in unimplemented and should not be used
	//!			
	//! \param	ppBitmap 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	iceAchievementResult GetImage( [out, retval] iceBitmap** ppBitmap);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the title of the group as a whole
	//!			 
	//! \param	title 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	[propget] HRESULT Title([out,retval] BSTR* title);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the description of the group as a whole - NOTE The description is not currently supported and will always return NULL
	//!			
	//! \param	description 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	[propget] HRESULT Description([out,retval] BSTR* description);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the number of achievements stored in the group
	//!			 
	//! \param	count 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	[propget] HRESULT AchievementCount([out,retval] UINT* count);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the achievement at given index
	//!	
	//! \param  index zero based index
	//! \param	ppAchievement 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT GetAchievementFromIndex([in] UINT index, [out,retval] IAchievement** ppAchievement);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the achievement with given id
	//!			
	//! \param	achievementId The id of the achievement
	//! \param	ppAchievement Address of IAchievement ptr.
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT GetAchievementFromId([in] AchievementId achievementId, [out, retval] IAchievement** ppAchievement);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the achievement with the given tag string. - NOT IMPLEMENTED do not use
	//!			
	//! \param	tag 
	//! \param	ppAchievement 
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT GetAchievementFromTag([in] BSTR tag, [out, retval] IAchievement** ppAchievement);


	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Request the latest version of achievement values from server
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	HRESULT RefreshAchievementValues();


};