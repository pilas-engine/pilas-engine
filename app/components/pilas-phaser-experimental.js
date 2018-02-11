import Ember from "ember";
import utils from "../utils/utils";

export default Ember.Component.extend({
  bus: Ember.inject.service(),
  log: Ember.inject.service(),
  ancho: 400,
  alto: 400,
  estado: null,
  contexto: null,
  cargando: true,
  mantenerFoco: false,
  classNames: ["flex1", "overflow-hidden"],
  porcentajeDeCarga: 0,

  didInsertElement() {
    let iframe = this.$("iframe")[0];

    iframe.onclick = () => {
      this.hacerFoco();
    };

    iframe.contentWindow.click = () => {
      this.hacerFoco();
    };

    iframe.onload = () => {
      let contexto = iframe.contentWindow;
      this.set("contexto", contexto);

      let data = {
        tipo: "iniciar_pilas",
        ancho: this.get("ancho"),
        alto: this.get("alto")
      };

      this.set("funcionParaAtenderMensajes", e => {
        return this.atenderMensajesDePilas(contexto, e);
      });

      contexto.postMessage(data, utils.HOST);

      window.addEventListener("message", this.get("funcionParaAtenderMensajes"), false);

      this.get("bus").on("cargarEscena", this, "cargarEscena");
      this.get("bus").on("finalizaCarga", this, "finalizaCarga");
      this.get("bus").on("ejecutarEscena", this, "ejecutarEscena");
      this.get("bus").on("ejecutar_proyecto", this, "ejecutar_proyecto");
      this.get("bus").on("pausarEscena", this, "pausarEscena");
      this.get("bus").on("cambiarPosicionDesdeElEditor", this, "cambiarPosicionDesdeElEditor");
      this.get("bus").on("selecciona_actor_desde_el_editor", this, "selecciona_actor_desde_el_editor");
      this.get("bus").on("actualizar_actor_desde_el_editor", this, "actualizar_actor_desde_el_editor");
      this.get("bus").on("hacerFocoEnPilas", this, "hacerFocoEnPilas");
      this.get("bus").on("progresoDeCarga", this, "progresoDeCarga");
    };
  },

  didReceiveAttrs() {
    if (this.get("contexto")) {
      this.emitir_estados_de_depuracion_a_pilas();
    }
  },

  willDestroyElement() {
    window.removeEventListener("message", this.get("funcionParaAtenderMensajes"));

    this.get("bus").off("cargarEscena", this, "cargarEscena");
    this.get("bus").off("finalizaCarga", this, "finalizaCarga");
    this.get("bus").off("ejecutarEscena", this, "ejecutarEscena");
    this.get("bus").off("ejecutar_proyecto", this, "ejecutar_proyecto");
    this.get("bus").off("pausarEscena", this, "pausarEscena");
    this.get("bus").off("cambiarPosicionDesdeElEditor", this, "cambiarPosicionDesdeElEditor");
    this.get("bus").off("selecciona_actor_desde_el_editor", this, "selecciona_actor_desde_el_editor");
    this.get("bus").off("actualizar_actor_desde_el_editor", this, "actualizar_actor_desde_el_editor");
    this.get("bus").off("hacerFocoEnPilas", this, "hacerFocoEnPilas");
    this.get("bus").off("progresoDeCarga", this, "progresoDeCarga");
  },

  cargarEscena({ escena }) {
    let data = {
      tipo: "define_escena",
      nombre: "editorState",
      escena: escena
    };

    this.contexto.postMessage(data, utils.HOST);
    this.emitir_estados_de_depuracion_a_pilas();
  },

  emitir_estados_de_depuracion_a_pilas() {
    let data = {
      tipo: "definir_estados_de_depuracion",
      pos: this.get("pos"),
      fps: this.get("fps")
    };
    this.contexto.postMessage(data, utils.HOST);
  },

  ejecutarEscena({ escena, codigo }) {
    console.warn("Deprecated");

    let data = {
      tipo: "ejecutar_escena",
      escena: escena,
      codigo: codigo
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  ejecutar_proyecto({ proyecto, nombre_de_la_escena_inicial, codigo }) {
    let data = {
      tipo: "ejecutar_proyecto",
      proyecto: proyecto,
      nombre_de_la_escena_inicial: nombre_de_la_escena_inicial,
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

  actualizar_actor_desde_el_editor({ id, actor }) {
    let data = {
      tipo: "actualizar_actor_desde_el_editor",
      id,
      actor
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  finalizaCarga() {
    this.set("cargando", false);
  },

  pausarEscena({ escena }) {
    let data = {
      tipo: "pausar_escena",
      escena: escena
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  hacerFocoEnPilas() {
    let iframe = this.$("iframe")[0];
    setTimeout(function() {
      iframe.contentWindow.focus();
    }, 10);
  },

  progresoDeCarga({ progreso }) {
    this.set("porcentajeDeCarga", progreso);
  },

  cambiarPosicionDesdeElEditor({ posicion }) {
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
      this.get("bus").trigger("finalizaCarga", contexto.pilas, contexto);
    }

    if (e.data.tipo === "progreso_de_carga") {
      this.get("bus").trigger("progresoDeCarga", e.data);
    }

    if (e.data.tipo === "termina_de_mover_un_actor") {
      this.get("bus").trigger("moverActor", e.data);
    }

    if (e.data.tipo === "comienza_a_mover_un_actor") {
      this.get("bus").trigger("comienzaAMoverActor", e.data);
    }

    if (e.data.tipo === "comienza_a_depurar_en_modo_pausa") {
      this.get("bus").trigger("iniciaModoDepuracionEnPausa", e.data);
    }

    if (e.data.tipo === "cambia_posicion_dentro_del_modo_pausa") {
      this.get("bus").trigger("cuandoCambiaPosicionDentroDelModoPausa", e.data);
    }

    if (e.data.tipo === "error_de_ejecucion") {
      this.get("bus").trigger("error", e.data);
    }

    if (e.data.tipo === "termina_de_iniciar_ejecucion") {
      this.get("bus").trigger("cuandoTerminaDeIniciarEjecucion", contexto.pilas, contexto);
    }

    if (e.data.tipo === "cuando_pulsa_escape") {
      this.cuandoPulsaEscapeEnModoEjecucion();
    }
  },
  actions: {
    detener() {
      this.set("estado", this.get("estado").detener());
    }
  }
});
