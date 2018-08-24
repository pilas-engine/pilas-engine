import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { and } from "@ember/object/computed";

export default Component.extend({
  tagName: "",
  router: service(),
  electron: service(),
  mostrar: and("electron.enElectron", "electron.en_desarrollo"),
  livereload: false,

  didInsertElement() {
    this._super(...arguments);

    if (this.mostrar) {
      let electron = requireNode("electron");

      electron.ipcRenderer.on("reload", () => {
        if (this.get("livereload")) {
          window.location.reload();
        } else {
          console.log("Evitando actualizar, livereload desactivado.");
        }
      });
    }
  },

  actions: {
    ir_a_la_seccion_de_pruebas() {
      this.router.transitionTo("pruebas");
    },
    ir_a_la_seccion_principal() {
      this.router.transitionTo("index");
    }
  }
});
