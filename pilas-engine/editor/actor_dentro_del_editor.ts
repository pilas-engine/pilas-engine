class ActorDentroDelEditor extends Phaser.Sprite {
  shadow: Phaser.Sprite;
  id: number;
  pilas: Pilas;

  iniciar(pilas, entidad) {
    this.key = entidad.imagen;
    this.id = entidad.id;
    this.pilas = pilas;
    this["actor"] = this;
    let { x, y } = this.pilas.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);
    this.x = x;
    this.y = y;
    this.rotacion = entidad.rotacion;
    this.scale.x = entidad.escala_x;
    this.scale.y = entidad.escala_y;
    this.anchor.x = entidad.centro_x;
    this.anchor.y = entidad.centro_y;
    this.alpha = 1 - entidad.transparencia / 100;

    this.inputEnabled = true;
    this.input.enableDrag();

    this.crear_sombra();

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
    this.shadow.x = this.x + 10;
    this.shadow.y = this.y + 10;
    this.shadow.scale = this.scale;
    this.shadow.angle = -this.rotacion;
  }

  crear_sombra() {
    this.shadow = this.game.add.sprite(10, 10, this.key);
    this.shadow.tint = 0x000000;
    this.shadow["ocultar_posicion"] = true;
    this.ocultar_sombra();
  }

  actualizar_desde_el_editor(datos) {
    let { x, y } = this.pilas.convertir_coordenada_de_pilas_a_phaser(datos.x, datos.y);

    this.x = x;
    this.y = y;
    this.scale.x = datos.escala_x;
    this.scale.y = datos.escala_y;
    this.anchor.x = datos.centro_x;
    this.anchor.y = datos.centro_y;
    this.alpha = 1 - datos.transparencia / 100;

    this.rotacion = datos.rotacion;
  }

  set rotacion(r) {
    this.angle = -r;
  }

  get rotacion() {
    return -this.angle;
  }

  destacar() {
    let ex = this.scale.x;
    let ey = this.scale.y;
    let i = Phaser.Easing.Linear.None;
    let y0 = ey;
    let y1 = ey + 0.05;
    let y2 = ey - 0.05;
    let x0 = ex;
    let x1 = ex - 0.05;
    let x2 = ex + 0.05;
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
