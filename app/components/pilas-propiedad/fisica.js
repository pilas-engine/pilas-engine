import Component from '@ember/component';
import { set } from "@ember/object";
import { computed } from "@ember/object";

export default Component.extend({
  objeto: null,

  propiedadFigura: null,
  propiedadRadio: null,
  propiedadAncho: null,
  propiedadAlto: null,
  propiedadRebote: null,
  propiedadFiguraDinamica: null,
  propiedadSinRotacion: null,
  propiedadSensor: null,

  tiposDeFiguras: null,

  init() {
    this._super(...arguments);
    this.iniciarPropiedades();
    this.iniciarTiposDeFiguras();
  },

  iniciarPropiedades() {
    this.set("propiedadFigura", { propiedad: "figura" });
    this.set("propiedadRadio", { propiedad: "figura_radio" });
    this.set("propiedadAncho", { propiedad: "figura_ancho" });
    this.set("propiedadAlto", { propiedad: "figura_alto" });
    this.set("propiedadRebote", { propiedad: "figura_rebote" });
    this.set("propiedadFiguraDinamica", { propiedad: "figura_dinamica" });
    this.set("propiedadSinRotacion", { propiedad: "figura_sin_rotacion" });
    this.set("propiedadSensor", { propiedad: "figura_sensor" });
  },

  iniciarTiposDeFiguras() {
    this.set("tiposDeFiguras", [
      {
        valor: "",
        texto: "ninguna"
      },
      {
        valor: "circulo",
        texto: "círculo"
      },
      {
        valor: "rectangulo",
        texto: "rectángulo"
      }
    ]);
  },

  tieneFigura: computed("actor_id", "objeto.figura", function() {
    return this.objeto.figura !== '';
  }),

  esCirculo: computed("actor_id", "objeto.figura", function() {
    return this.objeto.figura === "circulo";
  }),

  esRectangulo: computed("actor_id", "objeto.figura", function() {
    return this.objeto.figura === "rectangulo";
  }),

  actions: {

    cuandoCambiaDeFigura(_, figura) {
      this.send("al_cambiar_valor", "figura", this.objeto, figura);
    },

    al_cambiar_valor(nombre, receptor, valor) {
      console.log(nombre, valor);

      set(receptor, nombre, valor);
      this.modificarAtributo("atributo-del-actor", this.sensores);
    },

  }
});
