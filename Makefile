VERSION=$(shell git describe --tags)
NOMBRE="pilas-engine"
NOMBREBIN="pilas-engine"
DATE=`date +'%y.%m.%d %H:%M:%S'`

# Le indica a la compilación de binarios si puede borrar todos los .map
ELIMINAR_MAPS=1

# Binarios
BIN_ELECTRON=./node_modules/.bin/electron
BIN_TYPEDOC=./node_modules/.bin/typedoc
BIN_EMBER=./node_modules/.bin/ember
BIN_ELECTRON_PACKAGER=./node_modules/.bin/electron-packager
BIN_PRETTIER=./node_modules/.bin/prettier
FLAGS_ELECTRON_PACKAGER=--asar
VERSION_DE_ELECTRON_PARA_DISTRIBUIR=5.0.1
VERSION_DE_ELECTRON_PARA_DISTRIBUIR_LINUX_32bits=3.1.0

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
	@echo "    ${G}iniciar${N}                      Instala dependencias."
	@echo "    ${G}compilar${N}                     Compila la aplicación."
	@echo "    ${G}compilar_live${N}                Compila la aplicación en modo continuo."
	@echo "    ${G}electron${N}                     Ejecuta la aplicación en electron (sin compilar)."
	@echo "    ${G}ejecutar${N}                     Ejecuta la aplicación en modo desarrollo."
	@echo "    ${G}test${N}                         Ejecuta los tests de la aplicación."
	@echo "    ${G}prettier${N}                     Corrige el formato y la sintaxis de todos los archivos."
	@echo "    ${G}actualizar_typescript${N}        Actualiza typescript a una versión más reciente."
	@echo "    ${G}actualizar_actores${N}           Actualiza el listado de actores implementados."
	@echo "    ${G}actualizar_actores_live${N}      Actualiza el listado de actores en modo continuo."
	@echo "    ${G}actualizar_definiciones${N}      Actualiza las definiciones de typescript para phaser."
	@echo "    ${G}actualizar_jsbeautify${N}        Actualiza jsbeautify a una versión más reciente."
	@echo ""
	@echo "  ${Y}Relacionados con pilas ${N}"
	@echo ""
	@echo "    ${G}compilar_pilas${N}               Genera pilasengine.js."
	@echo "    ${G}compilar_pilas_live${N}          Genera pilasengine.js, ejemplos y tests."
	@echo "    ${G}api${N}                          Genera la documentación de API para pilas."
	@echo "    ${G}pilas_manual${N}                 Genera el manual de pilas."
	@echo "    ${G}pilas_manuales_descargables${N}  Genera los pdf, epub y mobi del manual."
	@echo "    ${G}actualizar_phaser${N}            Actualiza phaser a una versión más reciente."
	@echo "    ${G}actualizar_fuentes${N}           "
	@echo "    ${G}actualizar_fuentes_live${N}      "
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version_patch${N}                Genera una versión PATCH."
	@echo "    ${G}version_minor${N}                Genera una versión MINOR."
	@echo "    ${G}version_major${N}                Genera una versión MAJOR."
	@echo "    ${G}binarios${N}                     Genera los binarios de la aplicación."
	@echo ""
	@echo ""

iniciar:
	$(call task, "Iniciando el proyecto.")
	$(call log, "Instalando dependencias.")
	@yarn install

compilar: actualizar_actores
	$(call log, "Iniciando compilación.")
	${BIN_EMBER} build --environment develop

compilar_live: actualizar_actores
	$(call log, "Iniciando compilación.")
	${BIN_EMBER} build --environment develop --watch

s: serve

serve: actualizar_actores
	$(call log, "Iniciando ember s")
	yarn start

ejecutar: serve

actualizar_actores:
	yarn actualizar_actores

actualizar_actores_live:
	yarn actualizar_actores_live

prettier:
	${BIN_PRETTIER} --write 'app/**/*.js'
	${BIN_PRETTIER} ./node_modules/.bin/prettier --write 'tests/**/*.js'

version: version_patch

version_patch:
	${BIN_EMBER} release

version_minor:
	${BIN_EMBER} release --minor

version_major:
	${BIN_EMBER} release --major

electron:
	@echo "${G}Iniciando electron ... (pero sin compilar desde cero).${N}"
	${BIN_ELECTRON} .

changelog:
	@git log `git describe --tags --abbrev=0` --pretty=format:"  * %s" > CHANGELOG.txt
	@echo "Generando el archivo CHANGELOG.txt"

api:
	$(call log, "Generando documentacion de pilas-engine")
	cd pilas-engine; ../${BIN_TYPEDOC} --out ../public/api/ ./ --hideGenerator

compilar_pilas:
	$(call log, "Compilando pilas-engine")
	yarn compilar_pilas

compilar_pilas_live:
	$(call log, "Compilando ejemplos de pilas-engine en modo live")
	yarn compilar_pilas_live


test:
	$(call log, "Ejecutando test...")
	${BIN_EMBER} test

deploy_a_dokku:
	rm -rf dist
	@echo "Compilando la aplicación en modo producción..."
	${BIN_EMBER} build --prod
	@echo "Subiendo contenido al sitio de pilas (producción)."
	rm -rf pilas-engine-en-dokku
	git clone dokku@hugoruscitti.com.ar:pilas-engine pilas-engine-en-dokku
	rm -rf pilas-engine-en-dokku/*
	cp -rf dist/* pilas-engine-en-dokku/
	cd pilas-engine-en-dokku; git add .; git config user.email "hugoruscitti@gmail.com"; git config user.name "Hugo Ruscitti"; git commit -am 'rebuild' --allow-empty; git push -f
	rm -rf pilas-engine-en-dokku

deploy_a_dokku_dev:
	rm -rf dist
	@echo "Compilando la aplicación en modo producción a entorno de pruebas..."
	${BIN_EMBER} build --prod
	@echo "Subiendo contenido al sitio de pilas (desarrollo)."
	rm -rf pilas-engine-en-dokku-dev
	git clone dokku@hugoruscitti.com.ar:app-dev pilas-engine-en-dokku-dev
	rm -rf pilas-engine-en-dokku-dev/*
	cp -rf dist/* pilas-engine-en-dokku-dev/
	cd pilas-engine-en-dokku-dev; git add .; git config user.email "hugoruscitti@gmail.com"; git config user.name "Hugo Ruscitti"; git commit -am 'rebuild' --allow-empty; git push -f
	rm -rf pilas-engine-en-dokku-dev

binarios:
	$(call task, "Comenzando a generar binarios.")
	$(call log, "Limpiando directorio de binarios ...")
	@rm -rf binarios
	$(call log, "Compilando aplicación ember ...")
	${BIN_EMBER} build
	$(call log, "Generando binarios ...")
ifeq ($(ELIMINAR_MAPS), 1)
	$(call log, "Eliminando archivos .map porque la variable ELIMINAR_MAPS vale 1")
	@rm dist/assets/*.map
endif
	$(call log, "Instalando dependencias de produccion ...")
	cp prod-electron.js dist/electron.js
	cp prod-package.json dist/package.json
	cd dist/; yarn install
	$(call log, "Compilando para osx - 64 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=darwin --arch=x64 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER} --icon=../extras/icono.icn
	$(call log, "Compilando para windows - 32 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=win32 --arch=ia32 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER} --icon=../extras/icono.ico
	$(call log, "Compilando para windows - 64 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=win32 --arch=x64 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER} --icon=../extras/icono.ico
	$(call log, "Compilando para linux - 64 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=linux --arch=x64 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER}
	$(call log, "Compilando para linux - 32 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=linux --arch=ia32 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR_LINUX_32bits} --out=../binarios ${FLAGS_ELECTRON_PACKAGER}
	$(call log, "Compilando para ARM ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=linux --arch=armv7l --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER}
	$(call log, "Comprimiendo ...")
	@zip -qr binarios/${NOMBREBIN}-osx-64_bits.zip     binarios/${NOMBREBIN}-darwin-x64
	@zip -qr binarios/${NOMBREBIN}-windows-32_bits.zip binarios/${NOMBREBIN}-win32-ia32
	@zip -qr binarios/${NOMBREBIN}-windows-64_bits.zip binarios/${NOMBREBIN}-win32-x64
	@zip -qr binarios/${NOMBREBIN}-linux-64_bits.zip binarios/${NOMBREBIN}-linux-x64
	@zip -qr binarios/${NOMBREBIN}-linux-32_bits.zip binarios/${NOMBREBIN}-linux-ia32
	@zip -qr binarios/${NOMBREBIN}-linux-arm.zip binarios/${NOMBREBIN}-linux-armv7l
	@echo "Empaquetando para servidor estático ..."
	@rm -rf dist
	${BIN_EMBER} build --prod
	@echo "Empaquetando para servidor estático: comprimiendo ..."
	@mv dist/ pilas-engine-compilado
	@zip -qr binarios/pilas-engine-compilado.zip pilas-engine-compilado
	@rm -rf pilas-engine-compilado

.PHONY: tmp docs binarios manual

manual: pilas_manual
actualizar_manual: pilas_manual
compilar_manual: pilas_manual


pilas_manual:
	$(call log, "Generando documentación")
	@rm -rf public/manual
	@mkdir -p public/manual
	@cp manual/templates/estilo.css public/manual
	python3 scripts/generar_manual.py
	cp -r manual/imagenes public/manual/
	@echo ""
	@echo "${G}OK, la documentación quedó en public/manual"
	@echo ""

pilas_manuales_descargables:
	$(call log, "Generando archivos de documentación")
	python3 scripts/generar_manuales_descargables.py
	@echo ""
	@echo "${G}OK, los archivos generados están en el directorio manuales"
	@echo ""

actualizar_phaser:
	@echo "${Y}Para actualizar phaser, hay que seguir estos pasos:${N}"
	@echo "${Y}${N}"
	@echo "${Y} - Subir el número de versión de package.json.${N}"
	@echo "${Y} - Ejecutar yarn install.${N}"
	@echo "${Y} - Copiar phaser al directorio public:${N}"
	@echo "${Y}${N}"
	@echo "${Y}        cp node_modules/phaser/dist/phaser.js public/${N}"
	@echo "${Y}${N}"
	@echo "${Y} - Por último, ejecutar este script:${N}"
	@echo "${Y}${N}"
	@echo "${Y}        make corregir_phaser_js"
	@echo "${Y}${N}"

actualizar_typescript:
	@echo "${Y}Para actualizar typescript, hay que seguir estos pasos:${N}"
	@echo "${Y}${N}"
	@echo "${Y} - Subir el número de versión de package.json.${N}"
	@echo "${Y} - Ejecutar yarn install.${N}"
	@echo "${Y} - Copiar typescript.js al directorio public:${N}"
	@echo "${Y}${N}"
	@echo "${Y}        cp node_modules/typescript/lib/typescript.js public${N}"
	@echo "${Y}${N}"

actualizar_definiciones:
	@wget https://raw.githubusercontent.com/photonstorm/phaser/master/types/phaser.d.ts -O pilas-engine/declaraciones/phaser.d.ts

corregir_phaser_js:
	python3 scripts/patch.py

actualizar_fuentes:
	$(call log, "Actualizando spritesheets de fuentes")
	@node scripts/actualizar-fuentes.js
	TexturePacker recursos/fuentes.tps

actualizar_fuentes_live:
	@node scripts/actualizar-fuentes-live.js

actualizar_imagenes:
	$(call log, "Creando spritesheets de imágenes de pilas")
	TexturePacker recursos/imagenes.tps
	TexturePacker recursos/bloques.tps
	TexturePacker recursos/decoracion.tps
	$(call log, "Actualizando grillas para poder previsualizar imágenes en el editor.")
	@node scripts/actualizar-imagenes.js
	$(call log, "Copiando animaciones de huesos")
	@cp recursos/huesos/robot/robot.scon public
	$(call log, "Creando spritesheets de imágenes")
	TexturePacker recursos/iconos.tps
	TexturePacker recursos/ejemplos.tps
	TexturePacker recursos/grilla-imagenes.tps
	TexturePacker recursos/huesos/robot.tps
	$(call log, "Corrigiendo nombres de clases en los css generados")
	@node scripts/corregir-css-de-grilla-de-images.js


actualizar_jsbeautify:
	@echo "${Y}Para actualizar jsbeautify, hay que seguir estos pasos:${N}"
	@echo "${Y}${N}"
	@echo "${Y} - Subir el número de versión de package.json.${N}"
	@echo "${Y} - Ejecutar yarn install.${N}"
	@echo "${Y} - Copiar el archivo beautify.js al directorio vendor:${N}"
	@echo "${Y}${N}"
	@echo "${Y}        cp node_modules/js-beautify/js/lib/beautify.js vendor${N}"
	@echo "${Y}${N}"
