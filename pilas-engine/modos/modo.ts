class Modo extends Phaser.Scene {
  matter: any;
  actores: any;

  destacar_actor_por_id(id) {
    let actor = this.obtener_actor_por_id(id);

    if (actor) {
      actor.destacar();
    }
  }

  obtener_actor_por_id(id) {
    return pilas.modo.actores.filter(e => e.id === id)[0];
  }

  actualizar_sprite_desde_datos(sprite, actor) {
    let coordenada = pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(actor.x, actor.y);

    sprite.id = actor.id;
    sprite.x = coordenada.x;
    sprite.y = coordenada.y;
    sprite.angle = -actor.rotacion;
    sprite.scaleX = actor.escala_x;
    sprite.scaleY = actor.escala_y;
    sprite.setOrigin(actor.centro_x, actor.centro_y);
    sprite.alpha = 1 - actor.transparencia / 100;
  }
}
