/// <reference path="estado.ts"/>

class EstadoEditor extends Estado {
  entidades: any;
  sprites: any;
  texto: any;
  historia: any;

  init(datos) {
    this.pilas = datos.pilas;
    this.entidades = datos.escena.actores;
    this.cuando_termina_de_mover = datos.cuando_termina_de_mover;
    this.cuando_comienza_a_mover = datos.cuando_comienza_a_mover;
    this.sprites = {};
    this.crear_texto_con_posicion_del_mouse();
  }

  cuando_termina_de_mover(a: any) {}

  cuando_comienza_a_mover(a: any) {}

  crear_texto_con_posicion_del_mouse() {
    var style = {
      font: "16px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "top"
    };

    let texto = this.game.add.text(0, 5, "", style);
    texto.setShadow(1, 1, "rgba(0, 0, 0, 0.5)", 3);
    texto["ocultar_posicion"] = true;
    this.texto = texto;
  }

  create() {
    this.game.stage.backgroundColor = "5b5";
  }

  update() {
    this.entidades = this.entidades.map(e => {
      var sprite = null;

      if (!this.sprites[e.id]) {
        sprite = new ActorDentroDelEditor(this.game, 0, 0, e.imagen);
        sprite.iniciar(pilas, e);

        sprite.al_terminar_de_arrastrar = this.cuando_termina_de_mover;
        sprite.al_comenzar_a_arrastrar = this.cuando_comienza_a_mover;

        this.world.add(sprite);
        this.sprites[e.id] = sprite;
      } else {
        sprite = this.sprites[e.id];
      }

      let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(sprite.x, sprite.y);

      e.x = x;
      e.y = y;

      sprite.anchor.set(e.centro_x, e.centro_y);

      return e;
    });

    if (this.pilas.depurador.modo_posicion_activado) {
      this.actualizar_texto_con_posicion_del_mouse();
    } else {
      this.texto.text = "";
    }
  }

  actualizar_texto_con_posicion_del_mouse() {
    let _x = Math.round(this.input.mousePointer.x);
    let _y = Math.round(this.input.mousePointer.y);

    let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(_x, _y);

    if (x !== -1 && y !== -1) {
      this.texto.text = "  Mouse: (" + x + ", " + y + ") ";
    }

    this.game.world.bringToTop(this.texto);
  }
}
