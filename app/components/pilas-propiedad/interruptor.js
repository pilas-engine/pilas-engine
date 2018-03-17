import Component from "@ember/component";

export default Component.extend({
  actions: {
    cuando_cambia(valor) {
      let nombre_de_la_propiedad = this.get("propiedad.propiedad");

      this.get("modificarAtributo")(nombre_de_la_propiedad, valor);
    }
  }
});
