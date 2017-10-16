import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    abrirSitioDePilas() {
      const { shell } = requireNode("electron");

      shell.openExternal("http://pilas-engine.com.ar");
    }
  }
});
