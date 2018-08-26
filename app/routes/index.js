import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    window.document.title = "PilasEngine"
  }
});
