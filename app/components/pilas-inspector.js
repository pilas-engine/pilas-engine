import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  tagName: "",
  propiedades_de_actores: [
    {
      tipo: "numero",
      propiedad: "centro_x",
      intensidad: 0.1
    },
    {
      tipo: "numero",
      propiedad: "centro_y",
      intensidad: 0.1
    },
    {
      tipo: "numero",
      propiedad: "escala_x",
      intensidad: 0.01
    },
    {
      tipo: "numero",
      propiedad: "escala_y",
      intensidad: 0.01
    },
    {
      tipo: "numero",
      propiedad: "x",
      intensidad: 1
    },
    {
      tipo: "numero",
      propiedad: "y",
      intensidad: 1
    },
    {
      tipo: "interruptor",
      propiedad: "espejado"
    },
    {
      tipo: "interruptor",
      propiedad: "espejado_vertical"
    },
    {
      tipo: "numero",
      propiedad: "rotacion",
      intensidad: 1
    },
    {
      tipo: "numero",
      propiedad: "transparencia",
      intensidad: 1,
      min: 0,
      max: 100
    },
    {
      tipo: "combo",
      propiedad: "figura",
      opciones: [
        {
          valor: "",
          texto: "ninguna"
        },
        {
          valor: "circulo",
          texto: "circulo"
        },
        {
          valor: "rectangulo",
          texto: "rectángulo"
        }
      ]
    },
    {
      tipo: "numero",
      propiedad: "figura_ancho",
      intensidad: 1,
      min: 1,
      max: 100
    },
    {
      tipo: "numero",
      propiedad: "figura_alto",
      intensidad: 1,
      min: 1,
      max: 100
    },
    {
      tipo: "numero",
      propiedad: "figura_radio",
      intensidad: 1,
      min: 1,
      max: 100
    },
    {
      tipo: "numero",
      propiedad: "figura_rebote",
      intensidad: 0.01,
      min: 0,
      max: 1.5
    }
  ],
  propiedades_de_escenas: [
    {
      tipo: "numero",
      propiedad: "camara_x",
      intensidad: 1
    },
    {
      tipo: "numero",
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
