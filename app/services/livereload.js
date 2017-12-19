import Service from "@ember/service";

export default Service.extend({
  activar() {
    function actualizar() {
      setTimeout(function() {
        window.location.reload();
      }, 500);
    }

    if (window.enElectron) {
      var fs = requireNode("fs");

      if (fs.existsSync("dist/assets")) {
        fs.watchFile("dist/assets/pilas-engine.js", actualizar);
        fs.watchFile("dist/assets/pilas-engine.css", actualizar);
        fs.watchFile("dist/pilas-experimental.js", actualizar);
      }
    }
  }
});
