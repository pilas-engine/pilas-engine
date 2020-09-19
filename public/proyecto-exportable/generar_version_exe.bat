@echo off
@echo "IMPORTANTE: Para que este comando funcione necesitas tener instalado nodejs."
call npm install
call node_modules\.bin\electron-packager . --overwrite --ignore="node_modules"
@echo "LISTO: Se ha creado el directorio con el juego compilado .exe"
pause
