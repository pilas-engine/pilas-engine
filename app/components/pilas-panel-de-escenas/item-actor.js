import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "li",
  classNames: ["truncate-text", "texto", "pa2", "br2", "pointer", "ml1", "mt1", "mr2", "flex", "items-center"],
  classNameBindings: ["claseSeleccionado"],
  attributeBindings: ["draggable"],
  draggable: "true",
  proyecto: service(),

  claseSeleccionado: computed("seleccion", "actor.id", function() {
    if (this.seleccion === this.actor.id) {
      return "bg-black-20";
    } else {
      return "hover-bg-black-10";
    }
  }),

  dragStart() {
    let id = this.actor.id;
    let nombre = this.actor.nombre;
    let activo = this.actor.activo;
    return event.dataTransfer.setData("text/data", JSON.stringify({ id, nombre, activo }));
  },

  dragOver() {
    return false;
  },

  drop(event) {
    let id = event.dataTransfer.getData("text/data");
    console.log("Se ha soltado un id que tal vez se deba quitar de una carpeta", id);
    return false;
  },

  click() {
    this.get("cuandoSelecciona")(this.actor.id);
  },

  actions: {
    cuando_intenta_duplicar(actor_id) {
      this.proyecto.editor.send("cuando_intenta_duplicar", actor_id);
    },

    cuando_intenta_duplicar_x5(actor_id) {
      this.proyecto.editor.send("cuando_intenta_duplicar_x5", actor_id);
    },

    cuando_intenta_eliminar(actor_id) {
      this.proyecto.editor.send("cuando_intenta_eliminar", actor_id);
    },

    cuando_intenta_mover_a_una_escena_nueva() {
      this.proyecto.editor.send("mover_actor_a_escena_nueva", this.proyecto.proyecto, this.actor, this.ultimaEscenaSeleccionada);
    },

    cuando_intenta_mover_a_otra_escena(escena_nueva) {
      this.proyecto.editor.send("mover_actor_a_una_escena", this.proyecto.proyecto, this.actor, this.ultimaEscenaSeleccionada, escena_nueva);
    },

    cambiar_color(actor_id, color) {
      this.proyecto.cambiar_color_de_un_actor(actor_id, color);
    }
  }
});
