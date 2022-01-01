import Service from "@ember/service";
import ENV from "pilas-engine/config/environment";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";

export default Service.extend({
  electron: service(),
  enElectron: alias("electron.enElectron"),

  autenticar(usuario, contraseña) {
    return this.post("login/", { username: usuario, password: contraseña});
  },

  cerrarSesion(token) {
    return this.get("logout/", {token});
  },

  buscarEtiquetas(query) {
    return this.get(`buscar-etiquetas/?query=${query}`);
  },

  obtenerPerfilDesdeToken(token) {
    return this.get(`perfiles/mi-perfil`, {token});
  },

  post(endpoint, datos) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let url = null;

      if (this.enElectron) {
        url = `${ENV.remoteBackendURL}/${endpoint}`;
      } else {
        url = `${ENV.backendURL}/${endpoint}`;
      }

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onload = function() {
        if (xhr.status == 200) {
          let json = JSON.parse(xhr.responseText);
          resolve(json);
        } else {
          reject(JSON.parse(xhr.response));
        }
      };

      xhr.onerror = function(error) {
        console.log("error", xhr.responseText)
        reject({url, error});
      };

      xhr.send(JSON.stringify(datos));
    });

  },

  crearUsuario(usuario, contraseña, email) {
    return this.post("perfiles/crear-usuario", {usuario, password: contraseña, email});
  },

  publicar_juego(serializado, imagen_en_base64, ver_codigo, tags, titulo, token, cantidad_de_partes, numero_de_parte, hash) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let url = null;

      if (this.enElectron) {
        url = `${ENV.remoteBackendURL}/proyecto/subir`;
      } else {
        url = `${ENV.backendURL}/proyecto/subir`;
      }

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");

      if (token) {
        xhr.setRequestHeader("authorization", `Token ${token}`);
      }

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

      let data_original = {
        codigo_serializado: serializado,
        ver_codigo: ver_codigo,
        cantidad_de_partes,
        numero_de_parte,
        titulo,
        tags,
      };

      if (imagen_en_base64) {
        data_original["imagen_en_base64"] = imagen_en_base64;
      }

      // Solo incluye el hash cuando se trata de una
      // parte complementaria al post inicial.
      if (hash) {
        data_original = { ...data_original, hash };
      }

      var data = JSON.stringify(data_original);

      xhr.send(data);
    });
  },

  obtener_lista_de_proyectos(pagina, etiqueta, soloMisJuegos) {
    pagina = pagina || 1;
    etiqueta = etiqueta || null;

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let url = `${ENV.backendURL}/explorar/?pagina=${pagina}`;

      if (soloMisJuegos) {
        url += `&solo_mis_juegos=${soloMisJuegos}`;
      }

      if (etiqueta) {
        url += `&etiqueta=${etiqueta}`;
      }

      xhr.open("GET", url, true);

      if (soloMisJuegos) {
        let token = localStorage.getItem("token-auth");
        xhr.setRequestHeader("authorization", `Token ${token}`);
      }

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
  },

  obtener_proyecto(hash) {
    return this.get(`proyecto/obtener/${hash}`);
  },

  get(endpoint, headers) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      let url = `${ENV.backendURL}/${endpoint}`;

      xhr.open("GET", url, true);

      if (headers && headers.token) {
        xhr.setRequestHeader("authorization", `Token ${headers.token}`);
      }

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
