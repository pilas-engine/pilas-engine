const DEPURAR_MENSAJES = false;
const DEPURAR_MENSAJES_DE_CARGA = false;

class Mensajes {
  pilas: Pilas;
  fondo: Phaser.GameObjects.TileSprite;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.agregar_manejador_de_eventos();
  }

  private agregar_manejador_de_eventos() {
    window.addEventListener("message", this.atender_mensaje.bind(this), false);
  }

  atender_mensaje(e: any) {
    let nombre = e.data.tipo;
    let contexto = e.data.nombre_del_contexto;
    let metodo = "atender_mensaje_" + nombre;
    let datos = e.data;

    if (!nombre) {
      return;
    }

    if (!contexto) {
      /* Caso particuar: cuando se ejecuta el juego en modo
       * exportado se envía este mensaje pero no hace falta
       * atenderlo.
       */
      if (nombre === "codigo_ejecutado" || nombre === "termina_de_reproducir_sonido") {
        return;
      }

      throw new Error(`No llegó el nombre de contexto con el mensaje ${nombre}`);
    }

    if (DEPURAR_MENSAJES) {
      console.log(`[editor → pilas] [contexto: ${contexto}] llega el mensaje: ${nombre}`);
    }

    if (this[metodo]) {
      this[metodo](datos);
    } else {
      // FIXME: este evento debe estar en una whitelist de parte de pilas-engine con bloques
      if (metodo !== "atender_mensaje_cambiar_prefijo_de_variante" && metodo !== "atender_mensaje_cambiar_animacion") {
        console.error(`Imposible llamar al evento ${metodo}`, datos);
      }
    }
  }

  atender_mensaje_capturar_pantalla(datos) {
    pilasengine.game.renderer.snapshot(imagen => {
      this.emitir_mensaje_al_editor("captura_de_pantalla_realizada", { data: imagen["src"] });
    });
  }

  atender_mensaje_cambiar_zoom(datos) {
    this.pilas.modo.cameras.main.setZoom(datos.zoom);
  }

  atender_mensaje_iniciar_pilas(datos) {
    this.pilas.nombre_del_contexto = datos.nombre_del_contexto || "sin_nombre_de_contexto";
    datos.recursos.sonidos = datos.sonidos;
    this.pilas.iniciar_phaser(datos.ancho, datos.alto, datos.recursos, datos.opciones, datos.imagenes);
  }

  atender_mensaje_definir_estados_de_depuracion(datos) {
    this.pilas.depurador.definir_estados_de_depuracion(datos);
  }

  emitir_mensaje_al_editor(nombre: string, datos = null) {
    datos = datos || {};
    let contexto = this.pilas.nombre_del_contexto;
    datos.tipo = nombre;
    datos.nombre_del_contexto = contexto;

    if (nombre === "progreso_de_carga") {
      if (DEPURAR_MENSAJES_DE_CARGA) {
        console.log(`[pilas → editor] [contexto: ${contexto}] Emitiendo el mensaje de carga: ${nombre}`);
      }
    } else {
      if (DEPURAR_MENSAJES) {
        console.log(`[pilas → editor] [contexto: ${contexto}] Emitiendo el mensaje: ${nombre}`);
      }
    }

    window.parent.postMessage(datos, HOST);
  }

  atender_mensaje_define_escena(datos) {
    this.pilas.definir_modo("ModoEditor", {
      pilas: this.pilas,
      escena: datos.escena,
      proyecto: datos.proyecto
    });
  }

  atender_mensaje_definir_zoom_inicial_para_el_modo_editor(datos) {
    this.pilas.modo.cameras.main.setZoom(datos.zoom);
  }

  atender_mensaje_cuando_cambia_grilla_desde_el_selector_manual(datos) {
    this.pilas.modo.cuando_cambia_grilla_desde_el_selector_manual(datos.grilla);
  }

  atender_mensaje_actualizar_escena_desde_el_editor(datos) {
    this.pilas.modo.cambiar_fondo(datos.escena.fondo, datos.escena.ancho, datos.escena.alto);
    this.pilas.modo.posicionar_la_camara(datos.escena);
  }

  atender_mensaje_cuando_cambia_el_tamaño_del_escenario(datos) {
    this.pilas.modo.cambiar_el_tamaño_del_escenario(datos.ancho, datos.alto);
  }

  atender_mensaje_termina_de_reproducir_sonido(/*datos*/) {}

  atender_mensaje_ubicar_camara_en_el_actor(data: any) {
    let sprite = this.pilas.modo.obtener_actor_por_id(data.actor_id);
    let camera = this.pilas.modo.cameras.cameras[0];

    camera.pan(sprite.x, sprite.y, 250, "Sine.easeInOut");

    setTimeout(() => {
      let x = camera.scrollX;
      let y = -camera.scrollY;

      this.emitir_mensaje_al_editor("cuando_cambia_el_estado_de_la_camara_en_el_editor", { x, y:-y });

      //this.emitir_mensaje_al_editor("mientras_mueve_la_camara", { x, y });
      //this.pilas.modo.posicionar_la_camara({ camara_x: x, camara_y: y });
    }, 260);
  }

  atender_mensaje_ejecutar_proyecto(datos) {
    let parametros = {
      pilas: this.pilas,
      nombre_de_la_escena_inicial: datos.nombre_de_la_escena_inicial,
      permitir_modo_pausa: datos.permitir_modo_pausa,
      codigo: datos.codigo,
      proyecto: datos.proyecto,
      es_cambio_de_escena: false
    };

    this.pilas.definir_modo("ModoEjecucion", parametros);
  }

  emitir_excepcion_al_editor(error: any, origen: any) {
    let stacktrace = error.stack.replace(/\(.*\)/g, "").replace(/ {2}at /g, " - ");
    let parametros = {
      pilas: this.pilas,
      error: error,
      stacktrace: stacktrace,
      origen: origen
    };

    this.pilas.modo.con_error = true;
    this.pilas.definir_modo("ModoError", parametros);

    this.emitir_mensaje_al_editor("error_de_ejecucion", {
      mensaje: error.message,
      stack: stacktrace
    });
  }

  atender_mensaje_selecciona_actor_desde_el_editor(datos) {
    this.pilas.modo.destacar_actor_por_id(datos.id);
  }

  atender_mensaje_actualizar_actor_desde_el_editor(datos) {
    let sprite = this.pilas.modo.obtener_actor_por_id(datos.id);
    // Nota: el siguiente método solo está definido en el estado "modo_editor".
    this.pilas.modo.actualizar_sprite_desde_datos(sprite, datos.actor);
  }

  atender_mensaje_pausar_escena() {
    let parametros = {
      pilas: this.pilas
    };

    this.pilas.definir_modo("ModoPausa", parametros);
  }

  atender_mensaje_cambiar_posicion(datos) {
    this.pilas.modo.actualizar_posicion(datos.posicion);
  }

  atender_mensaje_eliminar_actor_desde_el_editor(datos) {
    this.pilas.modo.eliminar_actor_por_id(datos.id);
  }

  atender_mensaje_selecciona_un_actor_en_modo_pausa(datos) {
    this.pilas.modo.selecciona_actor_o_escena_en_modo_pausa(datos.actor);
  }
}
