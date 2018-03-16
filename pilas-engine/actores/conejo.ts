class Conejo extends Actor {
  propiedades = {
    x: 0,
    y: 0,
    imagen: "salta",

    figura: "circulo",
    figura_ancho: 50,
    figura_alto: 100,
    figura_radio: 40,
    figura_sin_rotacion: true
  };

  iniciar() {
    //this.pilas.crear_animacion("camina");

    this.pilas.game.scene.scenes[0].anims.create({
      key: "camina",
      frames: [{ key: "camina1" }, { key: "camina2" }],
      frameRate: 20,
      repeat: -1
    });

    this.sprite.anims.play("camina");
    //this.sprite.anims.load("camina");
  }

  actualizar() {
    if (this.pilas.control.izquierda) {
      this.x -= 5;
      this.espejado = true;
    }

    if (this.pilas.control.derecha) {
      this.x += 5;
      this.espejado = false;
    }
  }
}
