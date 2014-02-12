#include <iostream>
#include <icelib/icebridge.h>
#include <icelib/icecore.h>
#include <unistd.h>


using namespace std;

///////////////////////////////////////////////////////////////////////////////////////
TODO fill in your game ids- This line purposely set to cause an error.
static const char myGameId[] 		= "########-####-####-####-############";
static const char myIceLibId[] 		= "########-####-####-####-############";
static const char myIceLibSecret[] 	= "########-####-####-####-############";

///////////////////////////////////////////////////////////////////////////////////////


static volatile bool g_waitingToStart = false;

 void OnStarted(const iceEvent* pEvent, const void* eventArgs, void* userContext)
 {
	 g_waitingToStart = false;
 }
 
void OnStopped(const iceEvent* pEvent, const void* eventArgs, void* userContext)
 {
	 g_waitingToStart = false;
 }

int main(int argc, char** argv)
{
	cout << "hello world\n";


	iceClientBridge* pBridge = iceClientBridgeCreate(myGameId);
	
	
	if( pBridge != NULL )
	{
	
		iceServiceId icelibService = iceServiceId_IndieCityLeaderboardsAndAchievements();
		IceBridgeResult result = iceClientBridgeSetServiceCredentials(pBridge, icelibService, myIceLibId, myIceLibSecret);
				
		iceUserId defaultUserId = iceClientBridgeGetDefaultUserId(pBridge);
	
		
		iceUserList* pStore = iceClientBridgeGetUserList(pBridge);
		if( pStore != NULL )
		{
			int numUsers = iceUserListGetUserCount(pStore);
			if( numUsers > 0 )
			{
				cout << "We have " << numUsers << " users:" << endl;
				for( int i = 0; i < numUsers; ++i)
				{
					iceUserInfo* pUser = iceUserListGetUserFromIndex(pStore, i);
					char nameBuffer[256];
					
					if( pUser != NULL )
					{
						iceUserInfoGetName(pUser, nameBuffer, 256);
						iceUserId id = iceUserInfoGetId(pUser);
						cout << id << ".\t" << nameBuffer << endl; 
						
						iceUserInfoRelease(pUser);
						pUser = NULL;
					}
				}
			}

			cout <<  "Testing for default user" << endl;
			iceUserInfo* pUser = iceUserListGetUserFromId(pStore, defaultUserId);
			if( pUser != NULL )
			{
				char nameBuffer[256];

				iceUserInfoGetName(pUser, nameBuffer, 256);
				iceUserId id = iceUserInfoGetId(pUser);

				cout << "The default user is ";
				cout << id << ".\t" << nameBuffer << endl; 
			
					
				iceUserInfoRelease(pUser);
				pUser = NULL;
			}
			else
			{
				cout << "No default user is set" << endl;
			}
			
					
			iceUserListRelease(pStore);
			pStore = NULL;
		}

		iceGameSession* pSession = iceClientBridgeCreateDefaultGameSession( pBridge );
		if( pSession != NULL ) 
		{

			cout << "Created session object" << endl;
			//start the session 
			iceEvent* pStartEvent = iceGameSessionGetEvent(pSession, iceGameSessionEvent_Started);
			if( pStartEvent != NULL )
			{
				iceDWord startCookie = iceEventRegisterHandler(pStartEvent, OnStarted, NULL);

				iceEventRelease(pStartEvent);
				pStartEvent = NULL;
			}

			iceEvent* pStopEvent = iceGameSessionGetEvent(pSession, iceGameSessionEvent_Ended);
			if( pStopEvent != NULL)
			{
				iceDWord regCookie = iceEventRegisterHandler(pStopEvent, OnStopped, NULL);

				iceEventRelease(pStopEvent);
				pStopEvent = NULL;
			}

			
			iceGameSessionRequestStart(pSession);

			iceLicenseState licenseTest1 = iceGameSessionGetUserLicenseState(pSession);

			cout << "Attempt to start session" <<endl;
			g_waitingToStart = true;
			while(g_waitingToStart)
			{
				usleep(100000); //sleep for 1/10 second
				iceGameSessionUpdate(pSession);
			}

			if( iceGameSessionIsSessionStarted(pSession) )
			{
				cout << "Session started!" << endl;

				iceLicenseState licenseTest2 = iceGameSessionGetUserLicenseState(pSession);

				//Stop the session 
				iceGameSessionRequestEnd(pSession);
				while(iceGameSessionIsSessionStarted(pSession))
				{
					usleep(100000); //sleep for 1/10 second
					iceGameSessionUpdate(pSession);
				}
				cout <<  "Session stopped!" << endl;
			}
			else
			{
				cout << "Failed to start session" << endl;
			}

			iceLicenseState licenseTest3 = iceGameSessionGetUserLicenseState(pSession);
			iceGameSessionRelease(pSession);
			pSession = NULL;
		}
		else
		{
			cout << "failed to create session. Check tokens exist for this user for this game." << endl;
		}



		iceClientBridgeRelease(pBridge);
		pBridge = NULL;
	}
	
	
	return 0;
}


