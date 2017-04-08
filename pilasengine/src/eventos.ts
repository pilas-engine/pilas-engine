class Eventos {
  pilas: Pilas;
  cambia_coleccion_de_actores: Phaser.Signal;

  constructor(pilas: Pilas) {
    this.pilas = pilas;

    this.cambia_coleccion_de_actores = new Phaser.Signal();
  }

}
