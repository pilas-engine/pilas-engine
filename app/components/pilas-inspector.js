import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  propiedades_de_actores: null,
  propiedades_de_escenas: null,

  didInsertElement() {
    this.set("propiedades_de_actores", [
      {
        tipo: "cadena",
        propiedad: "etiqueta"
      },
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
            texto: "círculo"
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
        max: 1000
      },
      {
        tipo: "numero",
        propiedad: "figura_alto",
        intensidad: 1,
        min: 1,
        max: 1000
      },
      {
        tipo: "numero",
        propiedad: "figura_radio",
        intensidad: 1,
        min: 1,
        max: 1000
      },
      {
        tipo: "numero",
        propiedad: "figura_rebote",
        intensidad: 0.01,
        min: 0,
        max: 1.5
      },
      {
        tipo: "interruptor",
        propiedad: "figura_dinamica"
      },
      {
        tipo: "interruptor",
        propiedad: "figura_sensor"
      }
    ]);

    this.set("propiedades_de_escenas", [
      {
        tipo: "numero",
        propiedad: "camara_x",
        intensidad: 1
      },
      {
        tipo: "numero",
        propiedad: "camara_y",
        intensidad: 1
      },
      {
        tipo: "imagen",
        propiedad: "fondo"
      }
    ]);

    this.set("propiedades_de_proyecto", [
      {
        tipo: "numero",
        propiedad: "ancho",
        intensidad: 1
      },
      {
        tipo: "numero",
        propiedad: "alto",
        intensidad: 1
      }
    ]);
  },

  actions: {
    modificarAtributo(propiedad, valor) {
      let actor = this.instancia_seleccionada;
      actor.set(propiedad, valor);
      this.cuandoModificaObjeto(actor);
    },

    modifica_atributo_de_escena(propiedad, valor) {
      let escena = this.instancia_seleccionada;
      escena.set(propiedad, valor);
      this.cuando_modifica_escena(escena);
    },

    modifica_atributo_del_proyecto(propiedad, valor) {
      let proyecto = this.instancia_seleccionada;
      proyecto.set(propiedad, valor);
      this.cuando_modifica_proyecto(proyecto);
    }
  }
});
