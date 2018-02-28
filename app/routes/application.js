import Ember from "ember";
import Route from "@ember/routing/route";
import config from "../config/environment";

export default Route.extend({
  electron: Ember.inject.service(),
  bus: Ember.inject.service(),
  log: Ember.inject.service(),
  actores: Ember.inject.service(),
  estadisticas: Ember.inject.service(),

  model() {
    this.get("electron").iniciar();
    this.get("bus").iniciar();
    this.get("log").iniciar();
    this.get("estadisticas").iniciar();

    return this.get("actores").iniciar();
  },

  afterModel() {
    return Ember.$().get(`${config.rootURL}spritesheet.png`);
  }
});
