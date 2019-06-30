import Component from '@ember/component';

export default Component.extend({
  tagName: "",

  didInsertElement() {
    if (this.contenedor) {
      let div = document.getElementById(this.contenedor)
      div.scrollTop = div.scrollHeight;
    }
  },
});
