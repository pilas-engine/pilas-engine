@echo off
npm install
node_modules\.bin\electron-packager . --overwrite --ignore="node_modules"
pause