import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  original_value: 0,
  intensidad: 0.01,
  editando: false,

  didInsertElement() {
    let element = this.$(".cursor-resize");
    var initialX = 0;

    element.on("mousedown", mouse_down_event => {
      initialX = mouse_down_event.pageX;
      this.set("original_value", this.get("value"));

      Ember.$("html").on("mousemove", event => {
        var intensidad = this.get("intensidad");

        var mouse_dx = (event.pageX - initialX) * intensidad;

        this.modificar(mouse_dx);
        initialX = event.pageX;

        return false;
      });

      Ember.$("html").on("mouseup", () => {
        this.disconnectEvents();
        return false;
      });

      Ember.$("html").on("mouseleave", () => {
        this.disconnectEvents();
        return false;
      });
    });
  },

  disconnectEvents: function() {
    Ember.$("html").unbind("mousemove");
    Ember.$("html").unbind("mouseup");
  },

  willDestroyElement() {
    this.disconnectEvents();
  },

  modificar(delta) {
    let propiedad = this.get("propiedad.propiedad");
    let valorActual = this.get("objeto").get(propiedad);

    this.get("modificarAtributo")(propiedad, +valorActual + delta);
  },

  actions: {
    modificar_desde_input(objeto, propiedad, valor) {
      if (!isNaN(+valor) && isFinite(+valor)) {
        this.get("modificarAtributo")(propiedad, +valor);
      }
    },
    comenzar_a_editar() {
      this.set("editando", true);

      Ember.run.later(() => {
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
