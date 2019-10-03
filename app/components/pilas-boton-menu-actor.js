import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  mostrar: false,

  actions: {
    ocultar() {
      this.set("mostrar", false);
    },

    mostrar() {
      this.set("mostrar", true);
    }
  }
});
