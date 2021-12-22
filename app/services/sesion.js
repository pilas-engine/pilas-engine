import Service from '@ember/service';
import { task, timeout } from "ember-concurrency";
import { inject as service } from "@ember/service";

export default Service.extend({
  autenticado: false,
  autenticandoEnCurso: false,
  api: service(),
  perfil: false,

  // este método se llama automáticamente cuando la aplicación inicia
  // (ver archivo app/routes/application.js)
  iniciar() {
    if (this.autenticado) {
      return;
    }

    if (localStorage.getItem("token-auth")) {
      this.obtenerDatosDeUsuario.perform();
    } else {
      this.set("autenticado", false);
    }
  },

  registrarLogin(token) {
    // se invoca cuando el component pilas-boton-login logra hacer una
    // autenticación exitosa.
    localStorage.setItem("token-auth", token);
    return this.obtenerDatosDeUsuario.perform();
  },

  obtenerDatosDeUsuario: task(function*() {
    if (this.autenticandoEnCurso) {
      console.log("evitando obtener datos de usuario porque está autenticando en curso");
      return;
    }

    this.set("autenticandoEnCurso", true);

    let token = localStorage.getItem("token-auth");
    yield timeout(1000);

    try {
      let respuesta = yield this.api.obtenerPerfilDesdeToken(token);
      this.set("perfil", respuesta);
      this.set("autenticado", true);
      this.set("autenticandoEnCurso", false);
    } catch (e) {
      console.log(e);
      this.set("autenticado", false);
      this.set("autenticandoEnCurso", false);
    }

  }),

  cerrarSesion() {
    this.set("autenticado", false);
    this.set("autenticandoEnCurso", false);
    let token = localStorage.getItem("token-auth");
    localStorage.removeItem("token-auth");
    return this.api.cerrarSesion(token);
  }
});
