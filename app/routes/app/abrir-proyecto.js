import Route from "@ember/routing/route";
import { later } from "@ember/runloop";

export default Route.extend({
  activate() {
    later(() => {
      this.transitionTo("editor", { queryParams: { ruta: this.model.ruta } });
    }, 100);
  }
});
