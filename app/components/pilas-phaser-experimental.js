import Ember from "ember";
import utils from "../utils/utils";

export default Ember.Component.extend({
  ancho: 400,
  alto: 400,
  estado: null,
  bus: Ember.inject.service(),
  contexto: null,
  cargando: true,
  mantenerFoco: false,

  didInsertElement() {
    let iframe = this.$("iframe")[0];

    this.actualizarTemporizadorDeFoco(iframe);

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

      window.addEventListener(
        "message",
        this.get("funcionParaAtenderMensajes"),
        false
      );

      this.get("bus").on("cargarEscena", this, "alCargarEscenaDesdeElEditor");
      this.get("bus").on("ejecutarEscena", this, "alTenerQueEjecutarEscena");
      this.get("bus").on("pausarEscena", this, "alTenerQuePausarLaEscena");
      this.get("bus").on(
        "cambiarPosicionDesdeElEditor",
        this,
        "alTenerQueCambiarLaPosicionDesdeElEditor"
      );
    };
  },

  actualizarTemporizadorDeFoco(iframe) {
    Ember.run.later(() => {
      if (this.get("mantenerFoco")) {
        iframe.contentWindow.focus();
      }

      this.actualizarTemporizadorDeFoco(iframe);
    }, 500);
  },

  willDestroyElement() {
    window.removeEventListener(
      "message",
      this.get("funcionParaAtenderMensajes")
    );

    this.get("bus").off("cargarEscena", this, "alCargarEscenaDesdeElEditor");
    this.get("bus").off("ejecutarEscena", this, "alTenerQueEjecutarEscena");
    this.get("bus").off("pausarEscena", this, "alTenerQuePausarLaEscena");
    this.get("bus").off(
      "cambiarPosicionDesdeElEditor",
      this,
      "alTenerQueCambiarLaPosicionDesdeElEditor"
    );
  },

  alCargarEscenaDesdeElEditor({ escena }) {
    let data = {
      tipo: "define_escena",
      nombre: "editorState",
      escena: escena
    };

    this.set("cargando", false);
    this.contexto.postMessage(data, utils.HOST);
  },

  alTenerQueEjecutarEscena({ escena }) {
    let data = {
      tipo: "ejecutar_escena",
      nombre: "editorState",
      escena: escena
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  alTenerQuePausarLaEscena({ escena }) {
    let data = {
      tipo: "pausar_escena",
      //nombre: "pausaState",
      escena: escena
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  alTenerQueCambiarLaPosicionDesdeElEditor({ posicion }) {
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

    /*
    if (e.data.tipo === "movimiento_del_mouse") {
      this.set("mouse_x", e.data.x);
      this.set("mouse_y", e.data.y);
    }
    */

    if (e.data.tipo === "finaliza_carga_de_recursos") {
      this.get("bus").trigger("finalizaCarga");
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
  },
  actions: {
    detener() {
      this.set("estado", this.get("estado").detener());
    }
  }
});
