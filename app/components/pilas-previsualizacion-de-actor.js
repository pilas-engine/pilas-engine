import { inject as service } from "@ember/service";
import Component from "@ember/component";
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  bus: service(),
  compilador: service(),
  proyecto: null,
  actor: null,
  primer_carga: true,
  mantener_foco: true,

  didInsertElement() {
    this.set("proyecto", {
      titulo: "Proyecto dentro de pilas-previsualizacion-de-actor",
      ancho: 400,
      alto: 250,
      codigos: {
        escenas: [
          {
            nombre: "principal",
            codigo: `class principal extends Escena {
              iniciar() {
                let suelo = pilas.actores.suelo();
                suelo.y = -130;
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
    });
    this.get("bus").on("finaliza_carga", this, "finaliza_carga");
    this.get("bus").on("cuando_termina_de_iniciar_ejecucion", this, "cuando_termina_de_iniciar_ejecucion");

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
    this.get("bus").trigger("hacer_foco_en_pilas", {});
  },

  didReceiveAttrs() {
    if (this.get("pilas")) {
      this.compilar_proyecto_y_ejecutar();
    }
  },

  willDestroyElement() {
    this.get("bus").off("finaliza_carga", this, "finaliza_carga");
    this.get("bus").off("cuando_termina_de_iniciar_ejecucion", this, "cuando_termina_de_iniciar_ejecucion");
  },

  finaliza_carga() {
    this.compilar_proyecto_y_ejecutar();
  },

  compilar_proyecto_y_ejecutar() {
    let proyecto = this.get("proyecto");

    this.agregar_actor_al_proyecto(proyecto, this.get("actor"));

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
        nombre: actor.nombre,
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
        nombre: actor.nombre,
        imagen: actor.nombre,
        transparencia: 0
      }
    ];
  },

  cuando_termina_de_iniciar_ejecucion(pilas) {
    this.set("pilas", pilas);
    this.hacer_foco_en_pilas();
  }
});
