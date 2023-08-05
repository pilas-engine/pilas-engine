import Service from "@ember/service";
import { set } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from "pilas-engine/config/environment";

export default Service.extend({
  bus: service(),
  memento: service(),
  canvas_disponible: true,
  hay_cambios_por_guardar: false,

  vincular(proyecto, editor) {
    this.set("proyecto", proyecto);
    this.set("editor", editor);

    if (ENV.environment === "development") {
      window.proyecto = proyecto;
    }

    this.bus.on("prueba-editor:finaliza_carga", this, "finaliza_carga");
  },

  guardar_proyecto_serializado(proyecto_serializado) {
    try {
      localStorage.setItem("pilas:proyecto_serializado", proyecto_serializado);
    } catch (e) {
      console.warn("El proyecto es demasiado grande, así que se evitó guardarlo en localstorage para que se pueda abrir desde proyectos recientes.");
      console.warn("Se ha creado una variable global para poder abrir el proyecto...");
      localStorage.removeItem("pilas:proyecto_serializado");
      window.__tmp__proyecto_serializado = proyecto_serializado;
    }
  },

  guardar_captura_de_pantalla_del_proyecto(imagen_en_base_64) {
    localStorage.setItem("pilas:captura_de_pantalla", imagen_en_base_64);
  },

  cuando_guarda() {
    this.set("hay_cambios_por_guardar", false);
    this.avisar_a_electron_si_hay_cambios_por_guardar();
  },

  cuando_realiza_un_cambio() {
    this.set("hay_cambios_por_guardar", true);
    this.avisar_a_electron_si_hay_cambios_por_guardar();

  },

  avisar_a_electron_si_hay_cambios_por_guardar() {
    // Electron necesita poder controlar si la ventana
    // de la aplicación se puede cerrar o no, para esto
    // ember tiene que avisarle al proceso principal de
    // electron si el usuario tiene cambios por guardar
    // o no. Este código hace exactamente eso, le envía
    // al proceso principal de electron si el usuario
    // tiene cambios por guardar o no. Vea el archivo
    // electron.js o prod-electron.js para ver cómo gestiona
    // electron este cambio del lado del proceso principal.
    //
    // Este código solo funciona cuando la aplicación
    // está funcionando dentro de electron

    if (window.enElectron) {
      const { ipcRenderer } = requireNode('electron');
      let cambios = this.get("hay_cambios_por_guardar");
      ipcRenderer.send("cambia-estado-guardado", cambios);
    }
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

  obtener_tipo_de_entidad_por_nombre(nombre) {
    if (nombre === "proyecto") {
      return "proyecto";
    }

    let nombres_de_actores = this.obtener_nombres_de_actores();

    if (nombres_de_actores.includes(nombre)) {
      return "actor";
    }

    let nombres_de_escenas = this.obtener_nombres_de_todas_las_escenas();

    if (nombres_de_escenas.includes(nombre)) {
      return "escena";
    }

    throw new Error(`no se puede reconocer qué tipo de entidad tiene el nombre "${nombre}"`);
  },

  /**
   * Intenta obtener el XML de bloques para un actor, escena o proyecto.
   */
  obtener_bloques_de_entidad_por_nombre(nombre) {
    const tipo = this.obtener_tipo_de_entidad_por_nombre(nombre);

    if (tipo === "proyecto") {
      return { id: 1, bloques: this.proyecto.bloques.proyecto };
    }

    if (tipo === "actor") {
      let bloques = this.proyecto.bloques.actores.findBy("nombre", nombre).get("bloques");
      let actor = this.buscar_actor_por_nombre(nombre);

      return {
        id: actor.id,
        bloques
      };
    }

    if (tipo === "escena") {
      let bloques = this.proyecto.bloques.escenas.findBy("nombre", nombre).get("bloques");
      let escena = this.buscar_escena_por_nombre(nombre);

      return {
        id: escena.id,
        bloques
      };
    }

    throw new Error(`No se pueden obtener bloques para la entidad '${nombre}'`);
  },

  renombrar_proyecto(nombre) {
    this.proyecto.set("titulo", nombre);
  },

  renombrar_actor(nombre, nombre_nuevo) {
    let actor = this.buscar_actor_por_nombre(nombre);
    actor.set("nombre", nombre_nuevo);

    let codigo = this.obtener_codigo_de_actor_por_nombre(nombre);

    codigo.set("nombre", nombre_nuevo);
    let codigo_nuevo = codigo.get("codigo").replace(`class ${nombre}`, `class ${nombre_nuevo}`);
    codigo.set("codigo", codigo_nuevo);

    this.renombrar_bloques_de_un_actor(nombre, nombre_nuevo);

    return actor;
  },

  renombrar_bloques_de_un_actor(nombre, nombre_nuevo) {
    let bloques_del_actor = this.proyecto.bloques.actores.findBy("nombre", nombre);
    bloques_del_actor.set("nombre", nombre_nuevo);
  },

  renombrar_escena(nombre, nombre_nuevo) {
    let escena = this.buscar_escena_por_nombre(nombre);
    escena.set("nombre", nombre_nuevo);

    let codigo = this.obtener_codigo_de_escena_por_nombre(nombre);

    codigo.set("nombre", nombre_nuevo);
    let codigo_nuevo = codigo.get("codigo").replace(`class ${nombre}`, `class ${nombre_nuevo}`);
    codigo.set("codigo", codigo_nuevo);

    this.renombrar_bloques_de_una_escena(nombre, nombre_nuevo);

    return escena;
  },

  renombrar_bloques_de_una_escena(nombre, nombre_nuevo) {
    let bloques_una_escena = this.proyecto.bloques.escenas.findBy("nombre", nombre);
    bloques_una_escena.set("nombre", nombre_nuevo);
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

  buscar_actor_por_id(id) {
    let actores = this.obtener_todos_los_actores();
    return actores.filter(a => a.id == id)[0];
  },

  buscar_escena_por_nombre(nombre) {
    let escenas = this.obtener_todas_las_escenas();
    return escenas.filter(a => a.nombre === nombre)[0];
  },

  buscar_escena_por_id(id) {
    let escenas = this.obtener_todas_las_escenas();
    return escenas.filter(a => a.id == id)[0];
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
      let anterior = this.proyecto.imagenes.findBy("nombre", item.nombre);

      if (anterior) {
        set(anterior, "contenido", item.contenido);
      } else {
        this.proyecto.imagenes.pushObject(item);
      }
    });

    this.bus.trigger("recargarCanvasDePilas");
  },

  incorporar_sonidos_al_proyecto(lista_de_archivos) {
    this.set("canvas_disponible", false);

    lista_de_archivos.map(item => {
      let anterior = this.proyecto.sonidos.findBy("nombre", item.nombre);

      if (anterior) {
        set(anterior, "contenido", item.contenido);
      } else {
        this.proyecto.sonidos.pushObject(item);
      }
    });

    this.bus.trigger("recargarCanvasDePilas");
  },

  finaliza_carga() {
    this.set("canvas_disponible", true);
  },

  agregar_actor_a_la_carpeta(actor_id, carpeta_id, omitir_memento) {
    let actor = this.buscar_actor_por_id(actor_id);
    let carpeta_anterior = actor.get("carpeta");

    actor.set("carpeta", carpeta_id);
    this.cuando_realiza_un_cambio();

    if (!omitir_memento) {
      this.memento.accion("cambia_actor_de_carpeta", {
        id: actor.id,
        carpeta_anterior: carpeta_anterior,
        carpeta_nueva: actor.get("carpeta")
      });
    }
  },

  agregar_actor_a_la_escena(actor_id, escena_origen_id, escena_nueva_id, omitir_memento) {
    let proyecto = this.proyecto;
    let actor = this.buscar_actor_por_id(actor_id);
    let destino = this.buscar_escena_por_id(escena_nueva_id);

    let carpeta_anterior = actor.get("carpeta");
    actor.set("carpeta", undefined);

    if (escena_origen_id !== destino.get("id")) {
      this.editor.send("mover_actor_a_una_escena", proyecto, actor, escena_origen_id, destino);
      this.cuando_realiza_un_cambio();

      if (!omitir_memento) {
        this.memento.accion("cambia_actor_de_escena", {
          id: actor.id,
          carpeta_anterior: carpeta_anterior,
          carpeta_nueva: undefined,
          escena_anterior: escena_origen_id,
          escena_nueva: escena_nueva_id
        });
      }
    }
  },

  cambiar_color_de_un_actor(actor_id, color, omitir_memento) {
    let actor = this.buscar_actor_por_id(actor_id);
    let color_anterior = actor.get("color");

    actor.set("color", color);

    if (!omitir_memento) {
      this.memento.accion("cambia_color_del_actor", {
        id: actor_id,
        color_nuevo: color,
        color_anterior: color_anterior
      });
    }
  },

  eliminarCarpetaDelProyecto(carpeta, actores, escena) {
    actores.map(actor => this.editor.eliminar_actor(actor.id));
    escena.carpetas.removeObject(carpeta);
  }
});
