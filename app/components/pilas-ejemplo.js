import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  bus: service(),
  compilador: service(),
  tagName: "",
  recursos: service(),
  debe_mantener_foco: false,

  didInsertElement() {
    this.recursos.iniciar();

    this.bus.on("finaliza_carga", this, "finaliza_carga");
    this.bus.on("cuando_termina_de_iniciar_ejecucion", this, "cuando_termina_de_iniciar_ejecucion");

    if (this.debe_mantener_foco) {
      this.tarea_para_mantener_foco.perform();
    }
  },

  tarea_para_mantener_foco: task(function*() {
    while (true) {
      this.hacer_foco_en_pilas();
      yield timeout(2000);
    }
  }),

  hacer_foco_en_pilas() {
    this.bus.trigger("hacer_foco_en_pilas", {});
  },

  didReceiveAttrs() {
    if (this.pilas) {
      this.compilar_proyecto_y_ejecutar();
    }
  },

  willDestroyElement() {
    this.bus.off("finaliza_carga", this, "finaliza_carga");
    this.bus.off("cuando_termina_de_iniciar_ejecucion", this, "cuando_termina_de_iniciar_ejecucion");
  },

  finaliza_carga() {
    this.compilar_proyecto_y_ejecutar();
  },

  compilar_proyecto_y_ejecutar() {
    let proyecto = this.proyecto;

    let resultado = this.compilador.compilar_proyecto(proyecto);

    let datos = {
      nombre_de_la_escena_inicial: "principal",
      codigo: resultado.codigo,
      proyecto: proyecto
    };

    this.bus.trigger("ejecutar_proyecto", datos);
  },

  cuando_termina_de_iniciar_ejecucion(pilas) {
    this.set("pilas", pilas);
    this.hacer_foco_en_pilas();
  }
});
