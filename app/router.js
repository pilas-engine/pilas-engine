import { inject as service } from "@ember/service";
import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

EmberRouter.reopen({
  estadisticas: service(),
  rutaAnterior: "",

  init() {
    this._super(...arguments);

    this.on("routeDidChange", transition => {
      this.estadisticas.notificar_transicion(transition.to.name);
    });
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
  this.route("ejemplos", function() {
    this.route("ver", { path: ":nombre" });
  });
  this.route("actores");

  this.route("app", function() {
    this.route("abrir_proyecto", { path: "abrir_proyecto/:ruta" });
  });
});

export default Router;
