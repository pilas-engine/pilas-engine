import { inject as service } from "@ember/service";
import { hash } from "rsvp";
import Route from "@ember/routing/route";

export default Route.extend({
  electron: service(),
  bus: service(),
  sesion: service(),
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
    this.sesion.iniciar();

    return hash({
      actores: this.actores.iniciar(),
      recursos: this.recursos.iniciar()
    });
  },

  beforeModel() {
    this._super(...arguments);
    this.intl.setLocale(['es']);
  }

});
