import Component from "@ember/component";
import { computed } from "@ember/object";
import { later } from "@ember/runloop";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  filtro: "",
  contador: 0, // se utiliza para recalcular la lista al abrir el menú.
  bus: service(),

  entidades_filtradas: computed("filtro", "entidades", function() {
    let f = this.filtro.toLowerCase();
    return this.entidades.filter(e => e.nombre.toLowerCase().includes(f));
  }),

  entidades: computed("contador", "proyecto.escenas.@each.actores.@each", function() {
    let lista = [];

    lista.pushObject({ nombre: "Proyecto", id: "proyecto", tipo: "proyecto" });

    this.proyecto.escenas.map(escena => {
      lista.pushObject({ nombre: escena.nombre, id: escena.id, tipo: "escena" });

      escena.actores.map(actor => {
        lista.pushObject({ nombre: actor.nombre, color: actor.color, id: actor.id, tipo: "actor" });
      });
    });

    return lista;
  }),

  actions: {
    seleccionarEntidad(entidad, dd) {
      this.cuandoSelecciona(entidad.id);
      dd.actions.close();
    },

    cuandoDejaElInput(dd) {
      later(() => {
        dd.actions.close();
        this.set("filtro", "");
      }, 100);
    },

    cuando_abre() {
      later(() => {
        this.incrementProperty("contador");
        let filtro = document.getElementById("input-filtro-de-codigos");
        filtro.focus();
      }, 1);
    },

    cuandoPulsaEnter(dd) {
      if (this.entidades_filtradas.length > 0) {
        this.send("seleccionarEntidad", this.entidades_filtradas.firstObject, dd);
        this.bus.trigger("hacerFocoEnElEditor", {});
      }
    }
  }
});
