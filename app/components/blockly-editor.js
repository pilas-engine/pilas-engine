import Component from "@ember/component";
import { observer } from "@ember/object";

export default Component.extend({
  classNames: ["flex-auto"],
  didInsertElement() {
    this.frame = this.element.querySelector("iframe");

    window.addEventListener("message", event => {
      if (event.source === this.frame.contentWindow && event.data) {
        if (event.data.message === "carga-completa-de-blockly") {
          console.log("carga completa de blockly", event.data);
        }

        if (event.data.message === "cambia-el-workspace-de-blockly") {
          this.cuandoCambia(event.data.texto);
        }
      }
    });
  },

  cuandoCambiaDeArchivo: observer("titulo", function() {
    console.log("Cambió el título");
  })
});
