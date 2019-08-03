import Service from "@ember/service";

export default Service.extend({
  vincular(proyecto) {
    this.set("proyecto", proyecto);
  },
  obtener_nombres_de_actores() {
    return this.proyecto.escenas
      .map(e => e.actores)
      .reduce((a, b) => a.concat(b))
      .map(a => a.nombre);
  }
});
