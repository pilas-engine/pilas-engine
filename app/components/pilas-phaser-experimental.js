import Ember from "ember";
var HOST = "file://";

if (window.location.host) {
  HOST = "http://localhost:4200";
}

/*
function clonar(obj) {
  return JSON.parse(JSON.stringify(obj));
}
*/

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
    let entidades = this.contexto.obtener_entidades();
    console.log(entidades);
    return new EstadoEjecucion(this.contexto, entidades);
  }

  detener() {
    return this;
  }

  guardar() {
    var entidades = this.contexto.obtener_entidades();
    console.log("las entidades son", entidades);
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
      nombre: "playState",
      entidades: entidades
    };

    this.contexto.postMessage(data, HOST);
  }

  ejecutar() {
    return this;
  }

  detener() {
    let entidades = this.entidades;
    console.log(entidades);
    return new EstadoEdicion(this.contexto, entidades);
  }
}

export default Ember.Component.extend({
  mouse_x: 0,
  mouse_y: 0,
  entidades: [
    {
      id: "demo_123",
      nombre: "demo",
      x: 250,
      y: 50,
      imagen: "ember",
      eliminado: false,
      centro_x: 0,
      centro_y: 0,
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
    }
  }
});
