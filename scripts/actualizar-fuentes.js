"use strict";

const fs = require("fs");
const exec = require("child_process").exec;
const sharp = require("sharp");

async function find(ruta) {
  return new Promise(success => {
    exec(`find '${ruta}'`, (err, stdout) => {
      var file_list = stdout.split("\n");
      success(file_list.filter(e => e));
    });
  });
}

async function leer_archivo(ruta) {
  return new Promise((success, reject) => {
    fs.readFile(ruta, "utf8", function(err, data) {
      if (err) {
        return reject(err);
      }

      success(data);
    });
  });
}

async function escribir_archivo(ruta, datos) {
  return new Promise((success, reject) => {
    fs.writeFile(ruta, datos, err => {
      if (err) {
        return reject(err);
      }

      console.log("Creando el archivo: " + ruta);
      success(datos);
    });
  });
}

async function crear_empaquetado_de_archivos_xml_en(ruta_destino_json) {
  let fuentes = await find("recursos/fuentes");
  let archivos_xml = fuentes.filter(e => e.includes("xml"));
  let fuentes_json = {};

  for (let i = 0; i < archivos_xml.length; i++) {
    let archivo = archivos_xml[i];
    let nombre = archivo.replace("recursos/fuentes/", "").replace(".xml", "");
    let contenido = await leer_archivo(archivo);

    fuentes_json[nombre] = { contenido };
  }

  await escribir_archivo(ruta_destino_json, JSON.stringify(fuentes_json, null, "    "));
}

function agregar_comillas_a_numeros(cadena) {
  return cadena.replace(/(\-*[0-9,]+)+/g, "'$1'").replace(/"/g, `'`);
}

async function convertir_fnt_a_xml(archivo) {
  let ruta_de_archivo_a_generar = archivo.replace("fnt", "xml");
  let contenido = await leer_archivo(archivo);
  let lineas = contenido.split("\n");
  let destino = [
    "<?xml version='1.0'?>",
    "<font>",
  ]

  for (let i=0; i<lineas.length; i++) {
    let linea = lineas[i];

    if (linea.includes("page id")) {
      destino.push(`<pages>`);
      destino.push(agregar_comillas_a_numeros(`  <${linea}/>`));
      destino.push(`</pages>`);
      continue;
    }

    if (linea.includes("chars count")) {
      destino.push(agregar_comillas_a_numeros(`<${linea}>`));
      continue;
    }

    if (!linea) {
      continue;
    }

    destino.push(agregar_comillas_a_numeros(`<${linea}/>`));
  }

  destino.push("</chars>");
  destino.push("</font>");

  let contenido_final = destino.join("\n");

  await escribir_archivo(ruta_de_archivo_a_generar, contenido_final);
}

async function crear_archivos_xml_para_las_fuentes() {
  let fuentes = await find("recursos/fuentes");
  let archivos = fuentes.filter(e => e.includes("fnt"));

  for (let i = 0; i < archivos.length; i++) {
    let archivo = archivos[i];
    await convertir_fnt_a_xml(archivo);
  }

}

async function main() {
  await crear_archivos_xml_para_las_fuentes();
  await crear_empaquetado_de_archivos_xml_en("public/fuentes-datos.json");
}

main();
