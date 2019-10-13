import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  recursos: service(),
  proyecto: service(),

  actions: {
    incorporar_imagenes_al_proyecto(lista_de_archivos) {
      this.proyecto.incorporar_imagenes_al_proyecto(lista_de_archivos);
    }
  }
});
