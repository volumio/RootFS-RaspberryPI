#ifndef ICEEVENT_H_INCLUDED
#define ICEEVENT_H_INCLUDED



#include "icetypes.h"
#include "icecoreerrors.h"


	
#ifdef __cplusplus
extern "C"
{
#endif
///////////////////////////////////////////////////////////////////////////////
//Event types	
	
//-----------------------------------------------------------------------------
//! \ingroup ICECore
//! \defgroup iceEvent iceEvent
//! \brief Event callback class
//!
//! Some ICELib structures contain events. These allow the programmer to register callback functions
//! in order to be notified when a particular event has occurred. Multiple callbacks can be registered.
//! and a single callback can be registered multiple times.
//! When an event is triggered all the registered callbacks will be called in the order they were registered.
//! \{

//-----------------------------------------------------------------------------
//! \class iceEvent
//! \brief Callback registration structure.
//-----------------------------------------------------------------------------
struct iceEvent;


//! \name TypeDefs
//! \{
//-----------------------------------------------------------------------------
//! \typedef iceEventId
//! \brief An application defined value used to identify a particular event
//! Different events belonging to different objects may be created with the same id.
typedef iceDWord iceEventId;

//-----------------------------------------------------------------------------
//! \typedef iceEventHandler
//! \brief An EventHandler is a c-style function with following signature: void callback(const iceEvent* pEvent, const void* eventArgs, void* userContext)
//! \param[in] pEvent The iceEvent* that it is registered with. Dont release this pointer in the callback unless you addreffed it yourself and really are releasing it.
//! \param[in] eventArgs A pointer to an arg struct which is dependent on the event. Can be NULL
//! \param[in] pointer to the userContext that the callback was registered with
//-----------------------------------------------------------------------------
typedef void (*iceEventHandler)(const iceEvent* pEvent, const void* eventArgs, void* userContext);

//! \}


//! \name Reference Counting
//! \{
//-----------------------------------------------------------------------------
//! \relates iceEvent
//! \brief Add reference
//! \param[in] pEvent pointer to iceEvent to increase the refcount on
//-----------------------------------------------------------------------------
void iceEventAddReference(iceEvent* pEvent);

//-----------------------------------------------------------------------------
//! \relates iceEvent
//! \brief Dec reference
//! \param[in] pEvent pointer to iceEvent to be released
//-----------------------------------------------------------------------------
void iceEventRelease(iceEvent* pEvent);

//! \}



//! \name Event Registration
//! \{
//-----------------------------------------------------------------------------
//! \relates iceEvent
//! \brief Register a callback with the event object
//! \param[in] pEvent pointer to event
//! \param[in] eventHandler pointer to callback function to register
//! \param[in] userContext user defined pointer that will be passed to callback when event is triggered. Can be NULL
//! \return iceDWord an integer cookie value that can be used to unregister a particular callback from the event
//! 
//-----------------------------------------------------------------------------
iceDWord iceEventRegisterHandler(iceEvent* pEvent, iceEventHandler eventHandler, void* userContext);

//-----------------------------------------------------------------------------
//! \relates iceEvent
//! \param[in] pEvent pointer to event
//! \param[in] cookie value returned when callback was registered
//! \return result value indicating success of call. negative if successful
//! \brief Unregister a registered callback function
//! This function will unregister only the callback that matches the given cookie.
//! If the callback was register multiple times then only the matching instance is unregistered
//-----------------------------------------------------------------------------
IceCoreResult iceEventRegisterHandlerUnregisterHandlerByCookie(iceEvent* pEvent, iceDWord cookie);

//-----------------------------------------------------------------------------
//! \relates iceEvent
//! \param[in] pEvent pointer to event
//! \param[in] cookie value returned when callback was registered
//! \return result value indicating success of call. negative if successful
//! \brief Unregister a registered callback function
//! This function will unregister all instances of the given callback regardless of cookie value or context 
//-----------------------------------------------------------------------------
IceCoreResult iceEventRegisterHandlerUnregisterHandlerByPointer(iceEvent* pEvent, iceEventHandler eventHandler);

//! \}


////////////////////////////////////////////////////////////////////////////
//! \name Event Properties

//-----------------------------------------------------------------------------
//! \relates iceEvent
//! \param[in] pEvent pointer to event
//! \brief get (possibly) helpful string saying what the Event is called
//! May return NULL
//-----------------------------------------------------------------------------
const char* iceEventGetName(const iceEvent* pEvent);

//-----------------------------------------------------------------------------
//! \relates iceEvent
//! \param[in] pEvent pointer to event
//! \brief Get the application defined Event Id
//-----------------------------------------------------------------------------
iceEventId 	iceEventGetId(const iceEvent* pEvent);

//-----------------------------------------------------------------------------
//! \relates iceEvent
//! \param[in] pEvent pointer to event
//! \brief Get the application defined Event Category flags
//-----------------------------------------------------------------------------
iceDWord 	iceEventGetCategoryFlags(const iceEvent* pEvent);

//! \}
//! \}

///////////////////////////////////////////////////////////////////////////	
#ifdef __cplusplus

}
#endif	
	



#endif //ICEEVENT_H_INCLUDED