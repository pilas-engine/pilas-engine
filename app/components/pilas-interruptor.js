import Component from "@ember/component";
import { computed } from '@ember/object';

export default Component.extend({
  tagName: "",
  resaltar: true,
  debe_resaltar_el_fondo: computed('resaltar', 'variable', function() {
    if (this.resaltar) {
      return this.variable;
    }
  }),
  icono_on: computed('icono', function() {
    return `${this.icono}-on`;
  }),
  icono_off: computed('icono', function() {
    return `${this.icono}-off`;
  }),
  actions: {
    alternar() {
      // Solo si se especifica una acción, intenta respetar
      // "data down, actions ups" sin tocar por si mismo el argumento que
      // recibe.
      if (this.cuandoCambia) {
        this.cuandoCambia(!this.variable);
      } else {
        this.toggleProperty("variable");
      }
    }
  }
});
