import Route from "@ember/routing/route";
import { later } from "@ember/runloop";
import { inject as service } from '@ember/service';

export default Route.extend({
  proyecto: service(),

  model(params) {
    return { hash: params.hash };
  },

  afterModel(model) {
    later(
      () => {
        this.proyecto.guardar_proyecto_serializado(model.hash);
        this.transitionTo("editor");
      },
      1
    );
  }
});
