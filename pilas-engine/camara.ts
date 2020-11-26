class Camara {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  seguir_al_actor(actor: Actor, suavidad: number = 10, ignorar_limites: boolean = false) {
    let dx = actor.x - this.pilas.camara.x;
    let dy = actor.y - this.pilas.camara.y;

    this.pilas.camara.x += dx / suavidad;
    this.pilas.camara.y += dy / suavidad;

    if (!ignorar_limites) {
      this.pilas.camara.x = Math.max(this.pilas.camara.x, 0);
      this.pilas.camara.x = Math.min(this.pilas.camara.x, this.pilas.escena.ancho - this.pilas.modo.ancho / 2);

      this.pilas.camara.y = Math.min(this.pilas.camara.y, 0);
      this.pilas.camara.y = Math.max(this.pilas.camara.y, -(this.pilas.escena.alto - this.pilas.modo.alto));
    }
  }

  get camara_principal() {
    return this.pilas.modo.cameras.main;
  }

  vibrar(intensidad: number = 1, tiempo: number = 1) {
    let actor = this.pilas.actores.actor();
    actor.imagen = "imagenes:basicos/invisible";
    let posicion_inicial_x = this.x;
    let posicion_inicial_y = this.y;

    actor.actualizar = function() {
      if (this.contador === undefined) {
        this.contador = 0;
      }

      this.contador += 1;

      if (this.contador > tiempo * 60) {
        this.pilas.camara.x = posicion_inicial_x;
        this.pilas.camara.y = posicion_inicial_y;
        this.eliminar();
      } else {
        this.pilas.camara.x = posicion_inicial_x + this.pilas.azar(-1, 1) * intensidad;
        this.pilas.camara.y = posicion_inicial_y + this.pilas.azar(-1, 1) * intensidad;
      }
    };
  }

  get escala() {
    return this.camara_principal.zoom;
  }

  set escala(x: number) {
    this.pilas.utilidades.validar_numero(x);

    if (x >= 1 && x <= 10) {
      this.camara_principal.setZoom(x);
    }
  }

  get zoom() {
    return this.escala;
  }

  set zoom(x: number) {
    this.escala = x;
  }

  get x() {
    return this.camara_principal.scrollX;
  }

  set x(x: number) {
    this.pilas.utilidades.validar_numero(x);
    this.camara_principal.setScroll(x, -this.y);
  }

  get y() {
    return -this.camara_principal.scrollY;
  }

  set y(y: number) {
    this.pilas.utilidades.validar_numero(y);
    this.camara_principal.setScroll(this.x, -y);
  }

  get borde_izquierdo() {
    return -this.camara_principal.midPoint.x;
  }

  get borde_derecho() {
    return this.camara_principal.midPoint.x;
  }

  get borde_arriba() {
    return this.camara_principal.midPoint.y;
  }

  get borde_abajo() {
    return -this.camara_principal.midPoint.y;
  }
}
