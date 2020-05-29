import { inject as service } from "@ember/service";
import Component from "@ember/component";
import autocompletar from "pilas-engine/utils/autocompletar";
import { task, timeout } from "ember-concurrency";
import ENV from "pilas-engine/config/environment";
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';

/*
 *
 * Nota: este componente también se encarga de mantener actualizada la
 *       variable `actores` para que siempre referencie al diccionario que
 *       contiene acceso a todos los actores de la escena en ese momento
 *       particular.
 */
export default Component.extend({
  valor: "",
  log: service(),
  historial: null,
  posicion_en_el_historial: 0,
  bus: service(),
  pilas: null,
  contexto: null,
  autocompletado: null,

  estilo: computed("tamano", function() {
    let div_autocompletado = document.querySelector(".autocomplete-suggestions");

    if (div_autocompletado) {
      div_autocompletado.style.fontSize = `${this.tamano}px`;
    }

    return htmlSafe(`font-size: ${this.tamano}px`);
  }),

  didInsertElement() {
    this.set("historial", []);

    this.autocompletado = new autoComplete({
      selector: this.element.querySelector("#input"),
      minChars: 1,
      source: (termino, suggest) => {
        return this.autocompletar(termino, suggest);
      }
    });

    this.bus.on(`${this.nombre_del_contexto}:cuando_termina_de_iniciar_ejecucion`, this, "activar_interprete");

    this.actualizar_diccionario_de_actores.perform();
    this.log.limpiar();
  },

  activar_interprete(pilas, contexto) {
    this.set("pilas", pilas);
    this.set("contexto", contexto);

    this.contexto.eval("pilas = pilasengine");
  },

  willDestroyElement() {
    this.autocompletado.destroy();
    this.bus.off(`${this.nombre_del_contexto}:cuando_termina_de_iniciar_ejecucion`, this, "activar_interprete");
  },

  autocompletar(termino, success) {
    success(autocompletar(this.contexto, termino));
  },

  actualizar_diccionario_de_actores: task(function*() {
    if (ENV.environment === "test") {
      //console.warn("Evitando actualizar el intérprete en modo test.");
      return null;
    }

    while (true) {
      yield timeout(2000);

      if (this.contexto) {
        this.contexto.eval("window.actores = pilasengine.obtener_diccionario_de_actores();");
      }
    }
  }),

  actions: {
    cuandoPulsaEnter(event) {
      let dt = new Date() - window.autocomplete_tiempo_en_que_se_oculto;

      // Si las sugerencias de auto-completado se ocultaron hace menos de 1/2
      // segundo entonces se cancela la pulsación de ENTER porque seguramente
      // provino de querer autocompeltar. En caso contrario, si transcurrió más
      // de 1/2 segundo entonces se intenta ejecutar.
      if (dt < 500) {
        return;
      }

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

          try {
            // Intenta poner en una representación de texto legible
            // algo como un diccionario serializable.
            //
            // TODO: esto debería poder convertir un objeto más complejo o un
            //       diccionario como "actores".
            resultado = JSON.stringify(resultado);
          } catch (_) {
            console.warn("No se puede convertir este objeto a json");
          }

          this.log.mensaje(resultado || "undefined");
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
