import Component from "@ember/component";
import Ember from "ember";

class ModoCargando {
  constructor() {
    this.ModoCargando = true;
    this.nombreDeEstado = "ModoCargando";
    this.puedeEjecutar = false;
    this.puedeDetener = false;
    this.editorDeshabilitado = true;
    this.codigo = "Demo";
  }

  onReady() {
    return new ModoEdicion();
  }
}

class ModoEdicion {
  constructor() {
    this.ModoCargando = false;
    this.nombreDeEstado = "ModoEdicion";
    this.puedeEjecutar = true;
    this.puedeDetener = false;
    this.editorDeshabilitado = false;
    this.codigo = "Demo";
  }

  ejecutar() {
    return new ModoEjecucion();
  }
}

class ModoEjecucion {
  constructor() {
    this.ModoCargando = false;
    this.nombreDeEstado = "ModoEjecucion";
    this.puedeEjecutar = false;
    this.puedeDetener = true;
    this.editorDeshabilitado = true;
  }

  detener() {
    return new ModoEdicion();
  }
}

export default Component.extend({
  bus: Ember.inject.service(),
  codigo: "// codigo",
  tagName: "",
  actorSeleccionado: -1,
  mapaDeEventos: [
    {
      evento: "cambiaEstado",
      metodo: "cuandoCambiaDeEstado"
    },
    {
      evento: "finalizaCarga",
      metodo: "cuandoFinalizaCargaDePilas"
    },
    {
      evento: "moverActor",
      metodo: "cuandoTerminaDeMoverUnActorDesdePilas"
    },
    {
      evento: "comienzaAMoverActor",
      metodo: "cuandoComienzaAMovertUnActorDesdePilas"
    }
  ],

  didInsertElement() {
    this.set("estado", new ModoCargando());
    this.conectarEventos();
  },

  willDestroyElement() {
    this.desconectarEventos();
  },

  conectarEventos() {
    this.get("mapaDeEventos").map(({ evento, metodo }) => {
      this.get("bus").on(evento, this, metodo);
    });
  },

  desconectarEventos() {
    this.get("mapaDeEventos").map(({ evento, metodo }) => {
      this.get("bus").off(evento, this, metodo);
    });
  },

  cuandoCambiaDeEstado(/*datos*/) {
    //console.log(datos.estado);
  },

  cuandoFinalizaCargaDePilas() {
    this.set("cargando", false);
    this.mostrarEscenaActualSobrePilas();
  },

  cuandoTerminaDeMoverUnActorDesdePilas(datos) {
    let escena = this.obtenerEscenaActual();
    let actor = escena.actores.findBy("id", datos.id);
    actor.set("x", datos.x);
    actor.set("y", datos.y);
  },

  cuandoComienzaAMovertUnActorDesdePilas(datos) {
    this.send("seleccionarActor", datos.id);
  },

  mostrarEscenaActualSobrePilas() {
    let escena = this.obtenerEscenaActual();
    let escenaComoJSON = JSON.parse(JSON.stringify(escena));
    this.get("bus").trigger("cargarEscena", { escena: escenaComoJSON });
  },

  obtenerEscenaActual() {
    let proyecto = this.get("proyecto");
    let indiceEscenaActual = this.get("escenaActual");

    return proyecto.escenas.findBy("id", indiceEscenaActual);
  },

  generarID() {
    return Math.floor(Math.random() * 999) + 1000;
  },

  actions: {
    ejecutar() {
      this.set("estado", this.get("estado").ejecutar());
    },
    detener() {
      this.set("estado", this.get("estado").detener());
    },
    agregarEscena(model) {
      model.escenas.pushObject({
        id: this.generarID(),
        nombre: "demo",
        actores: []
      });
    },
    agregarActor(/*model*/) {
      let escena = this.obtenerEscenaActual();

      escena.actores.pushObject(
        Ember.Object.create({
          id: this.generarID(),
          x: 1,
          y: 30,
          centro_x: 0.5,
          centro_y: 0.5,
          tipo: "actor",
          imagen: "sin_imagen"
        })
      );

      this.mostrarEscenaActualSobrePilas();
    },
    moverActores(/*model*/) {
      let escena = this.obtenerEscenaActual();

      escena.actores.forEach(actor => {
        actor.set("x", Math.floor(Math.random() * 300));
        actor.set("y", Math.floor(Math.random() * 300));
      });

      this.mostrarEscenaActualSobrePilas();
    },
    definirEscena(indiceDeEscena) {
      if (indiceDeEscena != this.get("escenaActual")) {
        this.set("actorSeleccionado", -1);
        this.set("escenaActual", indiceDeEscena);
        this.mostrarEscenaActualSobrePilas();
      }
    },
    seleccionarActor(indiceDelActor) {
      this.set("actorSeleccionado", indiceDelActor);
    },
    // Eventos del editor
    cuandoCargaMonacoEditor() {
      console.log("Cargó el editor");
    },
    cuandoCambiaElCodigo(codigo) {
      this.set("codigo", codigo);
    }
  }
});
