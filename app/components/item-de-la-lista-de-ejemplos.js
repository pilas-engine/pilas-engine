import Component from '@ember/component';
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",

  clases: computed("filtro", "ejemplo.nombre", function() {
    if (this.filtro && !this.ejemplo.nombre.includes(this.filtro)) {
      return "dn link relative pointer v-top mb2 mr2 ejemplo";
    } else {
      return "dib link relative pointer v-top mb2 mr2 ejemplo";
    }
  }),
});
