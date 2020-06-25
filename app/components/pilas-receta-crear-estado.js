import Component from "@ember/component";
import { later } from "@ember/runloop";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",
  modal_visible: false,
  nombreSugerido: "",

  invalido: computed("errores.length", function() {
    return this.get("errores.length") > 0;
  }),

  errores: computed("nombreSugerido", function() {
    if (this.nombreSugerido.trim().length == 0) {
      return ["Debes elegir un nombre"];
    }

    if (!/^[a-zA-Z_][0-9a-zA-Z_]+$/.test(this.nombreSugerido)) {
      return ["Solo tienes que escribir una palabra simple"];
    }
  }),

  mover_scroll() {
    let input = document.getElementById("input-nombre-del-estado");
    let offset = input.closest("#receta-crear-estado").offsetTop;
    input.closest(".overflow-y-auto").scrollTo({
      top: offset - 64,
      left: 0,
      behavior: "smooth"
    });
  },

  hacer_foco() {
    let input = document.getElementById("input-nombre-del-estado");
    input.focus();
  },

  actions: {
    seleccionar() {
      this.set("modal_visible", true);
      later(this, "mover_scroll", 1);
      later(this, "hacer_foco", 2);
    },
    ocultar() {
      this.dd.actions.close();
    },
    confirmar() {
      let estado = this.nombreSugerido;

      this.set("modal_visible", false);
      this.receta.codigo = `// Estado: ${estado}

        ${estado}_iniciar() {

        }

        ${estado}_actualizar() {

        }

        ${estado}_cuando_finaliza_animacion(nombre: string) {

        }

        ${estado}_cada_segundo(segundos_transcurridos: number) {

        }
      `;
      this.usar_receta(this.receta, this.dd);
    }
  }
});
