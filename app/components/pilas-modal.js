import Component from "@ember/component";

export default Component.extend({
  classNames: ["absolute"],
  puede_cerrar: true,
  actions: {
    ocultar() {
      if (this.puede_cerrar) {
        this.alCerrar();
      }
    }
  }
});
