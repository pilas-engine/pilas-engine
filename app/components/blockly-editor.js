import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { observer } from "@ember/object";

export default Component.extend({
  classNames: ["flex-auto"],
  proyecto: service(),
  bus: service(),
  entidad_id: null,

  didInsertElement() {
    this.frame = this.element.querySelector("iframe");
    this.bus.on("codigo_ejecutado", this, "codigo_ejecutado");
    this.bus.on("regresa_al_modo_editor", this, "limpiar_bloques_resaltados");
    this.bus.on("actualizar_enumeraciones", this, "actualizar_enumeraciones");

    window.addEventListener("message", event => {
      if (event.source === this.frame.contentWindow && event.data) {
        if (event.data.message === "carga-completa-de-blockly") {
          //console.log("carga completa de blockly", event.data);
        }

        if (event.data.message === "cambia-el-workspace-de-blockly") {
          this.cuandoCambia({ texto: event.data.texto, codigo_de_bloques: event.data.codigo });
        }
      }
    });
  },

  codigo_ejecutado({ instrumentacion_de_bloques }) {
    if (this.entidad_id && instrumentacion_de_bloques[this.entidad_id]) {
      this.frame.contentWindow.postMessage({
        message: "resaltar-bloques",
        ids_de_bloques: instrumentacion_de_bloques[this.entidad_id]
      });
    }
  },

  willDestroyElement() {
    this.bus.off("codigo_ejecutado", this, "codigo_ejecutado");
    this.bus.off("regresa_al_modo_editor", this, "limpiar_bloques_resaltados");
    this.bus.off("actualizar_enumeraciones", this, "actualizar_enumeraciones");
  },

  actualizar_enumeraciones(data) {
    this.frame.contentWindow.postMessage({
      message: "actualizar-enumeraciones",
      data: data
    });
  },

  limpiar_bloques_resaltados() {
    this.frame.contentWindow.postMessage({
      message: "limpiar-bloques-resaltados"
    });

    // TODO: quitar esta segunda llamada para limpiar bloques
    //this.frame.contentWindow.postMessage({
    //message: "limpiar-bloques-resaltados"
    //});
  },

  cuandoCambiaDeArchivo: observer("titulo", function() {
    let { id, bloques } = this.proyecto.obtener_bloques_de_entidad_por_nombre(this.titulo);
    this.set("entidad_id", id);

    this.frame.contentWindow.postMessage({
      message: "cargar-bloques",
      xml_como_texto: bloques
    });
  })
});
