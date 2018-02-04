import Component from "@ember/component";

export default Component.extend({
  modificar(delta) {
    let propiedad = this.get("propiedad.propiedad");
    let valorActual = this.get("objeto").get(propiedad);

    this.get("modificarAtributo")(propiedad, +valorActual + delta);
  },
  actions: {
    aumentar() {
      this.modificar(+this.get("propiedad.incremento"));
    },
    disminuir() {
      this.modificar(-this.get("propiedad.incremento"));
    }
  }
});
