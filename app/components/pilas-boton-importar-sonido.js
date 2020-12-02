import Component from "@ember/component";
import obtener_contenido_en_base_64 from "pilas-engine/utils/obtener-contenido-en-base-64";
import { all } from "rsvp";

export default Component.extend({
  actions: {
    seleccionar_sonido() {
      this.element.querySelector("input").click();
    },

    procesar_sonido_seleccionado(event) {
      let encontrado = [...event.target.files].filter(archivo => {
        return archivo.size / 1024 > 400; // 400kb
      });

      if (encontrado.length > 0) {
        let archivo = encontrado[0];
        alert(`No se puede incorporar el archivo "${archivo.name}" porque excede los 400kb. Te recomendamos optimizar este archivo con un software como audacity para que pilas pueda procesarlo.`);
        return;
      }

      let promesas = [...event.target.files].map(archivo => {
        return obtener_contenido_en_base_64(archivo, "mp3|wav|ogg");
      });

      all(promesas).then(lista_de_archivos => {
        this.cuando_procesa_archivos(lista_de_archivos);
      });
    }
  }
});
