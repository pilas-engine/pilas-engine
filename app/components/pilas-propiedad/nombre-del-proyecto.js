import Component from '@ember/component';
import { later } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  mostrar: false,
  proyecto: service(),
  tagName: "span",

  didInsertElement() {
    let titulo = this.proyecto.get("proyecto.titulo");

    this.set("nombreSugerido", titulo);
    this.set("nombre", titulo);
  },

  hacer_foco() {
    let input = this.element.getElementsByTagName("input")[0]

    input.focus();
    input.select();
  },

  invalido: computed("nombreSugerido", function() {
    return this.nombreSugerido.length < 1;
  }),

  actions: {
    cambiarNombre() {
      this.set("mostrar", true);
      later(this, this.hacer_foco, 1);
    },

    ocultar() {
      this.set("mostrar", false);
    },

    confirmar() {
      if (this.invalido) {
        return;
      }

      this.proyecto.renombrar_proyecto(this.nombreSugerido);
      this.send("ocultar");
      this.set("nombre", this.nombreSugerido);
    }
  }
});
