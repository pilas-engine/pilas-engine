class ActorDentroDelEditor extends Phaser.Sprite {
  rotateSpeed: number;
  shadow: Phaser.Sprite;
  id: number;
  pilas: Pilas;

  iniciar(pilas, entidad) {
    this.key = entidad.imagen;
    this.id = entidad.id;
    this.pilas = pilas;
    let { x, y } = this.pilas.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);
    this.x = x;
    this.y = y;

    this.pivot.x = entidad.centro_x;
    this.pivot.y = entidad.centro_y;

    this.inputEnabled = true;
    this.input.enableDrag();

    this.crear_sombra();
    this["depurable"] = true;

    //this.tint = 0xaaaaff;

    this.conectar_eventos_arrastrar_y_soltar();
  }

  conectar_eventos_arrastrar_y_soltar() {
    this.events.onDragStart.add(this.cuando_comienza_a_mover, this);
    this.events.onDragStart.add(this.activar_sombra, this);

    this.events.onDragStop.add(this.ocultar_sombra, this);
    this.events.onDragStop.add(this.cuando_termina_de_mover, this);
  }

  al_terminar_de_arrastrar(a: any) {}

  al_comenzar_a_arrastrar(a: any) {}

  cuando_comienza_a_mover() {
    if (this.al_comenzar_a_arrastrar) {
      let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(this.x, this.y);
      this.al_comenzar_a_arrastrar({ id: this.id, x: x, y: y });
    }
  }

  cuando_termina_de_mover() {
    if (this.al_terminar_de_arrastrar) {
      let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(this.x, this.y);
      this.al_terminar_de_arrastrar({ id: this.id, x: x, y: y });
    }
  }

  activar_sombra() {
    this.shadow.alpha = 0.3;
  }

  ocultar_sombra() {
    this.shadow.alpha = 0.0;
  }

  update() {
    this.shadow.key = this.key;
    this.shadow.anchor.x = this.anchor.x;
    this.shadow.anchor.y = this.anchor.y;
    this.shadow.x = this.x + 5;
    this.shadow.y = this.y + 5;
  }

  crear_sombra() {
    this.shadow = this.game.add.sprite(10, 10, this.key);
    this.shadow.tint = 0x000000;
    this.ocultar_sombra();
  }

  destacar() {
    let i = Phaser.Easing.Linear.None;
    let a = this.game.add.tween(this).to({ alpha: 0.5 }, 200, i);
    let b = this.game.add.tween(this).to({ alpha: 1 }, 200, i);
    a.chain(b);

    a.start();
  }
}
