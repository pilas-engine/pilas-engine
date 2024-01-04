class CamaraEnModoEdición extends Phaser.GameObjects.Container {
  pilas: Pilas;

  borde: Phaser.GameObjects.Rectangle;

  ancho;
  alto;

  constructor(pilas, scene, x, y, ancho, alto) {
    super(scene, x + ancho/2, y + alto/2);

    this.pilas = pilas;

    this.ancho = ancho;
    this.alto = alto;

    let manejador_ancho = 50;
    let manejador_alto = 20;

    let manejador: Phaser.GameObjects.Rectangle = null;

    this.borde = scene.add.rectangle(0, 0, ancho, alto);
    this.borde.setStrokeStyle(1, 0x00ff00);
    this.add(this.borde);

    let manejador_x = ancho/2 - manejador_ancho/2;
    let manejador_y = alto/2 + manejador_alto/2;

    manejador = scene.add.rectangle(manejador_x, manejador_y, manejador_ancho, manejador_alto);
    manejador.setStrokeStyle(2, 0x00ff00);
    manejador.setFillStyle(0x00ff00);
    manejador.setAlpha(0.25);

    this.add(manejador);

    //this.setSize(250, 25);

    this.setInteractive({
      draggable: true,
      hitArea: new Phaser.Geom.Rectangle(manejador_x-manejador_ancho/2, manejador_y-manejador_alto/2, manejador_ancho, manejador_alto),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });

    const icono = scene.add.sprite(manejador_x, manejador_y, "camara");

    this.add(icono);

    this.alpha = 0.75;

    this.setDepth(1000000000);

    this.on("pointermove", (data) => {
      this.alpha = 1;

      if (data.buttons) {
        this.scene.input.setDefaultCursor("grabbing");
      } else {
        this.scene.input.setDefaultCursor("grab");
      }
    });

    this.on("pointerout", () => {
      this.alpha = 0.75;
      this.scene.input.setDefaultCursor("default");
    });

    this.on("pointerdown", () => {
      this.scene.input.setDefaultCursor("grabbing");
    });

    this.on("pointerup", () => {
      this.scene.input.setDefaultCursor("grab");
    });

    this.on("drag", (evento, x, y) => {
      this.x = Math.floor(x);
      this.y = Math.floor(y);
    });

    this.on("dragend", () => {
      let p = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(this.x, this.y);
      this.pilas.mensajes.emitir_mensaje_al_editor("mientras_mueve_la_camara", { x: p.x, y: p.y });
    });
  }

  definirTamaño(x, y, ancho, alto) {
    this.borde.setSize(ancho, alto);
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  mover(x, y) {
    this.x = x;
    this.y = y;
  }
}

