import Component from "@ember/component";
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: "",
  texto_del_boton: "copiar",

  actions: {
    cuando_hace_click() {
      this.set("texto_del_boton", "copiado");

      let input = document.getElementById("input-para-copiar");

      input.focus();
      input.select();
      document.execCommand("copy");

      later(
        this,
        () => {
          this.set("texto_del_boton", "copiar");
        },
        1000
      );
    }
  }
});
