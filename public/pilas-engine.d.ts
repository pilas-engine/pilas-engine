declare class Depurador {
    pilas: Pilas;
    modo_posicion_activado: boolean;
    mostrar_fps: boolean;
    constructor(pilas: Pilas);
    definir_estados_de_depuracion(datos: any): void;
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
    atender_mensaje_selecciona_actor_desde_el_editor(datos: any): void;
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
}
declare var HOST: string;
declare class Pilas {
    mensajes: Mensajes;
    game: Phaser.Game;
    depurador: Depurador;
    utilidades: Utilidades;
    constructor();
    iniciar_phaser(ancho: number, alto: number): void;
    definir_modo(nombre: any, datos: any): void;
    crear_configuracion(ancho: any, alto: any): {
        type: number;
        parent: string;
        width: any;
        height: any;
        backgroundColor: string;
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
declare class ActorDelEditor {
    actor: Phaser.GameObjects.Sprite;
    constructor(funcion: any, datos: any);
}
declare class Modo extends Phaser.Scene {
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
    actores: any;
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
    actores: any;
    graphics: any;
    fps: any;
    clases: {};
    proyecto: any;
    codigo: any;
    nombre_de_la_escena_inicial: string;
    permitir_modo_pausa: boolean;
    preload(): void;
    create(datos: any): void;
    obtener_referencias_a_clases(): any;
    obtener_codigo_para_exportar_clases(codigo: any): string;
    guardar_parametros_en_atributos(datos: any): void;
    crear_fondo(): void;
    update(): void;
}
