import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.set("propiedades", [
      {
        tipo: "separador",
        nombre: "Tamaño de la pantalla"
      },
      {
        tipo: "numero",
        propiedad: "ancho",
        intensidad: 1,
        min: 200,
        max: 1920
      },
      {
        tipo: "numero",
        propiedad: "alto",
        intensidad: 1,
        min: 200,
        max: 1080
      }
    ]);
  }
});
