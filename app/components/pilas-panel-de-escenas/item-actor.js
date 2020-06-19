import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "li",
  classNames: ["truncate-text", "texto", "pa1", "pointer"],
  classNameBindings: ["claseSeleccionado"],
  attributeBindings: ["draggable"],
  draggable: "true",

  claseSeleccionado: computed("seleccion", "actor.id", function() {
    if (this.seleccion === this.actor.id) {
      return "bg-black-20";
    } else {
      return "hover-bg-black-10";
    }
  }),

  dragStart() {
    let id = this.actor.id;
    return event.dataTransfer.setData("text/data", id);
  },

  dragOver() {
    return false;
  },

  dragEnd() {
    console.log("drag end!");
  },

  drop(event) {
    console.log("drop!", this.actor.id);
    //alert("drop!");
    let id = event.dataTransfer.getData("text/data");
    console.log("Se ha soltado el id", id);
    //this.get('action')(id);
    return false;
  },

  click() {
    this.get("cuandoSelecciona")(this.actor.id);
  }
});
