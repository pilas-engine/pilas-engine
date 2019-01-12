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
    let cantidad = 60 * 7;

    let historia_reciente = this.fotos.slice(-cantidad);
    let cantidad_total = historia_reciente.length;

    for (let i = 0; i < cantidad_total; i++) {
      let historia = historia_reciente[i];

      historia.actores.map(entidad => {
        let {
          x,
          y
        } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
          entidad.x,
          entidad.y
        );

        graphics.fillStyle(entidad.id_color, i / cantidad_total);
        graphics.fillRect(x, y, 2, 2);
      });
    }
  }

  obtener_cantidad_de_posiciones() {
    return this.fotos.length - 1;
  }

  obtener_foto(posicion: number) {
    return this.fotos[posicion];
  }
}
