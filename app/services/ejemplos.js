import Service from "@ember/service";
import { Promise } from "rsvp";
import { task, timeout } from "ember-concurrency";
import config from "pilas-engine/config/environment";
import convertirProyectoEnObjetoEmber from "pilas-engine/utils/convertir-proyecto-en-objeto-ember";
import { inject as service } from "@ember/service";

export default Service.extend({
  cache: null,
  migraciones: service(),

  tarea: task(function*() {
    if (this.cache) {
      return this.cache;
    }

    yield timeout(500);

    let data = yield this.obtenerEjemplos();

    this.set("cache", data);
    return data;
  }).drop(),

  obtenerEjemplos() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", `${config.rootURL}ejemplos/ejemplos.json`);
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

  obtener() {
    return this.tarea.perform();
  },

  obtener_por_nombre(nombre) {
    return this.obtener_ejemplo(nombre).then(data => {
      let proyecto = this.migraciones.migrar(convertirProyectoEnObjetoEmber(data));
      return {
        nombre: nombre,
        ejemplo: {
          proyecto: proyecto, //
          nombre: nombre
        },
        modoZoom: 2
      };
    });
  },

  obtener_ejemplo(nombre) {
    let url = `${config.rootURL}ejemplos/proyectos/${nombre}.pilas`;

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", url);

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.status);
        }
      };

      xhr.send();
    });
  }
});
