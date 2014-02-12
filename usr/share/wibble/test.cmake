macro( wibble_add_test name )
  string( REPLACE ".test.h" ".cpp" SOURCES "${ARGN}" )
  set( SOURCES ";${SOURCES}" )
  string( REPLACE "/" "_" SOURCES "${SOURCES}" )
  string( REPLACE ":" "_" SOURCES "${SOURCES}" )
  set( src_prefix "${CMAKE_CURRENT_BINARY_DIR}/${name}-generated-" )
  string( REPLACE ";" ";${src_prefix}" SOURCES "${SOURCES}" )
  string( REGEX REPLACE "^;" "" SOURCES "${SOURCES}" )
    
  set( main "${src_prefix}main.cpp" )
  if( NOT WIBBLE_TEST_GENRUNNER )
    include( FindPerl )
    set( generator
      "${PERL_EXECUTABLE}" "${wibble_SOURCE_DIR}/test-genrunner.pl" )
    set( generator_dep"${wibble_SOURCE_DIR}/test-genrunner.pl" )
  else( NOT WIBBLE_TEST_GENRUNNER )
    set( generator ${WIBBLE_TEST_GENRUNNER} )
    set( generator_dep ${generator} )
  endif( NOT WIBBLE_TEST_GENRUNNER )

  set( HDRS "${ARGN}" )

  list( LENGTH SOURCES SOURCE_N )
  math( EXPR SOURCE_N "${SOURCE_N} - 1" )
  foreach( i RANGE ${SOURCE_N} )
    LIST( GET HDRS ${i} HDR )
    LIST( GET SOURCES ${i} SRC )
    add_custom_command(
      OUTPUT ${SRC}
      DEPENDS ${generator_dep} ${HDR}
      WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
      COMMAND ${generator} header ${HDR} > ${SRC}
    )
  endforeach( i )

  add_custom_command(
    OUTPUT ${main}
    DEPENDS ${generator_dep} ${ARGN}
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    COMMAND ${generator} main ${ARGN} > ${main}
  )

  set_source_files_properties( ${SOURCES} ${main} PROPERTIES GENERATED ON )
  add_executable( ${name} ${SOURCES} ${main} )
endmacro( wibble_add_test )

# TODO the LD_LIBRARY_PATH may need to be set more elaborately
macro( wibble_check_target tgt )
  add_custom_target( unit_${tgt}
    COMMAND sh -c "LD_LIBRARY_PATH=${CMAKE_CURRENT_BINARY_DIR} ${CMAKE_CURRENT_BINARY_DIR}/${tgt}"
    VERBATIM
    DEPENDS ${ARGV} )
  add_dependencies( unit unit_${tgt} )
endmacro( wibble_check_target )
