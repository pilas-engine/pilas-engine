class EscenaBase {
  pilas: Pilas;
  actores: Actor[];
  id: number;
  camara: Camara;
  fondo: string;

  constructor(pilas) {
    this.pilas = pilas;
    this.actores = [];
    this.pilas.utilidades.obtener_id_autoincremental();
    this.camara = new Camara(pilas);
    this.pilas.escenas.definir_escena_actual(this);
  }

  agregar_actor(actor: Actor) {
    this.actores.push(actor);
  }

  serializar() {
    return {
      camara_x: this.camara.x,
      camara_y: this.camara.y,
      fondo: this.fondo
    };
  }

  actualizar_actores() {
    let actores_a_eliminar = [];

    this.actores.map(actor => {
      if (!actor._vivo) {
        actor.sprite.destroy();

        if (actor._texto) {
          actor._texto.destroy();
        }

        actores_a_eliminar.push(actor);
        return;
      }

      actor.pre_actualizar();
      actor.actualizar_sensores();
      actor.actualizar();
    });

    actores_a_eliminar.map(actor => {
      this.quitar_actor_luego_de_eliminar(actor);
    });
  }

  quitar_actor_luego_de_eliminar(actor: Actor) {
    let posicion = this.actores.indexOf(actor);
    let id = actor["id"];

    if (posicion !== -1) {
      this.actores.splice(posicion, 1);
    } else {
      throw Error(`Se intentó eliminar un actor inexistente en la escena: id=${id} etiqueta=${actor.etiqueta}.`);
    }
  }

  terminar() {
    this.actores.map(e => e.eliminar());
    this.actualizar();
    this.actualizar_actores();
  }
}
