import Component from '@ember/component';
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  api: service(),

  actions: {
    borrar() {
      var respuesta = confirm("¿Realmente quires borrar este juego?")

      if (respuesta) {
        this.set("proyecto.eliminado", true);
        this.api.eliminar_proyecto(this.proyecto.hash);
      }

    }
  }
});
