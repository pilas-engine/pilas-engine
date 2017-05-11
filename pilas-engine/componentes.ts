class Componentes {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  etiquetable() {
    let nombre = 'etiquetable';
    let datos = {
      etiquetas: ['actor']
    };
    return {nombre, datos};
  }

  habilidades() {
    return {
      nombre: 'habilidades',
      datos: {
        habilidades: []
      }
    };
  }

}
