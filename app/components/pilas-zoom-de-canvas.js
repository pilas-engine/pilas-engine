import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  bus: service(),
  tagName: "",
  actions: {
    definir_zoom(cantidad) {
      this.bus.trigger(`${this.nombre_del_contexto}:cambiar_zoom`, cantidad);
    }
  }
});
