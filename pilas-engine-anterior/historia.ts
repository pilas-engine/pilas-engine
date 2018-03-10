class Historia {
  pilas: Pilas;
  fotos = [];

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.fotos = [];
  }

  limpiar() {
    this.fotos = [];
  }

  serializar_escena_actual() {
    this.fotos.push({
      escena: this.pilas.escena_actual().serializar(),
      actores: this.pilas.escena_actual().actores.map(e => e.serializar())
    });
  }

  dibujar_puntos_de_las_posiciones_recorridas(bitmap) {
    this.fotos.map(historia => {
      historia.actores.map(entidad => {
        let { x, y } = this.pilas.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);
        bitmap.circle(x, y, 1, entidad.id_color);
      });
    });
  }

  obtener_cantidad_de_posiciones() {
    return this.fotos.length - 1;
  }

  obtener_foto(posicion: number) {
    return this.fotos[posicion];
  }
}
