/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false
    },
    babel: {
      compact: false
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

  app.import('bower_components/phaser-ce/build/phaser.js');

  return app.toTree();
};
