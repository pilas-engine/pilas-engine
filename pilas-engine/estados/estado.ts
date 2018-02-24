class Estado extends Phaser.State {
  pilas: Pilas;
  historia: any;
  bitmap: Phaser.BitmapData;
  canvas: any;
  texto: Phaser.Text;
  sprites: any;

  render() {
    this.canvas.bringToTop();
    this.bitmap.clear();

    if (this.pilas.depurador.modo_posicion_activado) {
      this.dibujar_puntos_de_control_de_todos_los_actores(this.bitmap);
      this.dibujar_limites_del_mundo(this.bitmap);
    }

    if (this.pilas.depurador.mostrar_fps) {
      this.bitmap.text("Cuadros por segundo: " + this.game.time.fps, 4, 16, "#ffffff");
    }
  }

  dibujar_puntos_de_control_de_todos_los_actores(bitmap) {
    this.game.world.children.forEach(sprite => {
      if (sprite["actor"]) {
        let _x = Math.round(sprite.x) - this.pilas.camara.x;
        let _y = Math.round(sprite.y) + this.pilas.camara.y;
        let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(_x, _y);

        this.dibujar_punto_de_control(bitmap, _x, _y, x, y);
      }
    });
  }

  dibujar_limites_del_mundo(bitmap) {
    bitmap.ctx.beginPath();

    bitmap.ctx.rect(0 - this.pilas.camara.x, 0 + this.pilas.camara.y, this.game.world.width, this.game.world.height);
    bitmap.ctx.strokeStyle = "white";
    bitmap.ctx.lineWidth = 1;
    bitmap.ctx.stroke();
  }

  dibujar_punto_de_control(bitmap, x, y, x_de_pilas, y_de_pilas) {
    bitmap.ctx.beginPath();
    bitmap.ctx.stroke();
    bitmap.ctx.strokeStyle = "black";
    bitmap.ctx.lineWidth = 4;

    bitmap.ctx.fillStyle = "white";
    bitmap.ctx.strokeText("×", x - 5, y + 3);
    bitmap.ctx.fillText("×", x - 5, y + 3);

    let coordenada = `(${x_de_pilas}, ${y_de_pilas})`;

    bitmap.ctx.strokeText(coordenada, x + 15, y + 15);
    bitmap.ctx.fillText(coordenada, x + 15, y + 15);

    bitmap.ctx.closePath();
  }

  create() {
    this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bitmap.ctx.font = "12px verdana";
    this.canvas = this.bitmap.addToWorld(0, 0);
    this.canvas.fixedToCamera = true;
    this.texto = this.game.make.text(0, 0, `...`, { font: "12px Verdana", fill: "#ffffff" });
    this.game.time.advancedTiming = true;
  }

  obtener_sprites() {
    return this.sprites;
  }

  actualizarPosicionDeFormaExterna(pos: any) {}

  dibujar_todos_los_puntos_de_las_posiciones_recorridas() {
    let bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    let canvas = bitmap.addToWorld(0, 0);

    this.historia.map(historia => {
      historia.map(entidad => {
        let { x, y } = this.pilas.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);
        bitmap.circle(x, y, 1, entidad.id_color);
      });
    });

    return canvas;
  }
}
