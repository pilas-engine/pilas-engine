import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  bus: Ember.inject.service(),
  compilador: Ember.inject.service(),
  proyecto: {
    titulo: "Proyecto para pilas-test",
    ancho: 200,
    alto: 200,
    codigos: {
      escenas: [],
      actores: []
    },
    escenas: [
      {
        nombre: "principal",
        id: 1,
        actores: []
      }
    ]
  },
  primer_carga: true,

  didInsertElement() {
    this.get("bus").on("finalizaCarga", this, "finalizaCarga");
    this.get("bus").on("cuandoTerminaDeIniciarEjecucion", this, "cuandoTerminaDeIniciarEjecucion");
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
    let resultado = this.get("compilador").compilar_proyecto(proyecto);

    let datos = {
      nombre_de_la_escena_inicial: "principal",
      codigo: resultado.codigo,
      proyecto: proyecto
    };

    this.get("bus").trigger("ejecutar_proyecto", datos);
  },

  cuandoTerminaDeIniciarEjecucion(pilas /*, contexto*/) {
    this.set("pilas", pilas);
    pilas.actores.Caja();
  }
});
