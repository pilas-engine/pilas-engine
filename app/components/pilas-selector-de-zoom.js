import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { debounce } from "@ember/runloop";

export default Component.extend({
  bus: service(),
  items: null,

  didInsertElement() {
    this.set("items", [
      { etiqueta: "100%", valor: 1 },
      { etiqueta: "125%", valor: 1.25 },
      { etiqueta: "150%", valor: 1.5 },
      { etiqueta: "175%", valor: 1.75 },

      { etiqueta: "200%", valor: 2 },
      { etiqueta: "225%", valor: 2.25 },
      { etiqueta: "250%", valor: 2.5 },
      { etiqueta: "275%", valor: 2.75 },

      { etiqueta: "300%", valor: 3 },
      { etiqueta: "325%", valor: 3.25 },
      { etiqueta: "350%", valor: 3.5 },
      { etiqueta: "375%", valor: 3.75 },

      { etiqueta: "400%", valor: 4 },
      { etiqueta: "425%", valor: 4.25 },
      { etiqueta: "450%", valor: 4.5 },
      { etiqueta: "475%", valor: 4.75 },

      { etiqueta: "500%", valor: 5 }
    ]);

    this.bus.on("cuando_cambia_zoom", this, "definirZoom");
  },

  definirZoom({ zoom }) {
    debounce(this, "definirZoomInmediatamente", zoom, 1000);
  },

  definirZoomInmediatamente(zoom) {
    if (this.zoom !== zoom) {
      this.set("zoom", zoom);
    }
  },

  willDestroyElement() {
    this.bus.off("cuando_cambia_zoom", this, "definirZoom");
  },

  actions: {
    cuandoCambia(zoom) {
      zoom = +zoom;
      this.bus.trigger("cuando_cambia_zoom_desde_el_selector_manual", zoom);
      this.set("zoom", zoom);
    }
  }
});
