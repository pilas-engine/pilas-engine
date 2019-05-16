import Component from "@ember/component";

export default Component.extend({
  habilidades: null,
  init() {
    this._super(...arguments);
    this.set("habilidades", [
      "arrastrable",
      "rotar constantemente",
      "moverse con el teclado",
      "seguir al mouse lentamente",
      "seguir al mouse"
    ]);
  },
  actions: {
    cuando_selecciona(valor) {
      this.modificarAtributo(this.get("propiedad.propiedad"), valor);
    }
  }
});
