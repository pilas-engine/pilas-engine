import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  valor: "",
  log: Ember.inject.service(),
  tagName: "",
  actions: {
    cuandoPulsaEnter() {
      let v = this.get("valor");

      if (v) {
        this.set("valor", "");
        this.get("log").info("El intérprete aún no está implementado.");
      }
    }
  }
});
