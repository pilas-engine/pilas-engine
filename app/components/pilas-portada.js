import Component from "@ember/component";
import { inject as service } from "@ember/service";
import json_a_string from "../utils/json-a-string";

export default Component.extend({
  classNames: ["theme-claro", "h-100", "overflow-auto"],
  router: service(),

  dragOver() {
    return false;
  },

  drop(evento) {
    let nombre_del_archivo = evento.dataTransfer.files[0].name;

    if (nombre_del_archivo.endsWith(".pilas")) {
      var reader = new FileReader();

      reader.onload = event => {
        this.router.transitionTo("app.abrir_proyecto_serializado", json_a_string(JSON.parse(event.target.result)));
      };

      reader.readAsText(evento.dataTransfer.files[0], "UTF-8");
    } else {
      alert("Solo se pueden arrastrar archivos de proyectos '.pilas'.");
    }

    evento.preventDefault();
  }
});
