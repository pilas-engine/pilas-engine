import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.set("propiedades", [
      {
        tipo: "combo",
        propiedad: "tamaño",
        opciones: [
          {
            valor: "500x500",
            texto: "500x500"
          },
          {
            valor: "320x240",
            texto: "320x240"
          },
          {
            valor: "800x600",
            texto: "800x600"
          }
        ]
      },

      {
        tipo: "combo",
        propiedad: "fps",
        opciones: [
          {
            valor: 60,
            texto: "60 (recomendado)"
          },
          {
            valor: 30,
            texto: "30"
          },
          {
            valor: 20,
            texto: "20"
          }
        ]
      }
    ]);
  }
});
