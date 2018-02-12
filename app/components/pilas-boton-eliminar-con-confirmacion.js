import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  tagName: "",
  modalVisible: false,

  idDialogo: Ember.computed("tipo", function() {
    return "dialogoEliminar" + this.get("tipo");
  }),

  actions: {
    ocultar() {
      this.set("modalVisible", false);
    },
    mostrar() {
      this.set("modalVisible", true);
    },
    ocultarEjecutandoAccion() {
      this.send("ocultar");
      this.get("accion")();
    }
  }
});
