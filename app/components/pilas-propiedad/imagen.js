import Component from "@ember/component";

export default Component.extend({
  mostrar: false,

  actions: {
    al_cambiar(valor) {
      this.modificarAtributo(this.get("propiedad.propiedad"), valor);
      this.send("ocultar");
    },
    mostrar() {
      this.set("mostrar", true);
    },
    ocultar() {
      this.set("mostrar", false);
    },
    cuando_selecciona_imagen(imagen) {
      this.send("al_cambiar", imagen.nombre);
    }
  }
});
