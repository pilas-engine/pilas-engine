import Ember from "ember";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";
import QueryParams from "ember-parachute";

const queryParams = new QueryParams({
  serializado: {
    defaultValue: null,
    refresh: true,
    replace: true
  },
  ocultarEditor: {
    as: "p3",
    defaultValue: false,
    replace: true
  },
  ocultarPropiedades: {
    as: "p1",
    defaultValue: false,
    replace: true
  }
});

export default Ember.Controller.extend(queryParams.Mixin, {
  proyecto: null,
  bus: Ember.inject.service(),
  cargando: true,
  escenaActual: 1,
  mapaDeEventos: [
    {
      evento: "cambiaEstado",
      metodo: "avisarCambioDeEstado"
    },
    {
      evento: "finalizaCarga",
      metodo: "cuandoFinalizaCargaDePilas"
    },
    {
      evento: "moverActor",
      metodo: "cuandoTerminaDeMoverUnActorDesdePilas"
    }
  ],

  setup(event) {
    let params = event.queryParams;

    if (params.serializado) {
      this.cargarProyectoDesdeQueryParams(params);
    } else {
      this.crearProyectoInicial();
    }

    this.conectarEventos();
  },

  reset(_, isExiting) {
    if (isExiting) {
      this.resetQueryParams();
      this.desconectarEventos();
    }
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

  avisarCambioDeEstado(datos) {
    //console.log(datos.estado);
  },

  cuandoFinalizaCargaDePilas() {
    this.set("cargando", false);
    this.mostrarEscenaActualSobrePilas();
  },

  mostrarEscenaActualSobrePilas() {
    let escena = this.obtenerEscenaActual();
    let escenaComoJSON = JSON.parse(JSON.stringify(escena));
    this.get("bus").trigger("cargarEscena", { escena: escenaComoJSON });
  },

  cuandoTerminaDeMoverUnActorDesdePilas(datos) {
    let escena = this.obtenerEscenaActual();
    let actor = escena.actores.findBy("id", datos.id);
    actor.set("x", datos.x);
    actor.set("y", datos.y);
  },

  obtenerEscenaActual() {
    let proyecto = this.get("proyecto");
    let indiceEscenaActual = this.get("escenaActual");

    return proyecto.escenas.findBy("id", indiceEscenaActual);
  },

  cargarProyectoDesdeQueryParams(params) {
    let proyecto = string_a_json(params.serializado);
    let proyectoComoObjetoEmber = this.convertirEscenaEnObjetoEmber(proyecto);
    this.set("proyecto", proyectoComoObjetoEmber);
  },

  convertirEscenaEnObjetoEmber(proyecto) {
    let proyectoComoObjetoEmber = Ember.Object.create(proyecto);

    proyectoComoObjetoEmber.escenas = proyecto.escenas.map(escena => {
      escena.actores = escena.actores.map(a => Ember.Object.create(a));
      return Ember.Object.create(escena);
    });

    return proyectoComoObjetoEmber;
  },

  crearProyectoInicial() {
    let proyecto = {
      titulo: "Proyecto demo",
      ancho: 500,
      alto: 500,
      escenas: [
        {
          nombre: "escena principal",
          id: 1,
          actores: [
            {
              id: this.generarID(),
              x: 300,
              y: 200,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "actor",
              imagen: "pelota"
            },
            {
              id: this.generarID(),
              x: 200,
              y: 100,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "actor",
              imagen: "sin_imagen"
            }
          ]
        },
        {
          nombre: "Otra escena",
          id: this.generarID(),
          actores: []
        }
      ]
    };

    let proyectoComoObjetoEmber = this.convertirEscenaEnObjetoEmber(proyecto);
    this.set("proyecto", proyectoComoObjetoEmber);
  },

  generarID() {
    return Math.floor(Math.random() * 999) + 1000;
  },

  actions: {
    serializar(model) {
      let str = json_a_string(model);
      this.set("serializado", str);
      string_a_json(str);
    },
    agregarEscena(model) {
      model.escenas.pushObject({
        id: this.generarID(),
        nombre: "demo",
        actores: []
      });
    },
    agregarActor(model) {
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
    moverActores(model) {
      let escena = this.obtenerEscenaActual();
      escena.actores.forEach(actor => {
        actor.set("x", Math.floor(Math.random() * 300));
        actor.set("y", Math.floor(Math.random() * 300));
      });

      this.mostrarEscenaActualSobrePilas();
    },
    cambiarEscena(model) {
      model.escenas[0].set("nombre", "asdasd");
    },

    definirEscena(indiceDeEscena) {
      this.set("escenaActual", indiceDeEscena);
      this.mostrarEscenaActualSobrePilas();
    }
  }
});
