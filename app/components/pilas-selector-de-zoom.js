import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { debounce } from "@ember/runloop";

export default Component.extend({
  bus: service(),
  items: null,

  didInsertElement() {
    this.crear_opciones_de_zoom();
    this.bus.on("cuando_cambia_el_estado_de_la_camara_en_el_editor", this, "cuando_cambia_estado_de_la_camara");
  },

  crear_opciones_de_zoom() {
    this.set("items", [
        { etiqueta: '60%', 'valor': 0.6},
        { etiqueta: '80%', 'valor': 0.8},
        { etiqueta: '100%', 'valor': 1.0},
        { etiqueta: '120%', 'valor': 1.2},
        { etiqueta: '140%', 'valor': 1.4},
        { etiqueta: '160%', 'valor': 1.6},
        { etiqueta: '180%', 'valor': 1.8},
        { etiqueta: '200%', 'valor': 2.0},
        { etiqueta: '220%', 'valor': 2.2},
        { etiqueta: '240%', 'valor': 2.4},
        { etiqueta: '260%', 'valor': 2.6},
        { etiqueta: '280%', 'valor': 2.8},
        { etiqueta: '300%', 'valor': 3.0},
    ]);
  },

  cuando_cambia_estado_de_la_camara(data) {
    debounce(this, "definirZoomInmediatamente", data.zoom, 50);
  },

  definirZoomInmediatamente(zoom) {
    if (this.zoom !== zoom) {
      this.set("zoom", zoom);
    }
  },

  willDestroyElement() {
    this.bus.off("cuando_cambia_el_estado_de_la_camara_en_el_editor", this, "cuando_cambia_estado_de_la_camara");
  },

  actions: {
    cuandoCambia(zoom) {
      zoom = +zoom;
      this.bus.trigger("cuando_cambia_zoom_desde_el_selector_manual", zoom);
      this.set("zoom", zoom);
    }
  }
});
