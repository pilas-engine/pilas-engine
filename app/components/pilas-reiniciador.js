import Component from "@ember/component";
import { later } from "@ember/runloop";
import { inject as service } from "@ember/service";

export default Component.extend({
  activo: true,
  bus: service(),
  tagName: "",

  didInsertElement() {
    this.bus.on("recargarCanvasDePilas", this, "recargarCanvasDePilas");
  },

  didDestroyElement() {
    this.bus.off("recargarCanvasDePilas", this, "recargarCanvasDePilas");
  },

  recargarCanvasDePilas() {
    this.send("reiniciar");
  },

  actions: {
    reiniciar() {
      this.set("activo", false);

      later(
        this,
        () => {
          this.set("activo", true);
        },
        500
      );
    }
  }
});
