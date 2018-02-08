class Estado extends Phaser.State {
  pilas: Pilas;
  historia: any;
  bitmap: Phaser.BitmapData;
  canvas: any;
  texto: Phaser.Text;
  sprites: any;

  render() {

    function dibujarPuntoDeControl(bitmap, x, y, x_de_pilas, y_de_pilas) {

      bitmap.ctx.beginPath();
      bitmap.ctx.stroke();
      bitmap.ctx.strokeStyle = "black";
      bitmap.ctx.lineWidth = 4;

      bitmap.ctx.fillStyle = "white";
      bitmap.ctx.font = "12px verdana";
      bitmap.ctx.strokeText("×", x-5, y+3);
      bitmap.ctx.fillText("×", x-5, y+3);

      let coordenada = `(${x_de_pilas}, ${y_de_pilas})`;

      bitmap.ctx.strokeText(coordenada, x + 15, y + 15);
      bitmap.ctx.fillText(coordenada, x + 15, y + 15);

      bitmap.ctx.closePath();
    }


    this.canvas.bringToTop();
    this.bitmap.clear();


    if (this.pilas.depurador.modo_posicion_activado) {
      this.game.world.children.forEach(sprite => {
        if (!sprite["ocultar_posicion"]) {
          let _x = Math.round(sprite.x);
          let _y = Math.round(sprite.y);
          let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(_x, _y);

          dibujarPuntoDeControl(this.bitmap, _x, _y, x, y);
        }
      });
    }
  }

  create() {
    this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    this.canvas = this.bitmap.addToWorld(0, 0);
    this.texto = this.game.make.text(0, 0, `...`, { font: "12px Verdana", fill: "#ffffff" });
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
  }
}
