import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Controller from "@ember/controller";
import QueryParams from "ember-parachute";

const queryParams = new QueryParams({
  actor_seleccionado: { defaultValue: null, refresh: true, replace: true }
});

export default Controller.extend(queryParams.Mixin, {
  actores: service(),

  actor: computed("actor_seleccionado", function() {
    let actor_seleccionado = this.actor_seleccionado;

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
