declare class Actores {
    pilas: Pilas;
    constructor(pilas: any);
    Caja(x: any, y: any): Caja;
    Aceituna(x?: number, y?: number): Aceituna;
}
declare class Camara {
    pilas: Pilas;
    constructor(pilas: Pilas);
    vibrar(intensidad?: number, tiempo?: number): void;
    x: number;
    y: number;
}
declare class Control {
    pilas: Pilas;
    teclaIzquierda: any;
    teclaDerecha: any;
    teclaArriba: any;
    teclaAbajo: any;
    constructor(pilas: Pilas);
    izquierda: any;
    derecha: any;
    arriba: any;
    abajo: any;
}
declare class Depurador {
    pilas: Pilas;
    modo_posicion_activado: boolean;
    mostrar_fps: boolean;
    constructor(pilas: Pilas);
}
declare class Escenas {
    pilas: Pilas;
    escena_actual: Escena;
    constructor(pilas: any);
    Normal(): Escena;
    vincular(escena: any): void;
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
    depurador: Depurador;
    escenas: Escenas;
    utilidades: Utilidades;
    _ancho: number;
    _alto: number;
    constructor();
    iniciar(): void;
    obtener_entidades(): any;
    escena_actual(): Escena;
    readonly camara: Camara;
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
    emitir_excepcion_al_editor(error: any, origen: any): void;
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
    obtener_oscilacion(velocidad?: number, intensidad?: number): number;
}
declare var pilas: Pilas;
declare class Utilidades {
    pilas: Pilas;
    id: number;
    constructor(pilas: any);
    obtener_id_autoincremental(): number;
    acceso_incorrecto(v: any): void;
    obtener_rampa_de_colores(): string[];
    obtener_color_al_azar(opacidad: any): string;
    limitar(valor: number, minimo: number, maximo: number): number;
}
declare class ActorBase {
    tipo: String;
    sprite: Phaser.Sprite;
    pilas: Pilas;
    id_color: string;
    constructor(pilas: any, x?: number, y?: number, imagen?: string);
    iniciar(): void;
    serializar(): {
        tipo: String;
        x: number;
        y: number;
        centro_x: number;
        centro_y: number;
        rotacion: number;
        escala_x: number;
        escala_y: number;
        imagen: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture | Phaser.Video;
        transparencia: number;
        id_color: string;
    };
    generar_color_para_depurar(): string;
    actualizar(): void;
    imagen: string;
    x: number;
    y: number;
    rotacion: number;
    escala_x: number;
    escala_y: number;
    centro_y: number;
    centro_x: number;
    transparencia: number;
    toString(): string;
    crear_figura_rectangular(ancho?: number, alto?: number, estatico?: boolean): void;
    crear_figura_circular(radio?: number, estatico?: boolean): void;
    ancho: number;
    alto: number;
    estatico: boolean;
    dinamico: boolean;
    cada_segundo(): void;
}
declare class Actor extends ActorBase {
    iniciar(): void;
    actualizar(): void;
}
declare class Aceituna extends Actor {
    iniciar(): void;
    actualizar(): void;
}
declare class Caja extends Actor {
    iniciar(): void;
}
declare class Logo extends Actor {
    iniciar(): void;
}
declare class Pelota extends Actor {
    iniciar(): void;
}
declare class ActorDentroDelEditor extends Phaser.Sprite {
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
    actualizar_desde_el_editor(datos: any): void;
    rotacion: number;
    destacar(): void;
}
declare class EscenaBase {
    pilas: Pilas;
    actores: Actor[];
    id: number;
    camara: Camara;
    constructor(pilas: any);
    agregar_actor(actor: Actor): void;
}
declare class Escena extends EscenaBase {
    cuadro: number;
    iniciar(): void;
    actualizar(): void;
    obtener_oscilacion(velocidad: any, intensidad: any): number;
}
declare class Normal extends Escena {
    iniciar(): void;
}
declare class Estado extends Phaser.State {
    pilas: Pilas;
    historia: any;
    bitmap: Phaser.BitmapData;
    canvas: any;
    texto: Phaser.Text;
    sprites: any;
    render(): void;
    create(): void;
    obtener_sprites(): any;
    actualizarPosicionDeFormaExterna(pos: any): void;
    dibujar_todos_los_puntos_de_las_posiciones_recorridas(): Phaser.Image;
}
declare class EstadoEditor extends Estado {
    entidades: any;
    sprites: any;
    texto: any;
    historia: any;
    fondo: any;
    init(datos: any): void;
    cuando_termina_de_mover(a: any): void;
    cuando_comienza_a_mover(a: any): void;
    create(): void;
    update(): void;
}
declare class EstadoEjecucion extends Estado {
    entidades: any;
    sprites: any;
    historia: any;
    actores: any;
    clases: {};
    proyecto: any;
    codigo: any;
    nombre_de_la_escena_inicial: string;
    init(datos: any): void;
    obtener_codigo_para_exportar_clases(codigo: any): string;
    create(): void;
    instanciar_escena(nombre: any): void;
    crear_actor(entidad: any): any;
    preRender(): void;
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
    canvas_lineas_de_recorrido: any;
    init(datos: any): void;
    cuando_cambia_posicion: any;
    create(): void;
    private crear_texto();
    private crear_sprites_desde_historia(posicion);
    update(): void;
    actualizarPosicionDeFormaExterna(posicion: any): void;
    private actualizar_texto();
    crear_sprite_desde_entidad(entidad: any): Phaser.Sprite;
}
