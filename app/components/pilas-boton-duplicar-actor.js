import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "div",
  classNames: "dib",
  keyManager: service(),
  x5: false,

  mouseDown: function(e) {
    if (e.metaKey) {
      this.accionx5();
    } else {
      this.accion();
    }
  },

  didInsertElement() {
    const cuandoPulsaTecla = this.keyManager.addMacro({
      callback: () => {
        this.set("x5", true);
      },
      executionKey: "Meta",
      priority: 10,
      keyEvent: "keydown"
    });

    this.set("cuandoPulsaTecla", cuandoPulsaTecla);

    const cuandoSueltaTecla = this.keyManager.addMacro({
      callback: () => {
        this.set("x5", false);
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
  }
});
