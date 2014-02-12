#ifndef ICELEADERBOARDMANAGER_H_INCLUDED
#define ICELEADERBOARDMANAGER_H_INCLUDED

#include "icetypes.h"
#include "iceleaderboardresult.h"

#define DLL_EXPORT

struct IceGameSession;
struct IceLeaderboardManager;
struct IceLeaderboard;
struct IceLeaderboardRows;
struct IceUser;

#ifdef __cplusplus
extern "C"
{
#endif

	DLL_EXPORT IceLeaderboardResult 	InitialiseLeaderboards(IceLeaderboardManager* leaderboardManager);

	DLL_EXPORT IceLeaderboardResult 	SetGameSession(IceLeaderboardManager* leaderboardManager, IceGameSession* gameSession);
	DLL_EXPORT IceGameSession* 			GetGameSession(IceLeaderboardManager* leaderboardManager);
	
	DLL_EXPORT IceLeaderboard* 			GetLeaderboardFromId(IceLeaderboardManager* leaderboardManager, unsigned int idx);
	DLL_EXPORT IceLeaderboard* 			GetLeaderboardFromIndex(IceLeaderboardManager* leaderboardManager, unsigned int idx);

	DLL_EXPORT unsigned int				GetNumberLeaderboards(IceLeaderboardManager* leaderboardManager);

	DLL_EXPORT IceLeaderboardRows*		GetUsersScores(IceLeaderboardManager* leaderboardManager, IceUser* user);

	DLL_EXPORT IceLeaderboardResult 	Update(IceLeaderboardManager* leaderboardManager);

#ifdef __cplusplus
}
#endif

#endif