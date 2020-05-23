import { alias } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  modalVisible: false,

  actions: {
    ocultar() {
      this.set("modalVisible", false);
    },
    abrirModal() {
      this.set("modalVisible", true);
    }
  }
});
