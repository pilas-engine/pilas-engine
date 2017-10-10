import Ember from "ember";

export default Ember.Controller.extend({
  code: "// Demo",
  actions: {
    onChange(codigo) {
      console.log(codigo);
    },
    abrirInspector() {
      requireNode('electron').remote.getCurrentWindow().toggleDevTools();
    }
  }
});
