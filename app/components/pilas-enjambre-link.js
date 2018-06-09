import { inject as service } from "@ember/service";
import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",
  electron: service(),
  incluirLogo: false,
  animar: false,

  imagen: computed("incluirLogo", function() {
    if (this.incluirLogo) {
      return "enjambre.png";
    } else {
      return "enjambre-texto.png";
    }
  }),

  actions: {
    abrir() {
      this.electron.abrir_en_un_navegador("http://enjambrebit.com.ar/");
    }
  }
});
