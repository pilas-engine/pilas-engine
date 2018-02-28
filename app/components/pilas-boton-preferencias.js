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
