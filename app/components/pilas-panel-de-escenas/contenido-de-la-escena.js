import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "ul",
  classNames: ["list"],

  escena_como_nodos: computed("escena.carpetas.[]", "escena.actores.@each.{carpeta,color}", function() {
    let mapa_de_carpetas = {};
    let nodos = [];

    if (this.escena.carpetas) {
      this.escena.carpetas.map(carpeta => {
        mapa_de_carpetas[carpeta.id] = carpeta;
        let nodo = { tipo: "carpeta", carpeta: carpeta, actores: [] };

        let actores = this.escena.actores.filter(a => a.carpeta == carpeta.id);

        actores.map(actor => {
          nodo.actores.pushObject(actor);
        });

        nodos.pushObject(nodo);
      });
    }

    this.escena.actores
      .filter(a => a.carpeta == undefined)
      .map(actor => {
        nodos.pushObject({ tipo: "actor", actor: actor });
      });

    return nodos;
  })
});
