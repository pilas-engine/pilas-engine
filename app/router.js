import { inject as service } from '@ember/service';
import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

EmberRouter.reopen({
  estadisticas: service(),
  rutaAnterior: "",

  didTransition() {
    this._super(...arguments);
    this.get("estadisticas").notificar_transicion(this.get("url"));
  }
});

Router.map(function() {
  this.route("acercade");
  this.route("pilas");
  this.route("manual");
  this.route("api");
  this.route("experimentos");
  this.route("pruebas");
  this.route("arduino");
  this.route("editor");
  this.route("ejemplos");
  this.route("actores");
});

export default Router;
