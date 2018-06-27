import Component from "@ember/component";
import { inject } from "@ember/service";

export default Component.extend({
  router: inject(),
  tagName: "",

  actions: {
    regresar() {
      this.router.transitionTo("index");
    }
  }
});
