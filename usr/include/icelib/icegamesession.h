#ifndef ICEGAMESESSION_H_INCLUDED
#define ICEGAMESESSION_H_INCLUDED
//-----------------------------------------------------------------------------
// Copyright (c) 2011 IndieCity.com
//! \file icegamesession.h
//! \brief GameSession interface definition
//-----------------------------------------------------------------------------


#include "icecoreerrors.h"
#include "icetypes.h"
#include "iceevent.h"




#ifdef __cplusplus
extern "C"
{
#endif
///////////////////////////////////////////////////////////////////////////////////////////////

//! \ingroup ICECore
//! \defgroup iceGameSession iceGameSession
//! \brief interface for sending messages to online services
//! \{





//! \class iceGameSession
//! \brief opaque type for manipulating the session with
struct iceGameSession;

//! \name Enumerations
//! \{
enum iceGameSessionReasonCode
{	
	iceGameSessionReasonCode_UserRequest	= 0,
	iceGameSessionReasonCode_Unknown,
	iceGameSessionReasonCode_NoConnection,
	iceGameSessionReasonCode_BadCredentials ,
	iceGameSessionReasonCode_TimeOut, 
} ;

//Events offered by the GameSession interface
enum iceGameSessionEvent
{	
	iceGameSessionEvent_Started = 0,		//Triggered when the event has started succesfully
	iceGameSessionEvent_Ended,				//Triggered when the session ends for any reason
	iceGameSessionEvent_Noof
} ;


enum iceLicenseState
{
	iceLicenseState_Unknown,
	iceLicenseState_NoLicence,	
	iceLicenseState_HasLicense,
};

//! \}

///////////////////////////////////////////////////////////////////////////////////////////
//! \name Reference Counting
//! \{

	//! \brief increment the ref count of the game session
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	void iceGameSessionAddReference(iceGameSession* pGameSession);
	
	//! \brief free up the game session
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	void iceGameSessionRelease(iceGameSession* pGameSession);
	
//! \}



///////////////////////////////////////////////////////////////////////////////////////////
//! \name Creation and Initialisation
//! \{

	//! \brief Set the credentials of the game connecting to IndieCity
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	//! Store the gameId and secret. The gameId is UUID for the game. 
	//! The secret is a string that is used to sign requests to the server and helps provide confidence that the game is the game it says it is.  
	//! It should only be known by the developer and IndieCity server.
	iceGameSession* iceGameSessionCreate();
	
	
	//! \brief set the user access token for an application
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	//! The access token is equivalent to the users credentials for that game.
	//! allows game to login to server with that user's access rights
	//! Also essentially specifies the user to login.
	//! Setting this should fail if a session is already started
	IceCoreResult iceGameSessionSetUserAccessToken(iceGameSession* pGameSession, iceServiceId serviceId, const char* accessToken,  const char* tokenSecret);
	
	
	//! \brief //set the games id and secret for a service
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	//! The access token is equivalent to the users credentials for that game.
	//! allows game to login to server with that user's access rights
	//! Also essentially specifies the user to login.
	IceCoreResult iceGameSessionSetGameCredentials(iceGameSession* pGameSession, iceServiceId serviceId, const char* gameId, const char* secret);
	
//! \}
	
	
	////////////////////////////////////
	//! \name Session Starting
	//! \{
	
	//! \brief Attempt to connect to IndieCity server
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	//!	Attempt to connect to IndieCity server and establish user is now playing the game. 
	//! Can fail if no connection can be made or if user is already logged into IndieCity from a different machine. 
	//! UserToken is a string.")	
	IceCoreResult iceGameSessionRequestStart(iceGameSession*  pSession);
	
	//! \brief Disconnect from IndieCity server
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	//!	Inform the IndieCity Server that the user has finished playing the game 
	//! 
	//!
	IceCoreResult iceGameSessionRequestEnd(iceGameSession*  pSession);

	//! brief send requests and get server events
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	//!
	//!	Send all batched requests from modules to Server and handle response. 
	//! Even if no requests are present UpdateSession will still send a KeepAlive message to server to keep the session alive.  
	//! This function needs to be called more often than timeout period (approx 30 seconds) or the session will end. 	
	IceCoreResult iceGameSessionUpdate(iceGameSession*  pSession);
	
	//! \}
	
	

	///////////////////////////////////////////////////
	//! \name Properties
	//! \{
	
	//! \brief get an event interface pointer
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	iceEvent* iceGameSessionGetEvent(iceGameSession*  pSession, iceGameSessionEvent eventId);
	
	
	//! \brief test if session is started
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	bool  iceGameSessionIsSessionStarted(const iceGameSession* pSession);

		
	//! \brief Get the license state
	//! \memberof iceGameSession	
	//! \param[in] pSession pointer to session interface
	iceLicenseState iceGameSessionGetUserLicenseState(const iceGameSession* pSession);
//! \}
//! \}

///////////////////////////////////////////////////////////////////////////	
#ifdef __cplusplus
}
#endif	


#endif //ICEGAMESESSION_H_INCLUDED
