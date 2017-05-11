class Utils {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  convertir_coordenada_desde_pilas_a_phaser(x: number, y: number) {
    return {
      x: x + this.pilas.game.world.centerX,
      y0: this.pilas.game.world.centerY - y
    }
  }

  convertir_coordenada_desde_phaser_a_pilas(x: number, y: number) {
    return {
      x: x - this.pilas.game.world.centerX,
      y: this.pilas.game.world.centerY - y
    }

  }

}
