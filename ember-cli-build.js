/* eslint-env node */
"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ["vs"]
    }
  });

  app.import("vendor/typescript.js");
  app.import("vendor/beautify.js");

  return app.toTree();
};
