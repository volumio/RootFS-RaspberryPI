#ifndef ICEBITMAP_H_INCLUDED
#define ICEBITMAP_H_INCLUDED
//-----------------------------------------------------------------------------
// Copyright (c) 2011 IndieCity.com
//! \file icebitmap.h
//! \brief iceBitmap interface definition
//! Functions for loading a bmp,jpg,png image 

#include "icecoreerrors.h"


#ifdef __cplusplus
extern "C"
{
#endif

//! \ingroup ICECore
//! \defgroup iceBitmap iceBitmap
//! \brief iceBitmap interface definition
//! 
//! Functions for loading a bmp,jpg,png image 
//! \{

//-----------------------------------------------------------------------------
//! \class iceBitmap
//! \brief iceBitmap interface
//! Simple utility class for passing around bitmap data
//! Opaque structure. 
//-----------------------------------------------------------------------------
struct iceBitmap;


enum  ImageFileType
{	
	ImageFileType_PNG	= 0,
	ImageFileType_JPG,
	ImageFileType_BMP
};

enum PixelFormatType
{	
	PFT_PixelFormatUnknown	= 0,
	PFT_PixelFormatDefault,
	PFT_PixelFormat24bppRGB,
	PFT_PixelFormat32bppARGB 
} ;


//! \name Reference Counting
//! \{
//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Increase the refcount on the iceBitmap
//! \param[in] pBitmap pointer to iceBitmap interface
//! This should be used if the iceBitmap* is to be stored
//-----------------------------------------------------------------------------
void 	iceBitmapAddReference( iceBitmap* pBitmap);

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Decrease the refcount on the iceBitmap
//! Use this when you have finished using the iceBitmap interface
//! You should set the pointer to NULL afterwards.
//-----------------------------------------------------------------------------
void 	iceBitmapRelease( iceBitmap* pBitmap);

//! \}


//! \name Construction
//! \{
//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Create an empty bitmap object from file
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
iceBitmap* iceBitmapCreate();

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
iceBitmap* iceBitmapCreateFromFile( const char* filename );

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
iceBitmap* iceBitmapCreateFromFileEx( const char* filename, PixelFormatType targetFormat);

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
iceBitmap* iceBitmapCreateFromMemory( const unsigned char* bitmapData, unsigned long dataLength);

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
iceBitmap* iceBitmapCreateFromMemoryEx( const unsigned char* bitmapData, unsigned long dataLength, PixelFormatType targetFormat);

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
iceBitmap* iceBitmapCreateFromMemoryDirect( unsigned long width, unsigned long height, unsigned long stride, PixelFormatType pft, const unsigned char* data);


//! \}


//! \name Copying
//! \{

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Create a new bitmap object from an existing one
//! \param[in] pBitmap pointer to bitmap to clone
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
iceBitmap* iceBitmapClone(const iceBitmap* pBitmap);


//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Copy bitmap data from one bitmap to another
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
IceCoreResult	iceBitmapCopy(iceBitmap* dst, const iceBitmap* src);
//! \}

//! \name Saving
//! \{
//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
IceCoreResult iceBitmapSave( const iceBitmap* pBitmap, const char* filename, ImageFileType fileType );

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
IceCoreResult iceBitmapSaveToMemory( const iceBitmap* pBitmap, unsigned char* buffer, unsigned long* bufferSize, ImageFileType fileType);

//! \}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! \name Properties
//! \{
//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
void 			iceBitmapGetDimensions( const iceBitmap* pBitmap, unsigned long* widthPixels, unsigned long* heightPixels );

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
unsigned long 	iceBitmapGetHeight( const iceBitmap* pBitmap);

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
unsigned long 	iceBitmapGetWidth( const iceBitmap* pBitmap);

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
unsigned long 	iceBitmapGetStride(const iceBitmap* pBitmap);

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
unsigned long 	iceBitmapGetBitmapFlags(const iceBitmap* pBitmap);

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
PixelFormatType iceBitmapGetPixelFormat(const iceBitmap* pBitmap);	

//-----------------------------------------------------------------------------
//! \memberof iceBitmap
//! \brief Setup a bitmap object from file
//! \param filename the name of the bitmap file to read in. 
//! \return	iceBitmap* 
//-----------------------------------------------------------------------------
IceCoreResult iceBitmapChangePixelFormat(iceBitmap* pBitmap, PixelFormatType pixelType );
//! \}
//! \}

#ifdef __cplusplus
}
#endif



#endif //ICEBITMAP_H_INCLUDED