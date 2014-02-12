#if !defined(POSIX) && !defined(_WIN32)
#ifdef WIN32
#define _WIN32
#endif
#ifdef __unix__
#define POSIX
#endif
#ifdef __xlC__
#define POSIX
#endif
#endif
