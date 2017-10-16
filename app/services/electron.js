import Ember from "ember";

export default Ember.Service.extend({
  enElectron: false,

  iniciar() {
    if (requireNode) {
      this.set("enElectron", true);
    }
  }
});
