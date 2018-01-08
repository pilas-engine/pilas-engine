import Ember from "ember";
import Route from "@ember/routing/route";

export default Route.extend({
  livereload: Ember.inject.service(),
  electron: Ember.inject.service(),
  bus: Ember.inject.service(),
  log: Ember.inject.service(),

  model() {
    this.get("livereload").activar();
    this.get("electron").iniciar();
    this.get("bus").iniciar();
    this.get("log").iniciar();
  }
});
