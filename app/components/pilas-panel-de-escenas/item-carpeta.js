import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "li",

  proyecto: service(),

  classNames: ["truncate-text", "texto", "pa2", "br2", "pointer"],
  classNameBindings: ["clase"],

  carpeta: null,

  clase: "",

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
    let actor_id = event.dataTransfer.getData("text/data");
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
    }
  }
});
