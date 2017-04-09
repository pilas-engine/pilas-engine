/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false
    },
    fingerprint: {
      enabled: false,
      exclude: ['vs', 'monaco-editor-iframe.html'],
    }
  });

  return app.toTree();
};
