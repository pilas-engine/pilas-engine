"use strict";

// El objetivo de este script es generar directorios espejo de imágenes
// pero con archivos de imágenes en miniaturas. Estos archivos miniatura
// también se van a guardar en un directorio llamado "recursos/grilla-imagenes"
// que se va a empaquetar con texturepacker y se va a cargar como css para previsualizar
// los recursos dentro del editor.

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

function duplicar_estructura_y_archivos(listado, fuente, destino) {
  console.log(`Creando minuaturas de recursos: ${fuente} → ${destino}`);

  listado.map(ruta => {
    let ruta_destino = ruta.replace(fuente, destino);

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

async function main() {
  let imagenes = await find("recursos/imagenes");
  let bloques = await find("recursos/bloques");
  let decoracion = await find("recursos/decoracion");

  duplicar_estructura_y_archivos(imagenes, "recursos/imagenes", "recursos/grilla-imagenes/imagenes");
  duplicar_estructura_y_archivos(bloques, "recursos/bloques", "recursos/grilla-imagenes/bloques");
  duplicar_estructura_y_archivos(decoracion, "recursos/decoracion", "recursos/grilla-imagenes/decoracion");
}

main();
