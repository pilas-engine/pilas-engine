import Component from "@ember/component";
import { later } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  mostrar: false,
  proyecto: service(),

  hacer_foco() {
    this.element.getElementsByTagName("input")[0].focus();
    this.element.getElementsByTagName("input")[0].select();
  },

  actions: {
    cambiarNombre() {
      this.set("mostrar", true);
      this.set("nombreSugerido", this.nombre);

      let actores = this.proyecto.obtener_nombres_de_actores();
      actores.removeObject(this.nombre);
      this.set("nombres_de_actores", actores);
      console.log({ actores });

      later(this, this.hacer_foco, 1);
    },

    ocultar() {
      this.set("mostrar", false);
    },

    invalido_por_duplicado: computed("nombres_de_actores", "nombreSugerido", function() {
      console.log("chech");
      return this.nombres_de_actores.indexOf(this.nombreSugerido) > -1;
    }),

    confirmar() {
      //this.objeto.set("nombre", this.nombreSugerido);
      //this.set("nombre", this.nombreSugerido);
      this.send("ocultar");
    }
  }
});
