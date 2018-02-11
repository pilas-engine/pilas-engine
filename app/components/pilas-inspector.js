import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  propiedades: [
    {
      propiedad: "centro_x",
      intensidad: 0.1
    },
    {
      propiedad: "centro_y",
      intensidad: 0.1
    },
    {
      propiedad: "escala_x",
      intensidad: 0.01
    },
    {
      propiedad: "escala_y",
      intensidad: 0.01
    },
    {
      propiedad: "x",
      intensidad: 1
    },
    {
      propiedad: "y",
      intensidad: 1
    },
    {
      propiedad: "rotacion",
      intensidad: 1
    },
    {
      propiedad: "transparencia",
      intensidad: 1,
      min: 0,
      max: 100
    }
  ],

  actions: {
    modificarAtributo(propiedad, valor) {
      let actor = this.get("instanciaActorSeleccionado");
      actor.set(propiedad, valor);

      this.get("cuandoModificaObjeto")(actor);
    }
  }
});
