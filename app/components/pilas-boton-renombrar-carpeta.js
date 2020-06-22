import Component from "@ember/component";
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: "div",
  classNames: ["dib"],
  actions: {
    cuandoAbre() {
      this.set("nombre", this.carpeta.nombre);

      later(() => {
        let input = document.getElementById("input-renombrar-carpeta");
        input.focus();
        document.execCommand("selectAll");
      }, 1);
    },
    confirmarCambioDeNombre(dd) {
      let nombre = this.nombre.trim();
      dd.actions.close();

      if (nombre.length > 0) {
        this.carpeta.set("nombre", nombre);
      }
    },
    cancelar(dd) {
      dd.actions.close();
    }
  }
});
