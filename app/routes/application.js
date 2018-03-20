import $ from 'jquery';
import { inject as service } from '@ember/service';
import Route from "@ember/routing/route";
import config from "../config/environment";

export default Route.extend({
  electron: service(),
  bus: service(),
  log: service(),
  actores: service(),
  estadisticas: service(),

  model() {
    this.get("electron").iniciar();
    this.get("bus").iniciar();
    this.get("log").iniciar();
    this.get("estadisticas").iniciar();

    return this.get("actores").iniciar();
  },

  afterModel() {
    return $().get(`${config.rootURL}spritesheet.png`);
  }
});
