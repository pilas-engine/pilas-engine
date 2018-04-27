import { inject as service } from "@ember/service";
import Controller from "@ember/controller";

export default Controller.extend({
  electron: service(),

  actions: {
    abrir_el_sitio_de_pilas() {
      this.electron.abrir_en_un_navegador("http://pilas-engine.com.ar");
    },
    abrir_el_foro_de_pilas() {
      this.electron.abrir_en_un_navegador("http://foro.pilas-engine.com.ar/");
    },
    abrirInspector() {
      this.electron.abrirInspector();
    }
  }
});
