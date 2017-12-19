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
    obtener_entidades(): any;
    _agregarManejadorDeMensajes(): void;
    _atenderMensaje(e: any): void;
    _preload(): void;
    _create(): void;
    _emitirMensajeAlEditor(nombre: any, datos: any): void;
}
declare var pilas: Pilas;
declare class Actor extends Phaser.Sprite {
    iniciar(): void;
}
declare class Pelota extends Actor {
    vy: any;
    iniciar(): void;
    update(): void;
}
declare class Sprite extends Phaser.Sprite {
    rotateSpeed: number;
    shadow: Phaser.Sprite;
    iniciar(entidad: any): void;
    conectar_eventos_arrastrar_y_soltar(): void;
    al_terminar_de_arrastrar(a: any): void;
    cuando_termina_de_mover(): void;
    activar_sombra(): void;
    ocultar_sombra(): void;
    update(): void;
    crear_sombra(): void;
}
declare class EstadoEditor extends Phaser.State {
    entidades: any;
    sprites: any;
    texto: any;
    init(datos: any): void;
    crear_texto_con_posicion_del_mouse(): void;
    create(): void;
    update(): void;
    actualizar_texto_con_posicion_del_mouse(): void;
}
declare class EstadoEjecucion extends Phaser.State {
    entidades: any;
    sprites: any;
    init(datos: any): void;
    create(): void;
    crear_actores_desde_entidades(): void;
    crear_actor(entidad: any): void;
    update(): void;
}
