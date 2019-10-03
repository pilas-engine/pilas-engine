import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  modalVisible: false,

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
