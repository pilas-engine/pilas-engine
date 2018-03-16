class Historia {
  pilas: Pilas;
  fotos: any;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.fotos = [];
  }

  limpiar() {
    this.fotos = [];
  }

  serializar_escena(escena_actual: any) {
    this.fotos.push({
      escena: escena_actual.serializar(),
      actores: escena_actual.actores.map(e => e.serializar())
    });
  }

  dibujar_puntos_de_las_posiciones_recorridas(graphics) {
    this.fotos.map(historia => {
      historia.actores.map(entidad => {
        let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);

        graphics.fillStyle(entidad.id_color, 1);
        graphics.fillRect(x, y, 2, 2);
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
