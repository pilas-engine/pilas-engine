/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var Funnel = require('broccoli-funnel');
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

  var phaserExtra = new Funnel('bower_components/phaser-ce/build', {
    srcDir: '/',
    include: ['phaser.js'],
    destDir: '/'
  });

  app.import('vendor/tachyons.min.css');

  return app.toTree([phaserExtra]);
};
