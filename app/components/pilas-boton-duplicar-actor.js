import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  keyManager: service(),
  x10: false,

  didInsertElement() {
    const cuandoPulsaTecla = this.keyManager.addMacro({
      callback: () => {
        this.set("x10", true);
      },
      executionKey: "Meta",
      priority: 10,
      keyEvent: "keydown"
    });

    this.set("cuandoPulsaTecla", cuandoPulsaTecla);

    const cuandoSueltaTecla = this.keyManager.addMacro({
      callback: () => {
        this.set("x10", false);
      },
      executionKey: "Meta",
      priority: 10,
      keyEvent: "keyup"
    });

    this.set("cuandoSueltaTecla", cuandoSueltaTecla);
  },

  willDestroyElement() {
    this.keyManager.removeMacro(this.cuandoPulsaTecla);
    this.keyManager.removeMacro(this.cuandoSueltaTecla);
  },

  actions: {
    ejecutarAccion() {
      if (this.x10) {
        this.accionx10();
      } else {
        this.accion();
      }
    }
  }
});
