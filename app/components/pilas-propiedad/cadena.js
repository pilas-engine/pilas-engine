import Component from "@ember/component";

export default Component.extend({
  actions: {
    al_cambiar(valor) {
      this.modificarAtributo(this.get("propiedad.propiedad"), valor);
    }
  }
});
