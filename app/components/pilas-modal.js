import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  puede_cerrar: true,
  actions: {
    ocultar() {
      if (this.puede_cerrar) {
        this.alCerrar();
      }
    }
  }
});
