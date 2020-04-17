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
      let recargar_escena = false;
      escena.set(propiedad, valor);

      // Solo en caso de que se modifique el tamaño del escena
      // se recarga la escena.
      if (["ancho", "alto"].includes(propiedad)) {
        recargar_escena = true;
      }

      this.cuando_modifica_escena(escena, recargar_escena);
    },

    modifica_atributo_del_proyecto(propiedad, valor) {
      let proyecto = this.instancia_seleccionada;

      // El valor de la propiedad fps proviene de un combo, así
      // que hay que convertilo a número.
      if (propiedad === "fps") {
        valor = +valor;
      }

      if (propiedad === "tamaño") {
        let ancho = valor.split("x")[0];
        let alto = valor.split("x")[1];

        proyecto.set("ancho", +ancho);
        proyecto.set("alto", +alto);
        proyecto.set("tamaño", valor);
      }

      proyecto.set(propiedad, valor);

      this.cuando_modifica_proyecto(proyecto);
    }
  }
});
