import Component from "@ember/component";

export default Component.extend({
  actions: {
    al_seleccionar(valor) {
      this.get("modificarAtributo")(this.get("propiedad.propiedad"), valor);
    }
  }
});
