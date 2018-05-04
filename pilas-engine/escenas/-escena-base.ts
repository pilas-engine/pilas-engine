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
    this.actores.map(actor => {
      if (!actor._vivo) {
        actor.sprite.destroy();

        if (actor._texto) {
          actor._texto.destroy();
        }

        this.quitar_actor_luego_de_eliminar(actor);
        return;
      }

      try {
        actor.pre_actualizar();
        actor.actualizar_sensores();
        actor.actualizar();
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_mensaje_al_editor("error_de_ejecucion", {
          mensaje: e.message,
          stack: e.stack.toString()
        });
      }
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
}
