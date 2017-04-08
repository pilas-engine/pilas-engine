/// <reference path="fondos/plano.ts" />

class Fondos extends Actores {
  Plano: any;
  Azul: any;

  _vincular_métodos_de_creación() {
    this.vincular(Plano);
    this.vincular(Azul);
  }
}
