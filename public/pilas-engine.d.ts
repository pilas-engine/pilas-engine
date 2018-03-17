declare class Actores {
    pilas: Pilas;
    constructor(pilas: any);
    Caja(x: any, y: any): any;
    crear_actor(nombre: any): any;
    Aceituna(x?: number, y?: number): any;
    Conejo(): any;
}
declare class Animaciones {
    pilas: Pilas;
    animaciones: {};
    constructor(pilas: any);
    crear_o_sustituir(nombre: any, cuadros: any, velocidad: any): void;
}
declare class Camara {
    pilas: Pilas;
    constructor(pilas: Pilas);
    readonly camara_principal: any;
    vibrar(intensidad?: number, tiempo?: number): void;
    x: number;
    y: any;
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
    mostrar_fisica: boolean;
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
declare class Historia {
    pilas: Pilas;
    fotos: any;
    constructor(pilas: Pilas);
    limpiar(): void;
    serializar_escena(escena_actual: any): void;
    dibujar_puntos_de_las_posiciones_recorridas(graphics: any): void;
    obtener_cantidad_de_posiciones(): number;
    obtener_foto(posicion: number): any;
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
    atender_mensaje_pausar_escena(): void;
    atender_mensaje_cambiar_posicion(datos: any): void;
    atender_mensaje_eliminar_actor_desde_el_editor(datos: any): void;
}
declare class Utilidades {
    pilas: Pilas;
    id: number;
    navegador: string;
    constructor(pilas: any);
    obtener_id_autoincremental(): number;
    acceso_incorrecto(v: any): void;
    obtener_rampa_de_colores(): number[];
    obtener_color_al_azar(): number;
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
    combinar_propiedades(propiedades_iniciales: any, propiedades: any): any;
}
declare var HOST: string;
declare class Pilas {
    game: Phaser.Game;
    mensajes: Mensajes;
    depurador: Depurador;
    utilidades: Utilidades;
    escenas: Escenas;
    control: Control;
    historia: Historia;
    sonidos: any;
    actores: Actores;
    animaciones: Animaciones;
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
    reproducir_sonido(nombre: string): void;
    obtener_actores(): Actor[];
    obtener_cantidad_de_actores(): number;
    obtener_actores_en(_x: number, _y: number): Actor[];
    escena_actual(): Escena;
}
declare var pilas: Pilas;
declare class ActorBase {
    tipo: String;
    sprite: Phaser.GameObjects.Sprite;
    pilas: Pilas;
    id_color: string;
    figura: string;
    sin_rotacion: false;
    propiedades_base: {
        x: number;
        y: number;
        imagen: string;
        centro_x: number;
        centro_y: number;
        rotacion: number;
        escala_x: number;
        escala_y: number;
        transparencia: number;
        espejado: boolean;
        espejado_vertical: boolean;
        figura: string;
        figura_dinamica: boolean;
        figura_ancho: number;
        figura_alto: number;
        figura_radio: number;
        figura_sin_rotacion: boolean;
        figura_rebote: number;
    };
    propiedades: any;
    constructor(pilas: any);
    readonly propiedades_iniciales: any;
    pre_iniciar(propiedades: any): void;
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
        espejado: boolean;
        espejado_vertical: boolean;
        transparencia: number;
        id_color: string;
    };
    generar_color_para_depurar(): any;
    pre_actualizar(): void;
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
    crear_figura_rectangular(ancho?: number, alto?: number, escala_x?: number, escala_y?: number): void;
    crear_figura_circular(radio?: number): void;
    ancho: number;
    alto: number;
    estatico: boolean;
    dinamico: boolean;
    impulsar(x: any, y: any): void;
    velocidad_x: number;
    velocidad_y: number;
    rebote: boolean;
    fijo: boolean;
    espejado: boolean;
    espejado_vertical: boolean;
    cada_segundo(): void;
    avanzar(rotacion?: number, velocidad?: number): void;
    crear_animacion(nombre: any, cuadros: any, velocidad: any): void;
    reproducir_animacion(nombre: any): void;
}
declare class Actor extends ActorBase {
    propiedades: {};
    iniciar(): void;
    actualizar(): void;
}
declare class Aceituna extends Actor {
    iniciar(): void;
}
declare class Caja extends Actor {
    propiedades: {
        x: number;
        y: number;
        imagen: string;
        figura: string;
        figura_ancho: number;
        figura_alto: number;
        figura_rebote: number;
    };
    iniciar(): void;
}
declare class Conejo extends Actor {
    propiedades: {
        x: number;
        y: number;
        imagen: string;
        figura: string;
        figura_ancho: number;
        figura_alto: number;
        figura_radio: number;
        figura_sin_rotacion: boolean;
        figura_dinamica: boolean;
        figura_rebote: number;
    };
    iniciar(): void;
    actualizar(): void;
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
    propiedades: {
        figura: string;
        figura_radio: number;
    };
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
        camara_x: number;
        camara_y: any;
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
    posicionar_la_camara(datos_de_la_escena: any): void;
    actualizar_posicion(posicion?: any): void;
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
    crear_fondo(): void;
    crear_manejadores_para_hacer_arrastrables_los_actores(): void;
    crear_actores_desde_los_datos_de_la_escena(escena: any): void;
    crear_sprite_desde_actor(actor: any): void;
    aplicar_atributos_de_actor_a_sprite(actor: any, sprite: any): void;
    crear_canvas_de_depuracion(): void;
    update(): void;
    dibujar_punto_de_control(graphics: any, x: any, y: any): void;
    eliminar_actor_por_id(id: any): void;
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
    obtener_referencias_a_clases(): any;
    obtener_codigo_para_exportar_clases(codigo: any): string;
    guardar_parametros_en_atributos(datos: any): void;
    crear_fondo(): void;
    update(): void;
    guardar_foto_de_entidades(): void;
}
declare class ModoPausa extends Modo {
    pilas: Pilas;
    fondo: Phaser.GameObjects.TileSprite;
    graphics: any;
    fps: any;
    posicion: number;
    sprites: any;
    texto: any;
    total: number;
    izquierda: any;
    derecha: any;
    preload(): void;
    create(datos: any): void;
    private crear_sprites_desde_historia(posicion);
    crear_sprite_desde_entidad(entidad: any): Phaser.GameObjects.Sprite;
    actualizar_posicion(posicion: any): void;
    crear_canvas_de_depuracion(): void;
}
