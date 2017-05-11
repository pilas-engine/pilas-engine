/// <reference path="../pilas-engine/declaraciones/phaser.d.ts" />
/// <reference path="../pilas-engine/declaraciones/pixi.d.ts" />
/// <reference path="../pilas-engine/declaraciones/p2.d.ts" />
/// <reference path="../pilas-engine/declaraciones/box2d.d.ts" />
declare class Sistema {
    requisitos: Array<string>;
    pilas: Pilas;
    constructor(pilas: Pilas);
    iniciar(): void;
    procesar(entidades: Entidades): void;
}
declare class Evento {
    pilas: Pilas;
    evento: Phaser.Signal;
    nombre: string;
    emitir_log: boolean;
    constructor(pilas: Pilas, nombre: string);
    iniciar(): void;
    conectar(funcion: any, identificador?: string): void;
    emitir(datos?: {}): void;
}
declare class Actores {
    pilas: Pilas;
    constructor(pilas: Pilas);
    aceituna(x?: number, y?: number): ActorProxy;
}
declare class ActorProxy {
    pilas: Pilas;
    id: any;
    constructor(pilas: Pilas, id: any);
    x: any;
}
declare class Componentes {
    pilas: Pilas;
    constructor(pilas: any);
    etiquetable(): {
        nombre: string;
        datos: {
            etiquetas: string[];
        };
    };
    habilidades(): {
        nombre: string;
        datos: {
            habilidades: any[];
        };
    };
}
declare class Entidades {
    entidades: Array<any>;
    pilas: Pilas;
    constructor(pilas: Pilas);
    crear_entidad(nombre: string): number;
    obtener_entidades(): any[];
    private generarID();
    obtener_entidades_con(componentes: Array<string>): any[];
}
declare class Eventos {
    pilas: Pilas;
    _eventos: Array<any>;
    cuando_agrega_entidad: Evento;
    cuando_actualiza: Evento;
    cuando_carga: Evento;
    cuando_agrega_componente: Evento;
    cuando_vincula_habilidad: Evento;
    cuando_hace_click: Evento;
    constructor(pilas: Pilas);
    private _conectar_eventos();
    limpiar(): void;
}
declare class Habilidades {
    pilas: Pilas;
    _habilidades: Array<any>;
    constructor(pilas: Pilas);
    vincular(nombre: string, objeto: any): void;
}
declare class Log {
    pilas: Pilas;
    habilitado: boolean;
    constructor(pilas: Pilas);
    info(...args: any[]): void;
    habilitar(): void;
    deshabilitar(): void;
}
declare class Pilas {
    game: Phaser.Game;
    entidades: Entidades;
    actores: Actores;
    sistemas: Sistemas;
    contador_de_actualizaciones: number;
    pausado: boolean;
    componentes: Componentes;
    eventos: Eventos;
    validadores: Validadores;
    habilidades: Habilidades;
    log: Log;
    utils: Utils;
    grupo_actores: Phaser.Group;
    grupo_gui: Phaser.Group;
    constructor(idElementoDiv: any);
    obtener_entidades(): any[];
    obtener_entidades_como_string(): string;
    obtener_cantidad_de_entidades(): number;
    agregar_componente(id: any, componente: any, opciones?: {}): void;
    agregar_habilidad(id: any, nombre_de_la_habilidad: string): void;
    obtener_entidad_por_id(id: any): any;
    preload(): void;
    obtener_cuadros_por_segundo(): number;
    definir_cuadros_por_segundo(numero: number): void;
    private obtener_opciones();
    create(): void;
    update(): void;
    pausar(): void;
    continuar(): void;
    crear_entidad(nombre: any): number;
    azar(a: number, b: number): number;
    crear_actor_desde_entidad(identificador: any): ActorProxy;
}
declare var pilasengine: {
    iniciar: (idCanvas: any) => Pilas;
};
declare class Sistemas {
    pilas: Pilas;
    sistemas: Array<Sistema>;
    constructor(pilas: Pilas);
    inicializar_sistema(clase: any): void;
    procesar_sobre_entidades(entidades: Entidades): void;
}
declare class Apariencia extends Sistema {
    cache: any;
    iniciar(): void;
    procesar(entidades: Entidades): void;
}
declare class Depurable extends Sistema {
    cache: any;
    canvas: any;
    iniciar(): void;
    procesar(entidades: Entidades): void;
    _dibujar_cruz_del_punto_de_control(canvas: any, x: any, y: any): void;
    _dibujar_cruz(canvas: any, x: any, y: any, l: any): void;
}
declare class SistemaHabilidades extends Sistema {
    mapa_de_habilidades: any;
    iniciar(): void;
    private _cuando_vincula_habilidad(datos);
    procesar(entidades: Entidades): void;
    _procesar_evento_sobre_habilidad(evento: any, habilidad: any, actor: any): void;
}
declare class Utils {
    pilas: Pilas;
    constructor(pilas: Pilas);
    convertir_coordenada_desde_pilas_a_phaser(x: number, y: number): {
        x: number;
        y0: number;
    };
    convertir_coordenada_desde_phaser_a_pilas(x: number, y: number): {
        x: number;
        y: number;
    };
}
declare class Validadores {
    pilas: Pilas;
    constructor(pilas: Pilas);
    solo_numero_o_interpolacion(valor: any, mensaje_de_contexto?: string): boolean;
}
