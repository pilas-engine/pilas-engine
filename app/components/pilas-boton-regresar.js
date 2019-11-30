import Component from "@ember/component";
import { inject } from "@ember/service";

export default Component.extend({
  router: inject(),
  tagName: "",
  mostrar: false,

  actions: {
    regresar() {
      if (this.confirmar) {
        this.set("mostrar", true);
      } else {
        this.router.transitionTo("index");
      }
    },
    ocultar() {
      this.set("mostrar", false);
    },
    confirmar_regreso() {
      this.router.transitionTo("app.editor.abandonar-proyecto");
    }
  }
});
