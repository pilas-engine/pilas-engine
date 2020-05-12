import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  maximizar: false,
  memento: service(),

  actions: {
    alCambiarMaximizado(valor) {
      if (valor) {
        this.set("panelMaximizado", "canvas");
      } else {
        this.set("panelMaximizado", null);
      }
    }
  }
});
