import Component from "@ember/component";
import { computed } from "@ember/object";
import { later } from "@ember/runloop";

export default Component.extend({
  mostrar: false,
  classNames: ["relative"],

  hacer_foco() {
    this.element.getElementsByTagName("input")[0].focus();
    this.element.getElementsByTagName("input")[0].select();
  },

  invalido_por_duplicado: computed("nombre_sugerido", function() {
    return this.nombres_no_permitidos.indexOf(this.nombre_sugerido) > -1;
  }),

  invalido_por_vacio: computed("nombre_sugerido", function() {
    return this.nombre_sugerido.length < 1;
  }),

  invalido_por_caracteres: computed("nombre_sugerido", function() {
    return !/^[a-zA-Z_][0-9a-zA-Z_]+$/.test(this.nombre_sugerido);
  }),

  invalido: computed("invalido_por_caracteres", "invalido_por_vacio", "invalido_por_duplicado", function() {
    return this.invalido_por_caracteres || this.invalido_por_vacio || this.invalido_por_duplicado;
  }),

  obtener_nombres_de_todas_las_animaciones() {
    if (this.animaciones) {
      return this.animaciones.map(e => e.nombre);
    } else {
      return [];
    }
  },

  actions: {
    cambiarNombre() {
      this.set("mostrar", true);
      this.set("nombre_sugerido", this.animación.nombre);
      let otras_animaciones = this.obtener_nombres_de_todas_las_animaciones();
      otras_animaciones.removeObject(this.animación.nombre);
      this.set("nombres_no_permitidos", otras_animaciones);
      later(this, this.hacer_foco, 1);
    },

    ocultar() {
      this.set("mostrar", false);
    },

    confirmar() {
      if (this.invalido) {
        return;
      }

      this.set("animación.nombre", this.nombre_sugerido);
      this.send("ocultar");
    }
  }
});
