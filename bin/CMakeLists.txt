cmake_minimum_required(VERSION 3.16)
project(bin LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)

include(${CMAKE_BINARY_DIR}/conan_toolchain.cmake OPTIONAL)
include_directories(include)
find_package(nlohmann_json REQUIRED)

file(GLOB SOURCES "src/*.cpp")
add_executable(bin ${SOURCES})
target_link_libraries(bin PRIVATE nlohmann_json::nlohmann_json)