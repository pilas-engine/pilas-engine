var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Depurador = (function () {
    function Depurador(pilas) {
        this.pilas = pilas;
        this.modo_posicion_activado = false;
        this.mostrar_fps = true;
    }
    Depurador.prototype.definir_estados_de_depuracion = function (datos) {
        this.mostrar_fps = datos.fps;
        this.modo_posicion_activado = datos.pos;
    };
    return Depurador;
}());
var DEPURAR_MENSAJES = false;
var Mensajes = (function () {
    function Mensajes(pilas) {
        this.pilas = pilas;
        this.agregar_manejador_de_eventos();
    }
    Mensajes.prototype.agregar_manejador_de_eventos = function () {
        window.addEventListener("message", this.atender_mensaje.bind(this), false);
    };
    Mensajes.prototype.atender_mensaje = function (e) {
        var metodo = "atender_mensaje_" + e.data.tipo;
        var datos = e.data;
        if (DEPURAR_MENSAJES) {
            console.log("[IN] llega el mensaje " + metodo);
        }
        if (this[metodo]) {
            this[metodo](datos);
        }
        else {
            console.error("Imposible llamar al evento " + metodo, datos);
        }
    };
    Mensajes.prototype.atender_mensaje_iniciar_pilas = function (datos) {
        this.pilas.iniciar_phaser(datos.ancho, datos.alto);
    };
    Mensajes.prototype.atender_mensaje_definir_estados_de_depuracion = function (datos) {
        this.pilas.depurador.definir_estados_de_depuracion(datos);
    };
    Mensajes.prototype.emitir_mensaje_al_editor = function (nombre, datos) {
        if (datos === void 0) { datos = null; }
        datos = datos || {};
        datos.tipo = nombre;
        if (DEPURAR_MENSAJES) {
            console.log("[OUT] Emitiendo el mensaje " + nombre);
        }
        window.parent.postMessage(datos, HOST);
    };
    Mensajes.prototype.atender_mensaje_define_escena = function (datos) {
        this.pilas.definir_modo("EscenaEditor", { pilas: this.pilas, escena: datos.escena });
    };
    Mensajes.prototype.atender_mensaje_ejecutar_proyecto = function (datos) {
        var parametros = {
            pilas: this.pilas,
            nombre_de_la_escena_inicial: datos.nombre_de_la_escena_inicial,
            permitir_modo_pausa: datos.permitir_modo_pausa,
            codigo: datos.codigo,
            proyecto: datos.proyecto
        };
        this.pilas.definir_modo("EscenaEjecucion", parametros);
    };
    Mensajes.prototype.atender_mensaje_actualizar_escena_desde_el_editor = function (datos) {
        console.log(datos);
    };
    Mensajes.prototype.atender_mensaje_selecciona_actor_desde_el_editor = function (datos) {
        console.log(datos);
    };
    return Mensajes;
}());
var Utilidades = (function () {
    function Utilidades(pilas) {
        this.pilas = pilas;
        this.id = 1;
        this.navegador = navigator.appCodeName;
    }
    Utilidades.prototype.obtener_id_autoincremental = function () {
        this.id = this.id + 1;
        return this.id;
    };
    Utilidades.prototype.acceso_incorrecto = function (v) {
        console.error("No se puede definir esta propiedad (valor " + v + ") porque es de solo lectura.");
    };
    Utilidades.prototype.obtener_rampa_de_colores = function () {
        var colores = ["#82E0AA", "#F8C471", "#F0B27A", "#F4F6F7", "#B2BABB", "#85C1E9", "#BB8FCE", "#F1948A", "#D98880"];
        return colores;
    };
    Utilidades.prototype.obtener_color_al_azar = function (opacidad) {
        var colores = this.obtener_rampa_de_colores();
        var cantidad_de_colores = colores.length;
        return colores[Math.floor(Math.random() * cantidad_de_colores)] + opacidad;
    };
    Utilidades.prototype.limitar = function (valor, minimo, maximo) {
        return Math.min(Math.max(valor, minimo), maximo);
    };
    Utilidades.prototype.validar_numero = function (valor) {
        if (typeof valor !== "number") {
            throw new Error("El valor enviado no corresponde con un n\u00FAmero: " + valor);
        }
    };
    Utilidades.prototype.convertir_angulo_a_radianes = function (grados) {
        return grados * Math.PI / 180;
    };
    Utilidades.prototype.convertir_radianes_a_angulos = function (radianes) {
        return radianes * 180 / Math.PI;
    };
    Utilidades.prototype.es_firefox = function () {
        return this.navegador === "Mozilla";
    };
    return Utilidades;
}());
var HOST = "file://";
if (window.location.host) {
    HOST = "http://" + window.location.host;
}
var Pilas = (function () {
    function Pilas() {
        this.mensajes = new Mensajes(this);
        this.depurador = new Depurador(this);
        this.utilidades = new Utilidades(this);
    }
    Pilas.prototype.iniciar_phaser = function (ancho, alto) {
        var self = this;
        var configuracion = this.crear_configuracion(ancho, alto);
        var game = new Phaser.Game(configuracion);
        game.scene.add("EscenaEditor", EscenaEditor, false);
        game.scene.add("EscenaCargador", EscenaCargador, false);
        game.scene.add("EscenaEjecucion", EscenaEjecucion, false);
        game.scene.start("EscenaCargador", { pilas: this });
        this.game = game;
    };
    Pilas.prototype.definir_modo = function (nombre, datos) {
        this.game.scene.stop("EscenaCargador");
        this.game.scene.stop("EscenaEjecutar");
        this.game.scene.stop("EscenaEditor");
        this.game.scene.start(nombre, datos);
    };
    Pilas.prototype.crear_configuracion = function (ancho, alto) {
        return {
            type: Phaser.AUTO,
            parent: "game",
            width: ancho,
            height: alto,
            backgroundColor: "#5d5d5d",
            physics: {
                default: "matter",
                matter: {
                    gravity: {
                        y: 1
                    },
                    debug: true
                }
            }
        };
    };
    return Pilas;
}());
var pilas = new Pilas();
var ActorDelEditor = (function () {
    function ActorDelEditor(funcion, datos) {
        var actor = funcion.call(datos.x, datos.y, datos.imagen);
    }
    return ActorDelEditor;
}());
var Escena = (function (_super) {
    __extends(Escena, _super);
    function Escena() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Escena;
}(Phaser.Scene));
var EscenaCargador = (function (_super) {
    __extends(EscenaCargador, _super);
    function EscenaCargador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EscenaCargador.prototype.preload = function () {
        this.pilas = pilas;
        this.load.image("pelota", "imagenes/pelota.png");
        this.load.image("plano", "imagenes/fondos/plano.png");
        this.load.image("pelota", "imagenes/pelota.png");
        this.load.image("logo", "imagenes/logo.png");
        this.load.image("sin_imagen", "imagenes/sin_imagen.png");
        this.load.image("caja", "imagenes/caja.png");
        this.load.image("aceituna", "imagenes/aceituna.png");
        this.load.image("plano", "imagenes/fondos/plano.png");
        this.load.image("nave", "imagenes/nave.png");
        this.load.audio("laser", "sonidos/laser.wav", {});
        this.load.audio("moneda", "sonidos/moneda.wav", {});
        this.load.audio("salto-corto", "sonidos/salto-corto.wav", {});
        this.load.audio("salto-largo", "sonidos/salto-largo.wav", {});
        this.load.audio("seleccion-aguda", "sonidos/seleccion-aguda.wav", {});
        this.load.audio("seleccion-grave", "sonidos/seleccion-grave.wav", {});
        this.load.bitmapFont("font", "fuentes/font.png", "fuentes/font.fnt", null, null);
        this.load.bitmapFont("verdana3", "fuentes/verdana3.png", "fuentes/verdana3.fnt", null, null);
        this.load.on("progress", this.cuando_progresa_la_carga, this);
    };
    EscenaCargador.prototype.create = function () {
        this.pilas.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos");
        this.add.bitmapText(5, 5, "verdana3", "Carga finalizada\nEnviá la señal 'ejecutar_proyecto' para continuar.");
    };
    EscenaCargador.prototype.cuando_progresa_la_carga = function (progreso) {
        this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", { progreso: Math.ceil(progreso * 100) });
    };
    return EscenaCargador;
}(Escena));
var EscenaEditor = (function (_super) {
    __extends(EscenaEditor, _super);
    function EscenaEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ancho = 500;
        _this.alto = 500;
        return _this;
    }
    EscenaEditor.prototype.preload = function () { };
    EscenaEditor.prototype.create = function (datos) {
        this.actores = [];
        this.pilas = datos.pilas;
        this.crear_fondo();
        this.crear_canvas_de_depuracion();
        this.posicionar_la_camara(datos.escena);
        this.crear_actores_desde_los_datos_de_la_escena(datos.escena);
        this.crear_manejadores_para_hacer_arrastrables_los_actores();
        this.fps = this.add.bitmapText(5, 5, "font", "FPS");
    };
    EscenaEditor.prototype.posicionar_la_camara = function (datos_de_la_escena) {
        this.cameras.cameras[0].x = datos_de_la_escena.camara_x;
        this.cameras.cameras[0].y = datos_de_la_escena.camara_y;
    };
    EscenaEditor.prototype.crear_fondo = function () {
        this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "plano");
        this.fondo.depth = -1000;
        this.fondo.setOrigin(0);
    };
    EscenaEditor.prototype.crear_manejadores_para_hacer_arrastrables_los_actores = function () {
        var escena = this;
        this.input.on("dragstart", function (pointer, gameObject) {
            if (escena.pilas.utilidades.es_firefox()) {
                escena.pilas.game.canvas.style.cursor = "grabbing";
            }
            else {
                escena.pilas.game.canvas.style.cursor = "-webkit-grabbing";
            }
        });
        this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.input.on("dragend", function (pointer, gameObject) {
            escena.pilas.game.canvas.style.cursor = "default";
        });
    };
    EscenaEditor.prototype.crear_actores_desde_los_datos_de_la_escena = function (escena) {
        var _this = this;
        escena.actores.map(function (actor) {
            _this.crear_sprite_desde_actor(actor);
        });
    };
    EscenaEditor.prototype.crear_sprite_desde_actor = function (actor) {
        var sprite = this.add.sprite(actor.x, actor.y, actor.imagen);
        sprite["setInteractive"]();
        sprite["actor"] = actor;
        this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
        this.input.setDraggable(sprite, undefined);
        this.actores.push(sprite);
    };
    EscenaEditor.prototype.aplicar_atributos_de_actor_a_sprite = function (actor, sprite) {
        sprite.rotacion = actor.rotacion;
        sprite.scaleX = actor.escala_x;
        sprite.scaleY = actor.escala_y;
        sprite.originX = actor.centro_x;
        sprite.originY = actor.centro_y;
        sprite.alpha = 1 - actor.transparencia / 100;
    };
    EscenaEditor.prototype.crear_canvas_de_depuracion = function () {
        var graphics = this.add.graphics({ x: 0, y: 0 });
        graphics.depth = 200;
        this.graphics = graphics;
    };
    EscenaEditor.prototype.update = function () {
        var _this = this;
        if (this.pilas.depurador.mostrar_fps) {
            this.fps.alpha = 1;
            this.fps.text = Math.round(this.time.now / 1000) + "";
        }
        else {
            this.fps.alpha = 0;
        }
        this.graphics.clear();
        if (this.pilas.depurador.modo_posicion_activado) {
            this.actores.map(function (sprite) {
                _this.dibujar_punto_de_control(_this.graphics, sprite.x, sprite.y);
            });
        }
    };
    EscenaEditor.prototype.dibujar_punto_de_control = function (graphics, x, y) {
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(x - 3, y - 3, 6, 6);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(x - 2, y - 2, 4, 4);
    };
    return EscenaEditor;
}(Escena));
var EscenaEjecucion = (function (_super) {
    __extends(EscenaEjecucion, _super);
    function EscenaEjecucion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EscenaEjecucion.prototype.preload = function () { };
    EscenaEjecucion.prototype.create = function (datos) {
        this.actores = [];
        this.pilas = datos.pilas;
        this.ancho = datos.proyecto.ancho;
        this.alto = datos.proyecto.alto;
        this.crear_fondo();
    };
    EscenaEjecucion.prototype.crear_fondo = function () {
        this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "plano");
        this.fondo.depth = -1000;
        this.fondo.setOrigin(0);
    };
    EscenaEjecucion.prototype.update = function () { };
    return EscenaEjecucion;
}(Escena));
