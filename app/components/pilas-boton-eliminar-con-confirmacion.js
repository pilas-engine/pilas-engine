import { computed } from '@ember/object';
import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  modalVisible: false,

  idDialogo: computed("tipo", function() {
    return "dialogoEliminar" + this.tipo;
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
      this.accion();
    }
  }
});
