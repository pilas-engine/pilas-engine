VERSION=0.0.1
NOMBRE="pilas-engine"
NOMBREBIN="pilasEngine"
DATE=`date +'%y.%m.%d %H:%M:%S'`

# Le indica a la compilación de binarios si puede borrar todos los .map
ELIMINAR_MAPS=1

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m

define log
	@echo "${G}▷$(1) ${N}"
endef

define task
	@echo ""
	@echo "${Y}-$(1)${N}"
endef

comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${Y}${NOMBRE}${N} (versión: ${VERSION})"
	@echo ""
	@echo "  ${Y}Generales de la aplicación${N}"
	@echo ""
	@echo "    ${G}iniciar${N}              Instala dependencias."
	@echo "    ${G}compilar${N}             Compila la aplicación."
	@echo "    ${G}compilar_live${N}        Compila la aplicación en modo continuo."
	@echo "    ${G}electron${N}             Ejecuta la aplicación en electron (sin compilar)."
	@echo "    ${G}serve${N}                Ejecuta la aplicación en modo desarrollo."
	@echo "    ${G}test${N}                 Ejecuta los tests de la aplicación."
	@echo "    ${G}sprites_ember${N}        Genera las imágenes de la aplicación."
	@echo ""
	@echo "  ${Y}Relacionados con pilas ${N}"
	@echo ""
	@echo "    ${G}pilas${N}                Genera pilasengine.js."
	@echo "    ${G}pilas_live${N}           Genera pilasengine.js, ejemplos y tests."
	@echo "    ${G}api${N}                  Genera la documentación de API para pilas."
	@echo "    ${G}docs${N}                 Genera el manual de pilas."
	@echo "    ${G}actualizar_imagenes${N}  Genera los spritesheets."
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version_patch${N}        Genera una versión PATCH."
	@echo "    ${G}version_minor${N}        Genera una versión MINOR."
	@echo "    ${G}version_major${N}        Genera una versión MAJOR."
	@echo "    ${G}binarios${N}             Genera los binarios de la aplicación."
	@echo ""
	@echo ""

iniciar:
	$(call task, "Iniciando el proyecto.")
	$(call log, "Instalando dependencias.")
	@npm install
	@bower install
	$(call log, "Instalando dependencias de pilas-engine")
	@cd pilasengine; npm install

compilar:
	$(call log, "Iniciando compilación.")
	@ember build --environment develop

compilar_live:
	$(call log, "Iniciando compilación.")
	@ember build --environment develop --watch

s: serve

serve:
	$(call log, "Iniciando ember s")
	@ember s

version_patch:
	ember release

version_minor:
	@ember release --minor

version_major:
	@ember release --major

electron:
	@echo "${G}Iniciando electron ... (pero sin compilar desde cero).${N}"
	./node_modules/.bin/electron .

changelog:
	@git log `git describe --tags --abbrev=0` --pretty=format:"  * %s" > CHANGELOG.txt
	@echo "Generando el archivo CHANGELOG.txt"

pilasengine/node_modules:
	$(call log, "Instalando dependencias de pilas-engine")
	@cd pilasengine; npm install

api:
	$(call log, "Generando documentacion de pilas-engine")
	@grunt --gruntfile pilasengine/Gruntfile.js typedoc --base pilasengine
	$(call log, "Copiando imagenes ...")
	@cp -rf pilasengine/docs/imagenes pilasengine/docs/dist/

pilas: pilasengine/node_modules
	$(call log, "Compilando pilas-engine")
	@grunt --gruntfile pilasengine/Gruntfile.js compilar --base pilasengine

pilas_live:
	$(call log, "Compilando ejemplos de pilas-engine en modo live")
	@grunt --gruntfile pilasengine/Gruntfile.js compilar-con-ejemplos-livereload --base pilasengine

actualizar_imagenes:
	$(call log, "Actualizando imagenes para usar en pilas ...")
	@./node_modules/.bin/spritesheet-js pilasengine/data/src/* -p public/data/ -f pixi.js --padding=10
	@echo ""
	@echo "${G}Listo, las archivos que se generaron son:"
	@echo ""
	@echo "    public/data/spritesheet.json"
	@echo "    public/data/spritesheet.png"
	@echo "${N}"


test:
	$(call log, "Ejecutando test...")
	@ember test

binarios:
	$(call task, "Comenzando a generar binarios.")
	$(call log, "Compilando ...")
	@ember build
	@rm -rf binarios
	$(call log, "Generando binarios ...")
ifeq ($(ELIMINAR_MAPS), 1)
	$(call log, "Eliminando archivos .map porque la variable ELIMINAR_MAPS vale 1")
	@rm dist/assets/*.map
endif
	@node_modules/.bin/electron-packager dist ${NOMBREBIN} --app-version=${VERSION} --platform=all --arch=all --version=0.37.6 --ignore=node_modules --ignore=bower_components --out=binarios
	$(call log, "Comprimiendo ...")
	@zip -qr binarios/${NOMBREBIN}-darwin-x64.zip binarios/${NOMBREBIN}-darwin-x64/
	@zip -qr binarios/${NOMBREBIN}-linux-ia32.zip binarios/${NOMBREBIN}-linux-ia32/
	@zip -qr binarios/${NOMBREBIN}-linux-x64.zip binarios/${NOMBREBIN}-linux-x64/
	@zip -qr binarios/${NOMBREBIN}-win32-ia32.zip binarios/${NOMBREBIN}-win32-ia32/
	@zip -qr binarios/${NOMBREBIN}-win32-x64.zip binarios/${NOMBREBIN}-win32-x64/

sprites_ember:
	$(call log, "Generando Spritesheets para la aplicación ember...")
	@./node_modules/.bin/spritesheet-js images/sprites/* -p public/assets/ -f css --padding=2
	@echo ""
	@echo "${G}Listo, las archivos que se generaron son:"
	@echo ""
	@echo "    public/assets/spritesheet.json"
	@echo "    public/assets/spritesheet.png"
	@echo "${N}"


.PHONY: tmp docs binarios

docs:
	$(call log, "Generando documentación")
	@./node_modules/.bin/gitbook build
	@rm -rf public/docs
	@mv _book public/docs
	@echo ""
	@echo "${G}OK, la documentación quedó en public/docs"
	@echo ""
