class EscenaBase {
  pilas: Pilas;
  actores: Actor[];
  id: number;
  camara: Camara;
  fondo: string;
  control: Control;
  _gravedad_x: number = 0;
  _gravedad_y: number = 1;
  eventos: EventosDeEscena;
  _observables: any;
  _actor_visor_observables: any;
  _sonidos_para_reproducir: any[];
  _sonidos_en_reproduccion: any;
  ancho: number;
  alto: number;
  desplazamiento_del_fondo_x: number;
  desplazamiento_del_fondo_y: number;
  proyecto: any;

  constructor(pilas) {
    this.pilas = pilas;
    this.actores = [];
    this.pilas.utilidades.obtener_id_autoincremental();
    this.camara = new Camara(pilas);
    this.pilas.escenas.definir_escena_actual(this);
    this.control = new Control(pilas);
    this.eventos = new EventosDeEscena(pilas);
    this._observables = null;
    this._sonidos_para_reproducir = [];
    this._sonidos_en_reproduccion = {};
    this.desplazamiento_del_fondo_x = 0;
    this.desplazamiento_del_fondo_y = 0;
  }

  reproducir_sonido(nombre: string) {
    return this.pilas.reproducir_sonido(nombre);
  }

  planificar_reproducir_sonido(sonido: string) {
    this._sonidos_para_reproducir.push(sonido);
  }

  observar(nombre: string, variable: any) {
    if (this._observables === null) {
      this._actor_visor_observables = this.pilas.actores.texto();
      this._actor_visor_observables.fijo = true;

      this._actor_visor_observables.centro_x = 0;
      this._actor_visor_observables.centro_y = 0;

      this._actor_visor_observables.x = 10 - this.pilas._ancho / 2;
      this._actor_visor_observables.y = -10 + this.pilas._alto / 2;

      this._observables = {};
      let self = this;

      this._actor_visor_observables.actualizar = function() {
        let texto = JSON.stringify(self._observables, null, 4)
          .replace(/{|}|"/g, "")
          .replace(/,\n/g, "\n")
          .replace(/    /g, "")
          .trim();

        this.texto = texto;
      };

      // se asegura de actualizar el actor por primera vez.
      this._actor_visor_observables.actualizar();
    }

    if (typeof variable == "number" && !Number.isInteger(variable)) {
      this._observables[nombre] = variable.toFixed(2);
    } else {
      this._observables[nombre] = `${variable}`;
    }
  }

  agregar_actor(actor: Actor) {
    this.actores.push(actor);
  }

  get gravedad_x() {
    return this._gravedad_x;
  }

  set gravedad_x(v: number) {
    this._gravedad_x = v;
    this.actualizar_gravedad();
  }

  get gravedad_y() {
    return this._gravedad_y;
  }

  set gravedad_y(v: number) {
    this._gravedad_y = v;
    this.actualizar_gravedad();
  }

  private actualizar_gravedad() {
    this.pilas.modo.matter.world.setGravity(this._gravedad_x, this._gravedad_y);
  }

  /*
   * Retorna un posible nombre para un actor sin que se repita con uno existente.
   *
   * Por ejemplo si se invoca con un nombre propuesto tipo 'nave' en una
   * escena que ya tiene dos actores llamados 'nave1' y 'nave2' esta función
   * retornará el nombre 'nave3'.
   */
  obtener_nombre_para(nombre_propuesto: string) {
    let nombres_que_pueden_colisionar = this.actores.map(e => e.nombre).filter(e => e.startsWith(nombre_propuesto));
    let contador = 1;
    let nombre_a_sugerir = nombre_propuesto;

    while (nombres_que_pueden_colisionar.indexOf(nombre_a_sugerir) > -1) {
      contador += 1;
      nombre_a_sugerir = nombre_propuesto + contador;
    }

    return nombre_a_sugerir;
  }

  serializar() {
    return {
      camara_x: this.camara.x,
      camara_y: this.camara.y,
      ancho: this.ancho,
      alto: this.alto,
      fondo: this.fondo,
      desplazamiento_del_fondo_x: this.desplazamiento_del_fondo_x,
      desplazamiento_del_fondo_y: this.desplazamiento_del_fondo_y
    };
  }

  pre_actualizar() {}

  actualizar() {}

  actualizar_actores() {
    let actores_a_eliminar = [];

    this.actores.map(actor => {

      try {

        if (!actor._vivo) {
          actor.sprite.destroy();

          if (actor["_canvas"]) {
            actor["_canvas"].destroy();
          }

          actor.sensores.map(s => {
            this.pilas.modo.matter.world.remove(s);
          });

          if (actor._texto) {
            actor._texto.destroy();
          }

          if (actor._fondo) {
            actor._fondo.destroy();
          }

          actores_a_eliminar.push(actor);
          return;
        }

        actor.pre_actualizar();
        actor.actualizar_habilidades();
        actor.actualizar();
        actor.actualizar_sensores();
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizando actores");
        this.pilas.modo.pausar();
      }
    });

    actores_a_eliminar.map(actor => {
      this.quitar_actor_luego_de_eliminar(actor);
    });
  }

  /**
   * Función interna que invoca el modo ejecución. Su objetivo es comenzar
   * a reproducir todos los sonidos pendientes, pero evitando reproducir
   * varias veces los mismos sonidos.
   *
   * También impone un límite de 20 sonidos sonidos repetidos en reproducción,
   * aunque se hallan comenzado a reproducir en instantes diferentes.
   */
  reproducir_sonidos_pendientes() {
    let sonidos = this._sonidos_para_reproducir;
    sonidos = sonidos.filter((v, i) => sonidos.indexOf(v) === i);
    const maximo = 20;

    for (let i = 0; i < sonidos.length; i++) {
      let nombre = sonidos[i];

      if (!this._sonidos_en_reproduccion[nombre]) {
        this._sonidos_en_reproduccion[nombre] = 0;
      }

      if (this._sonidos_en_reproduccion[nombre] < maximo) {
        this._sonidos_en_reproduccion[nombre] += 1;

        var sonido = this.pilas.modo.sound.add(nombre);
        sonido.play();
        sonido.once("complete", music => {
          this._sonidos_en_reproduccion[nombre] -= 1;
          this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_reproducir_sonido", { sonido: nombre });
        });
      }
    }

    this._sonidos_para_reproducir = [];
  }

  avisar_click_en_la_pantalla_a_los_actores(x: number, y: number, evento_original: any) {
    this.actores.map(actor => {
      try {
        actor.cuando_hace_click_en_la_pantalla(x, y, evento_original);
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "avisando click de pantalla");
        this.pilas.modo.pausar();
      }
    });
  }

  avisar_cuando_pulsa_tecla_a_los_actores(tecla: string, evento_original: any) {
    this.actores.map(e => {
      try {
        e.cuando_pulsa_tecla(tecla, evento_original);
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "avisando que pulsan tecla");
        this.pilas.modo.pausar();
      }
    });
  }

  avisar_cuando_suelta_tecla_a_los_actores(tecla: string, evento_original: any) {
    this.actores.map(e => {
      try {
        e.cuando_suelta_tecla(tecla, evento_original);
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "avisando que pulsan tecla");
        this.pilas.modo.pausar();
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

  terminar() {
    this.actores.map(e => {
      try {
        e.eliminar();
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "avisando click de pantalla");
        this.pilas.modo.pausar();
      }
    });
    this.actualizar();
    this.actualizar_actores();
    this.control.terminar();
  }

  /**
   * Se ejecuta cuando el usuario hace click con el mouse sobre la escena.
   */
  cuando_hace_click(x: number, y: number, evento_original: any) {}

  /**
   * Se ejecuta cuando se mueve el puntedo del mouse sobre la escena.
   */
  cuando_mueve(x: number, y: number, evento_original: any) {}

  /**
   * Se ejecuta una vez por segundo.
   */
  cada_segundo(segundos_transcurridos: number) {}

  /**
   * Se ejecuta en el momento en que el usuario pulsa una tecla del teclado.
   *
   * Esta función se llamará una sola vez por pulsación de tecla, sin importar
   * la repetición del teclado o si la tecla queda pulsada, solo se llamará
   * una sola vez.
   */
  cuando_pulsa_tecla(tecla: string, evento: any) {}

  /**
   * Se ejecuta en el momento en que una tecla pulsada se suelta.
   */
  cuando_suelta_tecla(tecla: string, evento: any) {}

  enviar_mensaje(mensaje: string, datos: any = {}) {
    this.cuando_llega_un_mensaje(mensaje, datos);

    // Intenta llamar a un método específico para este mensaje.
    if (this[`cuando_llega_el_mensaje_${mensaje}`]) {
      this[`cuando_llega_el_mensaje_${mensaje}`](datos);
    }
  }

  cuando_llega_un_mensaje(mensaje: string, datos: any = {}) {}
}
