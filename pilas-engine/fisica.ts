class Fisica {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  get figuras() {
    return Phaser.Physics.Matter.Matter.Composite.allBodies(
      this.pilas.modo.matter.world.localWorld
    );
  }

  realizar_rayo_desde_figura(figura, hasta_x, hasta_y) {
    let posicion = {
      x: figura.gameObject.actor.x,
      y: figura.gameObject.actor.y,
    }

    // Quita la figura de la lista de figuras sobre las que se realizará
    // el raycast.
    let figuras = this.figuras;
    let indice = figuras.indexOf(figura)
    figuras.splice(indice, 1);

    return this.realizar_rayo_entre(posicion.x, posicion.y, hasta_x, hasta_y, figuras);
  }

  realizar_rayo_entre(desde_x: number, desde_y: number, hasta_x: number, hasta_y: number, figuras = undefined) {
    let desde = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      desde_x,
      desde_y
    );
    let hasta = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      hasta_x,
      hasta_y
    );

    let figuras = figuras || this.figuras;

    let data = Phaser.Physics.Matter.Matter.Query.ray(figuras, desde, hasta);

    return {
      contactos: data.map(p => {
        let posicion_phaser = p.body.position;
        let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(posicion_phaser.x, posicion_phaser.y);

        return {
          x: posicion.x,
          y: posicion.y,
          desde_x,
          desde_y,
          distancia: p.depth,
          figura: p.body
        }
      })
      fuente: data
    };
  }
}
