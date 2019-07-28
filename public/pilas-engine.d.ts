declare class Actores {
    pilas: Pilas;
    constructor(pilas: any);
    crear_actor(nombre: string): any;
    actor(): any;
    aceituna(x?: number, y?: number): any;
    caja(): any;
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
    texto(): any;
    laser(): any;
    deslizador(): any;
    boton(): any;
    boton_de_control_izquierda(): any;
    boton_de_control_derecha(): any;
    boton_de_control_arriba(): any;
    boton_de_control_abajo(): any;
    boton_de_control_espacio(): any;
    ceferino(): any;
    robot(): any;
    puntaje(): any;
    reiniciar_escena(): any;
    nube_animada(): any;
    pizarra(): any;
    explosion(): any;
}
declare class Animaciones {
    pilas: Pilas;
    animaciones: {};
    constructor(pilas: Pilas);
    crear_animacion(actor: Actor, nombre_de_la_animacion: string, cuadros: any[], velocidad: number): void;
    existe_animacion(actor: any, nombre: any): boolean;
}
declare class Automata {
    actor: Actor;
    _estado: string;
    constructor(actor: Actor);
    estado: string;
    iniciar_estado(nombre: string): void;
    actualizar(): void;
    validar_que_existen_los_metodos_de_estado(nombre: string): void;
}
declare class Camara {
    pilas: Pilas;
    constructor(pilas: Pilas);
    readonly camara_principal: any;
    vibrar(intensidad?: number, tiempo?: number): void;
    x: number;
    y: number;
}
interface Color {
    nombre: string;
    hexa: number;
    ingles: string;
}
declare class Colores {
    pilas: Pilas;
    _lista_de_colores: Color[];
    constructor(pilas: Pilas);
    convertir_a_hexa(color: any): number;
    validar_color(color: string): boolean;
    readonly colores: string[];
    generar(rojo: number, verde: number, azul: number): number;
}
declare class Control {
    private pilas;
    private _izquierda;
    private _derecha;
    private _arriba;
    private _abajo;
    private _espacio;
    private _simulaciones;
    constructor(pilas: Pilas);
    terminar(): void;
    private conectar_teclas;
    private desconectar_teclas;
    izquierda: boolean;
    derecha: boolean;
    arriba: boolean;
    abajo: boolean;
    espacio: boolean;
    simular_pulsacion(nombre: string, pulsacion: boolean): void;
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
    escena_actual: EscenaBase;
    constructor(pilas: Pilas);
    Normal(): Normal;
    vincular(escena: Escena): void;
    definir_escena_actual(escena: EscenaBase): void;
}
declare class Eventos {
    pilas: Pilas;
    constructor(pilas: any);
    conectar(nombre_del_evento: string, funcion: any): string;
    desconectar(identificador_del_evento: string): void;
    emitir_evento(identificador: any, datos: any): void;
}
declare class EventosDeEscena {
    pilas: Pilas;
    conexiones: any;
    nombres_de_eventos: string[];
    constructor(pilas: any);
    conectar(nombre_del_evento: string, funcion: any): string;
    desconectar(identificador_del_evento: string): void;
    private generar_id;
    emitir_evento(identificador: any, datos: any): void;
}
declare class Fisica {
    pilas: Pilas;
    constructor(pilas: Pilas);
    readonly Matter: any;
    gravedad_x: number;
    gravedad_y: number;
}
declare class Habilidad {
    pilas: Pilas;
    actor: Actor;
    constructor(pilas: Pilas, actor: Actor);
    iniciar(): void;
    actualizar(): void;
}
declare class RotarConstantemente extends Habilidad {
    iniciar(): void;
    actualizar(): void;
}
declare class Arrastrable extends Habilidad {
    iniciar(): void;
    actualizar(): void;
}
declare class MoverConElTeclado extends Habilidad {
    iniciar(): void;
    actualizar(): void;
}
declare class SeguirAlMouse extends Habilidad {
    iniciar(): void;
    actualizar(): void;
}
declare class SeguirAlMouseLentamente extends Habilidad {
    iniciar(): void;
    actualizar(): void;
}
declare class OscilarVerticalmente extends Habilidad {
    contador: number;
    iniciar(): void;
    actualizar(): void;
}
declare class OscilarRotacion extends Habilidad {
    contador: number;
    iniciar(): void;
    actualizar(): void;
}
declare class OscilarTransparencia extends Habilidad {
    contador: number;
    iniciar(): void;
    actualizar(): void;
}
declare class Habilidades {
    pilas: Pilas;
    _habilidades: any[];
    constructor(pilas: any);
    buscar(habilidad: String): any;
    generar_lista_de_similitudes(habilidad: any): {
        similitud: any;
        habilidad: any;
    }[];
    listar(): any[];
    vincular(nombre: string, clase: any): void;
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
declare class Huesos {
    pose: any;
    contenedor: any;
    atlas: string;
    animacion_actual: string;
    pilas: Pilas;
    sprites: any;
    constructor(pilas: Pilas, nombre_de_datos_json: string, nombre_de_atlas: string, contenedor: any);
    obtener_animaciones(): string[];
    obtener_primer_animacion(): string;
    definir_animacion(nombre: string): void;
    obtener_siguiente_animacion(): string;
    actualizar_animacion(dt: any): void;
    obtener_o_crear_sprite(nombre: string, imagen: string): any;
    actualizar_posicion(pose: any): void;
    eliminar_sprites(): void;
}
declare const DEPURAR_MENSAJES = false;
declare class Mensajes {
    pilas: Pilas;
    fondo: Phaser.GameObjects.TileSprite;
    constructor(pilas: Pilas);
    private agregar_manejador_de_eventos;
    atender_mensaje(e: any): void;
    atender_mensaje_iniciar_pilas(datos: any): void;
    atender_mensaje_definir_estados_de_depuracion(datos: any): void;
    emitir_mensaje_al_editor(nombre: string, datos?: any): void;
    atender_mensaje_define_escena(datos: any): void;
    atender_mensaje_actualizar_escena_desde_el_editor(datos: any): void;
    atender_mensaje_ejecutar_proyecto(datos: any): void;
    emitir_excepcion_al_editor(error: any, origen: any): void;
    atender_mensaje_selecciona_actor_desde_el_editor(datos: any): void;
    atender_mensaje_actualizar_actor_desde_el_editor(datos: any): void;
    atender_mensaje_pausar_escena(): void;
    atender_mensaje_cambiar_posicion(datos: any): void;
    atender_mensaje_eliminar_actor_desde_el_editor(datos: any): void;
    atender_mensaje_actualizar_proyecto_desde_el_editor(datos: any): void;
}
declare class Utilidades {
    pilas: Pilas;
    id: number;
    navegador: string;
    constructor(pilas: Pilas);
    obtener_id_autoincremental(): number;
    acceso_incorrecto(v: any): void;
    obtener_rampa_de_colores(): number[];
    obtener_color_al_azar(): number;
    limitar(valor: number, minimo: number, maximo: number): number;
    validar_numero(valor: number): void;
    es_animacion(valor: any): boolean;
    convertir_angulo_a_radianes(grados: number): number;
    convertir_radianes_a_angulos(radianes: number): number;
    es_firefox(): boolean;
    convertir_coordenada_de_pilas_a_phaser(x: number, y: number): {
        x: number;
        y: number;
    };
    convertir_coordenada_de_phaser_a_pilas(x: number, y: number): {
        x: number;
        y: number;
    };
    combinar_propiedades(propiedades_iniciales: any, propiedades: any): any;
    obtener_distancia_entre(desde_x: number, desde_y: number, hasta_x: number, hasta_y: number): number;
    obtener_similaridad(cadena1: string, cadena2: string): any;
    obtener_mas_similar(nombre: any, posibilidades: any): any;
    validar_que_existe_imagen(nombre: any): void;
    sincronizar_contenedor(contenedor: any, sprite: any): void;
}
declare var NineSlice: any;
declare var HOST: string;
declare class Pilas {
    game: Phaser.Game;
    mensajes: Mensajes;
    depurador: Depurador;
    utilidades: Utilidades;
    escenas: Escenas;
    historia: Historia;
    sonidos: {
        [key: string]: any;
    };
    actores: Actores;
    animaciones: Animaciones;
    Phaser: any;
    eventos: Eventos;
    colores: Colores;
    recursos: any;
    fisica: Fisica;
    habilidades: Habilidades;
    modo: any;
    _ancho: number;
    _alto: number;
    cursor_x: number;
    cursor_y: number;
    opciones: any;
    imagenes_precargadas: string[];
    constructor();
    escena: EscenaBase;
    control: Control;
    readonly camara: Camara;
    iniciar_phaser(ancho: number, alto: number, recursos: any, opciones: any): void;
    iniciar(ancho: number, alto: number, recursos: any, opciones?: any): this;
    listar_imagenes(): string[];
    private iniciar_phaser_desde_configuracion_y_cargar_escenas;
    ejecutar(): void;
    definir_modo(nombre: string, datos: any): void;
    cambiar_escena(nombre: string): void;
    reiniciar_escena(): void;
    crear_configuracion(ancho: number, alto: number, maximizar: boolean, pixelart: boolean): {
        type: number;
        parent: string;
        scale: any;
        width: number;
        height: number;
        backgroundColor: string;
        disableContextMenu: boolean;
        pixelArt: boolean;
        autostart: boolean;
        input: {
            keyboard: boolean;
            mouse: boolean;
            touch: boolean;
            gamepad: boolean;
        };
        plugins: {
            global: any[];
        };
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
    buscar_actor(nombre: string): Actor;
    obtener_actor_por_nombre(nombre: string): Actor;
    obtener_actor_por_etiqueta(etiqueta: string): Actor;
    obtener_todos_los_actores_con_la_etiqueta(etiqueta: string): Actor[];
    obtener_cantidad_de_actores(): number;
    obtener_diccionario_de_actores(): {};
    obtener_actores_en(_x: number, _y: number): Actor[];
    escena_actual(): EscenaBase;
    animar(actor: any, propiedad: string, valor: any, duracion?: number): void;
    luego(duracion: number, tarea: any): any;
    cada(duracion: number, tarea: any): any;
    azar(desde: number, hasta: number): number;
    obtener_distancia_entre_puntos(x: number, y: number, x2: number, y2: number): number;
    obtener_distancia_entre_actores(actor1: ActorBase, actor2: ActorBase): number;
    obtener_angulo_entre_puntos(x: number, y: number, x2: number, y2: number): number;
    obtener_angulo_entre_actores(actor1: ActorBase, actor2: ActorBase): number;
    ocultar_cursor(): void;
    definir_cursor(nombre: string): void;
    observar(nombre: string, variable: any): void;
    clonar(nombre: string): any;
    clonar_en(nombre: string, x: number, y: number): any;
    clonar_en_posicion_al_azar(nombre: string): any;
    es_multiplo(a: number, b: number): boolean;
}
declare var pilasengine: Pilas;
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
    _es_texto: boolean;
    _texto: any;
    texto: any;
    _id: any;
    _nombre: any;
    _habilidades: any[];
    _fondo: any;
    _fondo_imagen: string;
    _dialogo: any;
    _texto_con_borde: boolean;
    _color_de_texto: string;
    _magnitud: number;
    propiedades_base: {
        x: number;
        y: number;
        z: number;
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
        es_texto: boolean;
        texto_con_borde: boolean;
        color: string;
        magnitud: number;
    };
    propiedades: any;
    constructor(pilas: any);
    readonly propiedades_iniciales: any;
    pre_iniciar(propiedades: any): void;
    private crear_sprite;
    protected copiar_atributos_de_sprite(origen: any, destino: any): void;
    iniciar(): void;
    interactivo: boolean;
    area_de_interactividad: any;
    definir_area_de_interactividad(ancho: number, alto: number): void;
    cuando_hace_click_en_la_pantalla(x: number, y: number, evento_original: any): void;
    fondo: string;
    serializar(): {
        tipo: String;
        x: number;
        y: number;
        z: number;
        centro_x: number;
        centro_y: number;
        rotacion: any;
        escala_x: number;
        escala_y: number;
        imagen: string;
        figura: string;
        figura_ancho: number;
        figura_alto: number;
        figura_radio: number;
        es_texto: boolean;
        texto: string;
        fondo: string;
        texto_con_borde: boolean;
        color_de_texto: string;
        magnitud: number;
        espejado: boolean;
        espejado_vertical: boolean;
        transparencia: number;
        id_color: number;
    };
    etiqueta: any;
    tiene_etiqueta(etiqueta: string): boolean;
    generar_color_para_depurar(): number;
    pre_actualizar(): void;
    estado: string;
    actualizar(): void;
    actualizar_habilidades(): void;
    actualizar_sensores(): void;
    imagen: string;
    nombre: any;
    id: any;
    x: any;
    y: any;
    z: number;
    rotacion: any;
    escala_x: any;
    escala_y: any;
    escala: number;
    centro_y: number;
    centro_x: number;
    transparencia: any;
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
    cada_segundo(segundos_transcurridos: number): void;
    avanzar(rotacion?: number, velocidad?: number): void;
    crear_animacion(nombre: any, cuadros: any, velocidad: any): void;
    reproducir_animacion(nombre_de_la_animacion: any): void;
    animacion: any;
    cuando_comienza_una_colision(actor: Actor): void;
    cuando_se_mantiene_una_colision(actor: Actor): void;
    cuando_termina_una_colision(actor: Actor): void;
    cuando_hace_click(x: any, y: any, evento_original: any): void;
    cuando_termina_de_hacer_click(x: any, y: any, evento_original: any): void;
    cuando_sale(x: any, y: any, evento_original: any): void;
    cuando_mueve(x: any, y: any, evento_original: any): void;
    readonly cantidad_de_colisiones: number;
    agregar_sensor(ancho: any, alto: any, x: any, y: any): any;
    eliminar(): void;
    esta_vivo(): boolean;
    figura_ancho: number;
    figura_alto: number;
    figura_radio: number;
    decir(mensaje: string): void;
    aprender(habilidad: string): void;
    tieneHabilidad(habilidad: string): boolean;
    aumentar(cantidad?: number): void;
    con_borde: boolean;
    magnitud: number;
    color: string;
}
declare class ActorTextoBase extends ActorBase {
    propiedades: {
        imagen: string;
        texto: string;
        es_texto: boolean;
    };
    margen_interno: number;
    iniciar(): void;
    con_borde: boolean;
    pre_actualizar(): void;
    actualizar(): void;
    sombra: boolean;
    texto: string;
    fondo: string;
    private crear_fondo;
    private actualizar_tamano_del_fondo;
    magnitud: number;
    color: string;
    eliminar(): void;
}
declare class Actor extends ActorBase {
    propiedades: {};
    iniciar(): void;
    actualizar(): void;
}
declare class PizarraBase extends Actor {
    propiedades: {
        imagen: string;
    };
    _canvas: any;
    iniciar(): void;
    dibujar_circulo(x?: number, y?: number, radio?: number, color?: any): void;
    dibujar_borde_de_circulo(x?: number, y?: number, radio?: number, color?: any, grosor?: number): void;
    dibujar_rectangulo(x?: number, y?: number, ancho?: number, alto?: number, color?: any): void;
    dibujar_borde_de_rectangulo(x?: number, y?: number, ancho?: number, alto?: number, color?: any, grosor?: number): void;
    dibujar_linea(x?: number, y?: number, x1?: number, y1?: number, color?: any, grosor?: number): void;
    limpiar(): void;
    actualizar(): void;
    pre_actualizar(): void;
}
declare class aceituna extends Actor {
    propiedades: {
        imagen: string;
    };
    iniciar(): void;
}
declare class actor extends Actor {
    propiedades: {
        imagen: string;
    };
    iniciar(): void;
    actualizar(): void;
}
declare class boton extends ActorTextoBase {
    propiedades: {
        imagen: string;
        fondo: string;
        texto: string;
        es_texto: boolean;
        z: number;
        color: string;
    };
    cuando_hace_click(): void;
    cuando_mueve(): void;
    cuando_sale(): void;
}
declare class boton_de_control_abajo extends Actor {
    propiedades: {
        imagen: string;
        z: number;
    };
    pulsado: boolean;
    iniciar(): void;
    actualizar(): void;
    cuando_hace_click(): void;
    cuando_sale(): void;
    cuando_termina_de_hacer_click(): void;
}
declare class boton_de_control_arriba extends Actor {
    propiedades: {
        imagen: string;
        z: number;
    };
    pulsado: boolean;
    iniciar(): void;
    actualizar(): void;
    cuando_hace_click(): void;
    cuando_sale(): void;
    cuando_termina_de_hacer_click(): void;
}
declare class boton_de_control_derecha extends Actor {
    propiedades: {
        imagen: string;
        z: number;
    };
    pulsado: boolean;
    iniciar(): void;
    actualizar(): void;
    cuando_hace_click(): void;
    cuando_sale(): void;
    cuando_termina_de_hacer_click(): void;
}
declare class boton_de_control_espacio extends Actor {
    propiedades: {
        imagen: string;
        z: number;
    };
    pulsado: boolean;
    iniciar(): void;
    actualizar(): void;
    cuando_hace_click(): void;
    cuando_sale(): void;
    cuando_termina_de_hacer_click(): void;
}
declare class boton_de_control_izquierda extends Actor {
    propiedades: {
        imagen: string;
        z: number;
    };
    pulsado: boolean;
    iniciar(): void;
    actualizar(): void;
    cuando_hace_click(): void;
    cuando_sale(): void;
    cuando_termina_de_hacer_click(): void;
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
declare class ceferino extends Actor {
    propiedades: {
        imagen: string;
        centro_x: number;
        centro_y: number;
    };
    contenedor: any;
    huesos: Huesos;
    iniciar(): void;
    actualizar(): void;
    pre_actualizar(): void;
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
    crear_animaciones(): void;
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
declare class deslizador extends Actor {
    propiedades: {
        x: number;
        y: number;
        imagen: string;
        etiqueta: string;
        figura: string;
    };
    valor: number;
    marca: Actor;
    esta_arrastrando_el_deslizador: any;
    iniciar(): void;
    conectar_eventos(): void;
    crear_marca(): void;
    cuando_hace_click(x: any, y: any): void;
    private cuando_mueve_el_mouse;
    cuando_termina_de_hacer_click(): void;
    actualizar(): void;
    private ajustar_marca;
}
declare class explosion extends Actor {
    propiedades: {
        figura: string;
        imagen: string;
        etiqueta: string;
    };
    contador: number;
    iniciar(): void;
    cargar_animacion(): void;
    actualizar(): void;
}
declare class gallina extends Actor {
    propiedades: {
        x: number;
        y: number;
        imagen: string;
        figura: string;
        figura_radio: number;
        figura_sin_rotacion: boolean;
        figura_dinamica: boolean;
        figura_rebote: number;
    };
    iniciar(): void;
    actualizar(): void;
    vuela_iniciar(): void;
    vuela_actualizar(): void;
    vuela_cuando_comienza_una_colision(actor: any): void;
}
declare class laser extends Actor {
    propiedades: {
        imagen: string;
    };
    velocidad: any;
    iniciar(): void;
    actualizar(): void;
}
declare class logo extends Actor {
    propiedades: {
        imagen: string;
    };
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
    propiedades: {
        imagen: string;
    };
    velocidad: number;
    cuadros_desde_el_ultimo_disparo: any;
    iniciar(): void;
    crear_animaciones(): void;
    actualizar(): void;
    disparar(): void;
}
declare class nube extends Actor {
    propiedades: {
        imagen: string;
    };
    iniciar(): void;
}
declare class nube_animada extends Actor {
    propiedades: {
        imagen: string;
        z: number;
    };
    velocidad: number;
    iniciar(): void;
    actualizar(): void;
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
declare class pizarra extends PizarraBase {
    propiedades: {
        imagen: string;
    };
    iniciar(): void;
    actualizar(): void;
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
declare class puntaje extends ActorTextoBase {
    propiedades: {
        imagen: string;
        texto: string;
        color: string;
        es_texto: boolean;
        z: number;
        texto_con_borde: boolean;
        magnitud: number;
    };
    puntaje: number;
    iniciar(): void;
    aumentar(cantidad?: number): void;
    actualizar_texto(): void;
}
declare class reiniciar_escena extends ActorTextoBase {
    propiedades: {
        imagen: string;
        fondo: string;
        texto: string;
        es_texto: boolean;
        z: number;
        color: string;
    };
    cuando_hace_click(): void;
    cuando_mueve(): void;
    cuando_sale(): void;
}
declare class robot extends Actor {
    propiedades: {
        imagen: string;
        centro_y: number;
    };
    contenedor: any;
    huesos: Huesos;
    iniciar(): void;
    actualizar(): void;
    pre_actualizar(): void;
}
declare class suelo extends Actor {
    propiedades: {
        figura: string;
        imagen: string;
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
        figura_ancho: number;
        figura_alto: number;
        figura_dinamica: boolean;
    };
    iniciar(): void;
}
declare class texto extends ActorTextoBase {
    propiedades: {
        imagen: string;
        texto: string;
        es_texto: boolean;
        z: number;
        color: string;
    };
}
declare class EscenaBase {
    pilas: Pilas;
    actores: Actor[];
    id: number;
    camara: Camara;
    fondo: string;
    control: Control;
    _gravedad_x: number;
    _gravedad_y: number;
    eventos: EventosDeEscena;
    _observables: any;
    _actor_visor_observables: any;
    constructor(pilas: any);
    observar(nombre: string, variable: any): void;
    agregar_actor(actor: Actor): void;
    gravedad_x: number;
    gravedad_y: number;
    private actualizar_gravedad;
    obtener_nombre_para(nombre_propuesto: string): string;
    serializar(): {
        camara_x: number;
        camara_y: number;
        fondo: string;
    };
    pre_actualizar(): void;
    actualizar(): void;
    actualizar_actores(): void;
    avisar_click_en_la_pantalla_a_los_actores(x: number, y: number, evento_original: any): void;
    quitar_actor_luego_de_eliminar(actor: Actor): void;
    terminar(): void;
    cuando_hace_click(x: any, y: any, evento_original: any): void;
    cuando_mueve(x: any, y: any, evento_original: any): void;
    cada_segundo(segundos_transcurridos: number): void;
}
declare class Escena extends EscenaBase {
    cuadro: number;
    iniciar(): void;
    pre_actualizar(): void;
    obtener_oscilacion(velocidad: any, intensidad: any): number;
}
declare class Normal extends Escena {
    iniciar(): void;
    actualizar(): void;
}
declare function loadBool(json: any, key: string | number, def?: boolean): boolean;
declare function saveBool(json: any, key: string | number, value: boolean, def?: boolean): void;
declare function loadFloat(json: any, key: string | number, def?: number): number;
declare function saveFloat(json: any, key: string | number, value: number, def?: number): void;
declare function loadInt(json: any, key: string | number, def?: number): number;
declare function saveInt(json: any, key: string | number, value: number, def?: number): void;
declare function loadString(json: any, key: string | number, def?: string): string;
declare function saveString(json: any, key: string | number, value: string, def?: string): void;
declare function makeArray(value: any): any[];
declare function wrap(num: number, min: number, max: number): number;
declare function interpolateLinear(a: any, b: any, t: any): any;
declare function interpolateQuadratic(a: any, b: any, c: any, t: any): any;
declare function interpolateCubic(a: any, b: any, c: any, d: any, t: any): any;
declare function interpolateQuartic(a: any, b: any, c: any, d: any, e: any, t: any): any;
declare function interpolateQuintic(a: any, b: any, c: any, d: any, e: any, f: any, t: any): any;
declare function interpolateBezier(x1: any, y1: any, x2: any, y2: any, t: any): number;
declare function tween(a: any, b: any, t: any): any;
declare function wrapAngleRadians(angle: any): number;
declare function tweenAngleRadians(a: any, b: any, t: any, spin: any): any;
declare class Angle {
    rad: number;
    constructor(rad?: number);
    deg: number;
    readonly cos: number;
    readonly sin: number;
    selfIdentity(): Angle;
    copy(other: Angle): Angle;
    static add(a: Angle, b: Angle, out?: Angle): Angle;
    add(other: Angle, out?: Angle): Angle;
    selfAdd(other: Angle): Angle;
    static tween(a: Angle, b: Angle, pct: number, spin: number, out?: Angle): Angle;
    tween(other: Angle, pct: number, spin: number, out?: Angle): Angle;
    selfTween(other: Angle, pct: number, spin: number): Angle;
}
declare class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    copy(other: Vector): Vector;
    static equal(a: Vector, b: Vector, epsilon?: number): boolean;
    static add(a: Vector, b: Vector, out?: Vector): Vector;
    add(other: Vector, out?: Vector): Vector;
    selfAdd(other: Vector): Vector;
    static tween(a: Vector, b: Vector, pct: number, out?: Vector): Vector;
    tween(other: Vector, pct: number, out?: Vector): Vector;
    selfTween(other: Vector, pct: number): Vector;
}
declare class Position extends Vector {
    constructor();
}
declare class Rotation extends Angle {
    constructor();
}
declare class Scale extends Vector {
    constructor();
    selfIdentity(): Scale;
}
declare class Pivot extends Vector {
    constructor();
    selfIdentity(): Scale;
}
declare class Space {
    position: Position;
    rotation: Rotation;
    scale: Scale;
    copy(other: Space): Space;
    load(json: any): Space;
    static equal(a: Space, b: Space, epsilon?: number): boolean;
    static identity(out?: Space): Space;
    static translate(space: any, x: any, y: any): any;
    static rotate(space: any, rad: any): any;
    static scale(space: any, x: any, y: any): any;
    static invert(space: any, out: any): any;
    static combine(a: any, b: any, out: any): any;
    static extract(ab: any, a: any, out: any): any;
    static transform(space: any, v: any, out: any): any;
    static untransform(space: any, v: any, out: any): any;
    static tween(a: any, b: any, pct: any, spin: any, out: any): any;
}
declare class Element {
    id: number;
    name: string;
    load(json: any): Element;
}
declare class File extends Element {
    type: string;
    constructor(type: string);
    load(json: any): any;
}
declare class ImageFile extends File {
    width: number;
    height: number;
    pivot: Pivot;
    constructor();
    load(json: any): ImageFile;
}
declare class SoundFile extends File {
    constructor();
    load(json: any): SoundFile;
}
declare class Folder extends Element {
    file_array: File[];
    load(json: any): Folder;
}
declare class BaseObject {
    type: string;
    name: string;
    local_space: any;
    world_space: any;
    pivot: any;
    constructor(type: string);
    load(json: any): BaseObject;
}
declare class SpriteObject extends BaseObject {
    parent_index: number;
    folder_index: number;
    file_index: number;
    local_space: Space;
    world_space: Space;
    default_pivot: boolean;
    pivot: Pivot;
    z_index: number;
    alpha: number;
    constructor();
    load(json: any): SpriteObject;
    copy(other: SpriteObject): SpriteObject;
    tween(other: any, pct: any, spin: any): void;
}
declare class Bone extends BaseObject {
    parent_index: number;
    local_space: Space;
    world_space: Space;
    constructor();
    load(json: any): Bone;
    copy(other: Bone): Bone;
    tween(other: Bone, pct: number, spin: number): void;
}
declare class BoxObject extends BaseObject {
    parent_index: number;
    local_space: Space;
    world_space: Space;
    pivot: Pivot;
    constructor();
    load(json: any): BoxObject;
    copy(other: BoxObject): BoxObject;
    tween(other: BoxObject, pct: number, spin: number): void;
}
declare class PointObject extends BaseObject {
    parent_index: number;
    local_space: Space;
    world_space: Space;
    constructor();
    load(json: any): PointObject;
    copy(other: PointObject): PointObject;
    tween(other: PointObject, pct: number, spin: number): void;
}
declare class SoundObject extends BaseObject {
    folder_index: number;
    file_index: number;
    trigger: boolean;
    volume: number;
    panning: number;
    constructor();
    load(json: any): SoundObject;
    copy(other: SoundObject): SoundObject;
    tween(other: SoundObject, pct: number, spin: number): void;
}
declare class EntityObject extends BaseObject {
    parent_index: number;
    local_space: Space;
    world_space: Space;
    entity_index: number;
    animation_index: number;
    animation_time: number;
    pose: Pose;
    constructor();
    load(json: any): EntityObject;
    copy(other: EntityObject): EntityObject;
    tween(other: EntityObject, pct: number, spin: number): void;
}
declare class VariableObject extends BaseObject {
    constructor();
    load(json: any): VariableObject;
    copy(other: VariableObject): VariableObject;
    tween(other: VariableObject, pct: number, spin: number): void;
}
declare class Ref extends Element {
    parent_index: number;
    timeline_index: number;
    keyframe_index: number;
    load(json: any): Ref;
}
declare class BoneRef extends Ref {
}
declare class ObjectRef extends Ref {
    z_index: number;
    load(json: any): ObjectRef;
}
declare class Keyframe extends Element {
    time: number;
    load(json: any): Keyframe;
    static find(array: Keyframe[], time: number): number;
    static compare(a: Keyframe, b: Keyframe): number;
}
declare class Curve {
    type: string;
    c1: number;
    c2: number;
    c3: number;
    c4: number;
    load(json: any): Curve;
    evaluate(t: number): number;
}
declare class MainlineKeyframe extends Keyframe {
    curve: Curve;
    bone_ref_array: BoneRef[];
    object_ref_array: ObjectRef[];
    load(json: any): MainlineKeyframe;
}
declare class Mainline {
    keyframe_array: MainlineKeyframe[];
    load(json: any): Mainline;
}
declare class TimelineKeyframe extends Keyframe {
    type: string;
    spin: number;
    curve: Curve;
    constructor(type: string);
    load(json: any): TimelineKeyframe;
}
declare class SpriteTimelineKeyframe extends TimelineKeyframe {
    sprite: SpriteObject;
    constructor();
    load(json: any): SpriteTimelineKeyframe;
}
declare class BoneTimelineKeyframe extends TimelineKeyframe {
    bone: Bone;
    constructor();
    load(json: any): BoneTimelineKeyframe;
}
declare class BoxTimelineKeyframe extends TimelineKeyframe {
    box: BoxObject;
    constructor();
    load(json: any): BoxTimelineKeyframe;
}
declare class PointTimelineKeyframe extends TimelineKeyframe {
    point: PointObject;
    constructor();
    load(json: any): PointTimelineKeyframe;
}
declare class SoundTimelineKeyframe extends TimelineKeyframe {
    sound: SoundObject;
    constructor();
    load(json: any): SoundTimelineKeyframe;
}
declare class EntityTimelineKeyframe extends TimelineKeyframe {
    entity: EntityObject;
    constructor();
    load(json: any): EntityTimelineKeyframe;
}
declare class VariableTimelineKeyframe extends TimelineKeyframe {
    variable: VariableObject;
    constructor();
    load(json: any): VariableTimelineKeyframe;
}
declare class TagDef extends Element {
    tag_index: number;
    load(json: any): TagDef;
}
declare class Tag extends Element {
    tag_def_index: number;
    load(json: any): Tag;
}
declare class TaglineKeyframe extends Keyframe {
    tag_array: Tag[];
    load(json: any): TaglineKeyframe;
}
declare class Tagline extends Element {
    keyframe_array: TaglineKeyframe[];
    load(json: any): Tagline;
}
declare class VarlineKeyframe extends Keyframe {
    val: number | string;
    load(json: any): VarlineKeyframe;
}
declare class Varline extends Element {
    var_def_index: number;
    keyframe_array: VarlineKeyframe[];
    load(json: any): Varline;
}
declare class Meta extends Element {
    tagline: Tagline;
    varline_array: Varline[];
    load(json: any): Meta;
}
declare class Timeline extends Element {
    type: string;
    object_index: number;
    keyframe_array: TimelineKeyframe[];
    meta: Meta;
    load(json: any): Timeline;
}
declare class SoundlineKeyframe extends Keyframe {
    sound: SoundObject;
    load(json: any): SoundlineKeyframe;
}
declare class Soundline extends Element {
    keyframe_array: SoundlineKeyframe[];
    load(json: any): Soundline;
}
declare class EventlineKeyframe extends Keyframe {
    load(json: any): EventlineKeyframe;
}
declare class Eventline extends Element {
    keyframe_array: EventlineKeyframe[];
    load(json: any): Eventline;
}
declare class MapInstruction {
    folder_index: number;
    file_index: number;
    target_folder_index: number;
    target_file_index: number;
    load(json: any): MapInstruction;
}
declare class CharacterMap extends Element {
    map_instruction_array: MapInstruction[];
    load(json: any): CharacterMap;
}
declare class VarDef extends Element {
    type: string;
    default_value: number | string;
    value: number | string;
    load(json: any): VarDef;
}
declare class VarDefs extends Element {
    var_def_array: VarDef[];
    load(json: any): VarDefs;
}
declare class ObjInfo extends Element {
    type: string;
    var_defs: VarDefs;
    constructor(type: string);
    load(json: any): ObjInfo;
}
declare class SpriteFrame {
    folder_index: number;
    file_index: number;
    load(json: any): SpriteFrame;
}
declare class SpriteObjInfo extends ObjInfo {
    sprite_frame_array: SpriteFrame[];
    constructor();
    load(json: any): SpriteObjInfo;
}
declare class BoneObjInfo extends ObjInfo {
    w: number;
    h: number;
    constructor();
    load(json: any): BoneObjInfo;
}
declare class BoxObjInfo extends ObjInfo {
    w: number;
    h: number;
    constructor();
    load(json: any): BoxObjInfo;
}
declare class Animation extends Element {
    length: number;
    looping: string;
    loop_to: number;
    mainline: Mainline;
    timeline_array: Timeline[];
    soundline_array: Soundline[];
    eventline_array: Eventline[];
    meta: Meta;
    min_time: number;
    max_time: number;
    load(json: any): Animation;
}
declare class Entity extends Element {
    character_map_map: {
        [key: string]: CharacterMap;
    };
    character_map_keys: string[];
    var_defs: VarDefs;
    obj_info_map: {
        [key: string]: ObjInfo;
    };
    obj_info_keys: string[];
    animation_map: {
        [key: string]: Animation;
    };
    animation_keys: string[];
    load(json: any): Entity;
}
declare class Data {
    folder_array: Folder[];
    tag_def_array: TagDef[];
    entity_map: {
        [key: string]: Entity;
    };
    entity_keys: string[];
    load(json: any): Data;
    getEntities(): {
        [key: string]: Entity;
    };
    getEntityKeys(): string[];
    getAnims(entity_key: string): {
        [key: string]: Animation;
    };
    getAnimKeys(entity_key: string): string[];
}
declare class Pose {
    data: Data;
    entity_key: string;
    character_map_key_array: string[];
    anim_key: string;
    time: number;
    elapsed_time: number;
    dirty: boolean;
    bone_array: Bone[];
    object_array: BaseObject[];
    sound_array: any[];
    event_array: string[];
    tag_array: string[];
    var_map: {
        [key: string]: number | string;
    };
    constructor(data: Data);
    getEntities(): {
        [key: string]: Entity;
    };
    getEntityKeys(): string[];
    curEntity(): Entity;
    getEntity(): string;
    setEntity(entity_key: string): void;
    getAnims(): {
        [key: string]: Animation;
    };
    getAnimKeys(): string[];
    curAnim(): Animation;
    curAnimLength(): number;
    getAnim(): string;
    setAnim(anim_key: string): void;
    getTime(): number;
    setTime(time: number): void;
    update(elapsed_time: number): void;
    strike(): void;
}
declare class Modo extends Phaser.Scene {
    matter: Phaser.Physics.Matter.MatterPhysics;
    actores: any;
    pilas: Pilas;
    fps: any;
    fps_extra: any;
    graphics: any;
    fondo: any;
    _nombre_del_fondo: string;
    ancho: number;
    alto: number;
    es_modo_ejecucion: boolean;
    constructor(data: any);
    create(datos: any, ancho: any, alto: any): void;
    destacar_actor_por_id(id: any): void;
    crear_canvas_de_depuracion(): void;
    update(actores: any): void;
    posicionar_fondo(): void;
    obtener_posicion_de_la_camara(): {
        x: any;
        y: any;
    };
    crear_fondo(fondo: any): void;
    cambiar_fondo(fondo: any): void;
    obtener_actor_por_id(id: any): any;
    actualizar_sprite_desde_datos(sprite: any, actor: any): void;
    obtener_imagen_para_nineslice(imagen: any): any;
    copiar_valores_de_sprite_a_texto(sprite: any): void;
    crear_figura_estatica_para(actor: any): MatterJS.Body;
    posicionar_la_camara(datos_de_la_escena: any): void;
    actualizar_posicion(posicion?: any): void;
    dibujar_punto_de_control(graphics: any, x: any, y: any): void;
}
declare class ModoCargador extends Modo {
    pilas: Pilas;
    contador: number;
    barra_de_progreso: any;
    x: number;
    constructor();
    preload(): void;
    init(data: any): void;
    private crear_indicador_de_carga;
    update(): void;
    notificar_imagenes_cargadas(): void;
    create(): void;
    cuando_progresa_la_carga(progreso: any): void;
}
declare class ModoEditor extends Modo {
    pilas: Pilas;
    constructor();
    preload(): void;
    create(datos: any): void;
    private conectar_movimiento_del_mouse;
    crear_manejadores_para_hacer_arrastrables_los_actores(): void;
    crear_actores_desde_los_datos_de_la_escena(escena: any): void;
    crear_sprite_desde_actor(actor: any): void;
    private crear_destello;
    private copiar_atributos_excepto_alpha;
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
    modo_fisica_activado: boolean;
    _escena_en_ejecucion: any;
    constructor();
    preload(): void;
    create(datos: any): void;
    private conectar_eventos;
    private manejar_evento_click_de_mouse;
    private manejar_evento_termina_click;
    private manejar_evento_muevemouse;
    cambiar_escena(nombre: string): void;
    vincular_eventos_de_colision(): void;
    obtener_escena_inicial(): any;
    obtener_nombre_de_la_escena_inicial(): string;
    obtener_escena_por_nombre(nombre: string): any;
    instanciar_escena(nombre: any): void;
    crear_escena(datos_de_la_escena: any): void;
    clonar_actor_por_nombre(nombre: string): any;
    obtener_nombres_de_actores(): any;
    obtener_entidades_de_actores_de_todas_las_escenas(): any;
    obtener_definicion_de_actor_por_nombre(nombre: string): any;
    crear_actor(entidad: any): any;
    obtener_referencias_a_clases(): any;
    obtener_codigo_para_exportar_clases(codigo: any): string;
    guardar_parametros_en_atributos(datos: any): void;
    update(): void;
    pausar(): void;
    guardar_foto_de_entidades(): void;
    dibujar_punto_de_control(graphics: any, _x: any, _y: any): void;
}
declare class ModoPausa extends Modo {
    pilas: Pilas;
    graphics_modo_pausa: any;
    fps: any;
    posicion: number;
    sprites: any;
    texto: any;
    total: number;
    tecla_izquierda: any;
    tecla_derecha: any;
    constructor();
    preload(): void;
    create(datos: any): void;
    private crear_sprites_desde_historia;
    update(): void;
    crear_sprite_desde_entidad(entidad: any): any;
    actualizar_posicion(posicion: any): void;
    avanzar_posicion(): void;
    retroceder_posicion(): void;
    crear_canvas_de_depuracion_modo_pausa(): void;
}
