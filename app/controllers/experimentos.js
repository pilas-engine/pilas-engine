import Controller from '@ember/controller';

export default Controller.extend({
  mostrarDialogo: false,

  actions: {
    alternar() {
      this.toggleProperty("mostrarDialogo");
    }
  }
});
