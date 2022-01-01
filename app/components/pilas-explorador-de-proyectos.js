import Component from '@ember/component';
import { task, timeout } from "ember-concurrency";
import { inject as service } from "@ember/service";

export default Component.extend({
  classNames: ['tc', 'pb3'],
  api: service(),
  pagina: 1,

  didInsertElement() {

    if (this.pagina < 0) {
      this.set("pagina", 1);
    }

    this.proyectos.perform(this.etiqueta, this.pagina);
  },

  proyectos: task(function *(etiqueta, pagina) {
    yield timeout(1000);
    return yield this.api.obtener_lista_de_proyectos(pagina, etiqueta);
  }),
});
