import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.set("propiedades", [{
        tipo: "separador",
        nombre: "Escenario",
        etiqueta: "stage.stage"
      },
      {
        tipo: "numero",
        propiedad: "ancho",
        etiqueta: "stage.width",
        intensidad: 1,
        min: 200,
        max: 99999
      },
      {
        tipo: "numero",
        propiedad: "alto",
        etiqueta: "stage.height",
        intensidad: 1,
        min: 200,
        max: 99999
      },
      {
        tipo: "separador",
        nombre: "Cámara",
        etiqueta: "stage.camera",
      },
      {
        tipo: "numero",
        propiedad: "camara_x",
        etiqueta: "stage.camera.x",
        intensidad: 1,
        min: 0,
        max: 99999
      },
      {
        tipo: "numero",
        propiedad: "camara_y",
        etiqueta: "stage.camera.y",
        intensidad: 1,
        min: -99999,
        max: 0
      },
      {
        tipo: "separador",
        nombre: "Apariencia",
        etiqueta: "stage.appearance",
      },
      {
        tipo: "imagen",
        propiedad: "fondo",
        filtroPropuesto: "",
        etiqueta: "stage.background"
      },
      {
        tipo: "separador",
        nombre: "Simulación Física",
        etiqueta: "stage.physical.simulation"
      },
      {
        tipo: "numero",
        propiedad: "gravedad_x",
        intensidad: 0.1,
        etiqueta: "stage.gravity.x"
      },
      {
        tipo: "numero",
        propiedad: "gravedad_y",
        intensidad: 0.1,
        etiqueta: "stage.gravity.y"
      }
    ]);
  }
});
