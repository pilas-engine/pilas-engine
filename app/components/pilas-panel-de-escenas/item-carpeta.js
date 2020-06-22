import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "li",
  proyecto: service(),
  classNames: ["truncate-text", "texto", "ml1", "mv1", "br2", "pointer"],
  classNameBindings: ["clase"],
  carpeta: null,

  clase: "",

  claseSeleccionado: computed("seleccion", "actores.[]", function() {
    if (this.actores) {
      let actor = this.actores.findBy("id", this.seleccion);

      if (actor !== undefined) {
        return "bg-black-20";
      } else {
        return "hover-bg-black-10";
      }
    }
  }),

  estaSeleccionada: computed("seleccion", "actores.[]", function() {
    if (this.actores) {
      let actor = this.actores.findBy("id", this.seleccion);

      return actor !== undefined;
    }
  }),

  dragLeave(event) {
    event.preventDefault();
    this.set("clase", "");
  },

  dragOver(event) {
    event.preventDefault();
    this.set("clase", "bg-blue");
  },

  drop(event) {
    this.set("clase", "");
    let actor_id = JSON.parse(event.dataTransfer.getData("text/data")).id;
    this.proyecto.agregar_actor_a_la_carpeta(actor_id, this.carpeta.id);

    return false;
  },

  actions: {
    alternar() {
      if (this.carpeta.get("abierta")) {
        this.carpeta.set("abierta", false);
      } else {
        this.carpeta.set("abierta", true);
      }
    },

    eliminarCarpetaDelProyecto() {
      this.proyecto.eliminarCarpetaDelProyecto(this.carpeta, this.actores, this.escena);
    }
  }
});
