import Component from "@ember/component";
import { computed } from "@ember/object";
import { task, timeout } from "ember-concurrency";
import { inject as service } from "@ember/service";

export default Component.extend({
  mostrarModal: false,
  paso: "login",
  api: service(),
  sesion: service(),
  autenticando: false,
  autenticado: false,
  saliendo: false,

  usuario: "asdfasdf",
  email: "??",
  contraseña: "asdfasdf",
  //sesion: null,

  etapaLogin: computed("paso", function() {
    return this.paso === "login";
  }),

  etapaCrearUsuario: computed("paso", function() {
    return this.paso === "crearUsuario";
  }),

  limpiar() {
    this.set("usuario", "");
    this.set("email", "");
    this.set("contraseña", "");
    this.set("error", "");
  },

  tareaCrearUsuario: task(function*() {
    this.set("error", "");
    yield timeout(500);

    if (!this.usuario || !this.contraseña || !this.email) {
      this.set("error", "Tienes que completar los tres campos");
      return;
    }

    try {
      let respuesta = yield this.api.crearUsuario(this.usuario, this.contraseña, this.email);

      if (respuesta.ok) {
        console.log("Usuario creado", respuesta);
      } else {
        this.set("error", respuesta.error);
      }
    } catch (e) {
      this.set("error", e.error);
    }
  }),

  tareaIngresar: task(function*() {
    this.set("error", "");
    yield timeout(500);

    if (!this.usuario || !this.contraseña) {
      this.set("error", "Tienes que completar los datos");
      return;
    }

    try {
      let respuesta = yield this.api.autenticar(this.usuario, this.contraseña);
      this.send("ocultar");
      console.log(respuesta);
      yield this.sesion.registrarLogin(respuesta.token);
    } catch (e) {
      console.log(e);
      this.set("error", "Usuario o contraseña incorrecta");
    }
  }),

  tareaCerrarSesion: task(function*() {
    this.set("saliendo", true);
    yield timeout(1000);
    this.set("saliendo", false);
    yield this.sesion.cerrarSesion();
  }),

  actions: {
    ocultar() {
      this.set("mostrarModal", false);
    },

    mostrar() {
      this.set("mostrarModal", true);
    },

    irACrearUsuario() {
      this.set("paso", "crearUsuario");
      this.limpiar();
    },

    irALogin() {
      this.set("paso", "login");
      this.limpiar();
    },

    ingresar() {
      this.tareaIngresar.perform();
    },

    cerrarSesion() {
      this.tareaCerrarSesion.perform();
    },

    crearUsuario() {
      this.tareaCrearUsuario.perform();
    }
  }
});
