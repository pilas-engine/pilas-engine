class Actores {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  crear_actor(nombre: string, clase: any = null, imagen: string = null) {
    if (!clase) {
      clase = window[nombre];
    }

    let actor: Actor = new clase(this.pilas);

    // Toma las propiedades del actor pero como una extensión de las
    // propiedades iniciales.
    let p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);

    if (!p.nombre) {
      let nombre_asignado = this.pilas.escena.obtener_nombre_para(nombre);
      p.nombre = nombre_asignado;
    }

    if (imagen) {
      p.imagen = imagen;
    }

    actor.pre_iniciar(p);
    actor.iniciar();

    return actor;
  }

  vincular(nombre: string, clase: any) {
    if (!nombre || !clase) {
      throw new Error("Tiene que especificar el nombre del actor y la clase para vincularlo.");
    }

    this[nombre] = () => {
      return this.crear_actor(nombre, clase);
    };
  }

  actor() {
    return this.crear_actor("Actor");
  }

  aceituna() {
    return this.crear_actor("aceituna");
  }

  caja() {
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

  boton_izquierda() {
    return this.crear_actor("boton_izquierda");
  }

  boton_derecha() {
    return this.crear_actor("boton_derecha");
  }

  boton_arriba() {
    return this.crear_actor("boton_arriba");
  }

  boton_abajo() {
    return this.crear_actor("boton_abajo");
  }

  boton_espacio() {
    return this.crear_actor("boton_espacio");
  }

  robot() {
    return this.crear_actor("robot");
  }

  puntaje() {
    return this.crear_actor("puntaje");
  }

  reiniciar_escena() {
    return this.crear_actor("reiniciar_escena");
  }

  nube_animada() {
    return this.crear_actor("nube_animada");
  }

  pizarra(): pizarra {
    // @ts-ignore
    return this.crear_actor("pizarra");
  }

  explosion() {
    return this.crear_actor("explosion");
  }

  boton_activable() {
    return this.crear_actor("boton_activable");
  }

  pantalla_completa() {
    return this.crear_actor("pantalla_completa");
  }

  barra_de_energia() {
    return this.crear_actor("barra_de_energia");
  }

  interruptor_de_gravedad() {
    return this.crear_actor("interruptor_de_gravedad");
  }

  actor_basico(imagen: string) {
    return this.crear_actor("Actor", null, imagen);
  }
}
