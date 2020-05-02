import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  actions: {
    pulsar() {
      if (this.accion) {
        this.accion();
      }
    }
  }
});
