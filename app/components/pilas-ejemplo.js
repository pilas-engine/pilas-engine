import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  bus: service(),
  compilador: service(),
  tagName: "",

  didInsertElement() {
    this.get("bus").on("finaliza_carga", this, "finaliza_carga");
    this.get("bus").on("cuando_termina_de_iniciar_ejecucion", this, "cuando_termina_de_iniciar_ejecucion");
    this.get("tarea_para_mantener_foco").perform();
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

    let resultado = this.get("compilador").compilar_proyecto(proyecto);

    let datos = {
      nombre_de_la_escena_inicial: "principal",
      codigo: resultado.codigo,
      proyecto: proyecto
    };

    this.get("bus").trigger("ejecutar_proyecto", datos);
  },

  cuando_termina_de_iniciar_ejecucion(pilas) {
    this.set("pilas", pilas);
    this.hacer_foco_en_pilas();
  }
});
