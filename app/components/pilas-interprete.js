import { inject as service } from "@ember/service";
import Component from "@ember/component";
import autocompletar from "pilas-engine/utils/autocompletar";

export default Component.extend({
  valor: "",
  log: service(),
  historial: null,
  posicion_en_el_historial: 0,
  bus: service(),
  pilas: null,
  contexto: null,

  didInsertElement() {
    this.set("historial", []);
    new autoComplete({
      selector: this.$("#input")[0],
      minChars: 1,
      source: (termino, suggest) => {
        return this.autocompletar(termino, suggest);
      }
    });

    this.bus.on("finaliza_carga", this, "finaliza_carga");
    this.log.limpiar();
  },

  finaliza_carga(pilas, contexto) {
    this.set("pilas", pilas);
    this.set("contexto", contexto);
  },

  willDestroyElement() {
    this.bus.off("finaliza_carga", this, "finaliza_carga");
  },

  autocompletar(termino, success) {
    success(autocompletar(this.contexto, termino));
  },

  actions: {
    cuandoPulsaEnter() {
      let v = this.valor;

      if (!this.habilitado) {
        this.log.limpiar();
        this.log.info("Pulse Ejecutar para usar el intérprete.");
        return;
      }

      if (v) {
        this.cargar_al_historial(v);
        this.set("valor", "");

        let resultado = null;

        try {
          resultado = this.contexto.eval(v);
          this.log.info(resultado);
        } catch (error) {
          this.log.error(error);
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
    this.historial.pushObject(sentencia);
    this.set("posicion_en_el_historial", this.historial.length);
  },

  cargar_sentencia_del_historial(desplazamiento) {
    let historial = this.historial;
    let posicionSolicitada = this.posicion_en_el_historial + desplazamiento;
    let posicion = Math.min(Math.max(0, posicionSolicitada), historial.length);

    if (this.posicion_en_el_historial !== posicion) {
      this.set("valor", this.historial[posicion]);
      this.set("posicion_en_el_historial", posicion);
    }
  }
});
