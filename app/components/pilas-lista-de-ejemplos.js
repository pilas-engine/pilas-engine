import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { observer } from "@ember/object";
import { debounce } from "@ember/runloop";

export default Component.extend({
  classNames: ['tc'],
  ejemplos: service(),
  cantidad_de_ejemplos: 35,
  filtro_diferido: "",

  didInsertElement() {
    this.ejemplos.obtener();
    document.querySelector("#filtro-de-ejemplos").focus();
  },

  // se hace un observer para que el filtro tarde en aplicarse.
  observer_de_filtro: observer("filtro", function() {
    debounce(this, () => {
      this.set("filtro_diferido", this.filtro);
    }, 400);
  })
});
