import Component from "@ember/component";
import EmberObject from "@ember/object";
import { A } from "@ember/array";

export default Component.extend({
  tagName: "",
  escena: null,

  actions: {
    crear_carpeta() {
      if (!this.escena.carpetas) {
        this.escena.set("carpetas", A([]));
      }

      let nombre = "carpeta";

      this.escena.carpetas.pushObject(
        EmberObject.create({
          nombre: nombre,
          id: Math.random()
        })
      );
    }
  }
});
