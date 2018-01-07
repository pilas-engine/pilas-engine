import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    abrirInspector() {
      requireNode("electron")
        .remote.getCurrentWindow()
        .toggleDevTools();
    }
  }
});
