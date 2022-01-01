import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",

  debeOcultarPorFiltro: computed("filtro", function() {
    return ! this.actor.nombre.includes(this.filtro);
  }),

  nombreSeparadoEnPalabras: computed("actor.nombre", function() {
    return this.actor.nombre.replace(/_/g, " ");
  })
});
