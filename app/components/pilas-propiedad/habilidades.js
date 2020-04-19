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
      "seguir al mouse",
      "oscilar verticalmente",
      "oscilar rotacion",
      "oscilar transparencia"
      //
    ]);
  },
  actions: {
    cuando_selecciona(valor) {
      this.modificarAtributo(this.get("propiedad.propiedad"), valor);
    }
  }
});
