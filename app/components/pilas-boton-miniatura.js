import Component from '@ember/component';

export default Component.extend({
  tagName: "",
  actions: {
    alternar() {
      this.toggleProperty("pulsado");

      if (this.alCambiarMaximizado) {
        let valor = this.get("pulsado");
        this.alCambiarMaximizado(valor);
      }
    }
  }
});
