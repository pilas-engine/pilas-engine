class ActorBase {
  tipo: String;
  sprite: Phaser.GameObjects.Sprite;
  pilas: Pilas;
  id_color: number;
  figura = "";
  sin_rotacion: false;
  automata: Automata;
  colisiones: Actor[];
  sensores: any[];
  _etiqueta: string = null;
  _vivo: boolean = true;
  _animacion_en_curso: string = "";
  _figura_ancho: number;
  _figura_alto: number;
  _figura_radio: number;
  _es_texto: boolean = false;
  _texto: any;
  texto: any;
  _id: any;
  _nombre: any;

  proyecto: any;

  _habilidades: any[];
  _comportamientos: { nombre_del_comportamiento: string; argumentos: any }[];
  _comportamiento_actual: Comportamiento = null;

  _fondo: any = null;
  _fondo_imagen: string = "";
  _dialogo: any = null;
  _fuente: string = "color-blanco-con-sombra";

  _texto_con_borde: boolean = false;
  _color_de_texto: string = "white";

  propiedades_base = {
    x: 0,
    y: 0,
    z: 0,
    imagen: "imagenes:basicos/sin_imagen",

    centro_x: 0.5,
    centro_y: 0.5,
    rotacion: 0,
    escala_x: 1,
    escala_y: 1,
    transparencia: 0,
    etiqueta: "actor",

    espejado: false,
    espejado_vertical: false,

    figura: "",
    figura_dinamica: true,
    figura_ancho: 100,
    figura_alto: 100,
    figura_radio: 40,
    figura_sin_rotacion: false,
    figura_rebote: 1,
    figura_sensor: false,

    es_texto: false,
    texto_con_borde: false,
    color: "white"
  };

  propiedades: any = {
    x: 0,
    y: 0,
    z: 0,
    imagen: "imagenes:basicos/sin_imagen",
    figura: ""
  };

  constructor(pilas) {
    this.pilas = pilas;
    this.automata = new Automata(this);
    this.colisiones = [];
    this._habilidades = [];
  }

  get propiedades_iniciales() {
    return this.propiedades;
  }

  pre_iniciar(propiedades) {
    let figura = propiedades.figura || "";

    this._id = propiedades.id || this.pilas.utilidades.obtener_id_autoincremental();
    this._nombre = propiedades.nombre;

    this.sensores = [];
    this._comportamientos = [];
    this._figura_ancho = propiedades.figura_ancho;
    this._figura_alto = propiedades.figura_alto;
    this._figura_radio = propiedades.figura_radio;
    this._es_texto = propiedades.es_texto;

    switch (figura) {
      case "rectangulo":
        this.sprite = this.crear_sprite("matter", propiedades.imagen);
        this.figura = figura;

        this.crear_figura_rectangular(propiedades.figura_ancho, propiedades.figura_alto);

        this.dinamico = propiedades.figura_dinamica;
        this.sin_rotacion = propiedades.figura_sin_rotacion;
        this.rebote = propiedades.figura_rebote;
        this.sensor = propiedades.figura_sensor;
        this.sprite.body["es_dinamica"] = this.dinamico;
        this.sprite.body["es_sensor"] = this.sensor;
        break;

      case "circulo":
        this.sprite = this.crear_sprite("matter", propiedades.imagen);
        this.figura = figura;
        this.crear_figura_circular(propiedades.figura_radio);

        this.dinamico = propiedades.figura_dinamica;
        this.sin_rotacion = propiedades.figura_sin_rotacion;
        this.rebote = propiedades.figura_rebote;
        this.sensor = propiedades.figura_sensor;
        this.sprite.body["es_dinamica"] = this.dinamico;
        this.sprite.body["es_sensor"] = this.sensor;
        break;

      case "ninguna":
      case "":
        this.figura = figura;
        this.sprite = this.crear_sprite("sprite", propiedades.imagen);
        break;

      default:
        throw Error(`No se conoce el tipo de figura ${figura}`);
    }

    this.interactivo = true;

    this.rotacion = propiedades.rotacion || 0;
    this.id_color = this.generar_color_para_depurar();
    this.etiqueta = propiedades.etiqueta;

    this.escala_x = propiedades.escala_x || 1;
    this.escala_y = propiedades.escala_y || 1;

    this.tipo = propiedades.tipo;
    this.centro_x = propiedades.centro_x || 0.5;
    this.centro_y = propiedades.centro_y || 0.5;
    this.transparencia = propiedades.transparencia || 0;
    this.x = propiedades.x || 0;
    this.y = propiedades.y || 0;
    this.z = propiedades.z || 0;
    this.espejado = propiedades.espejado;
    this.espejado_vertical = propiedades.espejado_vertical;

    this.sprite["actor"] = this;

    if (propiedades.es_texto) {
      this.texto = propiedades.texto;
      this.fuente = propiedades.fuente;

      if (propiedades.fondo) {
        this.fondo = propiedades.fondo;
      }
    }

    this.sprite.update = () => {
      this.ejecutar_de_modo_seguro(() => {
        this.actualizar();
      });
    };

    this.sprite.on("animationcomplete", (anim, frame) => {
      this.ejecutar_de_modo_seguro(() => {
        if (frame.isLast) {
          let nombre = anim.key.split("-")[1];
          // una vez que avisó que terminó la animación la repite.
          this.sprite.anims.play(anim.key);
          this.cuando_finaliza_animacion(nombre);
          this.automata.cuando_finaliza_animacion(nombre);
        }
      });
    });

    this.sprite.on("pointerdown", cursor => {
      this.ejecutar_de_modo_seguro(() => {
        let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
        this.cuando_hace_click(posicion.x, posicion.y, cursor);
      });
    });

    this.sprite.on("pointerup", cursor => {
      this.ejecutar_de_modo_seguro(() => {
        let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
        this.cuando_termina_de_hacer_click(posicion.x, posicion.y, cursor);
      });
    });

    this.sprite.on("pointerout", cursor => {
      this.ejecutar_de_modo_seguro(() => {
        let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
        this.cuando_sale(posicion.x, posicion.y, cursor);
      });
    });

    this.sprite.on("pointermove", cursor => {
      this.ejecutar_de_modo_seguro(() => {
        let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
        this.cuando_mueve(posicion.x, posicion.y, cursor);
      });
    });

    this.pilas.escena.agregar_actor(this);
  }

  ejecutar_de_modo_seguro(funcion) {
    try {
      funcion();
    } catch (e) {
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizar actor");
      this.pilas.modo.pausar();
    }
  }

  private crear_sprite(tipo, imagen_inicial) {
    let galeria = null;
    let imagen = null;
    let sprite = null;

    this.pilas.utilidades.validar_que_existe_imagen(imagen_inicial);

    // Como las imágenes pueden ser cadenas que representen cuadros
    // dentro de un spritesheet (caso "spritesheet:imagen") o el nombre de una
    // imagen normal (caso "imagen") se utiliza esta comprobación para
    // distinguir cualquiera de estos casos.
    if (imagen_inicial.indexOf(":") > -1) {
      galeria = imagen_inicial.split(":")[0];
      imagen = imagen_inicial.split(":")[1];
    } else {
      galeria = null;
      imagen = imagen_inicial;
    }

    switch (tipo) {
      case "matter":
        if (galeria) {
          sprite = this.pilas.modo.matter.add.sprite(0, 0, galeria, imagen);
        } else {
          sprite = this.pilas.modo.matter.add.sprite(0, 0, imagen);
        }
        break;

      case "sprite":
        if (galeria) {
          sprite = this.pilas.modo.add.sprite(0, 0, galeria, imagen);
        } else {
          sprite = this.pilas.modo.add.sprite(0, 0, imagen);
        }
        break;

      default:
        throw Error(`No se puede crear un sprite de tipo ${tipo}`);
    }

    return sprite;
  }

  protected copiar_atributos_de_sprite(origen, destino) {
    destino.x = origen.x;
    destino.y = origen.y;
    destino.angle = origen.angle;
    destino.scaleX = origen.scaleX;
    destino.scaleY = origen.scaleY;

    destino.alpha = origen.alpha;
    destino.flipX = origen.flipX;
    destino.flipY = origen.flipY;
    destino.depth = origen.depth;

    destino.setOrigin(origen.originX, origen.originY);
  }

  iniciar() {}

  get interactivo() {
    return this.sprite.input.enabled;
  }

  set interactivo(activo: boolean) {
    if (activo) {
      this.sprite.setInteractive();
    } else {
      this.sprite.disableInteractive();
    }
  }

  set area_de_interactividad(v: any) {
    console.warn("No pude definir el area así, use definir_area_de_interactividad");
  }

  definir_area_de_interactividad(ancho: number, alto: number) {
    // TODO: usar hitArea.setSize cuando actualicemos phaser > 3.16.2
    if (this.sprite) {
      this.sprite.width = ancho;
      this.sprite.height = alto;
      this.sprite.input.hitArea.width = ancho;
      this.sprite.input.hitArea.height = alto;
      this.sprite.setOrigin(this.centro_x, this.centro_y);
    } else {
      console.log("aún no tiene sprite");
    }
  }

  cuando_hace_click_en_la_pantalla(x: number, y: number, evento_original: any) {}

  get area_de_interactividad() {
    let ancho = this.sprite.input.hitArea.width;
    let alto = this.sprite.input.hitArea.height;

    return { ancho, alto };
  }

  set fondo(fondo: string) {}

  serializar() {
    let texto = "";
    let fondo = "";
    let fuente = "";

    if (this._es_texto) {
      texto = this._texto.text;
      fondo = this._fondo_imagen;
      fuente = this._fuente;
    }

    let sensores_serializados = [];

    if (this.sensores) {
      sensores_serializados = this.sensores.map(e => {
        return e.vertices.map(e => {
          return {
            x: e.x,
            y: e.y,
            isInternal: e.isInternal
            //
          };
        });
      });
    }

    return {
      tipo: this.tipo,
      x: Math.round(this.x),
      y: Math.round(this.y),
      z: Math.round(this.z),
      centro_x: this.centro_x,
      centro_y: this.centro_y,
      rotacion: this.rotacion,
      escala_x: this.escala_x,
      escala_y: this.escala_y,
      imagen: this.imagen,

      figura: this.figura,
      figura_ancho: this.figura_ancho,
      figura_alto: this.figura_alto,
      figura_radio: this.figura_radio,

      figura_dinamica: this.dinamico,
      figura_sensor: this.sensor,

      fijo: this.fijo,

      es_texto: this._es_texto,
      texto: texto,
      fondo: fondo,
      fuente: fuente,
      texto_con_borde: this._texto_con_borde,
      color_de_texto: this._color_de_texto,

      espejado: this.espejado,
      espejado_vertical: this.espejado_vertical,
      transparencia: this.transparencia,
      id_color: this.id_color,

      sensores: sensores_serializados
    };
  }

  set etiqueta(etiqueta) {
    this._etiqueta = etiqueta;
  }

  get etiqueta() {
    return this._etiqueta;
  }

  tiene_etiqueta(etiqueta: string) {
    return this.etiqueta === etiqueta;
  }

  generar_color_para_depurar() {
    return this.pilas.utilidades.obtener_color_al_azar();
  }

  pre_actualizar() {
    if (this.figura && this.sin_rotacion) {
      (this.sprite as any).setAngularVelocity(0);
    }

    this.actualizar_comportamientos();
    this.automata.actualizar();
  }

  actualizar_comportamientos() {
    if (this._comportamiento_actual) {
      let termina = this._comportamiento_actual.actualizar();

      if (termina) {
        if (this._comportamientos.length > 0) {
          this._adoptar_siguiente_comportamiento();
        } else {
          this._comportamiento_actual = null;
        }
      }
    } else {
      if (this._comportamientos.length > 0) {
        this._adoptar_siguiente_comportamiento();
      }
    }
  }

  private _adoptar_siguiente_comportamiento() {
    let datos = this._comportamientos[0];
    let nombre = datos.nombre_del_comportamiento;

    let clase = this.pilas.comportamientos.buscar(nombre);

    if (clase) {
      let instancia = new clase(this.pilas, this);
      instancia.iniciar(datos.argumentos);

      // Nota: solo comienza a actualizar el comportamiento si no se limpió la lista
      //       de comportamientos desde la función iniciar. Por ejemplo, si el usuario
      //       en iniciar llama a "hacer_inmediatamente" o "limpiar_comportamientos" no se
      //       tiene que seguir actualizando este comportamiento.
      if (this._comportamientos.length > 0) {
        this._comportamientos.shift();
        this._comportamiento_actual = instancia;
      }
    }
  }

  hacer(nombre_del_comportamiento, argumentos: any = undefined) {
    this.pilas.comportamientos.validar_si_existe(nombre_del_comportamiento);
    this._comportamientos.push({ nombre_del_comportamiento, argumentos });
  }

  eliminar_comportamientos() {
    this._comportamientos = [];
    this._comportamiento_actual = null;
  }

  hacer_inmediatamente(nombre_del_comportamiento, argumentos: any = undefined) {
    this.eliminar_comportamientos();
    this.hacer(nombre_del_comportamiento, argumentos);
  }

  get estado() {
    return this.automata.estado;
  }

  set estado(estado) {
    this.automata.estado = estado;
  }

  actualizar() {}

  actualizar_habilidades() {
    this._habilidades.map(h => {
      h.actualizar();
    });
  }

  actualizar_sensores() {
    let Body = this.pilas.Phaser.Physics.Matter.Matter.Body;
    this.sensores.map(s => {
      let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(this.x, this.y);

      Body.setPosition(s, {
        x: x + s.distancia_x,
        y: y - s.distancia_y
      });

      Body.setVelocity(s, { x: 0, y: 0 });
      Body.setAngularVelocity(s, 0);

      // Descarta colisiones con actores que ya no están en la escena.
      s.colisiones = s.colisiones.filter(a => a._vivo);
    });
  }

  get imagen(): string {
    if (this.sprite.frame.name === "__BASE") {
      return this.sprite.texture.key;
    } else {
      return `${this.sprite.texture.key}:${this.sprite.frame.name}`;
    }
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(a: any) {
    throw new Error("No puede definir este atributo");
  }

  get id() {
    return this._id;
  }

  set id(a: any) {
    throw new Error("No puede definir este atributo");
  }

  set imagen(nombre: string) {
    let galeria = null;
    let imagen = null;

    this.pilas.utilidades.validar_que_existe_imagen(nombre);

    if (nombre.indexOf(":") > -1) {
      galeria = nombre.split(":")[0];
      imagen = nombre.split(":")[1];
    } else {
      galeria = null;
      imagen = nombre;
    }

    if (galeria) {
      this.sprite.setTexture(galeria, imagen);
    } else {
      this.sprite.setTexture(imagen);
    }
  }

  set x(_x) {
    if (this.pilas.utilidades.es_animacion(_x)) {
      this.pilas.animar(this, "x", _x);
    } else {
      this.pilas.utilidades.validar_numero(_x);
      let { x } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, 0);
      this.sprite.x = x;
    }
  }

  get x() {
    let { x } = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(this.sprite.x, 0);
    return x;
  }

  set y(_y: any) {
    if (this.pilas.utilidades.es_animacion(_y)) {
      this.pilas.animar(this, "y", _y);
    } else {
      this.pilas.utilidades.validar_numero(_y);
      let { y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(0, _y);
      this.sprite.y = y;
    }
  }

  get y() {
    let { y } = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(0, this.sprite.y);
    return y;
  }

  set z(_z: number) {
    this.pilas.utilidades.validar_numero(_z);
    this.sprite.depth = -_z;
  }

  get z() {
    return -this.sprite.depth;
  }

  set rotacion(angulo: any) {
    if (this.pilas.utilidades.es_animacion(angulo)) {
      this.pilas.animar(this, "rotacion", angulo);
    } else {
      this.pilas.utilidades.validar_numero(angulo);
      this.sprite.angle = -(angulo % 360);
    }
  }

  get rotacion() {
    return -this.sprite.angle % 360;
  }

  set escala_x(s) {
    if (this.pilas.utilidades.es_animacion(s)) {
      this.pilas.animar(this, "escala_x", s);
    } else {
      this.pilas.utilidades.validar_numero(s);
      this.sprite.scaleX = s;
    }
  }

  get escala_x() {
    return this.sprite.scaleX;
  }

  set escala_y(s) {
    if (this.pilas.utilidades.es_animacion(s)) {
      this.pilas.animar(this, "escala_y", s);
    } else {
      this.pilas.utilidades.validar_numero(s);
      this.sprite.scaleY = s;
    }
  }

  get escala_y() {
    return this.sprite.scaleY;
  }

  get escala() {
    return this.escala_x;
  }

  set escala(escala) {
    if (this.pilas.utilidades.es_animacion(escala)) {
      this.pilas.animar(this, "escala", escala);
    } else {
      this.pilas.utilidades.validar_numero(escala);
      this.escala_x = escala;
      this.escala_y = escala;
    }
  }

  get centro_y() {
    return this.sprite.originY;
  }

  set centro_y(y) {
    let comunes = {
      centro: 0.5,
      arriba: 0,
      abajo: 1,
      medio: 0.5
    };

    if (comunes[y] !== undefined) {
      y = comunes[y];
    }

    this.pilas.utilidades.validar_numero(y);
    this.sprite.setOrigin(this.centro_x, y);
  }

  get centro_x() {
    return this.sprite.originX;
  }

  set centro_x(x) {
    let comunes = {
      centro: 0.5,
      izquierda: 0,
      derecha: 1,
      medio: 0.5
    };

    if (comunes[x] !== undefined) {
      x = comunes[x];
    }

    this.pilas.utilidades.validar_numero(x);
    this.sprite.setOrigin(x, this.centro_y);
  }

  set transparencia(t) {
    if (this.pilas.utilidades.es_animacion(t)) {
      this.pilas.animar(this, "transparencia", t);
    } else {
      this.pilas.utilidades.validar_numero(t);
      t = this.pilas.utilidades.limitar(t, 0, 100);
      this.sprite.alpha = 1 - t / 100;
    }
  }

  get transparencia() {
    return (1 - this.sprite.alpha) * 100;
  }

  toString() {
    let clase = this.constructor["name"];

    if (this.esta_vivo()) {
      let x = this.x.toFixed(2);
      let y = this.y.toFixed(2);
      return `<${clase} en (${x}, ${y})>`;
    } else {
      `<${clase} eliminado>`;
    }
  }

  fallar_si_no_tiene_figura() {
    if (!this.figura) {
      throw Error(`Este actor no tiene figura física, no se puede llamar a este método`);
    }
  }

  crear_figura_rectangular(ancho: number = 0, alto: number = 0) {
    this.fallar_si_no_tiene_figura();

    this.pilas.utilidades.validar_numero(ancho);
    this.pilas.utilidades.validar_numero(alto);

    (this.sprite as any).setRectangle(ancho, alto);
    //(this.sprite as any).setFriction(0, 0, 0);
  }

  crear_figura_circular(radio: number = 0) {
    this.fallar_si_no_tiene_figura();

    this.pilas.utilidades.validar_numero(radio);

    if (radio < 1) {
      radio = 30;
    }

    (this.sprite as any).setCircle(radio);
    //(this.sprite as any).setFriction(0, 0, 0);
  }

  get ancho() {
    return this.sprite.width;
  }

  get alto() {
    return this.sprite.height;
  }

  set alto(a: number) {
    throw new Error("No puede definir este atributo");
  }

  set ancho(a: number) {
    throw new Error("No puede definir este atributo");
  }

  get estatico() {
    if ((this.sprite as any).isStatic !== undefined) {
      return (this.sprite as any).isStatic();
    }

    return false;
  }

  set estatico(estatico: boolean) {
    if ((this.sprite as any).setStatic !== undefined) {
      (this.sprite as any).setStatic(estatico);
      (this.sprite as any).setVelocity(0, 0);
    } else {
      console.warn("Este actor no tiene figura, ignorando valor estatico/dinámico.");
    }
  }

  set dinamico(dinamico: boolean) {
    this.estatico = !dinamico;
  }

  get dinamico() {
    return !this.estatico;
  }

  impulsar(x, y) {
    this.fallar_si_no_tiene_figura();
    (this.sprite as any).setVelocity(x, -y);
  }

  get velocidad_x() {
    this.fallar_si_no_tiene_figura();
    return (this.sprite.body as any).velocity.x;
  }

  set velocidad_x(valor: number) {
    this.fallar_si_no_tiene_figura();
    (this.sprite as any).setVelocityX(valor);
  }

  get velocidad_y() {
    this.fallar_si_no_tiene_figura();
    return -(this.sprite.body as any).velocity.y;
  }

  set velocidad_y(valor: number) {
    this.fallar_si_no_tiene_figura();
    (this.sprite as any).setVelocityY(-valor);
  }

  set rebote(valor: number) {
    this.pilas.utilidades.validar_numero(valor);
    this.fallar_si_no_tiene_figura();
    (this.sprite as any).setBounce(valor);
  }

  get rebote() {
    this.fallar_si_no_tiene_figura();
    return (this.sprite.body as any).restitution;
  }

  set sensor(valor: boolean) {
    this.fallar_si_no_tiene_figura();
    (this.sprite as any).setSensor(valor);
  }

  get sensor() {
    if ((this.sprite as any).body && (this.sprite.body as any).isSensor !== undefined) {
      return (this.sprite as any).isSensor();
    }

    return false;
  }

  get fijo() {
    return this.sprite.scrollFactorX == 0;
  }

  set fijo(valor: boolean) {
    if (valor) {
      this.sprite.setScrollFactor(0, 0);

      if (this._texto) {
        this._texto.setScrollFactor(0, 0);
      }
    } else {
      this.sprite.setScrollFactor(1, 1);

      if (this._texto) {
        this._texto.setScrollFactor(1, 1);
      }
    }
  }

  set espejado(valor: boolean) {
    this.sprite.setFlipX(valor);
  }

  get espejado() {
    return this.sprite.flipX;
  }

  set espejado_vertical(valor: boolean) {
    this.sprite.setFlipY(valor);
  }

  get espejado_vertical() {
    return this.sprite.flipY;
  }

  cada_segundo(segundos_transcurridos: number) {}

  avanzar(rotacion: number = null, velocidad: number = 1) {
    if (rotacion === null) {
      rotacion = this.rotacion;
    }

    let r = this.pilas.utilidades.convertir_angulo_a_radianes(rotacion);

    this.x += Math.cos(r) * velocidad;
    this.y += Math.sin(r) * velocidad;
  }

  crear_animacion(nombre, cuadros, velocidad) {
    this.pilas.animaciones.crear_animacion(nombre, cuadros, velocidad);
  }

  reproducir_animacion(nombre_de_la_animacion) {
    this.sprite.anims.play(nombre_de_la_animacion);
  }

  cuando_finaliza_animacion(animacion: string) {}

  set animacion(nombre) {
    if (this._animacion_en_curso !== nombre) {
      if (this.pilas.animaciones.existe_animacion(nombre)) {
        this.reproducir_animacion(nombre);
        this._animacion_en_curso = nombre;
      } else {
        throw Error(`No se ha creado la animación '${nombre}' previamente`);
      }
    }
  }

  get animacion() {
    return this._animacion_en_curso;
  }

  cuando_comienza_una_colision(actor: Actor) {}

  cuando_se_mantiene_una_colision(actor: Actor) {}

  cuando_termina_una_colision(actor: Actor) {}

  /**
   * Se llama en todo momento en que se produce una colisión.
   */
  cuando_colisiona(actor: Actor) {}

  cuando_hace_click(x, y, evento_original) {}

  cuando_termina_de_hacer_click(x, y, evento_original) {}

  cuando_sale(x, y, evento_original) {}

  cuando_mueve(x, y, evento_original) {}

  cuando_pulsa_tecla(tecla: string, evento_original: any) {}

  cuando_suelta_tecla(tecla: string, evento_original: any) {}

  get cantidad_de_colisiones() {
    return this.colisiones.length;
  }

  agregar_sensores_desde_lista(lista_de_sensores) {
    lista_de_sensores.map(sensor => {
      this.agregar_sensor(sensor.ancho, sensor.alto, sensor.x, sensor.y, sensor.nombre);
    });
  }

  agregar_sensor(ancho, alto, x, y, nombre = "sin nombre") {
    let pos = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(x, y);

    let figura = this.pilas.modo.matter.add.rectangle(pos.x, pos.y, ancho, alto, {
      isSensor: true,
      isStatic: false
    });

    figura.distancia_x = x;
    figura.distancia_y = y;

    figura["es_sensor"] = true;
    figura["es_dinamica"] = true;

    figura.sensor_del_actor = this;
    figura.colisiones = [];
    figura["nombre"] = nombre;

    this.sensores.push(figura);
    return figura;
  }

  eliminar() {
    this._vivo = false;
  }

  esta_vivo() {
    return this._vivo;
  }

  get fuente() {
    return "";
  }

  set fuente(fuente: string) {}

  set figura_ancho(valor: number) {
    throw new Error("No puede definir este atributo");
  }

  get figura_ancho() {
    return this._figura_ancho;
  }

  set figura_alto(valor: number) {
    throw new Error("No puede definir este atributo");
  }

  get figura_alto() {
    return this._figura_alto;
  }

  set figura_radio(valor: number) {
    throw new Error("No puede definir este atributo");
  }

  get figura_radio() {
    return this._figura_radio;
  }

  /**
   * Muestra un mensaje como si se tratara de un globo de historieta. Llamar
   * a este método borra el dialogo anterior si existiera.
   */
  decir(mensaje: string, duracion: number = 4) {
    if (this._dialogo) {
      this._dialogo.eliminar();
      this._dialogo = null;
    }

    let texto = this.pilas.actores.texto();
    texto.texto = mensaje;
    texto.x = this.x - 15;
    texto.y = this.y + this.alto;
    texto.fuente = "color-negro";
    texto.transparencia = 100;
    texto.transparencia = [0];
    texto.fondo = "imagenes:redimensionables/dialogo";
    texto.color = "black";
    texto.centro_x = 1;
    texto.centro_y = 1;
    texto.z = this.z - 1;

    texto.texto = mensaje;
    mantener_en_pantalla();

    function mantener_en_pantalla() {
      // Evita que salga por el borde izquierdo.
      if (texto.x - texto.sprite.width < texto.pilas.camara.borde_izquierdo) {
        texto.x = texto.pilas.camara.borde_izquierdo + texto.sprite.width;
      }

      // Evita que salga por el borde derecho.
      if (texto.x + 20 > texto.pilas.camara.borde_derecho) {
        texto.x = texto.pilas.camara.borde_derecho - 20;
      }

      // Evita que salga por el borde de arriba.
      if (texto.y + texto.sprite.height > texto.pilas.camara.borde_arriba) {
        texto.y = texto.pilas.camara.borde_arriba - texto.sprite.height;
      }

      // Evita que salga por el borde de abajo.
      if (texto.y - 15 < texto.pilas.camara.borde_abajo) {
        texto.y = texto.pilas.camara.borde_abajo + 15;
      }
    }

    texto.actualizar = () => {
      if (this.esta_vivo()) {
        texto.x = this.x - 15;
        texto.y = this.y + this.alto;
        mantener_en_pantalla();
      }
    };

    this._dialogo = texto;

    this.pilas.luego(duracion, () => {
      if (texto.esta_vivo()) {
        texto.eliminar();

        if (texto === this._dialogo) {
          this._dialogo = null;
        }
      }
    });
  }

  aprender(habilidad: string) {
    let clase = this.pilas.habilidades.buscar(habilidad);

    if (clase) {
      if (this.tiene_habilidad(clase.name)) {
        console.warn(`No se aplica la habilidad ${clase.name} porque el actor ya la tenía vinculada.`);
      } else {
        let instancia = new clase(this.pilas, this);
        instancia.iniciar();
        this._habilidades.push(instancia);
      }
    }
  }

  olvidar(habilidad: string) {
    let clase = this.pilas.habilidades.buscar(habilidad);

    if (clase) {
      if (!this.tiene_habilidad(clase.name)) {
        console.warn(`No se puede olvidar la habilidad '${clase.name}' porque el actor no la tiene.`);
      } else {
        let indice = this._habilidades.findIndex(e => e.constructor.name == clase.name);
        let habilidad_a_eliminar = this._habilidades[indice];
        habilidad_a_eliminar.eliminar();
        this._habilidades.splice(indice, 1);
      }
    }
  }

  tiene_habilidad(habilidad: string) {
    return (
      this._habilidades.filter(h => {
        return h.constructor.name === habilidad;
      }).length > 0
    );
  }

  aumentar(cantidad: number = 1) {}

  set con_borde(con_borde: boolean) {
    // ver ActorTextoBase.con_borde
    this._texto_con_borde = con_borde;
  }

  set color(color: string) {
    // ver ActorTextoBase.color
    this._color_de_texto = color;
  }

  get control() {
    return this.pilas.control;
  }

  /**
   * Retorna la distancia en pixels entre este actor y otro punto
   * de la pantalla.
   */
  obtener_distancia_al_punto(x: number, y: number) {
    return this.pilas.utilidades.obtener_distancia_entre(this.x, this.y, x, y);
  }

  /**
   * Retorna la distancia en pixels de este actor a otro.
   */
  obtener_distancia_al_actor(actor: Actor) {
    return this.obtener_distancia_al_punto(actor.x, actor.y);
  }

  /**
   * Mueve el personaje en la dirección indicada.
   */
  mover_hacia_el_punto(x: number, y: number, velocidad: number = 10) {
    let angulo = this.pilas.obtener_angulo_entre_puntos(this.x, this.y, x, y);
    this.avanzar(angulo, velocidad);
  }

  enviar_mensaje(mensaje: string, datos: any = {}) {
    this.cuando_llega_un_mensaje(mensaje, datos);

    // Intenta llamar a un método específico para este mensaje.
    if (this[`cuando_llega_el_mensaje_${mensaje}`]) {
      this[`cuando_llega_el_mensaje_${mensaje}`](datos);
    }
  }

  cuando_llega_un_mensaje(mensaje: string, datos: any = {}) {}

  /**
   * Envía un mensaje a todos los actores y la escena actual.
   *
   * Para capturar estos mensajes desde actores o la escena, se tiene
   * que crear un método de la forma "cuando_llega_el_mensaje_nombre" donde
   * "nombre" tiene que ser mensaje que se quiere capturar.
   *
   * Por ejemplo, si un actor llama al código "this.enviar_mensaje_global('ganar')"
   * deberías poder capturar ese mensaje desde cualquier actor o escena
   * declarando el método "cuando_llega_el_mensaje_ganar".
   */
  enviar_mensaje_global(mensaje: string, datos: any = {}) {
    this.pilas.enviar_mensaje_global(mensaje, datos);
  }

  get camara() {
    return this.pilas.camara;
  }

  hacer_recorrido(posiciones, duracion = 1, veces = 1, seguir_rotacion = false) {
    this.pilas.utilidades.validar_parametro_lista_de_numeros_pares("posiciones", posiciones);
    this.pilas.utilidades.validar_parametro_numero_positivo("duracion", duracion);
    this.pilas.utilidades.validar_parametro_numero_entero_cero_o_positivo("veces", veces);

    let puntos_a_recorrer = [this.x, this.y].concat(posiciones);
    let curve = new Phaser.Curves.Spline(puntos_a_recorrer);

    let anterior_x = this.x;
    let anterior_y = this.y;

    this.pilas.modo.tweens.add({
      targets: { t: 0 },
      t: 1,
      ease: "Linear",
      duration: duracion * 1000,
      yoyo: false,
      repeat: veces - 1,
      onUpdate: (tween, target) => {
        let { x, y } = curve.getPoint(target.t);
        if (this.esta_vivo()) {
          this.x = x;
          this.y = y;

          if (seguir_rotacion) {
            let dx = this.x - anterior_x;
            let dy = this.y - anterior_y;
            this.rotacion = this.pilas.utilidades.convertir_radianes_a_angulos(Math.atan2(dy, dx));
          }

          anterior_x = x;
          anterior_y = y;
        }
      }
    });
  }

  obtener_sensor(nombre: string) {
    let figura = this.sensores.find(e => e.nombre === nombre);

    if (!figura) {
      let nombres_de_sensores = this.sensores.map(s => s.nombre);

      if (nombres_de_sensores.length > 0) {
        let sugerencia = this.pilas.utilidades.obtener_mas_similar(nombre, nombres_de_sensores);
        throw Error(`No existe un sensor que se llame "${nombre}". ¿Quisiste decir "${sugerencia}"?`);
      } else {
        throw Error(`No hay sensores creados, así que no se buscó si existía uno llamado "${nombre}".`);
      }
    }

    if (figura) {
      return new Sensor(figura);
    }
  }

  reproducir_sonido(nombre: string) {
    return this.pilas.reproducir_sonido(nombre);
  }
}
