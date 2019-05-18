import { later } from "@ember/runloop";
import Component from "@ember/component";

export default Component.extend({
  original_value: 0,
  intensidad: 0.01,
  editando: false,

  didInsertElement() {
    /*
    let element = this.element.querySelector(".cursor-resize");
    var initialX = 0;

    element.addEventListener("mousedown", mouse_down_event => {
      later(() => {
        initialX = mouse_down_event.pageX;
        this.set("initialX", mouse_down_event.pageX);
        this.set("original_value", this.value);

        let html = document.querySelector("html");
        html.addEventListener("mousemove", this.al_mover.bind(this));

        html.addEventListener("mouseup", () => {
          later(() => {
            this.disconnectEvents();
            return false;
          });
        });

        html.onmouseleave = () => {
          later(() => {
            this.disconnectEvents();
            return false;
          });
        };
      });
    });
    */
  },

  al_mover(event) {
    later(() => {
      var mouse_dx = (event.pageX - this.initialX) * this.intensidad;

      this.modificar(mouse_dx);
      this.set("initialX", event.pageX);

      return false;
    });
  },

  disconnectEvents: function() {
    /*
    let html = document.querySelector("html");
    html.removeEventListener("mousedown", this.al_mover);
    //html.onmouseup;
    */
  },

  willDestroyElement() {
    /*
    this.disconnectEvents();
    */
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
        this.element.querySelector("input").focus();
        this.element.querySelector("input").select();
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
