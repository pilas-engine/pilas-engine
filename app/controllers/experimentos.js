import Ember from "ember";

export default Ember.Controller.extend({
  mostrarDialogo: false,

  actions: {
    alternar() {
      this.toggleProperty("mostrarDialogo");
    }
  }
});
