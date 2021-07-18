import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { observer } from "@ember/object";
import ENV from "../config/environment";

export default Component.extend({
  classNames: ["flex-auto"],
  proyecto: service(),
  bus: service(),
  entidad_id: null,
  host: null,

  didInsertElement() {
    if (window.location.host) {
      this.set("host", window.location.protocol + "//" + window.location.host);
    } else {
      this.set("host", "file://");
    }

    this.frame = this.element.querySelector("iframe");
    this.bus.on("codigo_ejecutado", this, "codigo_ejecutado");
    this.bus.on("regresa_al_modo_editor", this, "limpiar_bloques_resaltados");
    this.bus.on("actualizar_enumeraciones", this, "actualizar_enumeraciones");

    window.addEventListener("message", event => {
      if (event.source === this.frame.contentWindow && event.data) {
        if (event.data.message === "carga-completa-de-blockly") {
          if (ENV.environment !== "test") {
            this.cargarCódigoDeLaEntidadPorTitulo(this.titulo);
          }
        }

        if (event.data.message === "cambia-el-workspace-de-blockly") {
          this.cuandoCambia({ texto: event.data.texto, codigo_de_bloques: event.data.codigo });
        }

        if (event.data.message === "pulsa-ctrl-s") {
          this.alGuardar();
        }
      }
    });
  },

  codigo_ejecutado({ instrumentacion_de_bloques }) {
    if (this.entidad_id && instrumentacion_de_bloques[this.entidad_id]) {
      this.frame.contentWindow.postMessage(
        {
          message: "resaltar-bloques",
          ids_de_bloques: instrumentacion_de_bloques[this.entidad_id]
        },
        this.host
      );
    }
  },

  willDestroyElement() {
    this.bus.off("codigo_ejecutado", this, "codigo_ejecutado");
    this.bus.off("regresa_al_modo_editor", this, "limpiar_bloques_resaltados");
    this.bus.off("actualizar_enumeraciones", this, "actualizar_enumeraciones");
  },

  actualizar_enumeraciones(data) {
    this.frame.contentWindow.postMessage(
      {
        message: "actualizar-enumeraciones",
        data: data
      },
      this.host
    );
  },

  limpiar_bloques_resaltados() {
    this.frame.contentWindow.postMessage(
      {
        message: "limpiar-bloques-resaltados"
      },
      this.host
    );

    // TODO: quitar esta segunda llamada para limpiar bloques
    //this.frame.contentWindow.postMessage({
    //message: "limpiar-bloques-resaltados"
    //});
  },

  cuandoCambiaDeArchivo: observer("titulo", function() {
    this.cargarCódigoDeLaEntidadPorTitulo(this.titulo);
  }),

  cargarCódigoDeLaEntidadPorTitulo(titulo) {
    let tipo = this.proyecto.obtener_tipo_de_entidad_por_nombre(titulo);

    this.frame.contentWindow.postMessage(
      {
        message: "cargar-toolbox",
        tipo: tipo
      },
      this.host
    );

    let { id, bloques } = this.proyecto.obtener_bloques_de_entidad_por_nombre(titulo);
    this.set("entidad_id", id);

    this.frame.contentWindow.postMessage(
      {
        message: "cargar-bloques",
        xml_como_texto: bloques
      },
      this.host
    );
  }
});
