"use strict";
const fs = require("fs");
const exec = require("child_process").exec;
const sharp = require("sharp");

async function crear_directorio(ruta) {
  return new Promise((success, reject) => {
    exec(`mkdir -p ${ruta}`, error => {
      if (error) {
        reject(err);
      } else {
        success();
      }
    });
  });
}

async function find(ruta) {
  return new Promise(success => {
    exec(`find '${ruta}'`, (err, stdout) => {
      var file_list = stdout.split("\n");
      success(file_list.filter(e => e));
    });
  });
}

function es_directorio(ruta) {
  return fs.lstatSync(ruta).isDirectory();
}

async function main() {
  let listado = await find("recursos/imagenes");
  let destino = "recursos/grilla-imagenes";

  console.log(`Actualizando el directorio ${destino}`);

  listado.map(ruta => {
    let ruta_destino = ruta.replace("recursos/imagenes", destino);

    if (es_directorio(ruta)) {
      crear_directorio(ruta_destino);
    } else {
      if (ruta.endsWith(".png")) {
        sharp(ruta)
          .resize({
            width: 48,
            height: 48,
            fit: sharp.fit.inside
          })
          .toFile(ruta_destino);
      }
    }
  });
}

main();
