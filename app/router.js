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

  this.route("app", function() {
    // abre el proyecto desde electron
    this.route("abrir_proyecto", { path: "abrir_proyecto/:ruta" });

    // abre el proyecto desde el navegador
    this.route("abrir_proyecto_serializado", { path: "abrir_proyecto_serializado/:hash" });

    this.route('editor', function() {
      this.route('abandonar-proyecto');
    });
    this.route('crear_proyecto');
  });
  this.route("proyecto", { path: "proyecto/:hash" });
});

export default Router;
