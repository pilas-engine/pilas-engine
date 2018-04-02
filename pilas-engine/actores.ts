class Actores {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  caja(x, y) {
    return this.crear_actor("caja");
  }

  crear_actor(nombre) {
    let clase = window[nombre];
    let actor = new clase(this.pilas);

    // Toma las propiedades del actor pero como una extensión de las
    // propiedades iniciales.
    let p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);

    actor.pre_iniciar(p);
    actor.iniciar();
    return actor;
  }

  aceituna(x: number = 0, y: number = 0) {
    return this.crear_actor("aceituna");
  }

  conejo() {
    return this.crear_actor("conejo");
  }

  suelo() {
    return this.crear_actor("suelo");
  }

  pared() {
    return this.crear_actor("pared");
  }

  techo() {
    return this.crear_actor("techo");
  }

  plataforma() {
    return this.crear_actor("plataforma");
  }

  actor() {
    return this.crear_actor("Actor");
  }

  moneda() {
    return this.crear_actor("moneda");
  }

  nave() {
    return this.crear_actor("nave");
  }
}
