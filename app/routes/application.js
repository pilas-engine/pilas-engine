import $ from "jquery";
import { inject as service } from "@ember/service";
import { hash } from "rsvp";
import Route from "@ember/routing/route";
import config from "../config/environment";

export default Route.extend({
  electron: service(),
  bus: service(),
  log: service(),
  actores: service(),
  estadisticas: service(),
  recursos: service(),

  model() {
    this.get("electron").iniciar();
    this.get("bus").iniciar();
    this.get("log").iniciar();
    this.get("estadisticas").iniciar();

    return hash({
      actores: this.get("actores").iniciar(),
      recursos: this.get("recursos").iniciar()
    });
  },

  afterModel() {
    return $().get(`${config.rootURL}spritesheet.png`);
  }
});
