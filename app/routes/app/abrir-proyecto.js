import Route from "@ember/routing/route";
import { later } from "@ember/runloop";

export default Route.extend({
  afterModel(model) {
    later(() => {
      this.transitionTo("editor", { queryParams: { ruta: model.ruta } });
    }, 100);
  }
});
