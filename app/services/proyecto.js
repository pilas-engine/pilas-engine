import Service from "@ember/service";
import { set } from "@ember/object";
import { inject as service } from "@ember/service";
import { observer } from "@ember/object";

import ENV from "pilas-engine/config/environment";

export default Service.extend({
  bus: service(),
  canvas_disponible: true,
  hay_cambios_por_guardar: false,

  actualizar_titulo: observer("hay_cambios_por_guardar", function() {
    let titulo = "PilasEngine";

    if (this.hay_cambios_por_guardar) {
      titulo += " *";
    }

    window.document.title = titulo;
  }),

  vincular(proyecto) {
    this.set("proyecto", proyecto);

    if (ENV.environment === "development") {
      window.proyecto = proyecto;
    }

    this.bus.on("prueba-editor:finaliza_carga", this, "finaliza_carga");
  },

  guardar_proyecto_serializado(proyecto_serializado) {
    localStorage.setItem("pilas:proyecto_serializado", proyecto_serializado);
  },

  cuando_guarda() {
    this.set("hay_cambios_por_guardar", false);
  },

  cuando_realiza_un_cambio() {
    this.set("hay_cambios_por_guardar", true);
  },

  eliminar_proyectos_guardados() {
    localStorage.removeItem("pilas:proyecto_serializado");
  },

  obtener_nombres_de_actores() {
    return this.obtener_todos_los_actores().map(a => a.nombre);
  },

  obtener_nombres_de_todas_las_escenas() {
    return this.obtener_todas_las_escenas().map(a => a.nombre);
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

  renombrar_escena(nombre, nombre_nuevo) {
    let escena = this.buscar_escena_por_nombre(nombre);
    escena.set("nombre", nombre_nuevo);

    let codigo = this.obtener_codigo_de_escena_por_nombre(nombre);

    codigo.set("nombre", nombre_nuevo);
    let codigo_nuevo = codigo.get("codigo").replace(`class ${nombre}`, `class ${nombre_nuevo}`);
    codigo.set("codigo", codigo_nuevo);

    return escena;
  },

  obtener_codigo_de_actor_por_nombre(nombre) {
    return this.proyecto.codigos.actores.filter(c => c.nombre === nombre)[0];
  },

  obtener_codigo_de_escena_por_nombre(nombre) {
    return this.proyecto.codigos.escenas.filter(c => c.nombre === nombre)[0];
  },

  buscar_actor_por_nombre(nombre) {
    let actores = this.obtener_todos_los_actores();
    return actores.filter(a => a.nombre === nombre)[0];
  },

  buscar_escena_por_nombre(nombre) {
    let escenas = this.obtener_todas_las_escenas();
    return escenas.filter(a => a.nombre === nombre)[0];
  },

  obtener_todos_los_actores() {
    return this.proyecto.escenas.map(e => e.actores).reduce((a, b) => a.concat(b));
  },

  obtener_todas_las_escenas() {
    return this.proyecto.escenas;
  },

  incorporar_imagenes_al_proyecto(lista_de_archivos) {
    this.set("canvas_disponible", false);

    lista_de_archivos.map(item => {
      // si el archivo ya estaba en el proyecto ...
      let anterior = this.proyecto.imagenes.findBy("nombre", item.nombre);

      // ... reemplaza su contenido.
      if (anterior) {
        set(anterior, "contenido", item.contenido);
      } else {
        // si no estaba, lo carga por primera vez.
        this.proyecto.imagenes.pushObject(item);
      }
    });

    this.bus.trigger("recargarCanvasDePilas");
  },

  finaliza_carga() {
    this.set("canvas_disponible", true);
  }
});
