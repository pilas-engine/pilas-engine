import Service from "@ember/service";
import config from "pilas-engine/config/environment";
import { task, timeout } from "ember-concurrency";
import { Promise as EmberPromise } from "rsvp";

export default Service.extend({
  data: null,
  lista_de_actores: null,

  tarea: task(function*() {
    yield timeout(500);

    let data = yield this.obtenerRecursos();

    this.set("data", data);
    return data;
  }).drop(),

  iniciar() {
    if (!this.data) {
      return this.tarea.perform();
    } else {
      return this.generar_respuesta_como_promesa_inmediata();
    }
  },

  obtenerRecursos() {
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

  generar_respuesta_como_promesa_inmediata() {
    return new EmberPromise(success => {
      success(this.data);
    });
  }
});
