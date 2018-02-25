class Nave extends Actor {
  velocidad = 5;

  iniciar() {
    this.imagen = "nave";
    this.y = 0;
    this.y = 9;
    console.log(this.y);
    //this.y += 1;
    this.pilas.reproducir_sonido("moneda");
  }

  actualizar() {
    if (this.pilas.control.izquierda) {
      this.rotacion += this.velocidad;
    }

    if (this.pilas.control.derecha) {
      this.rotacion -= this.velocidad;
    }

    if (this.pilas.control.arriba) {
      //console.log(this.y);
      //this.avanzar(this.rotacion, 0.00001);
      //this.pilas.reproducir_sonido("moneda");
    }
  }
}
