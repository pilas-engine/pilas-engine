import Component from "@ember/component";

export default Component.extend({
  habilidades: null,
  init() {
    this._super(...arguments);
    this.set("habilidades", ["arrastrable", "rotar constantemente"]);
  },
  actions: {
    cuando_selecciona(valor) {
      this.modificarAtributo(this.get("propiedad.propiedad"), valor);
    }
  }
});
