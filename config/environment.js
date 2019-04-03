"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "pilas-engine",
    environment,
    rootURL: "",
    locationType: "hash",
    pilas: {
      esperar_antes_de_iniciar: false
    },
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {},

    keyManagerConfig: {
      isDisabledOnInput: true
    }
  };

  if (environment === "development") {
  }

  if (environment === "test") {
    ENV.locationType = "none";
    ENV.rootURL = "/";

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;

    /* Opciones para depurar pilas en los tests. */
    ENV.pilas.esperar_antes_de_iniciar = true;
  }

  if (environment === "production") {
  }

  return ENV;
};
