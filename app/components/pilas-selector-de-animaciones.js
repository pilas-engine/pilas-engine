import Component from "@ember/component";
import { inject as service } from "@ember/service";
import obtener_nombre_sin_repetir from "../utils/obtener-nombre-sin-repetir";

export default Component.extend({
  tagName: "",
  modal_editor_de_animaciones: false,
  proyecto: null,
  recursos: service(),
  iniciando: true,

  didInsertElement() {
    if (this.proyecto.animaciones) {
      this.send("previsualizar", this.proyecto.animaciones[0]);
    } else {
      console.error("Este proyecto no tiene animaciones, se deberían correr las migraciones.");
    }
  },

  obtener_nombres_de_todas_las_animaciones() {
    return this.proyecto.animaciones.map(e => e.nombre);
  },

  actions: {
    editar(animación) {
      this.set("modal_editor_de_animaciones", true);
      this.set("animación", animación);
    },

    previsualizar(animación) {
      this.set("animación", animación);
    },

    ocultar() {
      this.set("modal_editor_de_animaciones", false);
    },

    crear_animación_nueva() {
      let nombres_de_las_animaciones = this.obtener_nombres_de_todas_las_animaciones();
      let nombre = obtener_nombre_sin_repetir(nombres_de_las_animaciones, "nueva");

      let animación = {
        nombre: nombre,
        cuadros: [],
        velocidad: 10
      };

      this.proyecto.animaciones.insertAt(0, animación);
      this.send("editar", animación);
    },

    cuando_quiere_eliminar_animacion(animacion) {
      this.proyecto.animaciones.removeObject(animacion);

      if (this.proyecto.animaciones.lenght > 0) {
        this.send("previsualizar", this.proyecto.animaciones[0]);
      }

      this.send("ocultar");
    }
  }
});
