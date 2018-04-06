class Modo extends Phaser.Scene {
  matter: any;
  actores: any;

  destacar_actor_por_id(id) {
    let actor = this.obtener_actor_por_id(id);

    if (actor) {
      actor.destacar();
    }
  }

  crear_fondo(fondo) {
    this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, fondo);
    this.fondo.depth = -1000;
    this.fondo.setOrigin(0);
  }

  obtener_actor_por_id(id) {
    return pilas.modo.actores.filter(e => e.id === id)[0];
  }

  actualizar_sprite_desde_datos(sprite, actor) {
    let coordenada = pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      actor.x,
      actor.y
    );

    sprite.id = actor.id;
    sprite.x = coordenada.x;
    sprite.y = coordenada.y;
    sprite.angle = -actor.rotacion;
    sprite.scaleX = actor.escala_x;
    sprite.scaleY = actor.escala_y;
    sprite.setOrigin(actor.centro_x, actor.centro_y);
    sprite.alpha = 1 - actor.transparencia / 100;

    sprite.setFlipX(actor.espejado);
    sprite.setFlipY(actor.espejado_vertical);
  }

  posicionar_la_camara(datos_de_la_escena) {
    this.cameras.cameras[0].setScroll(
      datos_de_la_escena.camara_x,
      -datos_de_la_escena.camara_y
    );
  }

  actualizar_posicion(posicion: any = null) {
    throw Error(
      "No se puede actualizar posicion en este modo. Solo se puede en el modo pausa."
    );
  }
}
