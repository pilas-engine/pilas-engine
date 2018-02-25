import Component from "@ember/component";
import Ember from "ember";
import config from "../config/environment";

const { APP: { version } } = config;

export default Component.extend({
  consultando: true,
  version_en_el_servidor: null,
  actualizanda: true,

  didInsertElement() {
    Ember.run.later(() => {
      this.consultar_ultima_version_publicada();
    }, 2000);
  },

  consultar_ultima_version_publicada() {
    const base = "https://api.github.com/repos";
    const url = `${base}/pilas-engine/pilas-engine/releases/latest`;

    Ember.$.ajax({
      url: url
    }).then(data => {
      this.set("consultando", false);
      this.set("version_en_el_servidor", data.tag_name);
      this.set("actualizada", version >= data.tag_name);
    });
  }
});
