import Component from '@ember/component';
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: '',
  actions: {
    cerrar(dd) {
      dd.actions.close();
    },

    cuando_abre() {
      later(() => {
        let filtro = document.getElementById("input-filtro-para-ocultar");
        filtro.focus();
      }, 100);
    },
  }
});
