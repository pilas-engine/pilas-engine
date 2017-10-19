import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ["ocultarPanelActores", "ocultarPanelEditor"],
  ocultarPanelActores: false,
  ocultarPanelEditor: false
});
