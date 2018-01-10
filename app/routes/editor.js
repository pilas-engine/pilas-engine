import Ember from "ember";

export default Ember.Route.extend({
  actores: Ember.inject.service(),

  model() {
    this.get("actores").iniciar();
  }
});
