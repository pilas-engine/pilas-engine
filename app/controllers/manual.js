import Controller from "@ember/controller";

export default Controller.extend({
  seccion: "index.html",
  queryParams: ["seccion"],

  actions: {
    cuandoCambiaURL(url) {
      this.set("seccion", url);
    },

    abrirEnUnaVentanaNueva() {
      let protocolo = window.location.protocol;
      let host = window.location.host;
      window.open(`${protocolo}//${host}/manual/${this.seccion}`);
    }
  }
});
