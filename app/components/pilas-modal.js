import Component from "@ember/component";

export default Component.extend({
  actions: {
    ocultar() {
      this.get("alCerrar")();
    }
  }
});
