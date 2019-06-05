import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  actions: {
    onChange(evento) {
      this.cuandoCambia(evento.target.value);
    }
  }
});
