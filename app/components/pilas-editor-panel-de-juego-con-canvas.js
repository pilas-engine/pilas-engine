import Component from '@ember/component';

export default Component.extend({
  tagName: "",
  maximizar: false,

  actions: {
    alCambiarMaximizado(valor) {
      if (valor) {
        this.set("panelMaximizado", 'canvas');
      } else {
        this.set("panelMaximizado", null);
      }
    }
  }
});
