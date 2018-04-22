import $ from "jquery";
import Service from "@ember/service";
import config from "pilas-engine/config/environment";
import { task, timeout } from "ember-concurrency";

export default Service.extend({
  iniciado: false,
  data: null,
  lista_de_actores: null,

  tarea: task(function*() {
    yield timeout(500);

    let data = yield $.ajax({
      mimeType: "application/json",
      dataType: "json",
      url: `${config.rootURL}recursos.json`
    });

    this.set("data", data);
    return data;
  }).drop(),

  iniciar() {
    return this.get("tarea").perform();
  }
});
