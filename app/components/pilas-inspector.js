import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",
  propiedades_de_actores: null,
  propiedades_de_escenas: null,

  componente_a_renderizar: computed("tipo_de_la_instancia_seleccionada", function() {
    return `pilas-inspector/${this.tipo_de_la_instancia_seleccionada}`;
  }),

  actions: {
    modificarAtributo(propiedad, valor) {
      let actor = this.instancia_seleccionada;
      actor.set(propiedad, valor);
      this.cuandoModificaObjeto(actor);
    },

    modifica_atributo_de_escena(propiedad, valor) {
      let escena = this.instancia_seleccionada;
      escena.set(propiedad, valor);
      this.cuando_modifica_escena(escena);
    },

    modifica_atributo_del_proyecto(propiedad, valor) {
      let proyecto = this.instancia_seleccionada;
      proyecto.set(propiedad, valor);
      this.cuando_modifica_proyecto(proyecto);
    }
  }
});
