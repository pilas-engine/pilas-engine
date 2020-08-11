import Component from '@ember/component';
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: '',
  seleccion: 'es',
  intl: service(),

  didInsertElement() {
    this.set("seleccion", this.intl.locale[0]);
  },

  actions: {
    definirIdioma(idioma) {
      this.set("seleccion", idioma);
      this.intl.setLocale(idioma);
    }
  }

});