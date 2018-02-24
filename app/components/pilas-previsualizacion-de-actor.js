import Component from "@ember/component";
import Ember from "ember";
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  bus: Ember.inject.service(),
  compilador: Ember.inject.service(),
  proyecto: {
    titulo: "Proyecto dentro de pilas-previsualizacion-de-actor",
    ancho: 200,
    alto: 200,
    codigos: {
      escenas: [
        {
          nombre: "principal",
          codigo: `class principal extends Escena {
            iniciar() {
            }
          }`
        }
      ],
      actores: []
    },
    escenas: [
      {
        nombre: "principal",
        camara_x: 0,
        camara_y: 0,
        id: 1,
        actores: []
      }
    ]
  },
  actor: null,
  primer_carga: true,
  mantener_foco: true,

  didInsertElement() {
    this.get("bus").on("finalizaCarga", this, "finalizaCarga");
    this.get("bus").on("cuandoTerminaDeIniciarEjecucion", this, "cuandoTerminaDeIniciarEjecucion");

    if (this.get("mantener_foco")) {
      this.get("tarea_para_mantener_foco").perform();
    }
  },

  tarea_para_mantener_foco: task(function*() {
    while (true) {
      this.hacer_foco_en_pilas();
      yield timeout(1000);
    }
  }),

  hacer_foco_en_pilas() {
    this.get("bus").trigger("hacerFocoEnPilas", {});
  },

  didReceiveAttrs() {
    if (this.get("pilas")) {
      this.compilar_proyecto_y_ejecutar();
    }
  },

  willDestroyElement() {
    this.get("bus").off("finalizaCarga", this, "finalizaCarga");
    this.get("bus").off("cuandoTerminaDeIniciarEjecucion", this, "cuandoTerminaDeIniciarEjecucion");
  },

  finalizaCarga() {
    this.compilar_proyecto_y_ejecutar();
  },

  compilar_proyecto_y_ejecutar() {
    let proyecto = this.get("proyecto");

    this.agregar_actor_al_proyecto(proyecto, this.get("actor"));
    console.warn(proyecto);

    let resultado = this.get("compilador").compilar_proyecto(proyecto);

    let datos = {
      nombre_de_la_escena_inicial: "principal",
      codigo: resultado.codigo,
      proyecto: proyecto
    };

    this.get("bus").trigger("ejecutar_proyecto", datos);
  },

  agregar_actor_al_proyecto(proyecto, actor) {
    proyecto.codigos.actores = [
      {
        tipo: actor.nombre,
        codigo: actor.codigo
      }
    ];

    proyecto.escenas[0].actores = [
      {
        id: 0,
        x: 0,
        y: 0,
        centro_x: 0.5,
        centro_y: 0.5,
        rotacion: 0,
        escala_x: 1,
        escala_y: 1,
        tipo: actor.nombre,
        imagen: actor.imagen,
        transparencia: 0
      }
    ];
  },

  cuandoTerminaDeIniciarEjecucion(pilas) {
    this.set("pilas", pilas);
    this.hacer_foco_en_pilas();
  }
});
