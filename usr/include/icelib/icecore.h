#ifndef ICECORE_H_INCLUDED
#define ICECORE_H_INCLUDED
//-----------------------------------------------------------------------------
// Copyright (c) 2011 IndieCity.com
//! \file icecore.h
//! \brief Main include for ICECore library
//! \defgroup ICECore ICECore - IndieCity Extras integration interfaces





#include "icetypes.h"
#include "icecoreerrors.h"

#include "iceuserinfo.h"
#include "iceuserlist.h"
#include "icegamesession.h"
#include "icebitmap.h"
#include "iceevent.h"

#ifdef __cplusplus
extern "C"
{
#endif

void init();
void shutdown();


iceServiceId iceServiceId_IndieCityLeaderboardsAndAchievements();

#ifdef __cplusplus
}
#endif

#endif //ICECORE_H_INCLUDED