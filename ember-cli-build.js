/* eslint-env node */
"use strict";
const Funnel = require("broccoli-funnel");
const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ["vs", "manual", "api", "imagenes"]
    }
  });

  app.import("vendor/typescript.js");
  app.import("vendor/beautify.js");

  var assetsExtra = new Funnel("pilas-engine/actores", {
    srcDir: "/",
    destDir: "/actores"
  });

  return app.toTree(assetsExtra);
};
