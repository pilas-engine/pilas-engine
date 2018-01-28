declare class Actores {
    pilas: Pilas;
    constructor(pilas: any);
    Caja(x: any, y: any): Caja;
    Aceituna(x?: number, y?: number): Aceituna;
}
declare class Control {
    pilas: Pilas;
    teclaIzquierda: any;
    teclaDerecha: any;
    teclaArriba: any;
    teclaAbajo: any;
    izquierda: boolean;
    derecha: boolean;
    arriba: boolean;
    abajo: boolean;
    constructor(pilas: Pilas);
    readonly izquierda: boolean;
    readonly derecha: boolean;
    readonly arriba: boolean;
    readonly abajo: boolean;
}
declare class Escenas {
    pilas: Pilas;
    escena_actual: Escena;
    constructor(pilas: any);
    Normal(): Escena;
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
    control: Control;
    actores: Actores;
    _ancho: number;
    _alto: number;
    constructor();
    iniciar(): void;
    obtener_entidades(): any;
    escena_actual(): any;
    conectar_atajos_de_teclado(): void;
    private agregar_manejador_de_eventos();
    emitir_error_y_detener(error: any): void;
    capturar_errores_y_reportarlos_al_editor(): void;
    private antender_mensaje_desde_el_editor(e);
    iniciar_pilas_desde_el_editor(ancho: any, alto: any): void;
    _preload(): void;
    _create(): void;
    start(): void;
    _cuando_comienza_a_cargar(): void;
    _cuando_carga_archivo(progreso: any): void;
    _cuando_termina_de_cargar(): void;
    emitir_mensaje_al_editor(nombre: any, datos: any): void;
    obtener_actores(): any[];
    obtener_cantidad_de_actores(): number;
    obtener_actores_en(_x: number, _y: number): any[];
    convertir_coordenada_de_pilas_a_phaser(x: any, y: any): {
        x: any;
        y: number;
    };
    convertir_coordenada_de_phaser_a_pilas(x: any, y: any): {
        x: number;
        y: number;
    };
}
declare var pilas: Pilas;
declare class Utilidades {
    pilas: Pilas;
    id: number;
    constructor(pilas: any);
    obtener_id_autoincremental(): number;
}
declare class ActorBase {
    tipo: String;
    sprite: Phaser.Sprite;
    pilas: Pilas;
    _rotacion: number;
    x: number;
    y: number;
    rotacion: number;
    constructor(pilas: any, x: any, y: any, imagen?: string);
    iniciar(): void;
    serializar(): {
        tipo: String;
        x: number;
        y: number;
        centro_x: number;
        centro_y: number;
        imagen: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture | Phaser.Video;
        rotacion: number;
    };
    actualizar(): void;
    imagen: string;
    x: number;
    y: number;
    rotacion: number;
    toString(): string;
}
declare class Actor extends ActorBase {
    iniciar(): void;
    actualizar(): void;
}
declare class Aceituna extends Actor {
    iniciar(): void;
}
declare class Caja extends Actor {
    iniciar(): void;
}
declare class Pelota extends Actor {
    iniciar(): void;
}
declare class ActorDentroDelEditor extends Phaser.Sprite {
    rotateSpeed: number;
    shadow: Phaser.Sprite;
    id: number;
    pilas: Pilas;
    iniciar(pilas: any, entidad: any): void;
    conectar_eventos_arrastrar_y_soltar(): void;
    al_terminar_de_arrastrar(a: any): void;
    al_comenzar_a_arrastrar(a: any): void;
    cuando_comienza_a_mover(): void;
    cuando_posiciona_el_mouse_sobre_el_actor(): void;
    cuando_deja_de_posicionar_el_mouse_sobre_el_actor(): void;
    cuando_termina_de_mover(): void;
    definir_puntero(nombre: any): void;
    activar_sombra(): void;
    ocultar_sombra(): void;
    update(): void;
    crear_sombra(): void;
    destacar(): void;
}
declare class ActorDentroDelModoPausa extends Phaser.Sprite {
}
declare class EscenaBase {
    actores: Actor[];
    id: number;
    constructor(pilas: any);
    agregar_actor(actor: Actor): void;
}
declare class Escena extends EscenaBase {
    iniciar(): void;
    actualizar(): void;
}
declare class Normal extends Escena {
    iniciar(): void;
}
declare class Estado extends Phaser.State {
    pilas: Pilas;
    historia: any;
    canvas: any;
    render(): void;
    create(): void;
    obtener_sprites(): any;
    actualizarPosicionDeFormaExterna(pos: any): void;
    dibujarLineaDeCoordenadasRecorridas(): void;
}
declare class EstadoEditor extends Estado {
    entidades: any;
    sprites: any;
    texto: any;
    historia: any;
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
    codigo: any;
    init(datos: any): void;
    obtenerCodigoDeExportacion(codigo: any): string;
    create(): void;
    crear_actores_desde_entidades(): void;
    crear_actor(entidad: any): any;
    preRender(): void;
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
    crear_sprite_desde_entidad(entidad: any): ActorDentroDelModoPausa;
}
