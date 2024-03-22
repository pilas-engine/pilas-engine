import Component from "@ember/component";

export default Component.extend({
  tagName: "",

  actions: {
    alternar() {
      alert("test");
      this.toggleProperty("variable");
    }
  }
});
