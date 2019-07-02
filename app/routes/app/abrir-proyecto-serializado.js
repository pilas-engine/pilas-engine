import Route from "@ember/routing/route";
import { later } from "@ember/runloop";

export default Route.extend({
  model(params) {
    return { hash: params.hash };
  },

  afterModel(model) {
    later(
      this,
      () => {
        this.transitionTo("editor", { queryParams: { serializado: model.hash } });
      },
      1
    );
  }
});
