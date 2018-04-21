declare class Actores {
    pilas: Pilas;
    constructor(pilas: any);
    crear_actor(nombre: any): any;
    actor(): any;
    aceituna(x?: number, y?: number): any;
    caja(x: any, y: any): any;
    conejo(): any;
    logo(): any;
    moneda(): any;
    nave(): any;
    nube(): any;
    pared(): any;
    pelota(): any;
    plataforma(): any;
    suelo(): any;
    techo(): any;
}
declare class Animaciones {
    pilas: Pilas;
    animaciones: {};
    constructor(pilas: any);
    crear_o_sustituir(nombre: any, cuadros: any, velocidad: any): void;
}
declare class Automata {
    actor: Actor;
    _estado: string;
    constructor(actor: any);
    estado: string;
    iniciar_estado(nombre: any): void;
    actualizar(): void;
    validar_que_existen_los_metodos_de_estado(nombre: any): void;
}
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
declare class Fisica {
    pilas: Pilas;
    constructor(pilas: any);
    readonly Matter: any;
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
    fondo: Phaser.GameObjects.TileSprite;
    constructor(pilas: Pilas);
    private agregar_manejador_de_eventos();
    atender_mensaje(e: any): void;
    atender_mensaje_iniciar_pilas(datos: any): void;
    atender_mensaje_definir_estados_de_depuracion(datos: any): void;
    emitir_mensaje_al_editor(nombre: any, datos?: any): void;
    atender_mensaje_define_escena(datos: any): void;
    atender_mensaje_actualizar_escena_desde_el_editor(datos: any): void;
    atender_mensaje_ejecutar_proyecto(datos: any): void;
    emitir_excepcion_al_editor(error: any, origen: any): void;
    atender_mensaje_selecciona_actor_desde_el_editor(datos: any): void;
    atender_mensaje_alterar_estado_de_maximizacion(datos: any): void;
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
    obtener_distancia_entre(desde_x: any, desde_y: any, hasta_x: any, hasta_y: any): number;
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
    Phaser: any;
    fisica: Fisica;
    modo: any;
    _ancho: number;
    _alto: number;
    cursor_x: number;
    cursor_y: number;
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
        scene: (typeof ModoCargador | typeof ModoEditor | typeof ModoEjecucion | typeof ModoPausa)[];
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
    pausar(): void;
    continuar(): void;
}
declare var pilas: Pilas;
declare class ActorBase {
    tipo: String;
    sprite: Phaser.GameObjects.Sprite;
    pilas: Pilas;
    id_color: number;
    figura: string;
    sin_rotacion: false;
    automata: Automata;
    colisiones: Actor[];
    sensores: any[];
    _etiqueta: string;
    _vivo: boolean;
    _animacion_en_curso: string;
    _figura_ancho: number;
    _figura_alto: number;
    _figura_radio: number;
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
        etiqueta: string;
        espejado: boolean;
        espejado_vertical: boolean;
        figura: string;
        figura_dinamica: boolean;
        figura_ancho: number;
        figura_alto: number;
        figura_radio: number;
        figura_sin_rotacion: boolean;
        figura_rebote: number;
        figura_sensor: boolean;
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
        figura: string;
        figura_ancho: number;
        figura_alto: number;
        figura_radio: number;
        espejado: boolean;
        espejado_vertical: boolean;
        transparencia: number;
        id_color: number;
    };
    etiqueta: string;
    generar_color_para_depurar(): number;
    pre_actualizar(): void;
    estado: string;
    actualizar(): void;
    actualizar_sensores(): void;
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
    crear_figura_rectangular(ancho?: number, alto?: number): void;
    crear_figura_circular(radio?: number): void;
    ancho: number;
    alto: number;
    estatico: boolean;
    dinamico: boolean;
    impulsar(x: any, y: any): void;
    velocidad_x: number;
    velocidad_y: number;
    rebote: number;
    sensor: boolean;
    fijo: boolean;
    espejado: boolean;
    espejado_vertical: boolean;
    cada_segundo(): void;
    avanzar(rotacion?: number, velocidad?: number): void;
    crear_animacion(nombre: any, cuadros: any, velocidad: any): void;
    reproducir_animacion(nombre: any): void;
    animacion: string;
    cuando_comienza_una_colision(actor: Actor): void;
    cuando_se_mantiene_una_colision(actor: Actor): void;
    cuando_termina_una_colision(actor: Actor): void;
    readonly cantidad_de_colisiones: number;
    agregar_sensor(ancho: any, alto: any, x: any, y: any): any;
    eliminar(): void;
    figura_ancho: number;
    figura_alto: number;
    figura_radio: number;
}
declare class Actor extends ActorBase {
    propiedades: {};
    iniciar(): void;
    actualizar(): void;
}
declare class aceituna extends Actor {
    iniciar(): void;
}
declare class caja extends Actor {
    propiedades: {
        x: number;
        y: number;
        imagen: string;
        etiqueta: string;
        figura: string;
        figura_ancho: number;
        figura_alto: number;
        figura_rebote: number;
    };
    iniciar(): void;
}
declare class conejo extends Actor {
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
    toca_el_suelo: boolean;
    pies: any;
    iniciar(): void;
    actualizar(): void;
    parado_iniciar(): void;
    parado_actualizar(): void;
    camina_iniciar(): void;
    camina_actualizar(): void;
    salta_iniciar(): void;
    salta_actualizar(): void;
    cuando_comienza_una_colision(actor: any): boolean;
    cuando_se_mantiene_una_colision(actor: any): void;
    cuando_termina_una_colision(actor: any): void;
}
declare class logo extends Actor {
    iniciar(): void;
}
declare class moneda extends Actor {
    propiedades: {
        imagen: string;
        etiqueta: string;
        figura: string;
        figura_radio: number;
        figura_dinamica: boolean;
        figura_sensor: boolean;
    };
}
declare class nave extends Actor {
    velocidad: number;
    iniciar(): void;
    actualizar(): void;
}
declare class nube extends Actor {
    propiedades: {
        imagen: string;
    };
    iniciar(): void;
}
declare class pared extends Actor {
    propiedades: {
        figura: string;
        imagen: string;
        y: number;
        figura_ancho: number;
        figura_alto: number;
        figura_dinamica: boolean;
        figura_rebote: number;
    };
    iniciar(): void;
}
declare class pelota extends Actor {
    propiedades: {
        imagen: string;
        figura: string;
        figura_radio: number;
    };
    iniciar(): void;
}
declare class plataforma extends Actor {
    propiedades: {
        figura: string;
        imagen: string;
        etiqueta: string;
        y: number;
        figura_ancho: number;
        figura_alto: number;
        figura_dinamica: boolean;
        figura_rebote: number;
    };
    iniciar(): void;
}
declare class suelo extends Actor {
    propiedades: {
        figura: string;
        imagen: string;
        y: number;
        figura_ancho: number;
        figura_alto: number;
        figura_dinamica: boolean;
    };
    iniciar(): void;
}
declare class techo extends Actor {
    propiedades: {
        figura: string;
        imagen: string;
        y: number;
        figura_ancho: number;
        figura_alto: number;
        figura_dinamica: boolean;
    };
    iniciar(): void;
}
declare class EscenaBase {
    pilas: Pilas;
    actores: Actor[];
    id: number;
    camara: Camara;
    fondo: string;
    constructor(pilas: any);
    agregar_actor(actor: Actor): void;
    serializar(): {
        camara_x: any;
        camara_y: number;
        fondo: string;
    };
    actualizar_actores(): void;
    quitar_actor_luego_de_eliminar(actor: Actor): void;
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
    pilas: Pilas;
    fps: any;
    graphics: any;
    constructor(data: any);
    create(datos: any): void;
    destacar_actor_por_id(id: any): void;
    crear_canvas_de_depuracion(): void;
    update(actores: any): void;
    crear_fondo(fondo: any): void;
    obtener_actor_por_id(id: any): any;
    actualizar_sprite_desde_datos(sprite: any, actor: any): void;
    crear_figura_estatica_para(actor: any): any;
    posicionar_la_camara(datos_de_la_escena: any): void;
    actualizar_posicion(posicion?: any): void;
    dibujar_punto_de_control(graphics: any, x: any, y: any): void;
}
declare class ModoCargador extends Modo {
    pilas: Pilas;
    constructor();
    preload(): void;
    create(): void;
    cuando_progresa_la_carga(progreso: any): void;
    update(): void;
}
declare class ModoEditor extends Modo {
    pilas: Pilas;
    ancho: number;
    alto: number;
    constructor();
    preload(): void;
    create(datos: any): void;
    crear_manejadores_para_hacer_arrastrables_los_actores(): void;
    crear_actores_desde_los_datos_de_la_escena(escena: any): void;
    crear_sprite_desde_actor(actor: any): void;
    aplicar_atributos_de_actor_a_sprite(actor: any, sprite: any): void;
    update(): void;
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
    pausar: boolean;
    constructor();
    preload(): void;
    create(datos: any): void;
    vincular_eventos_de_colision(): void;
    obtener_escena_inicial(): any;
    instanciar_escena(nombre: any): void;
    crear_escena(datos_de_la_escena: any): void;
    crear_actor(entidad: any): any;
    obtener_referencias_a_clases(): any;
    obtener_codigo_para_exportar_clases(codigo: any): string;
    guardar_parametros_en_atributos(datos: any): void;
    update(): void;
    guardar_foto_de_entidades(): void;
    dibujar_punto_de_control(graphics: any, x: any, y: any): void;
}
declare class ModoPausa extends Modo {
    pilas: Pilas;
    graphics_modo_pausa: any;
    fps: any;
    ancho: number;
    alto: number;
    posicion: number;
    sprites: any;
    texto: any;
    total: number;
    izquierda: any;
    derecha: any;
    constructor();
    preload(): void;
    create(datos: any): void;
    private crear_sprites_desde_historia(posicion);
    update(): void;
    crear_sprite_desde_entidad(entidad: any): Phaser.GameObjects.Sprite;
    actualizar_posicion(posicion: any): void;
    crear_canvas_de_depuracion_modo_pausa(): void;
}
