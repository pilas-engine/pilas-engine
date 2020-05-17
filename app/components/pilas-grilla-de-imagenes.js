import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: "",
  recursos: service(),
  proyecto: service(),
  cargando: true,

  didInsertElement() {
    later(
      this,
      () => {
        if (!(this.get("isDestroyed") || this.get("isDestroying"))) {
          this.set("cargando", false);
        }
      },
      500
    );
  },

  actions: {
    incorporar_imagenes_al_proyecto(lista_de_archivos) {
      this.proyecto.incorporar_imagenes_al_proyecto(lista_de_archivos);
    }
  }
});
