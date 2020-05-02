import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  bus: service(),

  canvasMaximizado: computed("panelMaximizado", function() {
    return this.get("panelMaximizado") == "canvas" || this.get("panelMaximizado") == "canvas-desde-el-editor";
  }),

  claseDelPanel: computed("mostrarEditor", "canvasMaximizado", function() {
    if (this.canvasMaximizado) {
      return "dn";
    }

    if (this.mostrarEditor) {
      return "flex flex-column";
    } else {
      return "dn";
    }
  }),

  claseDelPanelColapsado: computed("mostrarEditor", "canvasMaximizado", function() {
    if (this.canvasMaximizado) {
      return "dn";
    }

    if (this.mostrarEditor) {
      return "dn";
    } else {
      return "flex flex-column w-panel-colapsado";
    }
  }),

  actions: {
    alternar(propiedad) {
      this.toggleProperty(propiedad);
    },

    alCambiarMaximizado(valor) {
      this.bus.trigger("hacerFocoEnElEditor", {});

      if (valor) {
        this.set("panelMaximizado", "editor");
      } else {
        this.set("panelMaximizado", null);
      }
    }
  }
});
