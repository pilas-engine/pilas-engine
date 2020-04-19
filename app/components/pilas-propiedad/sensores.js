import Component from "@ember/component";
import { computed } from "@ember/object";
import { set } from "@ember/object";
import obtener_nombre_sin_repetir from "pilas-engine/utils/obtener-nombre-sin-repetir";

export default Component.extend({
  sensores: computed("objeto", "propiedad.propiedad", function() {
    return this.objeto.get(this.propiedad.propiedad);
  }),

  actions: {
    al_cambiar_valor(nombre, receptor, valor) {
      if (nombre !== "nombre") {
        valor = +valor;
      }

      set(receptor, nombre, valor);
      this.modificarAtributo(this.get("propiedad.propiedad"), this.sensores);
    },

    crear_un_sensor() {
      let nombres_de_sensores = this.sensores.map(s => s.nombre);
      let nombre = obtener_nombre_sin_repetir(nombres_de_sensores, "sensor");
      this.sensores.pushObject({ x: 0, y: 0, ancho: 30, alto: 30, nombre: nombre });
      this.modificarAtributo(this.get("propiedad.propiedad"), this.sensores);
    },

    eliminar_sensor(sensor) {
      this.sensores.removeObject(sensor);
      this.modificarAtributo(this.get("propiedad.propiedad"), this.sensores);
    }
  }
});
