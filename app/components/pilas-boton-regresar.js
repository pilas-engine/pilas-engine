import Component from "@ember/component";

export default Component.extend({
  router: Ember.inject.service(),
  tagName: "",

  actions: {
    regresar() {
      this.router.transitionTo("index");
    }
  }
});
