import { later } from "@ember/runloop";
import Component from "@ember/component";

// fallback para navegadores que no soportan .bind en las funciones.
var bind = function(fn, me) {
  return function() {
    return fn.apply(me, arguments);
  };
};

export default Component.extend({
  original_value: 0,
  intensidad: 0.01,
  editando: false,
  posicion_inicial_x: null,
  valor_inicial_al_comenzar_a_arrastrar: null,

  cuando_pulsa(e) {
    this.set("posicion_inicial_x", e.clientX);
    this.set("valor_inicial_al_comenzar_a_arrastrar", this.value);

    document.addEventListener("mousemove", this.cuando_mueve, false);
    document.addEventListener("mouseup", this.cuando_suelta, false);
  },

  cuando_mueve(e) {
    let delta = (e.clientX - this.get("posicion_inicial_x")) * this.intensidad;
    this.set("posicion_inicial_x", e.clientX);

    this.modificar(delta);
  },

  cuando_suelta() {
    document.removeEventListener("mousemove", this.cuando_mueve, false);
    document.removeEventListener("mouseup", this.cuando_suelta, false);
  },

  didInsertElement() {
    let etiqueta = this.element.querySelector(".data-etiqueta");
    this.cuando_pulsa = bind(this.cuando_pulsa, this);
    this.cuando_mueve = bind(this.cuando_mueve, this);
    this.cuando_suelta = bind(this.cuando_suelta, this);

    etiqueta.addEventListener("mousedown", this.cuando_pulsa, false);
  },

  willDestroyElement() {
    let etiqueta = this.element.querySelector(".data-etiqueta");
    etiqueta.removeEventListener("mousedown", this.cuando_pulsa, false);
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
