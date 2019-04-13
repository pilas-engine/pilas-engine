import { computed } from "@ember/object";
import Component from "@ember/component";
import config from "../config/environment";
import { task, timeout } from "ember-concurrency";
import jQuery from "jquery";

const {
  APP: { version }
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

  didInsertElement() {
    this.consultar_ultima_version_publicada.perform();
  },

  consultar_ultima_version_publicada: task(function*() {
    const base = "https://api.github.com/repos";
    const url = `${base}/pilas-engine/pilas-engine/releases/latest`;

    yield timeout(1000);

    try {
      let data = yield jQuery.ajax({ url: url });
      this.set("version_en_el_servidor", data.tag_name);
      this.set("actualizada", "v" + this.version >= data.tag_name);
    } catch (e) {
      this.set("error", "No se puede consultar la última versión.");
    } finally {
      this.set("consultando", false);
    }
  })
});
