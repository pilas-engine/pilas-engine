class Evento {
  pilas: Pilas;
  evento: Phaser.Signal;
  nombre: string;
  emitir_log: boolean = true;

  constructor(pilas: Pilas, nombre: string) {
    this.pilas = pilas;
    this.iniciar();
    this.nombre = nombre;
  }

  iniciar() {
    this.evento = new Phaser.Signal();
  }

  conectar(funcion, identificador = "any") {
    this.pilas.log.info(`Se conecta una función al evento "${this.nombre}":`, {funcion: funcion.toString()});
    this.evento.add(funcion);
  }

  emitir(datos = {}) {

    if (this.emitir_log) {
      this.pilas.log.info(`Se emite el evento "${this.nombre}":`, {argumentos: datos});
    }

    this.evento.dispatch(datos);
  }

}
