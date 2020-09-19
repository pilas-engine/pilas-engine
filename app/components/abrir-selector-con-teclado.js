import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  dd: null,
  tecla: null,
  bus: service(),

  didInsertElement() {
    this.bus.on("abrir_selector_de_codigos", this, "abrirSelectorDeCodigos");
    this.set("referenciaCuandoPulsaAtajo", this.cuandoPulsaAtajo.bind(this));

    window.addEventListener("keydown", this.referenciaCuandoPulsaAtajo, true);
  },

  cuandoPulsaAtajo(event) {
    if (!this.mostrarEditor) {
      return;
    }

    if (event.keyCode === this.tecla && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
      event.preventDefault();

      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      } else {
        event.stopPropagation();
      }

      this.dd.actions.open();
    }
  },

  abrirSelectorDeCodigos() {
    this.dd.actions.open();
  },

  willDestroyElement() {
    this.bus.off("abrir_selector_de_codigos", this, "abrirSelectorDeCodigos");
    window.removeEventListener("keydown", this.referenciaCuandoPulsaAtajo, true);
  }
});
