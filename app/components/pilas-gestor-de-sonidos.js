import Component from "@ember/component";
import { inject as service } from "@ember/service";
import EmberObject from "@ember/object";

export default Component.extend({
  tagName: "",
  proyecto: null,
  recursos: service(),
  iniciando: true,
  id: 1,

  didInsertElement() {
    this.cargar_sonidos();

    let primer_sonido = this.sonidos.firstObject;
    this.set("sonido_seleccionado", primer_sonido);
  },

  cargar_sonidos() {
    let sonidos = [
      {
        nombre: "laser",
        ruta: "sonidos/laser.wav"
      },
      {
        nombre: "explosion",
        ruta: "sonidos/explosion.wav"
      },
      {
        nombre: "gallina",
        ruta: "sonidos/gallina.wav"
      },
      {
        nombre: "moneda",
        ruta: "sonidos/moneda.wav"
      },
      {
        nombre: "salto-corto",
        ruta: "sonidos/salto-corto.wav"
      },
      {
        nombre: "salto-largo",
        ruta: "sonidos/salto-largo.wav"
      },
      {
        nombre: "seleccion-aguda",
        ruta: "sonidos/seleccion-aguda.wav"
      },
      {
        nombre: "seleccion-grave",
        ruta: "sonidos/seleccion-grave.wav"
      }
    ];

    this.set(
      "sonidos",
      sonidos.map(s => EmberObject.create(s))
    );
  },

  actions: {
    reproducir(sonido) {
      if (!this.iniciando) {
        this.set("id", Math.random());
        sonido.set("reproduciendo", true);
        this.set("sonido_seleccionado", sonido);
      }
    },

    cuando_termina_de_reproducir(nombre) {
      this.sonidos.findBy("nombre", nombre).set("reproduciendo", false);
    }
  }
});
