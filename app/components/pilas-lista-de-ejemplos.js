import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  ejemplos: service(),

  didInsertElement() {
    this.ejemplos.obtener();
  }
});
