import Component from "@ember/component";
import { Promise } from "rsvp";
import { all } from "rsvp";

export default Component.extend({
  obtenerContenidoEnBase64(archivo) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function() {
        resolve({
          nombre: archivo.name.toLowerCase().replace(".png", ""),
          contenido: reader.result
        });
      };
      reader.onerror = function(error) {
        reject(error);
      };
    });
  },

  actions: {
    seleccionar_imagen() {
      this.element.querySelector("input").click();
    },
    upload(event) {
      let promesas = [...event.target.files].map(archivo => {
        return this.obtenerContenidoEnBase64(archivo);
      });

      all(promesas).then(lista_de_archivos => {
        this.cuando_procesa_archivos(lista_de_archivos);
      });
    }
  }
});
