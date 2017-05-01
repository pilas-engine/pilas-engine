/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false
    },
    minifyCSS: {
      options: {
        processImport: false
      }
    },
    fingerprint: {
      enabled: false,
    }
  });

  return app.toTree();
};
