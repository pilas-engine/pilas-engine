import Component from "@ember/component";
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: "",
  texto_del_boton: "copiar",
  desactivar: false,

  activar_boton() {
    this.set("texto_del_boton", "copiar");
    this.set("desactivar", false);
  },

  copiar() {
    let input = document.getElementById("input-para-copiar");

    input.focus();
    input.select();
    document.execCommand("copy");
  },

  actions: {
    cuando_hace_click() {
      this.set("texto_del_boton", "copiando...");
      this.set("desactivar", true);
      this.copiar();
      later(this, "activar_boton", 1000);
    }
  }
});
