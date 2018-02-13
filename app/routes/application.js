import Ember from "ember";
import Route from "@ember/routing/route";

export default Route.extend({
  electron: Ember.inject.service(),
  bus: Ember.inject.service(),
  log: Ember.inject.service(),
  actores: Ember.inject.service(),

  model() {
    this.get("electron").iniciar();
    this.get("bus").iniciar();
    this.get("log").iniciar();

    return this.get("actores").iniciar();
  }
});
