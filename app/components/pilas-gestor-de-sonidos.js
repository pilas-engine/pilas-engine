import Component from "@ember/component";
import { inject as service } from "@ember/service";
import EmberObject from "@ember/object";

export default Component.extend({
  tagName: "",
  proyecto: null,
  recursos: service(),
  servicioProyecto: service("proyecto"),
  iniciando: true,
  id: 1,

  didInsertElement() {
    this.cargar_sonidos();

    let primer_sonido = this.sonidos.firstObject;
    this.set("sonido_seleccionado", primer_sonido);
  },

  cargar_sonidos() {
    let sonidos = this.proyecto.sonidos.map(s => EmberObject.create(s));
    this.set("sonidos", sonidos);
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
    },

    incorporar_sonidos_al_proyecto(lista_de_sonidos) {
      this.servicioProyecto.incorporar_sonidos_al_proyecto(lista_de_sonidos);
      this.set("iniciando", true);

      this.cargar_sonidos();
    }
  }
});
