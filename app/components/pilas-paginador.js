import Component from '@ember/component';

export default Component.extend({
  actions: {
    avanzar() {
      this.incrementProperty("pagina");
      this.tarea.perform(this.etiqueta, this.pagina);
    },
    retroceder() {
      this.decrementProperty("pagina");
      this.tarea.perform(this.etiqueta, this.pagina);
    }
  }
});
