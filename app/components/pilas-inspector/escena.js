import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.set("propiedades", [
      {
        tipo: "separador",
        nombre: "Escenario"
      },
      {
        tipo: "numero",
        propiedad: "ancho",
        intensidad: 1,
        min: 200,
        max: 99999
      },
      {
        tipo: "numero",
        propiedad: "alto",
        intensidad: 1,
        min: 200,
        max: 99999
      },
      {
        tipo: "separador",
        nombre: "Cámara"
      },
      {
        tipo: "numero",
        propiedad: "camara_x",
        intensidad: 1,
        min: 0,
        max: 99999
      },
      {
        tipo: "numero",
        propiedad: "camara_y",
        intensidad: 1,
        min: -99999,
        max: 0
      },
      {
        tipo: "separador",
        nombre: "Apariencia"
      },
      {
        tipo: "imagen",
        propiedad: "fondo",
        filtroPropuesto: "fondo"
      },
      {
        tipo: "separador",
        nombre: "Simulación Física"
      },
      {
        tipo: "numero",
        propiedad: "gravedad_x",
        intensidad: 0.1
      },
      {
        tipo: "numero",
        propiedad: "gravedad_y",
        intensidad: 0.1
      }
    ]);
  }
});
