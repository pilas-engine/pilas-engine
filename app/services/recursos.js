import jQuery from "jquery";
import Service from "@ember/service";
import config from "pilas-engine/config/environment";
import { task, timeout } from "ember-concurrency";
import { Promise as EmberPromise } from "rsvp";

export default Service.extend({
  data: null,
  lista_de_actores: null,

  tarea: task(function*() {
    yield timeout(500);

    let data = yield jQuery.ajax({
      mimeType: "application/json",
      dataType: "json",
      url: `${config.rootURL}recursos.json`
    });

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

  generar_respuesta_como_promesa_inmediata() {
    return new EmberPromise(success => {
      success(this.data);
    });
  }
});
