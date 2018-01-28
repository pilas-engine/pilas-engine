import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  classNames: ["flex", "absolute", "absolute--fill"],
  bus: Ember.inject.service(),
  compilador: Ember.inject.service(),
  espera: 2,

  didInsertElement() {
    this.get("bus").on("finalizaCarga", this, "finalizaCarga");
    this.get("bus").on("cuandoTerminaDeIniciarEjecucion", this, "cuandoTerminaDeIniciarEjecucion");
  },

  willDestroyElement() {
    this.get("bus").off("finalizaCarga", this, "finalizaCarga");
    this.get("bus").off("cuandoTerminaDeIniciarEjecucion", this, "cuandoTerminaDeIniciarEjecucion");
  },

  finalizaCarga(pilas) {
    let proyecto = {
      titulo: "Proyecto para pilas-test",
      ancho: 500,
      alto: 500,
      codigos: {
        escenas: [],
        actores: [
          {
            tipo: "Pelota",
            codigo: `class Pelota  extends ActorBase {

            iniciar() {
            }

          }`
          }
        ]
      },
      escenas: [
        {
          nombre: "principal",
          id: 1,
          actores: [
            {
              id: 1,
              x: 300,
              y: 200,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "Pelota",
              imagen: "pelota"
            }
          ]
        }
      ]
    };

    let datos = {
      nombre_de_la_escena_inicial: "principal",
      codigo: "",
      proyecto: proyecto
    };

    this.get("bus").trigger("ejecutar_proyecto", datos);

    if (this.get("cuandoTerminaLaEspera")) {
      Ember.run.later(() => {
        this.get("cuandoTerminaLaEspera")(pilas, this.get("compilador"));
      }, this.get("espera") * 1000);
    }
  },

  cuandoTerminaDeIniciarEjecucion(pilas) {
    this.get("cuandoInicia")(pilas, this.get("compilador"));
  }
});
