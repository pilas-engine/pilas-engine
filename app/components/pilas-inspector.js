import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  tagName: "",
  propiedades_de_actores: [
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
  propiedades_de_escenas: [
    {
      propiedad: "camara_x",
      intensidad: 1
    },
    {
      propiedad: "camara_y",
      intensidad: 1
    }
  ],

  ha_seleccionado_un_actor: Ember.computed("tipo_de_la_instancia_seleccionada", function() {
    return this.get("tipo_de_la_instancia_seleccionada") === "actor";
  }),

  actions: {
    modificarAtributo(propiedad, valor) {
      let actor = this.get("instancia_seleccionada");
      actor.set(propiedad, valor);
      this.get("cuandoModificaObjeto")(actor);
    },

    modifica_atributo_de_escena(propiedad, valor) {
      let escena = this.get("instancia_seleccionada");
      escena.set(propiedad, valor);
      this.get("cuando_modifica_escena")(escena);
    }
  }
});
