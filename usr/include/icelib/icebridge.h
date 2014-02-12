#ifndef ICEBRIDGE_H_INCLUDED
#define ICEBRIDGE_H_INCLUDED

//-----------------------------------------------------------------------------
// Copyright (c) 2011 IndieCity.com
//! \file icecore.h
//! \brief Main include for ICEBridge library
//! \defgroup ICEBridge ICEBridge - IndieCity Extras client bridge interface
//! Provides access to data setup by the IndieCity Download Client 

#include "icetypes.h"
#include "icebridgeresult.h"


#ifdef __cplusplus
extern "C"
{
#endif


//! \ingroup ICEBridge
//! \defgroup iceClientBridge iceClientBridge
//! \{

//! \class iceClientBridge iceClientBridge
//! \brief opaque iceBridge object
//! used to access the users and tokens as setup by the download client
struct iceClientBridge;
struct iceGameSession;
struct iceUserList;


//! \name Reference Counting
//! {

//-----------------------------------------------------------------------------
//!			
//! \brief	Release and shutdown the ClientBridge object
//! \relates iceClientBridge
//! \param[in] pBridge pointer to bridge object
//!
//-----------------------------------------------------------------------------
void iceClientBridgeRelease(iceClientBridge* pBridge);

//! \}


//! \name Creation and Initialisation
//! \{

//-----------------------------------------------------------------------------
//!			
//! \brief	Create the ClientBridge object
//! \relates iceClientBridge
//! \param[in] null terminated cstring of IndieCity Game Id
//!
//-----------------------------------------------------------------------------

iceClientBridge* iceClientBridgeCreate(const char* gameId);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Set the games credentials for logging on to a particular service
	//! \relates iceClientBridge
	//! \param[in] pBridge pointer to bridge object		
	//! \param	service			which service is this the credentials for
	//! \param	serviceGameId	the game's id with the service
	//! \param	serviceSecret	the games's secret
	//!			
	//! \return	
	//-----------------------------------------------------------------------------
	IceBridgeResult iceClientBridgeSetServiceCredentials(iceClientBridge* pBridge, iceServiceId serviceId, const char* serviceGameId,  const char* serviceSecret);

//! \}



//! \name Session Creation
//! \{

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Create a gamesession for the given user id	
	//! \relates iceClientBridge
	//! \param[in] pBridge pointer to bridge object		
	//! \param	userid id of user to create session for
	//! Use iceGameSessionRelease when finished with it
	//-----------------------------------------------------------------------------
	iceGameSession* iceClientBridgeCreateGameSession(iceClientBridge* pBridge, iceUserId userid);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief Create a gamesession for the default user as setup by the launcher	
	//! \relates iceClientBridge
	//! \param[in] pBridge pointer to bridge object			
	//-----------------------------------------------------------------------------
	iceGameSession* iceClientBridgeCreateDefaultGameSession(iceClientBridge* pBridge);
	
//! \}
	
	
//! \name User Access	
//! \{
	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the interface to the user list object set up by the IndieCity Client
	//! \relates iceClientBridge
	//! \param[in] pBridge pointer to bridge object			
	//!			
	//! \return	pointer to iceUserList object
	//-----------------------------------------------------------------------------
	iceUserList* iceClientBridgeGetUserList(const iceClientBridge* pBridge);

	//-----------------------------------------------------------------------------
	//!			
	//! \brief	Get the id of the user that should play the game as set up by the launcher
	//! \relates iceClientBridge
	//! \param[in] pBridge pointer to bridge object			
	//!			
	//! \return	userid the id of the default user to play games
	//-----------------------------------------------------------------------------
	iceUserId iceClientBridgeGetDefaultUserId(const iceClientBridge* pBridge);
//! \}

//! \}

#ifdef __cplusplus
}
#endif



#endif //ICEBRIDGE_H_INCLUDED
