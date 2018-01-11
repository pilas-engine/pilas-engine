import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  tagName: "",
  modalVisible: false,
  actores: Ember.inject.service(),
  tarea: Ember.computed.alias("actores.tareaConseguirActores"),

  actions: {
    ocultar() {
      this.set("modalVisible", false);
    },
    abrirModal() {
      this.set("modalVisible", true);
    }
  }
});
