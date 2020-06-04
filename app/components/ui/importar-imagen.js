import Component from "@ember/component";
import { all } from "rsvp";
import obtener_contenido_en_base_64 from "pilas-engine/utils/obtener-contenido-en-base-64";

export default Component.extend({
  actions: {
    seleccionar_imagen() {
      this.element.querySelector("input").click();
    },
    upload(event) {
      let promesas = [...event.target.files].map(archivo => {
        return obtener_contenido_en_base_64(archivo, "png");
      });

      all(promesas).then(lista_de_archivos => {
        this.cuando_procesa_archivos(lista_de_archivos);
      });
    }
  }
});
