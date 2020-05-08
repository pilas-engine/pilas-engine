import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.set("resoluciones", this.crear_opciones_de_resoluciones());
    this.set("opciones_de_rendimiento", this.crear_opciones_de_rendimiento());
    this.set("lista_de_escenas", this.crear_lista_de_escenas());
  },

  crear_opciones_de_rendimiento() {
    return [
      {
        valor: 60,
        texto: "60 FPS (óptimo)"
      },
      {
        valor: 30,
        texto: "30 FPS"
      }
    ];
  },

  crear_opciones_de_resoluciones() {
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

    return resoluciones.map(e => {
      return { valor: e, texto: e };
    });
  },

  crear_lista_de_escenas() {
    return this.instancia_seleccionada.escenas.map(e => {
      return {
        valor: e.nombre,
        texto: e.nombre
      };
    });
  },

  actions: {
    cuando_cambia_resolucion(_, valor) {
      this.cuando_modifica_atributo_del_proyecto("tamaño", valor);
    },

    cuando_cambia_rendimiento(_, valor) {
      this.cuando_modifica_atributo_del_proyecto("fps", valor);
    },

    cuando_cambia_escena_inicial(_, valor) {
      this.cuando_modifica_atributo_del_proyecto("nombre_de_la_escena_inicial", valor);
    }
  }
});
