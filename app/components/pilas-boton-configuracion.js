import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  mostrar: false,

  actions: {
    disminuir() {
      this.set("tamano", Math.max(10, this.tamano - 1));
    },

    aumentar() {
      this.set("tamano", Math.min(24, this.tamano + 1));
    },

    restaurar() {
      this.set("tamano", 14);
    },

    ocultar() {
      this.set("mostrar", false);
    },

    mostrar() {
      this.set("mostrar", true);
    }
  }
});
