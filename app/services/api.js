import Service from "@ember/service";
import ENV from "pilas-engine/config/environment";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";

export default Service.extend({
  electron: service(),
  enElectron: alias("electron.enElectron"),

  // Estos tres atributos se usan para mostrar una barra de progreso
  // al cargar un proyecto nuevo.
  tamano_ultimo_proyecto: 0,
  ultimo_proyecto_cargado: 0,
  bytes_cargados_del_ultimo_proyecto: 0,

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

  post(endpoint, datos, token) {
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

      if (token) {
        xhr.setRequestHeader("authorization", `Token ${token}`);
      }

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

  obtener_lista_de_proyectos(pagina, etiqueta, soloMisJuegos, mostrarRecientesAgrupados) {
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

        if (mostrarRecientesAgrupados) {
          url += `&mostrar_recientes_agrupados=true`;
        }
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

  obtener_tamano_del_proyecto(hash) {
    this.set("ultimo_proyecto_cargando", hash);
    return new Promise((resolve) => {
      let tamano = this.get(`proyecto/obtener-tamano/${hash}`);
      tamano.then((d) => {
        this.set("tamano_ultimo_proyecto", d.tamano);
        resolve(d.tamano);
      })
    });
  },

  obtener_proyecto(hash) {
    this.set("ultimo_proyecto_cargando", hash);
    return this.get(`proyecto/obtener/${hash}`);
  },

  get(endpoint, headers) {
    let self = this;

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      let url = `${ENV.backendURL}/${endpoint}`;

      xhr.open("GET", url, true);

      if (headers && headers.token) {
        xhr.setRequestHeader("authorization", `Token ${headers.token}`);
      }

      xhr.onprogress = function(progreso) {
        self.set("bytes_cargados_del_ultimo_proyecto", progreso.loaded);
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

  eliminar_proyecto(hash) {
    let token = localStorage.getItem("token-auth");
    return this.post(`proyecto/eliminar_proyecto/`, {hash}, token);
  }
});
