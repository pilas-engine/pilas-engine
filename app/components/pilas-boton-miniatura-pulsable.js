import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  class: "dib boton-miniatura-pulsable f7",
  actions: {
    pulsar() {
      if (this.accion) {
        this.accion();
      }
    }
  }
});
