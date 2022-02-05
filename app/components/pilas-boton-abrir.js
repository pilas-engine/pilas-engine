import Component from "@ember/component";
import { on } from "@ember/object/evented";
import { later } from "@ember/runloop";

/*

NOTA: la siguiente excepción espera a que se apruebe este pullrequest:

  - https://github.com/ember-cli/eslint-plugin-ember/pull/246
  - referencia: https://github.com/ember-cli/eslint-plugin-ember/issues/223

*/
/* eslint ember/no-on-calls-in-components: "off" */

export default Component.extend({
  tagName: "",
  mostrarDesplegable: false,
  class: `
    boton
    pa2
    flex-inline
    dib
    verdana f6 link pointer
    unselectable
  `,

  actions: {
    ejecutar_accion() {
      
      this.toggleProperty("mostrarDesplegable");
      dd.actions.toggle
      //this.accion_abrir_archivo();
    }
  }
});
