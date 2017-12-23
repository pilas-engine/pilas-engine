import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  class: `
    ba pa2 button
    dib br2
    verdana f6 link pointer
    hover-bg-black-10
    black bg-animate hover-bg-black-10 b--black-20
  `,
  actions: {
    alternar() {
      this.toggleProperty("variable");
    }
  }
});
