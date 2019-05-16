"use strict";
const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: [
        "vs",
        "manual",
        "api",
        "imagenes",
        "fuentes",
        "sonidos",
        "monaco-vim"
      ]
    }
  });

  app.import("vendor/beautify.js");
  app.import("vendor/auto-complete.js");
  app.import("vendor/FileSaver.js");

  return app.toTree();
};
