import Service from "@ember/service";
import config from "pilas-engine/config/environment";
import { task, timeout } from "ember-concurrency";
import { Promise as EmberPromise } from "rsvp";

export default Service.extend({
  data: null,
  lista_de_actores: null,

  tarea: task(function*() {
    yield timeout(500);

    let data = yield this.__deprecated_obtenerRecursos();

    let imagenes = yield this.obtenerImagenes("imagenes.json");
    let bloques = yield this.obtenerImagenes("bloques.json");
    let decoracion = yield this.obtenerImagenes("decoracion.json");

    let sprites_imagenes = this.convertir_en_tuplas_de_sprites(imagenes, "imagenes");
    let sprites_bloques = this.convertir_en_tuplas_de_sprites(bloques, "bloques");
    let sprites_decoracion = this.convertir_en_tuplas_de_sprites(decoracion, "decoracion");

    data.imagenesParaGrilla = sprites_imagenes.concat(sprites_bloques).concat(sprites_decoracion);

    this.set("data", data);
    return data;
  }).drop(),

  convertir_en_tuplas_de_sprites(lista, prefijo) {
    return lista.textures[0].frames
      .map(e => {
        return {
          nombre: `${prefijo}:${e.filename}`,
          sprite: prefijo + "-" + e.filename.replace("/", "-")
        };
      })
      .sortBy("nombre");
  },

  iniciar() {
    if (!this.data) {
      return this.tarea.perform();
    } else {
      return this.generar_respuesta_como_promesa_inmediata();
    }
  },

  __deprecated_obtenerRecursos() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", `${config.rootURL}recursos.json`);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.status);
        }
      };

      xhr.send();
    });
  },

  obtenerImagenes(nombre_del_archivo) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", `${config.rootURL}${nombre_del_archivo}`);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.status);
        }
      };

      xhr.send();
    });
  },

  generar_respuesta_como_promesa_inmediata() {
    return new EmberPromise(success => {
      success(this.data);
    });
  }
});
