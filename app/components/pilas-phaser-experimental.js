import Ember from "ember";
import estados from "../estados/estados";
import utils from "../utils/utils";

export default Ember.Component.extend({
  ancho: 400,
  alto: 400,
  entidades: null,
  estado: null,
  bus: Ember.inject.service(),

  didInsertElement() {
    let iframe = this.$("iframe")[0];

    //this.set("entidades", this.get("proyecto.entidades"));
    this.set("entidades", []);

    this.get("bus").trigger("cambiaEstado", { estado: "carga" });
    this.set("estado", new estados.EstadoCarga());

    iframe.onload = () => {
      let contexto = iframe.contentWindow;

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

      this.get("bus").on("cargarEscena", this, "alCargarEscenaDesdeElEditor");
    };
  },

  willDestroyElement() {
    window.removeEventListener("message", this.get("funcionParaAtenderMensajes"));
    this.get("bus").off("cargarEscena", this, "alCargarEscenaDesdeElEditor");
  },

  alCargarEscenaDesdeElEditor({ escena }) {
    this.set("estado", this.get("estado").definirEscena(escena));
  },

  atenderMensajesDePilas(contexto, e) {
    if (e.origin !== utils.HOST) {
      return;
    }

    if (e.data.tipo === "movimiento_del_mouse") {
      this.set("mouse_x", e.data.x);
      this.set("mouse_y", e.data.y);
    }

    if (e.data.tipo === "entidades") {
      this.set("entidades", e.data.entidades);
    }

    if (e.data.tipo === "finaliza_carga_de_recursos") {
      this.set("estado", new estados.EstadoEdicion(contexto, this.get("entidades")));
      this.get("bus").trigger("finalizaCarga");
    }

    if (e.data.tipo === "termina_de_mover_un_actor") {
      this.get("bus").trigger("moverActor", e.data);
    }

    if (e.data.tipo === "comienza_a_mover_un_actor") {
      this.get("bus").trigger("comienzaAMoverActor", e.data);
    }
  },
  actions: {
    ejecutar() {
      this.set("entidades", this.get("estado.entidades"));
      this.set("estado", this.get("estado").ejecutar());
    },
    detener() {
      this.set("estado", this.get("estado").detener());
    },
    abrirDialogoParaAgregarUnActor() {},
    agregarUnActor(nombre) {
      this.set("estado", this.get("estado").agregarActor(nombre));
      this.set("entidades", this.get("estado.entidades"));
      this.get("remodal").close("dialogo-agregar-actor");
    }
  }
});
