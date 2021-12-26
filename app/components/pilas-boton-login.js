import Component from "@ember/component";
import { later } from "@ember/runloop";
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

  usuario: "",
  email: "",
  contraseña: "",

  etapaLogin: computed("paso", function() {
    return this.paso === "login";
  }),

  etapaCrearUsuario: computed("paso", function() {
    return this.paso === "crearUsuario";
  }),

  etapaUsuarioCreadoYAutenticado: computed("paso", function() {
    return this.paso === "finalizado";
  }),

  hacer_foco_en_el_primer_input() {
    let input = this.element.getElementsByTagName("input")[0];

    input.focus();
    input.select();
  },

  hacer_foco_en_el_primer_boton() {
    let input = this.element.getElementsByTagName("button")[0];

    input.focus();
  },

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
        yield this.sesion.registrarLogin(respuesta.token);
        this.set("paso", "finalizado");
        later(this.hacer_foco_en_el_primer_boton, 1);
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
      // la creación de usuario también retorna un token
      // para que se pueda validar la sesión sin tener que
      // hacer otra petición.
      yield this.sesion.registrarLogin(respuesta.token);
      this.limpiar();
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

    hacer_foco_en(tabindex) {
      let input = this.element.querySelector(`input[tabindex='${tabindex}'`);
      input.focus();
    },

    hacer_click_en(tabindex) {
      let elemento = this.element.querySelector(`[tabindex='${tabindex}'`);
      elemento.click();
    },

    mostrar() {
      this.set("mostrarModal", true);
      this.set("paso", "login");
      later(this, this.hacer_foco_en_el_primer_input, 1);
    },

    irACrearUsuario() {
      this.set("paso", "crearUsuario");
      this.limpiar();
      later(this, this.hacer_foco_en_el_primer_input, 1);
    },

    volver() {
      this.set("paso", "login");
      this.limpiar();
      later(this, this.hacer_foco_en_el_primer_input, 1);
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
