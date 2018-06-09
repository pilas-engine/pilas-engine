import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  classNames: ["dib", "dim", "pointer", "blue"],
  electron: service(),
  url: null,

  actions: {
    abrir() {
      this.electron.abrir_en_un_navegador(this.url);
    }
  }
});
