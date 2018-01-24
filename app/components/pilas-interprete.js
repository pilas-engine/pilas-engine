import Component from "@ember/component";
import Ember from "ember";
import autocompletar from "pilas-engine/utils/autocompletar";

export default Component.extend({
  valor: "",
  log: Ember.inject.service(),
  historial: [],
  posicion_en_el_historial: 0,
  bus: Ember.inject.service(),
  pilas: null,
  contexto: null,

  didInsertElement() {
    new autoComplete({
      selector: this.$("#input")[0],
      minChars: 1,
      source: (termino, suggest) => {
        return this.autocompletar(termino, suggest);
      }
    });

    this.get("bus").on("finalizaCarga", this, "finalizaCarga");
    this.get("log").limpiar();
  },

  finalizaCarga(pilas, contexto) {
    this.set("pilas", pilas);
    this.set("contexto", contexto);
  },

  willDestroyElement() {
    this.get("bus").off("finalizaCarga", this, "finalizaCarga");
  },

  autocompletar(termino, success) {
    success(autocompletar(this.get("contexto"), termino));
  },

  actions: {
    cuandoPulsaEnter() {
      let v = this.get("valor");

      if (!this.get("habilitado")) {
        this.get("log").limpiar();
        this.get("log").info("Pulse Ejecutar para usar el intérprete.");
        return;
      }

      if (v) {
        this.cargar_al_historial(v);
        this.set("valor", "");

        let resultado = null;

        try {
          resultado = this.get("contexto").eval(v);
          this.get("log").info(resultado);
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
        this.cargar_sentencia_del_historial(+1);
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
