import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  bus: service(),
  actores: null,

  didInsertElement() {
    this.bus.on("aplica_el_cambio_de_posicion_en_el_modo_pausa", this, "actualizar");
  },

  willDestroyElement() {
    this.bus.off("aplica_el_cambio_de_posicion_en_el_modo_pausa", this, "actualizar");
  },

  actualizar(data) {
    this.set("actores", data.foto.actores);
  }
});