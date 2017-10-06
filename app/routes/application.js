import Ember from "ember";

export default Ember.Route.extend({
  livereload: Ember.inject.service(),
  model() {
    this.get("livereload").activar();
  }
});
