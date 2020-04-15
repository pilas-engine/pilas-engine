import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    let resoluciones = [
      "256x224", //
      "256x256",
      "320x240",
      "500x500",
      "640x480",
      "800x600",
      "1024x768",
      "1920x1080",
      "1366x768",
      "1280x720",
      // --- verticales
      "240x320",
      "480x640",
      "600x800",
      "768x1024",
      "1080x1920",
      "768x1366",
      "720x1280"
    ];

    let resoluciones_como_diccionarios = resoluciones.map(e => {
      return { valor: e, texto: e };
    });

    this.set("propiedades", [
      {
        tipo: "combo",
        propiedad: "tamaño",
        opciones: resoluciones_como_diccionarios
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
          }
        ]
      }
    ]);
  }
});
