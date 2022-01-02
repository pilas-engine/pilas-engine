import Component from '@ember/component';
import { inject as service } from "@ember/service";
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  api: service(),
  mostrarRecientesAgrupados: false,

  obtener_etiquetas: task(function *(query) {
    yield timeout(500);
    return yield this.api.buscarEtiquetas(query);
  }),

  actions: {
    avanzar() {
      this.incrementProperty("pagina");
      this.tarea.perform(this.etiqueta, this.pagina);
    },
    retroceder() {
      this.decrementProperty("pagina");
      this.tarea.perform(this.etiqueta, this.pagina);
    },
    cuando_cambia_etiqueta(etiqueta) {
      this.set("etiqueta", etiqueta);
      this.set("pagina", 1);
      this.tarea.perform(this.etiqueta, this.pagina, this.mostrarRecientesAgrupados);
    },
    cuando_cambia_agrupador(value) {
      this.set("pagina", 1);
      this.set("mostrarRecientesAgrupados", value.target.checked);
      this.tarea.perform(this.etiqueta, this.pagina, this.mostrarRecientesAgrupados);
    }
  }
});
