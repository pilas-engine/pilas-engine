import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  ejemplos: service(),
  cantidad_de_ejemplos: 28,

  didInsertElement() {
    this.ejemplos.obtener();
  }
});
