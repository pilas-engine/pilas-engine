import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  valor: "",
  log: Ember.inject.service(),
  historial: [],
  posicion_en_el_historial: 0,

  actions: {
    cuandoPulsaEnter() {
      let v = this.get("valor");

      if (v) {
        this.cargar_al_historial(v);
        this.set("valor", "");
        //this.get("log").info("El intérprete aún no está implementado.");

        let resultado = null;

        try {
          resultado = eval(v);

          if (resultado) {
            this.get("log").info(resultado);
          }
        } catch (error) {
          this.get("log").error(error);
        }
      }
    },

    pulsaTecla(event) {
      if (event.key === "ArrowUp") {
        this.cargar_sentencia_del_historial(-1);
        event.preventDefault();
      }

      if (event.key === "ArrowDown") {
        this.cargar_anterior_sentencia_del_historial(+1);
        event.preventDefault();
      }
    }
  },

  cargar_al_historial(sentencia) {
    this.get("historial").pushObject(sentencia);
    this.set("posicion_en_el_historial", this.get("historial").length);
  },

  cargar_sentencia_del_historial(desplazamiento) {
    let historial = this.get("historial");
    let posicionSolicitada = this.get("posicion_en_el_historial") + desplazamiento;
    let posicion = Math.min(Math.max(0, posicionSolicitada), historial.length);

    if (this.get("posicion_en_el_historial") !== posicion) {
      this.set("valor", this.get("historial")[posicion]);
      this.set("posicion_en_el_historial", posicion);
    }
  }
});
