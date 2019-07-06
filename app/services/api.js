import Service from "@ember/service";

export default Service.extend({
  url: "http://127.0.0.1:8000/proyecto/subir",

  publicar_juego(proyecto_como_string, serializado) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let url = this.url;

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

      var data = JSON.stringify({
        codigo: proyecto_como_string,
        codigo_serializado: serializado
      });

      xhr.send(data);
    });
  }
});
