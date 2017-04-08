/**
 * Clase abstracta que representa una escena dentro del juego.
 */
class Escena {
  pilas: Pilas;
  interpolaciones: Interpolaciones;
  actores: any[] = [];

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.interpolaciones = new Interpolaciones(this.pilas);
  }

  /* TODO: Reemplazar por un grupo, o algo que simplifique el
           acceso y la gestión de los actores.  */
  agregar_actor(actor: any) {
    this.actores.push(actor);
    this.pilas.eventos.cambia_coleccion_de_actores.dispatch({cantidad: this.actores.length});
  }

  eliminar_actor(actor: any) {
    function funcion_filtro(unActor: Actor) {
        return unActor.id !== actor.id;
    };

    this.actores = this.actores.filter(funcion_filtro);
    this.pilas.eventos.cambia_coleccion_de_actores.dispatch({cantidad: this.actores.length});
  }


  private _actualizar_actores() {
    this.actores.forEach((e) => {
      e.pre_actualizar();
      e.actualizar();
      e.post_actualizar();
    });
  }

  /**
   * Carga el código inicial para la escena.
   *
   * Este método se invoca por el gestor de escenas una vez
   * que la escena se activa y pasa a ser la escena_actual de pilas.
   */
  iniciar() {

  }

  /**
   * Se invoca seis veces por segundo para mantener en funcionamiento el juego.
   */
  actualizar() {
    this._actualizar_actores();
    this.interpolaciones.actualizar();
  }

  /**
   * Se invoca desde el gestor de escenas cuando se cambia de una escena a otra.
   */
  terminar() {
    this._eliminar_a_todos_los_actores();
  }

  private _eliminar_a_todos_los_actores() {
    this.actores.forEach((actor) => {
      actor.eliminar();
    });
  }
}
