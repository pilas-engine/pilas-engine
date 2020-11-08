import Component from "@ember/component";
import { computed } from "@ember/object";
import { set } from "@ember/object";
import obtener_nombre_sin_repetir from "pilas-engine/utils/obtener-nombre-sin-repetir";

export default Component.extend({
  lasers: computed("actor_id", "objeto", "propiedad.propiedad", function() {
    let valor = this.objeto.get(this.propiedad.propiedad);

    if (valor) {
      return JSON.parse(JSON.stringify(valor));
    } else {
      return [];
    }
  }),

  actions: {
    al_cambiar_valor(nombre, receptor, valor) {
      if (nombre !== "nombre") {
        valor = +valor;
      }

      set(receptor, nombre, valor);
      this.modificarAtributo(this.get("propiedad.propiedad"), this.lasers);
    },

    crear_un_laser() {
      let nombres_de_lasers = this.lasers.map(s => s.nombre);
      let nombre = obtener_nombre_sin_repetir(nombres_de_lasers, "laser");
      let id = Math.random();
      this.lasers.pushObject({
        id: `laser-${id}`,
        rotacion: 0,
        longitud: 100,
        etiquetas: [],
        nombre: nombre
      });
      this.modificarAtributo(this.get("propiedad.propiedad"), this.lasers);
    },

    eliminar_laser(laser) {
      this.lasers.removeObject(laser);
      this.modificarAtributo(this.get("propiedad.propiedad"), this.lasers);
    }
  }
});
