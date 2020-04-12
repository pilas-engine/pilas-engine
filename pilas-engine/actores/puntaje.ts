class puntaje extends ActorTextoBase {
  propiedades = {
    imagen: "imagenes:basicos/invisible",
    texto: "PUNTAJE: 0",
    color: "white",
    es_texto: true,
    z: -10,
    texto_con_borde: true,
    fuente: ""
  };
  puntaje: number = 0;

  iniciar() {
    this.actualizar_texto();
  }

  aumentar(cantidad: number = 1) {
    this.puntaje += cantidad;
    this.actualizar_texto();
  }

  actualizar_texto() {
    this.texto = `PUNTAJE: ${this.puntaje}`;
  }
}
