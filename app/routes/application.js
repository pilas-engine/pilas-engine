import { inject as service } from "@ember/service";
import { hash } from "rsvp";
import Route from "@ember/routing/route";

export default Route.extend({
  electron: service(),
  bus: service(),
  log: service(),
  actores: service(),
  estadisticas: service(),
  recursos: service(),

  model() {
    this.electron.iniciar();
    this.bus.iniciar();
    this.log.iniciar();
    this.estadisticas.iniciar();

    return hash({
      actores: this.actores.iniciar(),
      recursos: this.recursos.iniciar()
    });
  }

  /*
  TODO: activar este código para precargar imágenes antes de iniciar el editor.

  afterModel() {
    return $().get(`${config.rootURL}spritesheet.png`);
  }
  */
});
