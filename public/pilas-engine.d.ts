declare class Camara {
    pilas: Pilas;
    constructor(pilas: Pilas);
    readonly camara_principal: any;
    vibrar(intensidad?: number, tiempo?: number): void;
    x: any;
    y: number;
}
declare class Control {
    pilas: Pilas;
    _izquierda: any;
    _derecha: any;
    _arriba: any;
    _abajo: any;
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
    definir_estados_de_depuracion(datos: any): void;
}
declare class Escenas {
    pilas: Pilas;
    escena_actual: Escena;
    constructor(pilas: any);
    Normal(): Normal;
    vincular(escena: any): void;
    definir_escena_actual(escena: any): void;
}
declare const DEPURAR_MENSAJES: boolean;
declare class Mensajes {
    pilas: Pilas;
    constructor(pilas: Pilas);
    private agregar_manejador_de_eventos();
    atender_mensaje(e: any): void;
    atender_mensaje_iniciar_pilas(datos: any): void;
    atender_mensaje_definir_estados_de_depuracion(datos: any): void;
    emitir_mensaje_al_editor(nombre: any, datos?: any): void;
    atender_mensaje_define_escena(datos: any): void;
    atender_mensaje_ejecutar_proyecto(datos: any): void;
    atender_mensaje_actualizar_escena_desde_el_editor(datos: any): void;
    emitir_excepcion_al_editor(error: any, origen: any): void;
    atender_mensaje_selecciona_actor_desde_el_editor(datos: any): void;
    atender_mensaje_actualizar_actor_desde_el_editor(datos: any): void;
    atender_mensaje_quitar_pausa_de_phaser(): void;
}
declare class Utilidades {
    pilas: Pilas;
    id: number;
    navegador: string;
    constructor(pilas: any);
    obtener_id_autoincremental(): number;
    acceso_incorrecto(v: any): void;
    obtener_rampa_de_colores(): string[];
    obtener_color_al_azar(opacidad: any): string;
    limitar(valor: number, minimo: number, maximo: number): number;
    validar_numero(valor: number): void;
    convertir_angulo_a_radianes(grados: number): number;
    convertir_radianes_a_angulos(radianes: number): number;
    es_firefox(): boolean;
    convertir_coordenada_de_pilas_a_phaser(x: any, y: any): {
        x: any;
        y: number;
    };
    convertir_coordenada_de_phaser_a_pilas(x: any, y: any): {
        x: number;
        y: number;
    };
}
declare var HOST: string;
declare class Pilas {
    mensajes: Mensajes;
    game: Phaser.Game;
    depurador: Depurador;
    utilidades: Utilidades;
    escenas: Escenas;
    control: Control;
    modo: any;
    _ancho: number;
    _alto: number;
    constructor();
    readonly escena: Escena;
    iniciar_phaser(ancho: number, alto: number): void;
    definir_modo(nombre: any, datos: any): void;
    crear_configuracion(ancho: any, alto: any): {
        type: number;
        parent: string;
        zoom: number;
        width: any;
        height: any;
        backgroundColor: string;
        disableContextMenu: boolean;
        input: {
            keyboard: boolean;
            mouse: boolean;
            touch: boolean;
            gamepad: boolean;
        };
        pixelart: boolean;
        physics: {
            default: string;
            matter: {
                gravity: {
                    y: number;
                };
                debug: boolean;
            };
        };
    };
}
declare var pilas: Pilas;
declare class ActorBase {
    tipo: String;
    sprite: Phaser.GameObjects.Sprite;
    pilas: Pilas;
    id_color: string;
    figura: any;
    constructor(pilas: any, x?: number, y?: number, imagen?: string, figura?: any);
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
        imagen: string;
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
    escala: number;
    centro_y: number;
    centro_x: number;
    transparencia: number;
    toString(): string;
    fallar_si_no_tiene_figura(): void;
    crear_figura_rectangular(ancho?: number, alto?: number, estatico?: boolean): void;
    crear_figura_circular(radio?: number, estatico?: boolean): void;
    ancho: number;
    alto: number;
    estatico: boolean;
    dinamico: boolean;
    fijo: boolean;
    cada_segundo(): void;
    avanzar(rotacion?: number, velocidad?: number): void;
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
declare class Logo extends Actor {
    iniciar(): void;
}
declare class Nave extends Actor {
    velocidad: number;
    iniciar(): void;
    actualizar(): void;
}
declare class Pelota extends Actor {
    iniciar(): void;
}
declare class EscenaBase {
    pilas: Pilas;
    actores: Actor[];
    id: number;
    camara: Camara;
    constructor(pilas: any);
    agregar_actor(actor: Actor): void;
    serializar(): {
        camara_x: any;
        camara_y: number;
    };
    actualizar_actores(): void;
}
declare class Escena extends EscenaBase {
    cuadro: number;
    iniciar(): void;
    actualizar(): void;
    obtener_oscilacion(velocidad: any, intensidad: any): number;
}
declare class Normal extends Escena {
    iniciar(): void;
    actualizar(): void;
}
declare class Modo extends Phaser.Scene {
    matter: any;
    actores: any;
    destacar_actor_por_id(id: any): void;
    obtener_actor_por_id(id: any): any;
    actualizar_sprite_desde_datos(sprite: any, actor: any): void;
}
declare class ModoCargador extends Modo {
    pilas: Pilas;
    preload(): void;
    create(): void;
    cuando_progresa_la_carga(progreso: any): void;
}
declare class ModoEditor extends Modo {
    pilas: Pilas;
    fondo: Phaser.GameObjects.TileSprite;
    ancho: number;
    alto: number;
    graphics: any;
    fps: any;
    preload(): void;
    create(datos: any): void;
    posicionar_la_camara(datos_de_la_escena: any): void;
    crear_fondo(): void;
    crear_manejadores_para_hacer_arrastrables_los_actores(): void;
    crear_actores_desde_los_datos_de_la_escena(escena: any): void;
    crear_sprite_desde_actor(actor: any): void;
    aplicar_atributos_de_actor_a_sprite(actor: any, sprite: any): void;
    crear_canvas_de_depuracion(): void;
    update(): void;
    dibujar_punto_de_control(graphics: any, x: any, y: any): void;
}
declare class ModoEjecucion extends Modo {
    pilas: Pilas;
    fondo: Phaser.GameObjects.TileSprite;
    ancho: number;
    alto: number;
    graphics: any;
    fps: any;
    clases: {};
    proyecto: any;
    codigo: any;
    nombre_de_la_escena_inicial: string;
    permitir_modo_pausa: boolean;
    preload(): void;
    create(datos: any): void;
    instanciar_escena(nombre: any): void;
    crear_escena(datos_de_la_escena: any): void;
    crear_actor(entidad: any): any;
    preRender(): void;
    obtener_referencias_a_clases(): any;
    obtener_codigo_para_exportar_clases(codigo: any): string;
    guardar_parametros_en_atributos(datos: any): void;
    crear_fondo(): void;
    update(): void;
}
