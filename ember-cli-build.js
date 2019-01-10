"use strict";
const Funnel = require("broccoli-funnel");
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
        "iconos_actores",
        "sonidos",
        "monaco-vim"
      ]
    }
  });

  app.import("vendor/beautify.js");
  app.import("vendor/auto-complete.js");

  var assetsExtra = new Funnel("pilas-engine/actores", {
    srcDir: "/",
    destDir: "/actores"
  });

  return app.toTree(assetsExtra);
};
