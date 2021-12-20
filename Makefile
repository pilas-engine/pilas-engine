VERSION=$(shell git describe --tags)
NOMBRE="pilas-engine"
NOMBREBIN="pilas-engine"
DATE=`date +'%y.%m.%d %H:%M:%S'`

# Le indica a la compilación de binarios si puede borrar todos los .map
ELIMINAR_MAPS=1
COMPILAR_EN_OSX=1
COMPILAR_EN_WINDOWS=1
COMPILAR_EN_LINUX=1
COMPILAR_EN_ARM=1
COMPILAR_EN_ARM_64=1
EMPAQUETAR_PARA_SERVIDOR_ESTATICO=1
EMPAQUETAR_VERSION_MINIMA=1

# Binarios
BIN_ELECTRON=./node_modules/.bin/electron
BIN_TYPEDOC=./node_modules/.bin/typedoc
BIN_EMBER=./node_modules/.bin/ember
BIN_ELECTRON_PACKAGER=./node_modules/.bin/electron-packager
BIN_PRETTIER=./node_modules/.bin/prettier
FLAGS_ELECTRON_PACKAGER=--asar
VERSION_DE_ELECTRON_PARA_DISTRIBUIR=9.1.0
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
	@echo "    ${G}deploy${N}                       Sube una versión productiva al servidor."
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

deploy:
	@echo "Compilando la aplicación en modo producción..."
	ember build --prod --output-path docs
	echo "app.pilas-engine.com.ar" > docs/CNAME
	git add docs
	git commit -m "Realizando deploy"
	git push

cuidado_falta_deploy:
	@echo ""
	@echo "${Y}CUIDADO: AQUÍ NO SE ACTUALIZA DE LA VERSIÓN ONLINE.${N}"
	@echo "${Y}CUIDADO: (ejecuta make deploy para actualizar).${N}"
	@echo ""

version: version_patch

version_patch: cuidado_falta_deploy
	${BIN_EMBER} release

version_minor: cuidado_falta_deploy
	${BIN_EMBER} release --minor

version_major: cuidado_falta_deploy
	${BIN_EMBER} release --major

compilar_para_electron: actualizar_actores
	$(call log, "Iniciando compilación.")
	${BIN_EMBER} build --environment develop
	cp prod-electron.js dist/electron.js
	cp prod-package.json dist/package.json
	cd dist/; yarn install

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

compilar_bloques:
	$(call log, "Compilando los bloques modo live")
	yarn compilar_bloques

compilar_bloques_live:
	$(call log, "Compilando los bloques modo live")
	yarn compilar_bloques_live

test:
	$(call log, "Ejecutando test...")
	${BIN_EMBER} test

binarios:
	$(call task, "Comenzando a generar binarios.")
	$(call log, "Limpiando directorio de binarios ...")
	@rm -rf binarios
	@mkdir binarios
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
ifeq ($(COMPILAR_EN_OSX), 1)
	$(call log, "Compilando para osx - 64 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=darwin --arch=x64 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER} --icon=../extras/icono.icn
endif
ifeq ($(COMPILAR_EN_WINDOWS), 1)
	$(call log, "Compilando para windows - 32 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=win32 --arch=ia32 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER} --icon=../extras/icono.ico
	$(call log, "Compilando para windows - 64 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=win32 --arch=x64 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER} --icon=../extras/icono.ico
endif
ifeq ($(COMPILAR_EN_LINUX), 1)
	$(call log, "Compilando para linux - 64 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=linux --arch=x64 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER}
	$(call log, "Compilando para linux - 32 bits ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=linux --arch=ia32 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR_LINUX_32bits} --out=../binarios ${FLAGS_ELECTRON_PACKAGER}
endif
ifeq ($(COMPILAR_EN_ARM_64), 1)
	$(call log, "Compilando para ARM64 ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=linux --arch=arm64 --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER}
endif
ifeq ($(COMPILAR_EN_ARM), 1)
	$(call log, "Compilando para ARM ...")
	cd dist; rm -rf build
	cd dist; ../${BIN_ELECTRON_PACKAGER} . ${NOMBREBIN} --platform=linux --arch=armv7l --electron-version=${VERSION_DE_ELECTRON_PARA_DISTRIBUIR} --out=../binarios ${FLAGS_ELECTRON_PACKAGER}
endif
ifeq ($(COMPILAR_EN_OSX), 1)
	$(call log, "Comprimiendo ...")
	@zip -qr binarios/${NOMBREBIN}-osx-64_bits.zip     binarios/${NOMBREBIN}-darwin-x64
endif
ifeq ($(COMPILAR_EN_WINDOWS), 1)
	@zip -qr binarios/${NOMBREBIN}-windows-32_bits.zip binarios/${NOMBREBIN}-win32-ia32
	@zip -qr binarios/${NOMBREBIN}-windows-64_bits.zip binarios/${NOMBREBIN}-win32-x64
endif
ifeq ($(COMPILAR_EN_LINUX), 1)
	@zip -qr binarios/${NOMBREBIN}-linux-64_bits.zip binarios/${NOMBREBIN}-linux-x64
	@zip -qr binarios/${NOMBREBIN}-linux-32_bits.zip binarios/${NOMBREBIN}-linux-ia32
endif
ifeq ($(COMPILAR_EN_ARM), 1)
	@zip -qr binarios/${NOMBREBIN}-linux-armv7l.zip binarios/${NOMBREBIN}-linux-armv7l
endif
ifeq ($(COMPILAR_EN_ARM_64), 1)
	@zip -qr binarios/${NOMBREBIN}-linux-arm64.zip binarios/${NOMBREBIN}-linux-arm64
endif
ifeq ($(EMPAQUETAR_PARA_SERVIDOR_ESTATICO), 1)
	@echo "Empaquetando para servidor estático ..."
	@rm -rf dist
	${BIN_EMBER} build --prod
	@echo "Empaquetando para servidor estático: comprimiendo ..."
	@mv dist/ pilas-engine-compilado
	@zip -qr binarios/pilas-engine-compilado.zip pilas-engine-compilado
	@rm -rf pilas-engine-compilado
endif
ifeq ($(EMPAQUETAR_VERSION_MINIMA), 1)
	@echo "Empaquetando versión mínima ..."
	@rm -rf version-minima
	@mkdir version-minima
	@cp public/pilas-engine.js ./version-minima/
	@cp public/nineslice.js ./version-minima/
	@cp public/phaser.js ./version-minima/
	@cp extras/ejemplo-minimo.html ./version-minima/
	@cp recursos/imagenes/basicos/logo.png version-minima/
	@cp recursos/decoracion/fondos/fondo-azul.png version-minima/fondo.png
	@zip -qr binarios/version-minima.zip version-minima
	@rm -rf version-minima
endif

.PHONY: tmp docs binarios manual

manual: pilas_manual
actualizar_manual: pilas_manual
compilar_manual: pilas_manual


pilas_manual:
	$(call log, "Generando documentación")
	@rm -rf public/manual
	@mkdir -p public/manual
	@cp manual/templates/estilo.css public/manual
	@cp manual/templates/manual.js public/manual
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
	@echo "${Y} - Ejecutar el comando yarn${N}"
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
	TexturePacker recursos/iniciar-proyecto.tps
	TexturePacker recursos/grilla-imagenes.tps
	TexturePacker recursos/huesos/robot.tps
	$(call log, "Corrigiendo nombres de clases en los css generados")
	@node scripts/corregir-css-de-grilla-de-images.js
