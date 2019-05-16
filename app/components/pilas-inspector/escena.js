import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.set("propiedades", [
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
        propiedad: "fondo",
        filtroPropuesto: "fondo"
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
