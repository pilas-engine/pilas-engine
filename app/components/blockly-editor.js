import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { observer } from "@ember/object";

export default Component.extend({
  classNames: ["flex-auto"],
  proyecto: service(),

  didInsertElement() {
    this.frame = this.element.querySelector("iframe");

    window.addEventListener("message", event => {
      if (event.source === this.frame.contentWindow && event.data) {
        if (event.data.message === "carga-completa-de-blockly") {
          console.log("carga completa de blockly", event.data);
        }

        if (event.data.message === "cambia-el-workspace-de-blockly") {
          this.cuandoCambia({ texto: event.data.texto, codigo_de_bloques: event.data.codigo });
        }
      }
    });
  },

  cuandoCambiaDeArchivo: observer("titulo", function() {
    let xml_como_texto = this.proyecto.obtener_bloques_de_entidad_por_nombre(this.titulo);

    this.frame.contentWindow.postMessage({
      message: "cargar-bloques",
      xml_como_texto
    });
  })
});
