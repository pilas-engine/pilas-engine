import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  valor_actual: computed("objeto", "propiedad.propiedad", "valor", function() {
    if (this.valor) {
      return this.valor;
    } else {
      return this.objeto.get(this.propiedad.propiedad);
    }
  }),
  actions: {
    al_seleccionar(valor) {
      this.modificarAtributo(this.get("propiedad.propiedad"), valor);
    }
  }
});
