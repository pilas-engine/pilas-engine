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
        propiedad: "fondo"
      }
    ]);
  }
});
