import Ember from "ember";

export default Ember.Controller.extend({
  electron: Ember.inject.service(),

  actions: {
    abrirSitioDePilas() {
      this.get("electron").abrir_en_un_navegador("http://pilas-engine.com.ar");
    },
    abrirInspector() {
      this.get("electron").abrirInspector();
    }
  }
});
