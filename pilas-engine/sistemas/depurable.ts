/// <reference path="../_references.ts" />

class Depurable extends Sistema {
  cache: any = {};
  canvas: any;

  iniciar() {
    //this.requisitos = ['depurable', 'posicion'];
    this.requisitos = ['posicion'];
    this.canvas = this.pilas.game.add.graphics(0, 0);
    this.pilas.grupo_gui.add(this.canvas);
  }

  procesar(entidades: Entidades) {
    let entidades_filtradas = entidades.obtener_entidades_con(this.requisitos);
    let game = this.pilas.game;

    this.canvas.clear();
    this.canvas.beginFill(0xffffff);
    this.canvas.z = -1000;

    entidades_filtradas.map((e) => {
      let x = e.componentes.posicion.x + game.world.centerX;
      let y = game.world.centerY - e.componentes.posicion.y;

      this._dibujar_cruz_del_punto_de_control(this.canvas, x, y);
    });
  }

  _dibujar_cruz_del_punto_de_control(canvas, x, y) {
    // Dibuja el borde de la cruz.
    canvas.lineStyle(4, 0x000000, 1);
    this._dibujar_cruz(this.canvas, x, y, 4);

    // Dibuja el centro de la cruz.
    canvas.lineStyle(2, 0xffffff, 1);
    this._dibujar_cruz(this.canvas, x, y, 4 - 1);
  }


  _dibujar_cruz(canvas, x, y, l) {
    canvas.moveTo(x - l, y - l);
    canvas.lineTo(x + l, y + l);

    canvas.moveTo(x - l, y + l);
    canvas.lineTo(x + l, y - l);
  }

}
