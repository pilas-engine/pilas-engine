"use strict";
const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ["proyecto-exportable", "vs", "manual", "api", "imagenes", "fuentes", "sonidos", "monaco-vim", "decoracion", "bloques", "robot"]
    },
    minifyJS: {
      options: {
        exclude: ["**/proyecto-exportable/**", "phaser.js"]
      }
    }
  });

  app.import("vendor/beautify.js");
  app.import("vendor/auto-complete.js");
  app.import("vendor/FileSaver.js");
  app.import("vendor/split.js");
  app.import("vendor/jszip.js");
  app.import("vendor/Sortable.min.js");

  return app.toTree();
};
