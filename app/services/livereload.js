import Ember from "ember";

export default Ember.Service.extend({
  activar() {
    function actualizar() {
      setTimeout(function() {
        window.location.reload();
      }, 500);
    }

    if (window && window.process && window.process.type) {
      var fs = require("fs");

      fs.watchFile("dist/assets/pilas-engine.js", actualizar);
      fs.watchFile("dist/assets/pilas-engine.css", actualizar);
      fs.watchFile("dist/pilas-experimental.js", actualizar);
    }
  }
});
