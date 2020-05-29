import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  router: service(),

  actions: {
    abrir_en_el_editor() {
      this.router.transitionTo("editor", { queryParams: { hash: this.model.hash } });
    },

    pantalla_completa() {
      let pilas = document.querySelector("iframe").contentWindow.pilasengine;

      pilas.alternar_modo_pantalla_completa();
    }
  }
});
