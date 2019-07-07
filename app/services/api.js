import Service from "@ember/service";
import ENV from "pilas-engine/config/environment";

export default Service.extend({
  publicar_juego(proyecto_como_string, serializado) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let url = `${ENV.backendURL}/proyecto/subir`;

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onload = function() {
        if (xhr.status == 200) {
          let json = JSON.parse(xhr.responseText);
          resolve(json);
        } else {
          reject(url);
        }
      };

      xhr.onerror = function() {
        reject(url);
      };

      var data = JSON.stringify({
        codigo: proyecto_como_string,
        codigo_serializado: serializado
      });

      xhr.send(data);
    });
  },

  obtener_proyecto(hash) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let url = `${ENV.backendURL}/proyecto/obtener/${hash}`;

      xhr.open("GET", url, true);

      xhr.onload = function() {
        if (xhr.status == 200) {
          let json = JSON.parse(xhr.responseText);
          resolve(json);
        } else {
          reject(url);
        }
      };

      xhr.onerror = function() {
        reject(url);
      };

      xhr.send();
    });
  }
});
