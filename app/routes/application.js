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
  intl: service(),

  model() {
    this.electron.iniciar();
    this.bus.iniciar();
    this.log.iniciar();
    this.estadisticas.iniciar();
    this.intl.setLocale(["es"]);

    return hash({
      actores: this.actores.iniciar(),
      recursos: this.recursos.iniciar()
    });
  },

  afterModel() {
    return $().get(`${config.rootURL}spritesheet.png`);
  }
});
