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
      console.log("ya está autenticado");
      return;
    }

    if (localStorage.getItem("token-auth")) {
      this.obtenerDatosDeUsuario.perform();
    } else {
      this.set("autenticado", false);
    }
  },

  obtenerDatosDeUsuario: task(function*() {
    if (this.autenticandoEnCurso) {
      console.log("evitando obtener datos de usuario porque está autenticando en curso");
      return;
    }

    console.log("obteniendo datos de usuario...");

    this.set("autenticandoEnCurso", true);

    let token = localStorage.getItem("token-auth");
    yield timeout(500);

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

    console.log("listo!, proceso finalizado");
  }),
});
