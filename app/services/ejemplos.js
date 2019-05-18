import Service from "@ember/service";
import config from "pilas-engine/config/environment";
import { task, timeout } from "ember-concurrency";
import { Promise } from "rsvp";

export default Service.extend({
  cache: null,

  tarea: task(function*() {
    if (this.cache) {
      return this.cache;
    }

    yield timeout(500);

    let data = yield this.obtenerEjemplos();

    for (let i = 0; i < data.ejemplos.length; i++) {
      let ejemplo = data.ejemplos[i];

      let proyecto = yield this.obtenerEjemplo(
        `${config.rootURL}ejemplos/proyectos/${ejemplo.nombre}.pilas`
      );

      if (typeof proyecto === "string") {
        ejemplo.proyecto = JSON.parse(proyecto);
      } else {
        ejemplo.proyecto = proyecto;
      }
    }

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

  obtenerEjemplo(url) {
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
  },

  obtener() {
    return this.tarea.perform();
  }
});
