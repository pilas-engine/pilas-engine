class ModoFPS extends Modo {

  realizar_dibujado() {
    this.pilas.game.debug.text('' + this.pilas.game.time.fps, 2, 14, "#00ff00");
  }
}
