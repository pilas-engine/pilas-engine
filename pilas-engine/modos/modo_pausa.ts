/// <reference path="modo.ts"/>

class ModoPausa extends Modo {
  pilas: Pilas;

  graphics: any;
  fps: any;
  ancho: number;
  alto: number;

  posicion: number;
  sprites: any;
  texto: any;
  total: number;

  izquierda: any;
  derecha: any;

  constructor() {
    super({ key: "ModoPausa" });
  }

  preload() {}

  create(datos) {
    super.create(datos);
    this.pilas = datos.pilas;
    this.posicion = this.pilas.historia.obtener_cantidad_de_posiciones();
    this.total = this.pilas.historia.obtener_cantidad_de_posiciones();
    this.sprites = [];
    this.crear_sprites_desde_historia(this.posicion);

    this.crear_canvas_de_depuracion();

    let t = this.pilas.historia.obtener_cantidad_de_posiciones();
    let datos_para_el_editor = { minimo: 0, posicion: t, maximo: t };
    this.pilas.mensajes.emitir_mensaje_al_editor(
      "comienza_a_depurar_en_modo_pausa",
      datos_para_el_editor
    );
  }

  private crear_sprites_desde_historia(posicion) {
    let foto = this.pilas.historia.obtener_foto(posicion);

    this.sprites.map(sprite => sprite.destroy());

    this.posicionar_la_camara(foto.escena);
    //this.crear_fondo(foto.escena.fondo);

    this.sprites = foto.actores.map(entidad => {
      return this.crear_sprite_desde_entidad(entidad);
    });

    //this.sprites.push(this.fondo);
  }

  update() {
    super.update();
    if (this.fps) {
      this.fps.alpha = 0;
    }
  }

  crear_sprite_desde_entidad(entidad) {
    let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      entidad.x,
      entidad.y
    );
    let sprite = this.add.sprite(x, y, entidad.imagen);

    sprite.angle = -entidad.rotacion;
    sprite.setOrigin(entidad.centro_x, entidad.centro_y);
    sprite.scaleX = entidad.escala_x;
    sprite.scaleY = entidad.escala_y;
    sprite.alpha = 1 - entidad.transparencia / 100;
    sprite.setFlipX(entidad.espejado);
    sprite.setFlipY(entidad.espejado_vertical);

    return sprite;
  }

  actualizar_posicion(posicion) {
    this.posicion = posicion;
    this.posicion = Math.min(this.posicion, this.total);
    this.posicion = Math.max(this.posicion, 0);

    this.crear_sprites_desde_historia(this.posicion);
    //this.actualizar_texto();
    //this.game.world.bringToTop(this.canvas);
  }

  /*
    this.izquierda = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.derecha = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.crear_texto();
    */

  crear_canvas_de_depuracion() {
    let graphics = this.add.graphics({ x: 0, y: 0 });
    graphics.depth = 200;
    this.graphics = graphics;

    this.pilas.historia.dibujar_puntos_de_las_posiciones_recorridas(graphics);
  }
}
