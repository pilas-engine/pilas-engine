import Application from "@ember/application";
import Resolver from "./resolver";
import loadInitializers from "ember-load-initializers";
import config from "./config/environment";
import Ember from "ember";

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

Ember.Controller.reopen({
  rootURL: config.rootURL
});

Ember.Component.reopen({
  rootURL: config.rootURL
});

loadInitializers(App, config.modulePrefix);

export default App;
