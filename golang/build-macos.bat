echo Building dylib ...
go build -o goturnt.dylib -buildmode=c-shared
echo Copying dylib ...
copy /y goturnt.dylib ..\prebuilt-binaries\ 
echo Completed dylib