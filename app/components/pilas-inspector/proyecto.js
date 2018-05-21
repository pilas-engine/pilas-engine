import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.set("propiedades", [
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
  }
});
