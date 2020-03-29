class nube_animada extends Actor {
  propiedades = {
    imagen: "decoracion:objetos/decoracion_nube_1",
    z: 30
  };

  velocidad: number;

  iniciar() {
    this.z = 50;
    this.velocidad = 2;
  }

  actualizar() {
    this.x -= this.velocidad;

    if (this.x < -400) {
      this.x = 400;
      this.y = this.pilas.azar(-200, 200);
    }
  }
}
