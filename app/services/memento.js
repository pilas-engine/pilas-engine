import Service from "@ember/service";
import { computed } from "@ember/object";

const LIMITE = 10;

export default Service.extend({
  iniciar() {
    this.set("historial", []);
    window.memento = this;
  },

  pasos: computed("historial.length", function() {
    return this.get("historial.length");
  }),

  accion(nombre, proyecto) {
    if (this.pasos >= LIMITE) {
      this.historial.removeAt(0);
      console.log("descartando un paso del undo redo");
    }

    console.log("Guardando acción ", nombre);
    this.historial.pushObject({ nombre, proyecto });
  },

  deshacer() {
    return this.historial.popObject();
  }
});
