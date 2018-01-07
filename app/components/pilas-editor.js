import Component from "@ember/component";
import Ember from "ember";
import estados from "../estados/estados-de-pilas-editor";

export default Component.extend({
  bus: Ember.inject.service(),
  compilador: Ember.inject.service(),
  foco: Ember.inject.service(),
  codigo: "// codigo",
  tagName: "",
  actorSeleccionado: -1,

  historiaPosicion: 10,
  historiaMinimo: 0,
  historiaMaximo: 10,

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
    },
    {
      evento: "iniciaModoDepuracionEnPausa",
      metodo: "cuandoComenzaADepurarEnModoPausa"
    },
    {
      evento: "cuandoCambiaPosicionDentroDelModoPausa",
      metodo: "cuandoCambiaPosicionDentroDelModoPausa"
    }
  ],

  didInsertElement() {
    this.set("estado", new estados.ModoCargando());
    this.conectarEventos();

    document.addEventListener("keydown", this.cuandoIntentaAlternarEjecucion.bind(this));

    this.get("foco").conectarFunciones(
      () => {
        this.get("bus").trigger("hacerFocoEnPilas", {});
      },
      () => {
        this.get("bus").trigger("hacerFocoEnElEditor", {});
      }
    );
  },

  cuandoIntentaAlternarEjecucion(event) {
    if (event.key === "r") {
      this.send("alternarEstadoDeEjecucion");
    }
  },

  willDestroyElement() {
    this.desconectarEventos();
    document.removeEventListener("keydown", this.cuandoIntentaAlternarEjecucion);
    this.get("foco").limpiar();
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

  cuandoFinalizaCargaDePilas() {
    this.mostrarEscenaActualSobrePilas();
    this.set("estado", this.get("estado").cuandoTerminoDeCargarPilas());
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

  cuandoComenzaADepurarEnModoPausa(datos) {
    this.set("historiaPosicion", datos.posicion);
    this.set("historiaMinimo", datos.minimo);
    this.set("historiaMaximo", datos.maximo);
  },

  cuandoCambiaPosicionDentroDelModoPausa(datos) {
    this.set("historiaPosicion", datos.posicion);
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

  obtenerCodigoTypescript() {
    let proyecto = this.get("proyecto");
    return proyecto.tiposDeActores.map(e => e.codigo).join("\n");
  },

  generarID() {
    return Math.floor(Math.random() * 999) + 1000;
  },

  obtenerTipoDeActor(tipoDelActor) {
    return this.get("proyecto.tiposDeActores").findBy("tipo", tipoDelActor);
  },

  obtenerDetalleDeActorPorIndice(indiceDelActor) {
    let escena = this.obtenerEscenaActual();

    return escena.get("actores").findBy("id", indiceDelActor);
  },

  sobreEscribirCodigoDelActorActual(codigo) {
    let indiceDelActor = this.get("actorSeleccionado");

    if (indiceDelActor > -1) {
      let actor = this.obtenerDetalleDeActorPorIndice(indiceDelActor);
      let tipoDeActor = this.obtenerTipoDeActor(actor.tipo);
      tipoDeActor.set("codigo", codigo);
    }
  },

  actions: {
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
          tipo: "ActorBasico",
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
      let actor = this.obtenerDetalleDeActorPorIndice(indiceDelActor);
      let tipoDeActor = this.obtenerTipoDeActor(actor.tipo);

      this.set("codigo", tipoDeActor.get("codigo"));
      this.set("tituloDelCodigo", actor.tipo);
    },
    cuandoCargaMonacoEditor() {
      //console.log("Cargó el editor");
    },
    cuandoCambiaElCodigo(codigo) {
      this.set("codigo", codigo);
      this.sobreEscribirCodigoDelActorActual(codigo);
    },
    ejecutar() {
      this.set("estado", this.get("estado").ejecutar());

      let escena = this.obtenerEscenaActual();
      let escenaComoJSON = JSON.parse(JSON.stringify(escena));

      let codigoTypescript = this.obtenerCodigoTypescript();
      let codigoJavascript = this.get("compilador").compilar(codigoTypescript);

      this.get("bus").trigger("ejecutarEscena", { codigo: codigoJavascript, escena: escenaComoJSON });
      this.get("foco").hacerFocoEnPilas();
    },
    detener() {
      this.mostrarEscenaActualSobrePilas();
      this.set("estado", this.get("estado").detener());
      this.get("foco").hacerFocoEnElEditor();
    },
    pausar() {
      this.set("estado", this.get("estado").pausar());
      this.get("bus").trigger("pausarEscena", {});
      this.get("foco").hacerFocoEnPilas();
    },
    cambiarPosicion(valorNuevo) {
      this.set("posicion", valorNuevo);
      this.get("bus").trigger("cambiarPosicionDesdeElEditor", {
        posicion: valorNuevo
      });
    },
    cuandoGuardaDesdeElEditor(/*editor*/) {
      this.send("alternarEstadoDeEjecucion");
    },
    alternarEstadoDeEjecucion() {
      let estado = this.get("estado");

      if (estado.puedeEjecutar) {
        this.send("ejecutar");
      } else {
        if (estado.puedeDetener) {
          this.send("detener");
        }
      }
    }
  }
});
