import Ember from "ember";
var HOST = "file://";

if (window.location.host) {
  HOST = "http://" + window.location.host;
}

class EstadoCarga {
  constructor() {
    this.nombre = "Cargando ...";
    this.cargando = true;
  }
}

class EstadoEdicion {
  constructor(contexto, entidades) {
    this.nombre = "Edición";
    this.contexto = contexto;
    this.puedeEjecutar = true;
    this.entidades = entidades;
    this.cargando = false;

    let data = {
      tipo: "define_escena",
      nombre: "editorState",
      entidades: entidades
    };

    this.contexto.postMessage(data, HOST);
  }

  ejecutar() {
    let entidades = this.contexto.pilas.obtener_entidades();
    return new EstadoEjecucion(this.contexto, entidades);
  }

  detener() {
    return this;
  }

  guardar() {
    var entidades = this.contexto.pilas.obtener_entidades();
    return new EstadoEdicion(this.contexto, entidades);
  }

  agregarActor(nombre) {
    var entidades = this.contexto.pilas.obtener_entidades();

    entidades.push({
      id: "demo_123" + Math.random(),
      nombre: "demo",
      x: 250,
      y: 50,
      imagen: nombre,
      eliminado: false,
      centro_x: 30,
      centro_y: 30,
      fisica: false,
      estatico: false,
      habilidades: []
    });

    return new EstadoEdicion(this.contexto, entidades);
  }
}

class EstadoEjecucion {
  constructor(contexto, entidades) {
    this.nombre = "Ejecucion";
    this.contexto = contexto;
    this.puedeEjecutar = false;
    this.entidades = entidades;
    this.cargando = false;

    this.entidadesOriginales = entidades;

    let data = {
      tipo: "define_escena",
      nombre: "estadoEjecucion",
      entidades: entidades
    };

    this.contexto.postMessage(data, HOST);
  }

  ejecutar() {
    return this;
  }

  detener() {
    let entidades = this.entidades;
    return new EstadoEdicion(this.contexto, entidades);
  }
}

export default Ember.Component.extend({
  remodal: Ember.inject.service(),
  ancho: 400,
  alto: 400,
  entidades: [
    {
      id: "demo_123",
      nombre: "demo",
      x: 250,
      y: 50,
      imagen: "sin_imagen",
      eliminado: false,
      centro_x: 30,
      centro_y: 30,
      fisica: false,
      estatico: false,
      habilidades: [{ nombre: "seguir puntero" }]
    }
  ],

  estado: null,

  didInsertElement() {
    let iframe = this.$("iframe")[0];
    this.set("estado", new EstadoCarga());

    iframe.onload = () => {
      let contexto = iframe.contentWindow;
      let entidades = this.get("entidades");

      let data = {
        tipo: "iniciar_pilas",
        ancho: this.get("ancho"),
        alto: this.get("alto")
      };

      contexto.postMessage(data, HOST);

      // Mensajes desde el iframe de pilas-bloques
      window.addEventListener(
        "message",
        e => {
          if (e.origin !== HOST) {
            return;
          }

          if (e.data.tipo === "movimiento_del_mouse") {
            this.set("mouse_x", e.data.x);
            this.set("mouse_y", e.data.y);
          }

          if (e.data.tipo === "entidades") {
            console.log("Desde el editor llegan las entidades...");
            this.set("entidades", e.data.entidades);
          }

          if (e.data.tipo === "finaliza_carga_de_recursos") {
            this.set("estado", new EstadoEdicion(contexto, entidades));
          }
        },
        false
      );
    };
  },
  actions: {
    ejecutar() {
      this.set("estado", this.get("estado").ejecutar());
    },
    detener() {
      this.set("estado", this.get("estado").detener());
    },
    guardar() {
      this.set("estado", this.get("estado").guardar());
    },
    abrirDialogoParaAgregarUnActor() {
      this.get("remodal").open("dialogo-agregar-actor");
    },
    agregarUnActor(nombre) {
      this.set("estado", this.get("estado").agregarActor(nombre));
      this.get("remodal").close("dialogo-agregar-actor");
    }
  }
});
