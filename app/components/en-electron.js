import Ember from "ember";

export default Ember.Component.extend({
  tagName: "",
  electron: Ember.inject.service(),
  enElectron: Ember.computed.alias("electron.enElectron")
});
