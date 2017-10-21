import Ember from "ember";

export default Ember.Component.extend({
  tagName: "",

  actions: {
    alternar() {
      this.toggleProperty("variable");
    }
  }
});
