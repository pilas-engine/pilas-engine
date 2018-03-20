import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  electron: service(),

  actions: {
    abrirSitioDePilas() {
      this.get("electron").abrir_en_un_navegador("http://pilas-engine.com.ar");
    },
    abrirInspector() {
      this.get("electron").abrirInspector();
    }
  }
});
