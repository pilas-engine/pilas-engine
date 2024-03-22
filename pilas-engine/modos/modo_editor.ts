/// <reference path="modo.ts"/>


class ModoEditor extends Modo {
  pilas: Pilas;
  usar_grilla: boolean;
  sprite_cursor_de_la_grilla: Phaser.GameObjects.Sprite;
  tamaño_de_la_grilla: number;
  tecla_meta_pulsada: boolean;
  actor_seleccionado: any;

  camara: CamaraEnModoEdición;

  constructor() {
    super({ key: "ModoEditor" });
    console.log("Llamando al constructor");
  }

  cuando_cambia_grilla_desde_el_selector_manual(grilla) {
  }

  preload() {
    this.load.image("camara", "/camara.png");
  }

  private conectar_eventos_de_teclado() {
    this.input.keyboard.on("keyup", this.manejar_evento_key_up.bind(this));
    this.input.keyboard.on("keydown", this.manejar_evento_key_down.bind(this));
  }

  create(datos) {
    super.create(datos, datos.proyecto.ancho, datos.proyecto.alto);
    this.actores = [];
    this.pilas = datos.pilas;

    this.crear_camara(this.pilas,
      datos.escena.camara_x, datos.escena.camara_y,
      datos.proyecto.ancho, datos.proyecto.alto
    );
    
    this.posicionar_la_camara(datos.escena);

    this.ajustar_tamaño();
    this.conectar_eventos_resize();

    this.conectar_eventos_de_teclado();

    this.crear_fondo(datos.escena.fondo, datos.escena.ancho, datos.escena.alto);
    console.log("datos de la escena", datos.escena);
    this.crear_actores_desde_los_datos_de_la_escena(datos.escena);
    this.conectar_eventos_para_activar_zoom();
    this.conectar_eventos_para_desplazar_pantalla();

    this.recuperar_datos_de_la_camara_en_el_editor(datos.proyecto);
  }

  recuperar_datos_de_la_camara_en_el_editor(datos_del_proyecto) {
    let x = datos_del_proyecto.editor_camara_x;
    let y = datos_del_proyecto.editor_camara_y
    let zoom = datos_del_proyecto.editor_camara_zoom

    var camera = this.cameras.main;

    camera.zoom = zoom;
    camera.scrollX = x;
    camera.scrollY = y;
  }

  conectar_eventos_para_activar_zoom() {

    this.input.on("wheel",  (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      var camera = this.cameras.main;
      let salir = false;

      // aplica el cambio de zoom
      if (deltaY > 0) {
        camera.zoom += 0.2;
      } else {
        if (deltaY < 0) {
          camera.zoom -= 0.2;
        }
      }

      // ajusta los límites del zoom
      if (camera.zoom > 3) {
        camera.zoom = 3;
        salir = true;
      } else {
        if (camera.zoom < 0.6) {
          camera.zoom = 0.6;
          salir = true;
        }
      }

      // Se asegura de dejar un solo dígito decimal, para tener zooms de la
      // forma 0.2, 0.4, 0.8, 1.0, 1.2, 1.4 etc...
      camera.zoom = parseFloat(camera.zoom.toFixed(1));

      // Caso especial, si el zoom recibe un límite, se evita mover
      // la cámara y prevenir paneos innecesarios.
      if (salir) {
        return;
      }

      // corrige la posición de la cámara para focalizar en la
      // posición del mouse.
      camera.scrollX += ((pointer.worldX - camera.midPoint.x) / camera.zoom) / 10.0;
      camera.scrollY += ((pointer.worldY - camera.midPoint.y) / camera.zoom) / 10.0;

      this.pilas.mensajes.emitir_mensaje_al_editor("cuando_cambia_el_estado_de_la_camara_en_el_editor", {
        zoom: camera.zoom,
        x: camera.scrollX,
        y: camera.scrollY,
      });
    });
  }

  conectar_eventos_para_desplazar_pantalla() {

    pulsa_sobre_pantalla = false;
    boton_medio = false;

    this.input.on('pointerdown', (pointer, objetos) => {
      let p = this.input.activePointer;

      pulsa_sobre_pantalla = p.leftButtonDown() && objetos.length === 0;
      boton_medio = p.middleButtonDown(); 
    });

    this.input.on('pointermove', (pointer, objetos) => {
      let p = this.input.activePointer;

      // Se puede arrastrar y soltar la cámara del editor con el
      // botón medio o con el boton izquierdo siempre y cuando no se esté
      // seleccionando un actor.
      if (boton_medio || pulsa_sobre_pantalla) {
        var camera = this.cameras.main;
        this.input.setDefaultCursor("grabbing");

        camera.scrollX -= (pointer.x - pointer.prevPosition.x) / camera.zoom;
        camera.scrollY -= (pointer.y - pointer.prevPosition.y) / camera.zoom;
      }
    });

    this.input.on('pointerup', (pointer) => {
      let p = this.input.activePointer;

      if (p.middleButtonReleased()) {
        boton_medio = false;
      }

      if (p.leftButtonReleased()) {
        pulsa_sobre_pantalla = false;
      }


      if (!boton_medio || !pulsa_sobre_pantalla) {
        this.input.setDefaultCursor("default");

        this.pilas.mensajes.emitir_mensaje_al_editor("cuando_cambia_el_estado_de_la_camara_en_el_editor", {
          zoom: this.cameras.main.zoom,
          x: this.cameras.main.scrollX,
          y: this.cameras.main.scrollY,
        });
      }
    });

  }

  private manejar_evento_key_up(evento) {
    if (evento.key === "d") {
      this.pilas.mensajes.emitir_mensaje_al_editor("duplicar_el_actor_seleccionado", {});
    }

    if (evento.key === "x") {
      this.pilas.mensajes.emitir_mensaje_al_editor("eliminar_el_actor_seleccionado", {});
    }

    if (evento.key === "n") {
      this.pilas.mensajes.emitir_mensaje_al_editor("crear_un_actor_desde_atajo", {});
    }

    if (evento.key === "ArrowLeft") {
      this.mover_actor_seleccionado(evento.shiftKey, -1, 0);
    }

    if (evento.key === "ArrowRight") {
      this.mover_actor_seleccionado(evento.shiftKey, 1, 0);
    }

    if (evento.key === "ArrowUp") {
      this.mover_actor_seleccionado(evento.shiftKey, 0, 1);
    }

    if (evento.key === "ArrowDown") {
      this.mover_actor_seleccionado(evento.shiftKey, 0, -1);
    }

    if (evento.key === "Meta") {
      this.tecla_meta_pulsada = false;
    }
  }

  mover_actor_seleccionado(pulsa_shift, x, y) {
    x = x || 0;
    y = y || 0;

    if (pulsa_shift) {
      x *= 10;
      y *= 10;
    }

    this.pilas.mensajes.emitir_mensaje_al_editor("mover_al_actor_con_el_teclado", {x, y});
  }

  private manejar_evento_key_down(evento: any) {
    if (evento.key === "Meta") {
      this.tecla_meta_pulsada = true;
    }
  }

  crear_camara(pilas, x, y, ancho, alto) {
    // Creación de la cámara 
    this.camara = new CamaraEnModoEdición(this.pilas, this, x, y, ancho, alto);
    this.add.existing(this.camara);

    this.cameras.main.setBackgroundColor("CCC");
  }

  conectar_eventos_resize() {

    function onResize() {
      this.ajustar_tamaño();
    }

    const funcion = onResize.bind(this);

    window.addEventListener("resize", funcion, false);


    this.scale.on('resize', this.resize, this);

    this.events.on('shutdown', () => {
      window.removeEventListener("resize", funcion);
      this.scale.off('resize', this.resize, this);
    });
  }

  resize(gameSize) {
    this.cameras.resize(gameSize.width, gameSize.height);
  }

  private ajustar_tamaño() {
    this.game.scale.resize(window.innerWidth, window.innerHeight);
    this.game.scale.setZoom(1);
  }

  crear_actores_desde_los_datos_de_la_escena(escena: Escena) {
    escena.actores.map(actor => {
      this.crear_sprite_desde_actor(actor);
    });
  }


  crear_sprite_desde_actor(datos_del_actor: Actor) {
    console.log("crear_sprite_desde_actor", {datos_del_actor});
    let actor = new ActorEnModoEdición(this.pilas, this, datos_del_actor);

    
    //actor["setInteractive"]();
    //actor["actor"] = datos_del_actor;
    //this.input.setDraggable(actor, undefined);

    // la siguiente función además de definir atributos genera la figura para
    // el actor, si aplica.
    this.aplicar_atributos_de_actor_a_sprite(datos_del_actor, actor);

    this.actores.push(actor);
    this.add.existing(actor);

    /*

    let sprite = null;

    if (actor.imagen.indexOf(":") > -1) {
      let g = actor.imagen.split(":")[0];
      let i = actor.imagen.split(":")[1];

      sprite = this.add.sprite(0, 0, g, i);
    } else {
      sprite = this.add.sprite(0, 0, actor.imagen);
    }

    sprite["setInteractive"]();
    sprite["actor"] = actor;

    this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
    this.input.setDraggable(sprite, undefined);
     */
  }

  aplicar_atributos_de_actor_a_sprite(actor: Actor, sprite) {
    sprite.actualizar_datos(actor);
  }

  // crear_fondo(fondo, ancho, alto)    ( ver archivo pilas-engine/modos/modo.ts )
  
  cambiar_el_tamaño_del_escenario(ancho, alto) {
    this.fondo.width = ancho;
    this.fondo.height = alto;
  }

  posicionar_la_camara(datos_de_la_escena) {
    let {camara_x, camara_y} = datos_de_la_escena;
    this.camara.mover(camara_x + this.ancho / 2, -camara_y + this.alto/2);
  }

  eliminar_actor_por_id(id) {
    let indice = this.actores.findIndex(e => e.identificador === id);
    let actor = this.actores.splice(indice, 1)[0];

    if (this.actor_seleccionado && this.actor_seleccionado.id == actor.id) {
      actor.quitar_destacado();
      this.actor_seleccionado = null;
    }

    actor.eliminar();
  }

  // Se llama cuando se genera la señal: actualizar_actor_desde_el_editor 
  actualizar_sprite_desde_datos(sprite, actor) {
    sprite.actualizar_datos(actor);
  }
}
