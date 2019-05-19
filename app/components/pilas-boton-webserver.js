import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: "",
  webserver: service(),
  iniciando: false,
  activado: false,
  deteniendo: false,
  direccion: "",
  electron: service(),

  willDestroyElement() {
    if (this.activado) {
      this.send("detener_servidor");
    }
  },

  actions: {
    cuando_activa_webserver() {
      this.set("iniciando", true);

      later(() => {
        this.webserver.iniciar_servidor(8081).then(direccion => {
          this.set("iniciando", false);
          this.set("activado", true);
          this.set("direccion", direccion);
        });
      }, 1000);
    },
    detener_servidor() {
      this.set("deteniendo", true);
      this.webserver.detener_servidor();

      later(() => {
        this.set("activado", false);
        this.set("deteniendo", false);
      }, 1000);
    },

    abrir_en_un_navegador() {
      this.electron.abrir_en_un_navegador(`http://${this.direccion}`);
    }
  }
});
