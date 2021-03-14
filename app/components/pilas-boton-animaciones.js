import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  modalVisible: false,
  bus: service(),

  actions: {
    ocultar() {
      this.set("modalVisible", false);
      this.bus.trigger("cierra_dialogo_de_animaciones");
    },
    abrirModal() {
      this.set("modalVisible", true);
    }
  }
});
