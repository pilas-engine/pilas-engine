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
  }),
  nombreResumido: computed("imagen.nombre", function() {
    return this.imagen.nombre.split("/").reverse()[0];
  }),
  actions: {
    cuando_selecciona_imagen(imagen) {
      this.cuando_selecciona(imagen);
    }
  }
});
