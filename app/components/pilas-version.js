import $ from 'jquery';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from "@ember/component";
import config from "../config/environment";

const { APP: { version } } = config;

export default Component.extend({
  consultando: true,
  version_en_el_servidor: null,
  actualizanda: true,
  version: version,
  version_simplificada: computed("version", function() {
    return this.get("version")
      .replace("v", "")
      .split("+")[0];
  }),

  didInsertElement() {
    later(() => {
      this.consultar_ultima_version_publicada();
    }, 2000);
  },

  consultar_ultima_version_publicada() {
    const base = "https://api.github.com/repos";
    const url = `${base}/pilas-engine/pilas-engine/releases/latest`;

    $.ajax({
      url: url
    }).then(data => {
      this.set("consultando", false);
      this.set("version_en_el_servidor", data.tag_name);
      this.set("actualizada", "v" + this.get("version") >= data.tag_name);
    });
  }
});
