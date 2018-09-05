import Component from '@ember/component';
import Controller from '@ember/controller';
import Application from "@ember/application";
import Resolver from "./resolver";
import loadInitializers from "ember-load-initializers";
import config from "./config/environment";

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

window['Ember'].onerror = function(error){
  if (!window['Ember'].testing) {
    console.error(error);
    throw error;
  } else {
    throw error;
  }
};

Controller.reopen({
  rootURL: config.rootURL
});

Component.reopen({
  rootURL: config.rootURL
});

loadInitializers(App, config.modulePrefix);

export default App;
