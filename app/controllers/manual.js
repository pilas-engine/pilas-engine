import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  seccion: "index",
  queryParams: ["seccion"],
  electron: service(),

  actions: {
    cuandoCambiaURL(url) {
      this.set("seccion", url);
    },

    abrirEnUnaVentanaNueva() {
      if (this.electron.enElectron) {
        let base = window.location.href.split("index.html")[0];
        window.open(`${base}/manual/index.html`);
      } else {
        let protocolo = window.location.protocol;
        let host = window.location.host;
        window.open(`${protocolo}//${host}/manual/${this.seccion}.html`);
      }
    }
  }
});
