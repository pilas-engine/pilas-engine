import { later } from "@ember/runloop";
import $ from "jquery";
import Component from "@ember/component";

export default Component.extend({
  original_value: 0,
  intensidad: 0.01,
  editando: false,

  didInsertElement() {
    let element = this.$(".cursor-resize");
    var initialX = 0;

    element.on("mousedown", mouse_down_event => {
      later(() => {
        initialX = mouse_down_event.pageX;
        this.set("original_value", this.value);

        $("html").on("mousemove", event => {
          later(() => {
            var intensidad = this.intensidad;

            var mouse_dx = (event.pageX - initialX) * intensidad;

            this.modificar(mouse_dx);
            initialX = event.pageX;

            return false;
          });
        });

        $("html").on("mouseup", () => {
          later(() => {
            this.disconnectEvents();
            return false;
          });
        });

        $("html").on("mouseleave", () => {
          later(() => {
            this.disconnectEvents();
            return false;
          });
        });
      });
    });
  },

  disconnectEvents: function() {
    $("html").unbind("mousemove");
    $("html").unbind("mouseup");
  },

  willDestroyElement() {
    this.disconnectEvents();
  },

  modificar(delta) {
    let propiedad = this.get("propiedad.propiedad");
    let valorActual = this.objeto.get(propiedad);

    let valor_a_asignar = +valorActual + delta;
    valor_a_asignar = this.aplicar_limites_mayor_y_menor(valor_a_asignar);

    this.modificarAtributo(propiedad, valor_a_asignar);
  },

  aplicar_limites_mayor_y_menor(valor) {
    if (this.min !== undefined && this.max !== undefined) {
      return Math.min(Math.max(valor, this.min), this.max);
    } else {
      return valor;
    }
  },

  actions: {
    modificar_desde_input(objeto, propiedad, valor) {
      if (!isNaN(+valor) && isFinite(+valor)) {
        valor = this.aplicar_limites_mayor_y_menor(valor);
        this.modificarAtributo(propiedad, +valor);
      }
    },
    comenzar_a_editar() {
      this.set("editando", true);

      later(() => {
        this.$("input").focus();
        this.$("input")[0].select();
      });
    },
    cuando_pierde_foco() {
      this.set("editando", false);
    },
    cuando_suelta_tecla(evento) {
      if (evento.keyCode === 13) {
        this.set("editando", false);
      }
    }
  }
});
