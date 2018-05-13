import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.set("propiedades", [
      {
        tipo: "imagen",
        propiedad: "imagen"
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
        tipo: "numero",
        propiedad: "z",
        intensidad: 1
      },
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
        propiedad: "figura_sin_rotacion"
      },
      {
        tipo: "interruptor",
        propiedad: "figura_sensor"
      }
    ]);
  }
});
