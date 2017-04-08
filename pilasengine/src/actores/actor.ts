class Actor {
  _x: number = 0;
  _y: number = 0;
  _imagen: any = null;
  _sprite: any = null;
  pilas: Pilas = null;
  _rotacion: number = 0;
  _anchor_x: number = 0.5;
  _anchor_y: number = 0.5;
  _escala_x: number = 1;
  _escala_y: number = 1;
  id: number = 0;
  etiquetas: Etiquetas;

  constructor(pilas: Pilas) {
    this.id = this.generar_id();
    this.pilas = pilas;
    this.imagen = "data:sin_imagen.png";
    this.pre_actualizar();
    this.etiquetas = new Etiquetas()
    this.etiquetas.agregar(this.obtener_nombre_de_la_clase());
  }

  /**
   * Retorna un identificador aleatorio para el Actor.
   */
  private generar_id() {
    return Math.round(Math.random() * 100000 + 100000);
  }

  iniciar(opciones: any) {

  }

  set imagen(valor: string) {
    this._imagen = valor;

    let items = valor.split(":");
    let galeria = items[0];
    let img = items[1];

    if (this._sprite) {
      this._cambiar_imagen_de_sprite_interno(galeria, img);
    } else {
      this._crear_sprite_interno(galeria, img);
    }

    this._actualizar_propiedades();
  }

  protected _cambiar_imagen_de_sprite_interno(galeria: string, imagen: string) {
    if (galeria) {
      this._sprite.loadTexture(galeria, imagen);
    } else {
      this._sprite.loadTexture(imagen);
    }
  }

  protected _crear_sprite_interno(galeria: string, imagen: string) {
    if (galeria) {
      this._sprite = this.pilas.game.add.sprite(0, 0, galeria, imagen);
    } else {
      this._sprite = this.pilas.game.add.sprite(0, 0, imagen);
    }
  }

  pre_actualizar() {
    this._actualizar_propiedades();
  }

  private _actualizar_propiedades() {

    if (this._sprite) {
      let dx = this.pilas.opciones.ancho / 2;
      let dy = this.pilas.opciones.alto / 2;

      this._sprite.position.set(dx + this._x, dy - this._y);
      this._sprite.scale.set(this._escala_x, this._escala_y);
      this._sprite.anchor.setTo(this._anchor_x, this._anchor_y);
      this._sprite.angle = -this._rotacion;
    }

  }

  actualizar() {

  }

  post_actualizar() {

  }

  eliminar() {
    this._sprite.kill();
    this.pilas.actores.eliminar_actor(this);
  }

  interpolar(propiedad: string, valor: any, duracion: number = 0.5, tipo: string = "desaceleracion_gradual", infinito: boolean = false) {
    return this.pilas.escenas.escena_actual.interpolaciones.crear_interpolacion(this, propiedad, valor, duracion, tipo, infinito);
  }

  set escala(value: number) {
    this.escala_x = value;
    this.escala_y = value;
  }

  get escala() {
    if (this._escala_x != this._escala_y) {
      console.warn("Los valores de escala_x y escala_y son diferentes, se asume que la escala conjunta es la mayor.");
    }

    return Math.max(this._escala_x, this._escala_y);
  }

  get escala_x() {
    return this._escala_x;
  }

  set escala_x(valor: number) {
    this._interpretar_propiedad_numerica("_escala_x", valor);
  }

  get escala_y() {
    return this._escala_y;
  }

  set escala_y(valor: number) {
    this._interpretar_propiedad_numerica("_escala_y", valor);
  }

  private _interpretar_propiedad_numerica(propiedad: string, valor: any) {
    let es_un_array = (valor.push !== undefined);

    if (es_un_array) {
      this.interpolar(propiedad, valor);
    } else {
      this[propiedad] = valor;
    }
  }

  get x() {
    return this._x;
  }

  set x(valor: number) {
    this._interpretar_propiedad_numerica("_x", valor);
  }

  get y() {
    return this._y;
  }

  set y(valor: number) {
    this._interpretar_propiedad_numerica("_y", valor);
  }

  get rotacion() {
    return this._rotacion;
  }

  set rotacion(valor: number) {
    this._interpretar_propiedad_numerica("_rotacion", valor);
  }

  obtener_nombre_de_la_clase() {
    let nombre_de_la_clase = this.constructor['name'];
    return nombre_de_la_clase;
  }

  imprimir() {
    let nombre_de_la_clase = this.obtener_nombre_de_la_clase();
    return `<Actor de la clase ${nombre_de_la_clase} en (${this.x}, ${this.y})>`;
  }

  /* Accesos rápidos a etiquetas */

  tiene_etiqueta(etiqueta: String) {
    return this.etiquetas.tiene_etiqueta(etiqueta);
  }

  obtener_cantidad_de_etiquetas() {
    return this.etiquetas.obtener_cantidad();
  }

  agregar_etiqueta(etiqueta: String) {
    this.etiquetas.agregar(etiqueta);
  }

  eliminar_etiqueta(etiqueta: String) {
    this.etiquetas.eliminar(etiqueta);
  }
}
