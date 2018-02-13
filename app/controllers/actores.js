import Controller from "@ember/controller";
import QueryParams from "ember-parachute";
import Ember from "ember";

const queryParams = new QueryParams({
  actor_seleccionado: { defaultValue: null, refresh: true, replace: true }
});

export default Controller.extend(queryParams.Mixin, {
  actores: Ember.inject.service(),

  actor: Ember.computed("actor_seleccionado", function() {
    let actor_seleccionado = this.get("actor_seleccionado");

    if (actor_seleccionado) {
      return this.get("actores.lista_de_actores").findBy("nombre", actor_seleccionado);
    } else {
      return null;
    }
  }),

  reset(_, isExiting) {
    if (isExiting) {
      this.resetQueryParams();
    }
  },

  actions: {
    al_seleccionar_un_actor(actor) {
      this.set("actor_seleccionado", actor.nombre);
    }
  }
});
