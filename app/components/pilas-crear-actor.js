import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  modalVisible: true,
  actions: {
    ocultar() {
      this.set("modalVisible", false);
    },
    abrirModal() {
      this.set("modalVisible", true);
    }
  }
});
