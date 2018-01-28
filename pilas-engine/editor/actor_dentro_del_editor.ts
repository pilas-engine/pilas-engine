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

    this.events.onInputOver.add(this.cuando_posiciona_el_mouse_sobre_el_actor, this);
    this.events.onInputOut.add(this.cuando_deja_de_posicionar_el_mouse_sobre_el_actor, this);

    this.events.onDragStop.add(this.ocultar_sombra, this);
    this.events.onDragStop.add(this.cuando_termina_de_mover, this);
  }

  al_terminar_de_arrastrar(a: any) {}

  al_comenzar_a_arrastrar(a: any) {}

  cuando_comienza_a_mover() {
    if (this.al_comenzar_a_arrastrar) {
      let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(this.x, this.y);
      this.definir_puntero("-webkit-grabbing");
      this.al_comenzar_a_arrastrar({ id: this.id, x: x, y: y });
    }
  }

  cuando_posiciona_el_mouse_sobre_el_actor() {
    this.definir_puntero("-webkit-grab");
  }

  cuando_deja_de_posicionar_el_mouse_sobre_el_actor() {
    this.definir_puntero("default");
  }

  cuando_termina_de_mover() {
    if (this.al_terminar_de_arrastrar) {
      let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(this.x, this.y);
      this.definir_puntero("-webkit-grab");
      this.al_terminar_de_arrastrar({ id: this.id, x: x, y: y });
    }
  }

  definir_puntero(nombre) {
    this.game.canvas.style.cursor = nombre;
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
    this.shadow.scale = this.scale;
  }

  crear_sombra() {
    this.shadow = this.game.add.sprite(10, 10, this.key);
    this.shadow.tint = 0x000000;
    this.ocultar_sombra();
  }

  destacar() {
    let i = Phaser.Easing.Linear.None;
    let y0 = 1;
    let y1 = 1.05;
    let y2 = 0.95;
    let x0 = 1;
    let x1 = 0.95;
    let x2 = 1.05;
    let t = 70;

    let a = this.game.add.tween(this.scale).to({ y: y1, x: x1 }, t, i);
    let b = this.game.add.tween(this.scale).to({ y: y0, x: x0 }, t, i);
    let c = this.game.add.tween(this.scale).to({ y: y2, x: x2 }, t, i);
    let d = this.game.add.tween(this.scale).to({ y: y0, x: x0 }, t, i);

    a.chain(b);
    b.chain(c);
    c.chain(d);

    a.start();
  }
}
