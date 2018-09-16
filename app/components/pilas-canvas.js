import { htmlSafe } from "@ember/string";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import utils from "../utils/utils";
import ENV from "pilas-engine/config/environment";

export default Component.extend({
  bus: service(),
  log: service(),
  recursos: service(),
  ancho: 400,
  alto: 400,
  estado: null,
  contexto: null,
  cargando: true,
  mantenerFoco: false,
  classNames: ["flex1", "overflow-hidden", "unseletable"],
  classNameBindings: ["altoFijo:h250"],
  altoFijo: false,
  porcentajeDeCarga: 0,
  cuando_termina_de_cargar: null,

  didInsertElement() {
    let iframe = this.$("iframe")[0];

    if (!this.get("recursos.data")) {
      throw Error("No se inicializó el servicio recursos. Tienes que llamar a iniciar antes.");
    }

    iframe.onload = () => {
      let opciones_de_pilas = ENV.pilas;
      let contexto = iframe.contentWindow;
      this.set("contexto", contexto);

      let data = {
        tipo: "iniciar_pilas",
        ancho: this.ancho,
        alto: this.alto,
        recursos: this.get("recursos.data"),
        opciones: opciones_de_pilas
      };

      this.set("funcionParaAtenderMensajes", e => {
        return this.atenderMensajesDePilas(contexto, e);
      });

      contexto.postMessage(data, utils.HOST);

      window.addEventListener("message", this.funcionParaAtenderMensajes, false);

      this.bus.on("cargar_escena", this, "cargar_escena");
      this.bus.on("finaliza_carga", this, "finaliza_carga");
      this.bus.on("ejecutar_escena", this, "ejecutar_escena");
      this.bus.on("ejecutar_proyecto", this, "ejecutar_proyecto");
      this.bus.on("pausar_escena", this, "pausar_escena");
      this.bus.on("cambiar_posicion_desde_el_editor", this, "cambiar_posicion_desde_el_editor");
      this.bus.on("selecciona_actor_desde_el_editor", this, "selecciona_actor_desde_el_editor");
      this.bus.on("actualizar_actor_desde_el_editor", this, "actualizar_actor_desde_el_editor");
      this.bus.on("actualizar_escena_desde_el_editor", this, "actualizar_escena_desde_el_editor");
      this.bus.on("actualizar_proyecto_desde_el_editor", this, "actualizar_proyecto_desde_el_editor");

      this.bus.on("hacer_foco_en_pilas", this, "hacer_foco_en_pilas");
      this.bus.on("progreso_de_carga", this, "progreso_de_carga");
      this.bus.on("eliminar_actor_desde_el_editor", this, "eliminar_actor_desde_el_editor");
      this.bus.on("hace_click_sobre_el_canvas", this, "hace_click_sobre_el_canvas");
    };
  },

  didReceiveAttrs() {
    if (this.contexto) {
      this.emitir_estados_de_depuracion_a_pilas();
    }
  },

  willDestroyElement() {
    window.removeEventListener("message", this.funcionParaAtenderMensajes);

    this.bus.off("cargar_escena", this, "cargar_escena");
    this.bus.off("finaliza_carga", this, "finaliza_carga");
    this.bus.off("ejecutar_escena", this, "ejecutar_escena");
    this.bus.off("ejecutar_proyecto", this, "ejecutar_proyecto");
    this.bus.off("pausar_escena", this, "pausar_escena");
    this.bus.off("cambiar_posicion_desde_el_editor", this, "cambiar_posicion_desde_el_editor");
    this.bus.off("selecciona_actor_desde_el_editor", this, "selecciona_actor_desde_el_editor");
    this.bus.off("actualizar_actor_desde_el_editor", this, "actualizar_actor_desde_el_editor");
    this.bus.off("actualizar_escena_desde_el_editor", this, "actualizar_escena_desde_el_editor");
    this.bus.off("actualizar_proyecto_desde_el_editor", this, "actualizar_proyecto_desde_el_editor");
    this.bus.off("hacer_foco_en_pilas", this, "hacer_foco_en_pilas");
    this.bus.off("progreso_de_carga", this, "progreso_de_carga");
    this.bus.off("eliminar_actor_desde_el_editor", this, "eliminar_actor_desde_el_editor");
    this.bus.off("hace_click_sobre_el_canvas", this, "hace_click_sobre_el_canvas");
  },

  cargar_escena({ escena, proyecto }) {
    let data = {
      tipo: "define_escena",
      nombre: "editorState",
      escena: escena,
      proyecto: proyecto
    };

    this.contexto.postMessage(data, utils.HOST);
    this.emitir_estados_de_depuracion_a_pilas();
  },

  emitir_estados_de_depuracion_a_pilas() {
    let data = {
      tipo: "definir_estados_de_depuracion",
      pos: this.pos,
      fps: this.fps,
      fisica: this.fisica
    };
    this.contexto.postMessage(data, utils.HOST);
  },

  ejecutar_escena({ escena, codigo }) {
    console.warn("Deprecated");

    let data = {
      tipo: "ejecutar_escena",
      escena: escena,
      codigo: codigo
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  ejecutar_proyecto({ proyecto, nombre_de_la_escena_inicial, codigo, permitir_modo_pausa }) {
    let data = {
      tipo: "ejecutar_proyecto",
      proyecto: proyecto,
      nombre_de_la_escena_inicial: nombre_de_la_escena_inicial,
      permitir_modo_pausa: permitir_modo_pausa,
      codigo: codigo
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  selecciona_actor_desde_el_editor({ id }) {
    let data = {
      tipo: "selecciona_actor_desde_el_editor",
      id
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  eliminar_actor_desde_el_editor({ id }) {
    let data = {
      tipo: "eliminar_actor_desde_el_editor",
      id
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  hace_click_sobre_el_canvas() {
    this.hacer_foco_en_pilas();
  },

  actualizar_actor_desde_el_editor({ id, actor }) {
    let data = {
      tipo: "actualizar_actor_desde_el_editor",
      id,
      actor
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  actualizar_escena_desde_el_editor({ id, escena }) {
    let data = {
      tipo: "actualizar_escena_desde_el_editor",
      id,
      escena
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  actualizar_proyecto_desde_el_editor({ proyecto }) {
    let data = {
      tipo: "actualizar_proyecto_desde_el_editor",
      proyecto
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  finaliza_carga() {
    this.set("cargando", false);

    if (this.cuando_termina_de_cargar) {
      this.cuando_termina_de_cargar();
    }
  },

  pausar_escena({ escena }) {
    let data = {
      tipo: "pausar_escena",
      escena: escena
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  hacer_foco_en_pilas() {
    let iframe = this.$("iframe")[0];
    setTimeout(function() {
      iframe.contentWindow.focus();
    }, 10);
  },

  progreso_de_carga({ progreso }) {
    this.set("porcentajeDeCarga", progreso);
  },

  estilo_barra_de_progreso: computed("porcentajeDeCarga", function() {
    let porcentajeDeCarga = this.porcentajeDeCarga;
    return htmlSafe(`width: ${porcentajeDeCarga}%`);
  }),

  cambiar_posicion_desde_el_editor({ posicion }) {
    let data = {
      tipo: "cambiar_posicion",
      posicion: posicion
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  atenderMensajesDePilas(contexto, e) {
    if (e.origin !== utils.HOST) {
      return;
    }

    if (e.data.tipo === "finaliza_carga_de_recursos") {
      this.bus.trigger("finaliza_carga", contexto.pilas, contexto);
      window["pilas"] = contexto.pilas;
    }

    if (e.data.tipo === "pulsa_la_tecla_escape") {
      this.bus.trigger("pulsa_la_tecla_escape", e.data);
    }

    if (e.data.tipo === "progreso_de_carga") {
      this.bus.trigger("progreso_de_carga", e.data);
    }

    if (e.data.tipo === "termina_de_mover_un_actor") {
      this.bus.trigger("termina_de_mover_un_actor", e.data);
    }

    if (e.data.tipo === "comienza_a_mover_un_actor") {
      this.bus.trigger("comienza_a_mover_un_actor", e.data);
    }

    if (e.data.tipo === "comienza_a_depurar_en_modo_pausa") {
      this.bus.trigger("inicia_modo_depuracion_en_pausa", e.data);
    }

    if (e.data.tipo === "cambia_posicion_dentro_del_modo_pausa") {
      this.bus.trigger("cuando_cambia_posicion_dentro_del_modo_pausa", e.data);
    }

    if (e.data.tipo === "error_de_ejecucion") {
      this.bus.trigger("error", e.data);
    }

    if (e.data.tipo === "termina_de_iniciar_ejecucion") {
      this.bus.trigger("cuando_termina_de_iniciar_ejecucion", contexto.pilas, contexto);
    }

    if (e.data.tipo === "cuando_pulsa_escape") {
      this.cuandoPulsaEscapeEnModoEjecucion();
    }

    if (e.data.tipo === "hace_click_sobre_el_canvas") {
      this.bus.trigger("hace_click_sobre_el_canvas");
    }
  },
  actions: {
    detener() {
      this.set("estado", this.estado.detener());
    }
  }
});
