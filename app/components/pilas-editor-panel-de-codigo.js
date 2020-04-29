import Component from '@ember/component';

export default Component.extend({
  tagName: "",
  actions: {
    alternar(propiedad) {
      this.toggleProperty(propiedad);
    }
  }
});
