import Component from "@ember/component";
import { later } from "@ember/runloop";

export default Component.extend({
  actions: {
    al_cambiar(valor) {
      this.modificarAtributo(this.get("propiedad.propiedad"), valor);
    },
    comenzar_a_editar() {
      this.set("editando", true);

      later(() => {
        this.element.querySelector("input").focus();
        this.element.querySelector("input").select();
      });
    },
    cuando_pierde_foco() {
      this.set("editando", false);
    },
    cuando_suelta_tecla(evento) {
      if (evento.keyCode === 13) {
        this.set("editando", false);
      }
    }
  }
});
