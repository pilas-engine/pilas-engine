import Component from '@ember/component';
import { task, timeout } from "ember-concurrency";
import { inject as service } from "@ember/service";

export default Component.extend({
  classNames: ['flex1', 'overflow-y-auto', 'pb3'],
  api: service(),
  pagina: 1,

  didInsertElement() {
    this.proyectos.perform(this.etiqueta, this.pagina);
  },

  proyectos: task(function *(etiqueta, pagina) {
    yield timeout(1000);
    return yield this.api.obtener_lista_de_proyectos(pagina, etiqueta);
  }),
});
