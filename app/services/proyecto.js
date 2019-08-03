import Service from "@ember/service";

export default Service.extend({
  vincular(proyecto) {
    this.set("proyecto", proyecto);
  },

  obtener_nombres_de_actores() {
    return this.obtener_todos_los_actores().map(a => a.nombre);
  },

  renombrar_actor(nombre, nombre_nuevo) {
    let actor = this.buscar_actor_por_nombre(nombre);
    actor.set("nombre", nombre_nuevo);

    let codigo = this.obtener_codigo_de_actor_por_nombre(nombre);

    codigo.set("nombre", nombre_nuevo);
    let codigo_nuevo = codigo.get("codigo").replace(`class ${nombre}`, `class ${nombre_nuevo}`);
    codigo.set("codigo", codigo_nuevo);

    return actor;
  },

  obtener_codigo_de_actor_por_nombre(nombre) {
    return this.proyecto.codigos.actores.filter(c => c.nombre === nombre)[0];
  },

  buscar_actor_por_nombre(nombre) {
    let actores = this.obtener_todos_los_actores();
    return actores.filter(a => a.nombre === nombre)[0];
  },

  obtener_todos_los_actores() {
    return this.proyecto.escenas.map(e => e.actores).reduce((a, b) => a.concat(b));
  }
});
