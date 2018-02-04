import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  propiedades: [
    { propiedad: "escala_x", incremento: 0.1 },
    { propiedad: "escala_y", incremento: 0.1 },
    { propiedad: "x", incremento: 1 },
    { propiedad: "y", incremento: 1 },
    { propiedad: "rotacion", incremento: 10 }
  ],

  actions: {
    modificarAtributo(propiedad, valor) {
      let actor = this.get("instanciaActorSeleccionado");
      actor.set(propiedad, valor);
      this.get("cuandoModificaObjeto")(actor);
    }
  }
});
