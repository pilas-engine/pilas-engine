import Ember from "ember";
import Route from "@ember/routing/route";

export default Route.extend({
  livereload: Ember.inject.service(),
  electron: Ember.inject.service(),

  model() {
    this.get("livereload").activar();
    this.get("electron").iniciar();
  }
});
