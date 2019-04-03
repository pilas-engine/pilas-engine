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

  _habilidades: any[];

  propiedades_base = {
    x: 0,
    y: 0,
    z: 0,
    imagen: "sin_imagen",

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

    es_texto: false
  };

  propiedades: any = {
    x: 0,
    y: 0,
    z: 0,
    imagen: "sin_imagen",
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
    let imagen = null;
    let cuadro = null;

    // Como las imágenes pueden ser cadenas que representen cuadros
    // dentro de un spritesheet (caso "spritesheet.imagen") o el nombre de una
    // imagen normal (caso "imagen") se utiliza esta comprobación para
    // distinguir cualquiera de estos casos.
    if (propiedades.imagen.indexOf(".") > -1) {
      imagen = propiedades.imagen;
      cuadro = null;
    } else {
      imagen = propiedades.imagen.split(".")[0];
      cuadro = propiedades.imagen
        .split(".")
        .slice(1)
        .join(".");
    }

    this._id = propiedades.id;
    this._nombre = propiedades.nombre;

    this.sensores = [];
    this._figura_ancho = propiedades.figura_ancho;
    this._figura_alto = propiedades.figura_alto;
    this._figura_radio = propiedades.figura_radio;
    this._es_texto = propiedades.es_texto;

    if (propiedades.es_texto) {
      this.texto = propiedades.texto;
    }

    switch (figura) {
      case "rectangulo":
        this.sprite = this.pilas.modo.matter.add.sprite(0, 0, imagen, cuadro);
        this.figura = figura;

        this.crear_figura_rectangular(
          propiedades.figura_ancho,
          propiedades.figura_alto
        );

        this.dinamico = propiedades.figura_dinamica;
        this.sin_rotacion = propiedades.figura_sin_rotacion;
        this.rebote = propiedades.figura_rebote;
        this.sensor = propiedades.figura_sensor;
        break;

      case "circulo":
        this.sprite = this.pilas.modo.matter.add.sprite(0, 0, imagen, cuadro);
        this.figura = figura;
        this.crear_figura_circular(propiedades.figura_radio);

        this.dinamico = propiedades.figura_dinamica;
        this.sin_rotacion = propiedades.figura_sin_rotacion;
        this.rebote = propiedades.figura_rebote;
        this.sensor = propiedades.figura_sensor;
        break;

      case "ninguna":
      case "":
        this.figura = figura;
        this.sprite = this.pilas.modo.add.sprite(0, 0, imagen, cuadro);
        break;

      default:
        throw Error(`No se conoce el tipo de figura ${figura}`);
    }

    this.sprite.setInteractive();

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

    this.sprite.update = () => {
      try {
        this.actualizar();
      } catch (e) {
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizar actor");
      }
    };

    this.sprite.on("pointerdown", cursor => {
      let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
        cursor.x,
        cursor.y
      );
      this.cuando_hace_click(posicion.x, posicion.y, cursor);
    });

    this.sprite.on("pointerout", cursor => {
      let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
        cursor.x,
        cursor.y
      );
      this.cuando_sale(posicion.x, posicion.y, cursor);
    });

    this.sprite.on("pointermove", cursor => {
      let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
        cursor.x,
        cursor.y
      );
      this.cuando_mueve(posicion.x, posicion.y, cursor);
    });

    this.pilas.escena.agregar_actor(this);
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

    destino.setOrigin(origen.originX, origen.originY);
  }

  iniciar() {}

  serializar() {
    let texto = "";

    if (this._es_texto) {
      texto = this._texto.text;
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

      es_texto: this._es_texto,
      texto: texto,

      espejado: this.espejado,
      espejado_vertical: this.espejado_vertical,
      transparencia: this.transparencia,
      id_color: this.id_color
    };
  }

  set etiqueta(etiqueta) {
    this._etiqueta = etiqueta;
  }

  get etiqueta() {
    return this._etiqueta;
  }

  generar_color_para_depurar() {
    return this.pilas.utilidades.obtener_color_al_azar();
  }

  pre_actualizar() {
    if (this.figura && this.sin_rotacion) {
      (this.sprite as any).setAngularVelocity(0);
    }

    this.automata.actualizar();
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
    this.sensores.map(s => {
      let {
        x,
        y
      } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
        this.x,
        this.y
      );
      this.pilas.Phaser.Physics.Matter.Matter.Body.setPosition(s, {
        x: x + s.distancia_x,
        y: y - s.distancia_y
      });

      // Descarta colisiones con actores que ya no están en la escena.
      s.colisiones = s.colisiones.filter(a => a._vivo);
    });
  }

  get imagen(): string {
    if (this.sprite.frame.name === "__BASE") {
      return this.sprite.texture.key;
    } else {
      return `${this.sprite.frame.name}.${this.sprite.texture.key}`;
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
    if (nombre.indexOf(".") > -1) {
      let key = nombre.split(".")[0];
      let frame = nombre
        .split(".")
        .slice(1)
        .join(".");
      this.sprite.setTexture(key, frame);
    } else {
      this.sprite.setTexture(nombre);
    }
  }

  set x(_x: number) {
    if (this.pilas.utilidades.es_animacion(_x)) {
      this.pilas.animar(this, "x", _x);
    } else {
      this.pilas.utilidades.validar_numero(_x);
      let { x } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
        _x,
        0
      );
      this.sprite.x = x;
    }
  }

  get x() {
    let { x } = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
      this.sprite.x,
      0
    );
    return x;
  }

  set y(_y: number) {
    if (this.pilas.utilidades.es_animacion(_y)) {
      this.pilas.animar(this, "y", _y);
    } else {
      this.pilas.utilidades.validar_numero(_y);
      let { y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
        0,
        _y
      );
      this.sprite.y = y;
    }
  }

  get y() {
    let { y } = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
      0,
      this.sprite.y
    );
    return y;
  }

  set z(_z: number) {
    this.pilas.utilidades.validar_numero(_z);
    this.sprite.depth = -_z;
  }

  get z() {
    return -this.sprite.depth;
  }

  set rotacion(angulo: number) {
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

      if (this.figura) {
        pilas.Phaser.Physics.Matter.Matter.Body.scale(
          this.sprite.body,
          1 / this.escala_x,
          1 / this.escala_y
        );
      }
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

      if (this.figura) {
        pilas.Phaser.Physics.Matter.Matter.Body.scale(
          this.sprite.body,
          1 / this.escala_x,
          1 / this.escala_y
        );
      }
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
    return `<${clase} en (${this.x}, ${this.y})>`;
  }

  fallar_si_no_tiene_figura() {
    if (!this.figura) {
      throw Error(
        `Este actor no tiene figura física, no se puede llamar a este método`
      );
    }
  }

  crear_figura_rectangular(ancho: number = 0, alto: number = 0) {
    this.fallar_si_no_tiene_figura();

    this.pilas.utilidades.validar_numero(ancho);
    this.pilas.utilidades.validar_numero(alto);

    (this.sprite as any).setRectangle(ancho, alto);
  }

  crear_figura_circular(radio: number = 0) {
    this.fallar_si_no_tiene_figura();

    this.pilas.utilidades.validar_numero(radio);

    if (radio) {
      (this.sprite as any).setCircle(radio);
    } else {
      (this.sprite as any).setCircle();
    }
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
    this.fallar_si_no_tiene_figura();

    return (this.sprite as any).isStatic();
  }

  set estatico(estatico: boolean) {
    this.fallar_si_no_tiene_figura();

    (this.sprite as any).setStatic(estatico);
    (this.sprite as any).setVelocity(0, 0);
  }

  set dinamico(dinamico: boolean) {
    this.fallar_si_no_tiene_figura();

    this.estatico = !dinamico;
  }

  get dinamico() {
    this.fallar_si_no_tiene_figura();

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
    (this.sprite as any).setVelocityX(-valor);
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
    this.fallar_si_no_tiene_figura();
    return (this.sprite.body as any).isSensor;
  }

  get fijo() {
    return this.sprite.scrollFactorX == 0;
  }

  set fijo(valor: boolean) {
    if (valor) {
      this.sprite.setScrollFactor(0, 0);
    } else {
      this.sprite.setScrollFactor(1, 1);
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

  cada_segundo() {}

  avanzar(rotacion: number = null, velocidad: number = 1) {
    if (rotacion === null) {
      rotacion = this.rotacion;
    }

    let r = this.pilas.utilidades.convertir_angulo_a_radianes(rotacion);

    this.x += Math.cos(r) * velocidad;
    this.y += Math.sin(r) * velocidad;
  }

  crear_animacion(nombre, cuadros, velocidad) {
    this.pilas.animaciones.crear_animacion(this, nombre, cuadros, velocidad);
  }

  reproducir_animacion(nombre_de_la_animacion) {
    let nombre = `${this.id}-${nombre_de_la_animacion}`;
    this.sprite.anims.play(nombre);
  }

  set animacion(nombre) {
    if (this._animacion_en_curso !== nombre) {
      this.reproducir_animacion(nombre);
      this._animacion_en_curso = nombre;
    }
  }

  get animacion() {
    return this._animacion_en_curso;
  }

  cuando_comienza_una_colision(actor: Actor) {}

  cuando_se_mantiene_una_colision(actor: Actor) {}

  cuando_termina_una_colision(actor: Actor) {}

  cuando_hace_click(x, y, evento_original) {}

  cuando_sale(x, y, evento_original) {}

  cuando_mueve(x, y, evento_original) {}

  get cantidad_de_colisiones() {
    return this.colisiones.length;
  }

  agregar_sensor(ancho, alto, x, y) {
    let pos = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      x,
      y
    );

    let figura = this.pilas.modo.matter.add.rectangle(
      pos.x,
      pos.y,
      ancho,
      alto,
      {
        isSensor: true,
        isStatic: false
      }
    );

    figura.distancia_x = x;
    figura.distancia_y = y;

    figura.sensor_del_actor = this;
    figura.colisiones = [];

    this.sensores.push(figura);
    return figura;
  }

  eliminar() {
    this._vivo = false;
  }

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

  decir(mensaje: string) {
    let texto = this.pilas.actores.texto();
    texto.texto = mensaje;
    texto.x = this.x + 15;
    texto.y = this.y + this.alto;
    texto.escala_y = 0;
    texto.escala_y = [1];

    this.pilas.luego(4, () => {
      texto.eliminar();
    });
  }

  aprender(habilidad: string) {
    let clase = this.pilas.habilidades.buscar(habilidad);

    if (clase) {
      if (this.tieneHabilidad(clase.name)) {
        console.warn(
          `No se aplica la habilidad ${
            clase.name
          } porque el actor ya la tenía vinculada.`
        );
      } else {
        let instancia = new clase(this.pilas, this);
        instancia.iniciar();
        this._habilidades.push(instancia);
      }
    }
  }

  tieneHabilidad(habilidad: string) {
    return (
      this._habilidades.filter(h => {
        return h.constructor.name === habilidad;
      }).length > 0
    );
  }
}
