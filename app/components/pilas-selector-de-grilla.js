import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  bus: service(),
  items: null,

  didInsertElement() {
    this.set("items", [
      { etiqueta: "Libre", valor: "" },
      { etiqueta: "1 píxel", valor: 1 },
      { etiqueta: "2 píxeles", valor: 2 },
      { etiqueta: "4 píxeles", valor: 4 },
      { etiqueta: "8 píxeles", valor: 8 },
      { etiqueta: "16 píxeles", valor: 16 },
      { etiqueta: "32 píxeles", valor: 32 },
      { etiqueta: "64 píxeles", valor: 64 },
      { etiqueta: "128 píxeles", valor: 128 }
    ]);

    this.bus.on("cuando_cambia_grilla", this, "definirGrilla");
  },

  definirGrilla({ grilla }) {
    this.set("grilla", grilla);
  },

  willDestroyElement() {
    this.bus.off("cuando_cambia_grilla", this, "definirGrilla");
  },

  actions: {
    cuandoCambia(grilla) {
      grilla = +grilla;
      this.bus.trigger("cuando_cambia_grilla_desde_el_selector_manual", grilla);
      this.set("grilla", grilla);
    }
  }
});
