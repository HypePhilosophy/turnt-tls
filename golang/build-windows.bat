@echo off
echo Building dll ...
go build -o goturnt.dll -buildmode=c-shared
echo Completed dll