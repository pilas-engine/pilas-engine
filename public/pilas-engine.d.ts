declare class EstadoEditor extends Phaser.State {
}
declare class Log {
    pilas: Pilas;
    constructor(pilas: Pilas);
    debug(...mensaje: any[]): void;
    info(...mensaje: any[]): void;
}
declare var HOST: string;
declare class Pilas {
    game: Phaser.Game;
    log: Log;
    constructor();
    _agregarManejadorDeMensajes(): void;
    _atenderMensaje(e: any): void;
    _preload(): void;
    _create(): void;
    _emitirMensajeAlEditor(nombre: any, datos: any): void;
}
declare var pilas: Pilas;
