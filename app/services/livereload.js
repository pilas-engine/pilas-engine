import Ember from "ember";

export default Ember.Service.extend({
  activar() {
    if (window && window.process && window.process.type) {
      var fs = require("fs");

      function actualizar() {
        setTimeout(function() {
          window.location.reload();
        }, 500);
      }

      fs.watchFile("dist/assets/pilas-engine.js", actualizar);
      fs.watchFile("dist/assets/pilas-engine.css", actualizar);
      fs.watchFile("dist/pilas-experimental.js", actualizar);
    }
  }
});
