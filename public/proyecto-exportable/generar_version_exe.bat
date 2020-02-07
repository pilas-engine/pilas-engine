@echo off
call npm install
call node_modules\.bin\electron-packager . --overwrite --ignore="node_modules"
pause