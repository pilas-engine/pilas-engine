import Component from "@ember/component";

export default Component.extend({
  tagName: "",

  actions: {
    alternar() {
      this.toggleProperty("variable");
    }
  }
});
