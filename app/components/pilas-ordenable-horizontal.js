import Component from "@ember/component";
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: "",
  sortable: null,

  didInsertElement() {
    this.instanciar_sortable();
  },

  didDestroyElement() {
    this.eliminar_sortable();
  },

  instanciar_sortable() {
    let elemento = document.getElementById(this.identificador);
    this.set(
      "sortable",
      Sortable.create(elemento, {
        filter: ".no-mover",
        handle: ".my-handle",
        onEnd: evento => {
          this.eliminar_sortable();
          let orden = this.obtener_orden(evento);

          let dragItem = evento.item;
          dragItem.parentNode.removeChild(dragItem);

          this.cuando_cambia_orden(orden);

          later(
            this,
            () => {
              this.instanciar_sortable();
            },
            5
          );
        }
      })
    );
  },

  obtener_orden(evento) {
    let array_children = Array.from(evento.target.children);
    let orden = array_children.map(e => e.getAttribute("data-index"));
    return orden.filter(e => e).map(e => parseInt(e, 10));
  },

  eliminar_sortable() {
    if (this.sortable) {
      this.sortable.destroy();
    }
  }
});
