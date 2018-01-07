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
    _conectarAtajosDeTeclado(): void;
    _agregarManejadorDeMensajes(): void;
    _atenderMensaje(e: any): void;
    _preload(): void;
    _create(): void;
    _emitirMensajeAlEditor(nombre: any, datos: any): void;
}
declare var pilas: Pilas;
declare class Actor extends Phaser.Sprite {
    tipo: String;
    iniciar(): void;
    serializar(): {
        tipo: String;
        x: number;
        y: number;
        centro_x: number;
        centro_y: number;
        imagen: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture;
        rotacion: number;
    };
    update(): void;
    actualizar(): void;
}
declare class Caja extends Actor {
    iniciar(): void;
    update(): void;
}
declare class Pelota extends Actor {
    iniciar(): void;
    update(): void;
}
declare class Sprite extends Phaser.Sprite {
    rotateSpeed: number;
    shadow: Phaser.Sprite;
    id: number;
    iniciar(entidad: any): void;
    conectar_eventos_arrastrar_y_soltar(): void;
    al_terminar_de_arrastrar(a: any): void;
    al_comenzar_a_arrastrar(a: any): void;
    cuando_comienza_a_mover(): void;
    cuando_termina_de_mover(): void;
    activar_sombra(): void;
    ocultar_sombra(): void;
    update(): void;
    crear_sombra(): void;
}
declare class SpriteSimple extends Phaser.Sprite {
}
declare class Estado extends Phaser.State {
    render(): void;
    actualizarPosicionDeFormaExterna(pos: any): void;
}
declare class EstadoEditor extends Estado {
    entidades: any;
    sprites: any;
    texto: any;
    init(datos: any): void;
    cuando_termina_de_mover(a: any): void;
    cuando_comienza_a_mover(a: any): void;
    crear_texto_con_posicion_del_mouse(): void;
    create(): void;
    update(): void;
    actualizar_texto_con_posicion_del_mouse(): void;
}
declare class EstadoEjecucion extends Estado {
    entidades: any;
    sprites: any;
    historia: any;
    actores: any;
    clasesDeActores: {};
    init(datos: any): void;
    create(): void;
    crear_actores_desde_entidades(): void;
    crear_actor(entidad: any): any;
    update(): void;
    private guardar_foto_de_entidades();
}
declare class EstadoPausa extends Estado {
    historia: any;
    posicion: number;
    sprites: any;
    texto: any;
    total: number;
    izquierda: any;
    derecha: any;
    init(datos: any): void;
    cuando_cambia_posicion: any;
    create(): void;
    private crear_texto();
    private crear_sprites_desde_historia(posicion);
    update(): void;
    actualizarPosicionDeFormaExterna(posicion: any): void;
    private actualizar_texto();
    crear_sprite_desde_entidad(entidad: any): SpriteSimple;
    render(): void;
}
