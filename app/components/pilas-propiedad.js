import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  original_value: 0,
  intensidad: 0.01,

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
  }
});
