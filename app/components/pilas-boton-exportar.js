import Component from "@ember/component";
import { task, timeout } from "ember-concurrency";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",
  mostrar_modal: false,
  mensajes: null,
  mostrar_boton_para_cerrar: false,
  electron: service(),
  compilador: service(),
  bus: service(),
  paso: 1,
  ver_codigo: true,

  api: service(),

  tareaExportarZip: task(function*() {
    this.agregar_mensaje("Comenzando exportación del proyecto ...");
    yield timeout(1000);

    let serializado = json_a_string(this.proyecto);
    let proyecto = string_a_json(serializado);
    let proyecto_como_string = JSON.stringify(proyecto, null, 2);

    let zip = new JSZip();
    var carpeta_del_juego = zip.folder("proyecto");

    try {
      yield this.agregar_archivo(zip, "./proyecto-exportable/LEER.html");

      yield this.agregar_archivo(carpeta_del_juego, "./proyecto-exportable/package.json");
      yield this.agregar_archivo(carpeta_del_juego, "./proyecto-exportable/index.js");
      yield this.agregar_archivo(carpeta_del_juego, "./proyecto-exportable/instalar_dependencias.bat");
      yield this.agregar_archivo(carpeta_del_juego, "./proyecto-exportable/generar_version_exe.bat");

      yield this.agregar_archivo(carpeta_del_juego, "./robot.png");
      yield this.agregar_archivo(carpeta_del_juego, "./robot.json");
      yield this.agregar_archivo(carpeta_del_juego, "./robot.scon");

      // Previene un caso particular: en producción hay dos archivos
      // pilas-engine.js, con diferente fingerprint, el que se necesita
      // empaquetar es el que está referenciado dentro del archivo
      // pilas-canvas.html
      let contenido_pilas_canvas = yield this.obtener_archivo("./pilas-canvas.html", "text");
      let expresion = contenido_pilas_canvas.match(/pilas-engine-\w*.js/);
      let archivo_pilas = "pilas-engine.js";

      if (expresion) {
        archivo_pilas = expresion[0];
      }

      // se le aplica un hash al archivo de pilas para que expire el cache del navegador.
      let hash = Math.random()
        .toString()
        .split(".")[1];
      let nombre_de_archivo_con_hash = `pilas-engine-${hash}.js`;

      yield this.agregar_archivo(carpeta_del_juego, `./${archivo_pilas}`, nombre_de_archivo_con_hash);

      yield this.agregar_archivo(carpeta_del_juego, "./phaser.js");

      yield this.agregar_archivo(carpeta_del_juego, "./nineslice.js");

      yield this.agregar_archivo(carpeta_del_juego, "./imagenes-0.png");
      yield this.agregar_archivo(carpeta_del_juego, "./imagenes.json");

      yield this.agregar_archivo(carpeta_del_juego, "./bloques-0.png");
      yield this.agregar_archivo(carpeta_del_juego, "./bloques.json");

      yield this.agregar_archivo(carpeta_del_juego, "./decoracion-0.png");
      yield this.agregar_archivo(carpeta_del_juego, "./decoracion.json");

      yield this.agregar_archivo(carpeta_del_juego, "./decoracion-0.png");
      yield this.agregar_archivo(carpeta_del_juego, "./decoracion.json");

      yield this.agregar_archivo(carpeta_del_juego, "./fuentes-0.png");
      yield this.agregar_archivo(carpeta_del_juego, "./fuentes.json");
      yield this.agregar_archivo(carpeta_del_juego, "./fuentes-datos.json");

      yield carpeta_del_juego.file("proyecto.pilas", proyecto_como_string);

      let archivo_index = yield this.obtener_archivo("./proyecto-exportable/index.html", "text");
      let resultado = this.compilador.compilar_proyecto(proyecto);

      let proyecto_completo = {
        nombre_de_la_escena_inicial: proyecto.nombre_de_la_escena_inicial,
        codigo: resultado.codigo,
        permitir_modo_pausa: false,
        proyecto: proyecto,
        pixelart: false
      };

      let codigo_index_html = archivo_index.replace("CODIGO_SERIALIZADO", json_a_string(proyecto_completo));
      codigo_index_html = codigo_index_html.replace("pilas-engine.js", nombre_de_archivo_con_hash);

      /* caso particular: cuando se usa la apliación en producción, el script de pilas
       * tiene un finguerprint diferente, así que primero se intenta obtener ese
       * path de archivo, y luego reemplazarlo por el archivo que realmente se tiene
       * que utilizar
       */
      let expresionDelArchivoPilas = codigo_index_html.match(/pilas-engine-\w*.js/);

      if (expresionDelArchivoPilas) {
        let nombre_incorrecto = expresionDelArchivoPilas[0];
        codigo_index_html = codigo_index_html.replace(nombre_incorrecto, nombre_de_archivo_con_hash);
      }

      yield carpeta_del_juego.file("index.html", codigo_index_html);

      var carpeta_sonidos = carpeta_del_juego.folder("sonidos");

      yield this.agregar_archivo(carpeta_sonidos, "./sonidos/explosion.mp3");
      yield this.agregar_archivo(carpeta_sonidos, "./sonidos/gallina.mp3");
      yield this.agregar_archivo(carpeta_sonidos, "./sonidos/laser.mp3");
      yield this.agregar_archivo(carpeta_sonidos, "./sonidos/moneda.mp3");
      yield this.agregar_archivo(carpeta_sonidos, "./sonidos/salto-corto.mp3");
      yield this.agregar_archivo(carpeta_sonidos, "./sonidos/salto-largo.mp3");
      yield this.agregar_archivo(carpeta_sonidos, "./sonidos/seleccion-aguda.mp3");
      yield this.agregar_archivo(carpeta_sonidos, "./sonidos/seleccion-grave.mp3");

      this.agregar_mensaje("Comprimiendo archivo .zip ...");
      let datos = yield zip.generateAsync({ type: "blob" });
      this.agregar_mensaje("Proceso de exportación finalizado");

      if (this.electron.enElectron) {
        this.agregar_mensaje("Listo, descargue el archivo");
      } else {
        this.agregar_mensaje("Listo, se descargó el archivo .zip");
        this.agregar_mensaje({ mensaje: "Recordá ver las instrucciones para usar ese .zip en otros medios", link: "https://app.pilas-engine.com.ar/manual/exportar_juegos.html" });
      }

      this.set("mostrar_boton_para_cerrar", true);

      saveAs(datos, "mi-proyecto.zip");
    } catch (e) {
      this.agregar_mensaje(`Error, ${e}`);
      this.set("mostrar_boton_para_cerrar", true);
    }
  }),

  dividirEnPartes(str, chunkSize) {
    var chunks = [];

    while (str) {
      if (str.length < chunkSize) {
        chunks.push(str);
        return chunks;
      } else {
        chunks.push(str.substr(0, chunkSize));
        str = str.substr(chunkSize);
      }
    }
  },

  tareaExportarYPublicar: task(function*() {
    this.agregar_mensaje("Comenzando exportación del proyecto ...");
    yield timeout(1000);

    this.agregar_mensaje("Capturando pantalla:");
    let esperando = true;
    let imagenEnBase64 = null; // Esta variable se completa luego de realizar la captura.

    function captura_realizada(data) {
      var canvas = document.getElementById("canvas-boton-exportar");
      var imagen = new Image();

      imagen.addEventListener("load", () => {
        var escala = imagen.height / imagen.width;
        canvas.width = 320;
        canvas.height = 320 * escala;
        var contexto = canvas.getContext("2d");
        contexto.drawImage(imagen, 0, 0, imagen.width, imagen.height, 0, 0, canvas.width, canvas.height);

        imagenEnBase64 = canvas.toDataURL("image/jpeg", 0.5);

        esperando = false;
      });

      imagen.src = data.data;
    }

    // Conecta la función para cuando llegue la captura de pantalla.
    this.bus.on("captura_de_pantalla_realizada", captura_realizada);

    // Pide la captura de pantalla, que llega de forma asincrónica.
    this.bus.trigger("capturar_pantalla");

    while (esperando == true) {
      yield timeout(1000);
    }

    this.bus.off("captura_de_pantalla_realizada", captura_realizada);

    this.agregar_mensaje({
      tipo: "captura",
      data: imagenEnBase64
    });

    yield timeout(1000);

    let serializado = json_a_string(this.proyecto);
    let proyecto = string_a_json(serializado);

    let resultado = this.compilador.compilar_proyecto(proyecto);

    let proyecto_completo = {
      nombre_de_la_escena_inicial: proyecto.nombre_de_la_escena_inicial,
      codigo: resultado.codigo,
      permitir_modo_pausa: false,
      proyecto: proyecto
    };

    let data = "";

    try {
      const proyecto_serializado = json_a_string(proyecto_completo);
      this.agregar_mensaje(`Evaluando tamaño del proyecto ...`);
      yield timeout(1000);
      let proyecto_en_partes = this.dividirEnPartes(proyecto_serializado, 1024 * 256); // bloques de 256kb
      let cantidad_de_partes = proyecto_en_partes.length;

      if (cantidad_de_partes === 1) {
        // Si el proyecto es muy pequeño, se envía en un solo post:
        this.agregar_mensaje(`Subiendo el proyecto completo en una sola parte...`);
        data = yield this.api.publicar_juego(proyecto_serializado, imagenEnBase64, this.ver_codigo, 1, 0);
      } else {
        // Si el proyecto tiene varias partes, hace un primer post para obtener el hash
        // y luego envía las siguientes partes especificando ese hash para que se carguen
        // en el mismo proyecto.
        this.agregar_mensaje(`Subiendo el proyecto en ${cantidad_de_partes} partes de 256kb`);
        this.agregar_mensaje(`Subiendo parte 1 de ${cantidad_de_partes}`);
        data = yield this.api.publicar_juego(proyecto_en_partes[0], imagenEnBase64, this.ver_codigo, cantidad_de_partes, 0);

        for (let i = 1; i < cantidad_de_partes; i++) {
          this.agregar_mensaje(`Subiendo parte ${i + 1} de ${cantidad_de_partes}`);
          yield this.api.publicar_juego(proyecto_en_partes[i], null, this.ver_codigo, cantidad_de_partes, i, data.hash);
        }
      }

      this.agregar_mensaje(`¡Listo!`);
      this.agregar_mensaje("");
      this.agregar_mensaje({ mensaje: `Tu juego se ha publicado aquí:`, link: data.url });
      this.agregar_mensaje("");
      this.agregar_mensaje(`¡Visitá esa dirección o compartila para mostrar tu creación!`);
      this.agregar_mensaje("");
      this.agregar_mensaje(`Opcionalmente, también podes mostrar tu juego copiando y pegando este código en el foro u otro sitio:`);

      let url_sin_query_params = data.url.replace("?sin_cabecera=true", "");

      this.agregar_mensaje({
        codigo: `<iframe src="[...]"></iframe>`,
        codigoCompleto: [
          //
          `[Abrir este proyecto en el editor de pilas](${url_sin_query_params})`,
          ``,
          `<iframe src="${data.url}?sin_cabecera=true" width=${proyecto.ancho} height=${proyecto.alto}></iframe>`
        ].join("\n")
      });
    } catch (url) {
      this.agregar_mensaje(`Error, el servidor en "${url}" no responde o hay un problema de conexión a Internet.`);
    }

    this.set("mostrar_boton_para_cerrar", true);
  }),

  agregar_mensaje(mensaje) {
    this.get("mensajes").pushObject(mensaje);
  },

  agregar_archivo(nodo, ruta, nombre) {
    if (nombre === undefined) {
      nombre = ruta.split("/").splice(-1)[0];
    }

    return this.obtener_archivo(ruta).then(data => {
      this.agregar_mensaje(`- ${nombre}`);
      nodo.file(nombre, data);
    });
  },

  obtener_archivo(url, type) {
    type = type || "blob";

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", url);

      if (type) {
        xhr.responseType = type;
      }

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(`Imposible obtener ${url} (${xhr.status} - ${xhr.statusText}}`);
        }
      };

      xhr.send();
    });
  },

  puede_cerrar: computed("tareaExportar.last.isSuccessful", function() {
    return !this.tareaExportarZip.isRunning && !this.tareaExportarYPublicar.isRunning;
  }),

  actions: {
    abrir_modal_par_exportar() {
      this.set("paso", 1);
      this.set("ver_codigo", true);
      this.set("mostrar_modal", true);
      this.set("mostrar_boton_para_cerrar", false);
      this.set("mostrar_mensajes", true);
      this.set("mensajes", []);
    },
    exportar_zip() {
      this.set("paso", 2);
      this.tareaExportarZip.perform();
      this.set("tareaExportar", this.tareaExportarZip);
    },
    exportar_y_publicar() {
      this.set("paso", 2);
      this.tareaExportarYPublicar.perform();
      this.set("tareaExportar", this.tareaExportarYPublicar);
    },
    cerrar() {
      this.set("mostrar_modal", false);
    }
  }
});
