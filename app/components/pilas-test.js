import { later } from "@ember/runloop";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  classNames: ["flex", "absolute", "absolute--fill"],
  bus: service(),
  compilador: service(),
  recursos: service(),
  espera: 2,
  proyecto: null,

  didInsertElement() {
    this.recursos.iniciar();

    this.set("proyecto", {
      titulo: "Proyecto para pilas-test",
      ancho: 500,
      alto: 500,
      codigos: {
        escenas: [
          {
            nombre: "principal",
            codigo: `class principal extends Escena {
          iniciar() {
          }

          actualizar() {
          }
        }`
          }
        ],
        actores: []
      },
      escenas: [
        {
          nombre: "principal",
          id: 1,
          camara_x: 0,
          camara_y: 0,
          actores: []
        }
      ]
    });
    this.bus.on("finaliza_carga", this, "finaliza_carga");
    this.bus.on("cuando_termina_de_iniciar_ejecucion", this, "cuando_termina_de_iniciar_ejecucion");
  },

  willDestroyElement() {
    this.bus.off("finaliza_carga", this, "finaliza_carga");
    this.bus.off("cuando_termina_de_iniciar_ejecucion", this, "cuando_termina_de_iniciar_ejecucion");
  },

  finaliza_carga(pilas) {
    let proyecto = this.proyecto;
    let resultado = this.compilador.compilar_proyecto(proyecto);

    let datos = {
      nombre_de_la_escena_inicial: "principal",
      codigo: resultado.codigo,
      proyecto: proyecto
    };

    this.bus.trigger("ejecutar_proyecto", datos);

    if (this.cuandoTerminaLaEspera) {
      later(() => {
        this.cuandoTerminaLaEspera(pilas, this.compilador);
      }, this.espera * 1000);
    }
  },

  cuando_termina_de_iniciar_ejecucion(pilas, contexto) {
    if (this.cuandoInicia) {
      this.cuandoInicia(pilas, contexto);
    }
  }
});
