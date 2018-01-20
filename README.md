# pilas-engine 2

Prototipo de la nueva versión de pilas-engine

[![CircleCI](https://circleci.com/gh/pilas-engine/pilas-engine.svg?style=svg)](https://circleci.com/gh/pilas-engine/pilas-engine)

[![Stories in Ready](https://badge.waffle.io/pilas-engine/pilas-engine.svg?label=ready&title=Ready)](http://waffle.io/pilas-engine/pilas-engine)

## Primeros pasos

Para comenzar a utilizar este repositorio deberías tener instalado git, Make
y ejecutar estos comandos:

```
git clone https://github.com/pilas-engine/pilas-engine.git
cd pilas-engine
make iniciar
```

El comando `make iniciar` va a instalar todas las dependencias que se
necesitan para compilar y ejecutar el proyecto. Este proceso puede tardar
unos minutos en completarse.

Una vez que termine, con el comando `make` van a aparecer en pantalla
los comandos típicos a la hora de utilizar el proyecto.

## Versión en desarrollo

Esta versión está en fase de experimentación y desarrollo inicial, es casi una
prueba de concepto. Sin embargo, cada vez que hacemos un push a este repositorio
se ejecutan todos los tests sobre [circle.ci](https://circleci.com/gh/pilas-engine)
y se realiza una instalación en:

* http://pilas-engine.surge.sh/

Si el push viene acompañado de un número de versión (como tag), también
se generan los binarios para cada plataforma en esta dirección:

* https://github.com/pilas-engine/pilas-engine/releases

Si se quieren generar los binarios directamente de forma local, hay que tener
instalado wine con anterioridad y luego ejecutar `make binarios`:

```
brew install wine winetricks
make binarios
```

## Nota

Los binarios de serialport corresponden a la versión de electron v53, y se
obtuvieron desde: https://github.com/EmergingTechnologyAdvisors/node-serialport/releases/tag/v5.1.0-beta5

