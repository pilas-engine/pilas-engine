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

    if (!contexto) {
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

  atender_mensaje_cambiar_zoom(datos) {
    this.pilas.modo.cameras.main.setZoom(datos.zoom);
  }

  atender_mensaje_iniciar_pilas(datos) {
    this.pilas.nombre_del_contexto = datos.nombre_del_contexto || "sin_nombre_de_contexto";
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

  atender_mensaje_cuando_cambia_zoom_desde_el_selector_manual(datos) {
    this.pilas.modo.cameras.main.setZoom(datos.zoom);
  }

  atender_mensaje_cuando_cambia_grilla_desde_el_selector_manual(datos) {
    this.pilas.modo.cuando_cambia_grilla_desde_el_selector_manual(datos.grilla);
  }

  atender_mensaje_actualizar_escena_desde_el_editor(datos) {
    this.pilas.modo.cambiar_fondo(datos.escena.fondo);
    this.pilas.modo.posicionar_la_camara(datos.escena);
  }

  atender_mensaje_termina_de_reproducir_sonido(/*datos*/) {}

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

  emitir_excepcion_al_editor(error, origen) {
    // Simplifica el stacktrace para que no tenga referencia a la url
    // local, sino que solamente muestre el nombre de archivo:
    let stacktrace = error.stack.replace(/ht.*localhost:\d+\/*/g, "en: ").replace(/  at /g, "⇾ ");

    let detalle = {
      mensaje: error.message,
      stack: stacktrace
    };

    let fuente_grande = {
      font: "18px verdana"
    };

    let fuente_principal = {
      font: "16px verdana",
      wordWrap: { width: 400, useAdvancedWrap: true }
    };

    let fuente_pequena = {
      font: "14px verdana",
      fill: "#ddd"
    };

    let fondo = this.pilas.modo.add.graphics();
    fondo.fillStyle(0x000000, 0.75);
    fondo.fillRect(0, 0, 3000, 3000);
    fondo.setDepth(500000);

    let texto_titulo = this.pilas.modo.add.text(5, 5, "Se ha producido un error:", fuente_grande);
    let texto_detalle = this.pilas.modo.add.text(5, 30, detalle.mensaje, fuente_principal);
    let texto_stack = this.pilas.modo.add.text(5, 5 + 30 + texto_detalle.height, detalle.stack, fuente_pequena);

    texto_titulo.setDepth(500001);
    texto_detalle.setDepth(500001);
    texto_stack.setDepth(500001);

    fondo.setScrollFactor(0, 0);
    texto_titulo.setScrollFactor(0, 0);
    texto_detalle.setScrollFactor(0, 0);
    texto_stack.setScrollFactor(0, 0);

    this.emitir_mensaje_al_editor("error_de_ejecucion", detalle);
    console.error(error);
  }

  atender_mensaje_selecciona_actor_desde_el_editor(datos) {
    this.pilas.modo.destacar_actor_por_id(datos.id);
  }

  atender_mensaje_actualizar_actor_desde_el_editor(datos) {
    let sprite = this.pilas.modo.obtener_actor_por_id(datos.id);
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
}
