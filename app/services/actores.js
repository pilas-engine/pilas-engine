import Service from "@ember/service";
import config from "pilas-engine/config/environment";
import Ember from "ember";
import { task, timeout } from "ember-concurrency";

export default Service.extend({
  iniciado: false,
  data: null,

  tareaConseguirActores: task(function*() {
    yield timeout(500);

    let actores = yield Ember.$.ajax({
      mimeType: "application/json",
      dataType: "json",
      url: `${config.rootURL}actores/actores.json`
    });

    return actores;
  }).drop(),

  iniciar() {
    this.get("tareaConseguirActores").perform();
  }
});
