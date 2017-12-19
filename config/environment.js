/* eslint-env node */
"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "pilas-engine",
    environment,
    rootURL: "",
    locationType: "hash",
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {}
  };

  if (environment === "development") {
  }

  if (environment === "test") {
    ENV.locationType = "none";
    ENV.rootURL = "/";

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
  }

  if (environment === "production") {
  }

  return ENV;
};
