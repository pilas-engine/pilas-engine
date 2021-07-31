import Component from '@ember/component';

export default Component.extend({
  tieneProyectoAnterior: false,
  capturaDelProyectoAnterior: null,

  init() {
    this._super(...arguments);

    let captura = localStorage.getItem("pilas:captura_de_pantalla");
    let proyectoAnterior = localStorage.getItem("pilas:proyecto_serializado");

    if (captura && proyectoAnterior) {
      this.set("tieneProyectoAnterior", true);
      this.set("capturaDelProyectoAnterior", captura);
    } else {
      this.set("tieneProyectoAnterior", false);
    }

  }
});
