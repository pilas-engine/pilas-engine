class Actores {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  crear_actor(nombre: string) {
    let clase = window[nombre];
    let actor = new clase(this.pilas);

    // Toma las propiedades del actor pero como una extensión de las
    // propiedades iniciales.
    let p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);

    if (!p.nombre) {
      let nombre_asignado = this.pilas.escena.obtener_nombre_para(nombre);
      p.nombre = nombre_asignado;
    }

    actor.pre_iniciar(p);
    actor.iniciar();
    return actor;
  }

  actor() {
    return this.crear_actor("Actor");
  }

  aceituna(x: number = 0, y: number = 0) {
    return this.crear_actor("aceituna");
  }

  caja(x: number, y: number) {
    return this.crear_actor("caja");
  }

  conejo() {
    return this.crear_actor("conejo");
  }

  logo() {
    return this.crear_actor("logo");
  }

  moneda() {
    return this.crear_actor("moneda");
  }

  nave() {
    return this.crear_actor("nave");
  }

  nube() {
    return this.crear_actor("nube");
  }

  pared() {
    return this.crear_actor("pared");
  }

  pelota() {
    return this.crear_actor("pelota");
  }

  plataforma() {
    return this.crear_actor("plataforma");
  }

  suelo() {
    return this.crear_actor("suelo");
  }

  techo() {
    return this.crear_actor("techo");
  }

  texto() {
    return this.crear_actor("texto");
  }

  laser() {
    return this.crear_actor("laser");
  }

  deslizador() {
    return this.crear_actor("deslizador");
  }

  boton() {
    return this.crear_actor("boton");
  }

  boton_de_control_izquierda() {
    return this.crear_actor("boton_de_control_izquierda");
  }

  boton_de_control_derecha() {
    return this.crear_actor("boton_de_control_derecha");
  }

  boton_de_control_arriba() {
    return this.crear_actor("boton_de_control_arriba");
  }

  boton_de_control_abajo() {
    return this.crear_actor("boton_de_control_abajo");
  }

  boton_de_control_espacio() {
    return this.crear_actor("boton_de_control_espacio");
  }

  ceferino() {
    return this.crear_actor("ceferino");
  }

  robot() {
    return this.crear_actor("robot");
  }
}
