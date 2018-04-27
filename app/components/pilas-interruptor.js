import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  actions: {
    alternar() {
      // Solo si se especifica una acción, intenta respetar
      // "data down, actions ups" sin tocar por si mismo el argumento que
      // recibe.
      if (this.cuandoCambia) {
        this.cuandoCambia(!this.variable);
      } else {
        this.toggleProperty("variable");
      }
    }
  }
});
