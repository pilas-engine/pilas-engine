import { computed } from "@ember/object";
import Component from "@ember/component";
import config from "../config/environment";
import { task, timeout } from "ember-concurrency";
import { Promise } from "rsvp";

const {
  APP: { version },
  environment
} = config;

export default Component.extend({
  consultando: true,
  version_en_el_servidor: null,
  actualizanda: true,
  version: version,
  error: false,

  version_simplificada: computed("version", function() {
    return this.version.replace("v", "").split("+")[0];
  }),

  enDesarrollo: computed("version", function() {
    return /app-dev/.test(window.location.href);
  }),

  didInsertElement() {
    this.consultar_ultima_version_publicada.perform();
  },

  consultar_ultima_version_publicada: task(function*() {
    const base = "https://api.github.com/repos";
    const url = `${base}/pilas-engine/pilas-engine/releases/latest`;

    yield timeout(1000);

    if (environment === "test") {
      this.set("error", "Omitiendo consultar versión en los tests.");
      this.set("consultando", false);
      return;
    }

    try {
      let data = yield this.obtener_datos_desde_github(url);
      this.set("version_en_el_servidor", data.tag_name);
      this.set("actualizada", "v" + this.version >= data.tag_name);
    } catch (e) {
      this.set("error", "No se puede consultar la última versión.");
    } finally {
      this.set("consultando", false);
    }
  }),

  obtener_datos_desde_github(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", url);
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
  }
});
