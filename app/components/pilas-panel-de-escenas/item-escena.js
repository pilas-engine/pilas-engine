import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  classNameBindings: ["clase"],
  clase: "",
  proyecto: service(),

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
    this.proyecto.agregar_actor_a_la_escena(actor_id, this.ultimaEscenaSeleccionada, this.escena.id);

    return false;
  }
});
