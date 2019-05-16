import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",
  debeMostrar: computed("filtro", "imagen.nombre", function() {
    let nombre = this.get("imagen.nombre");

    if (this.filtro) {
      return nombre.indexOf(this.filtro) > -1;
    } else {
      return true;
    }
  })
});
