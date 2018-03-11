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
var Camara = (function () {
    function Camara(pilas) {
        this.pilas = pilas;
    }
    Object.defineProperty(Camara.prototype, "camara_principal", {
        get: function () {
            return this.pilas.modo.cameras.main;
        },
        enumerable: true,
        configurable: true
    });
    Camara.prototype.vibrar = function (intensidad, tiempo) {
        if (intensidad === void 0) { intensidad = 1; }
        if (tiempo === void 0) { tiempo = 1; }
        this.pilas.game.camera.shake(0.05 * intensidad, 250 * tiempo);
    };
    Object.defineProperty(Camara.prototype, "x", {
        get: function () {
            return this.camara_principal.x;
        },
        set: function (x) {
            this.pilas.utilidades.validar_numero(x);
            this.camara_principal.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camara.prototype, "y", {
        get: function () {
            return -this.camara_principal.y;
        },
        set: function (y) {
            this.pilas.utilidades.validar_numero(y);
            this.camara_principal.y = -y;
        },
        enumerable: true,
        configurable: true
    });
    return Camara;
}());
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
var Escenas = (function () {
    function Escenas(pilas) {
        this.escena_actual = null;
        this.pilas = pilas;
    }
    Escenas.prototype.Normal = function () {
        return new Normal(this.pilas);
    };
    Escenas.prototype.vincular = function (escena) {
        var _this = this;
        this[escena.name] = function () {
            _this.escena_actual = new escena(_this.pilas);
            return _this.escena_actual;
        };
    };
    Escenas.prototype.definir_escena_actual = function (escena) {
        this.escena_actual = escena;
    };
    return Escenas;
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
        this.pilas.definir_modo("ModoEditor", { pilas: this.pilas, escena: datos.escena });
    };
    Mensajes.prototype.atender_mensaje_ejecutar_proyecto = function (datos) {
        var parametros = {
            pilas: this.pilas,
            nombre_de_la_escena_inicial: datos.nombre_de_la_escena_inicial,
            permitir_modo_pausa: datos.permitir_modo_pausa,
            codigo: datos.codigo,
            proyecto: datos.proyecto
        };
        this.pilas.definir_modo("ModoEjecucion", parametros);
    };
    Mensajes.prototype.atender_mensaje_actualizar_escena_desde_el_editor = function (datos) {
        console.log(datos);
    };
    Mensajes.prototype.emitir_excepcion_al_editor = function (error, origen) {
        var detalle = {
            mensaje: error.message,
            stack: error.stack.toString()
        };
        console.warn("TODO: aquí deberia pausar phaser");
        this.emitir_mensaje_al_editor("error_de_ejecucion", detalle);
        console.warn("Se produjo una llamada a pilas.emitir_excepcion_al_editor desde " + origen);
        console.error(error);
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
    Utilidades.prototype.convertir_coordenada_de_pilas_a_phaser = function (x, y) {
        return { x: x + this.pilas._ancho / 2, y: this.pilas._alto / 2 - y };
    };
    Utilidades.prototype.convertir_coordenada_de_phaser_a_pilas = function (x, y) {
        return { x: x - this.pilas._ancho / 2, y: this.pilas._ancho / 2 - y };
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
        this.escenas = new Escenas(this);
    }
    Object.defineProperty(Pilas.prototype, "escena", {
        get: function () {
            return this.escenas.escena_actual;
        },
        enumerable: true,
        configurable: true
    });
    Pilas.prototype.iniciar_phaser = function (ancho, alto) {
        var self = this;
        var configuracion = this.crear_configuracion(ancho, alto);
        var game = new Phaser.Game(configuracion);
        this._ancho = ancho;
        this._alto = alto;
        this.game = game;
        game.scene.add("ModoEditor", ModoEditor, false);
        game.scene.add("ModoCargador", ModoCargador, false);
        game.scene.add("ModoEjecucion", ModoEjecucion, false);
        this.definir_modo("ModoCargador", { pilas: this });
    };
    Pilas.prototype.definir_modo = function (nombre, datos) {
        this.game.scene.stop("ModoCargador");
        this.game.scene.stop("EscenaEjecutar");
        this.game.scene.stop("ModoEditor");
        this.game.scene.start(nombre, datos);
        this.modo = this.game.scene.getScene(nombre);
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
var ActorBase = (function () {
    function ActorBase(pilas, x, y, imagen) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (imagen === void 0) { imagen = "sin_imagen"; }
        var _this = this;
        this.pilas = pilas;
        this.sprite = pilas.modo.matter.add.image(x, y, imagen);
        this.x = x;
        this.y = y;
        this.rotacion = 0;
        this.escala_x = 1;
        this.escala_y = 1;
        this.id_color = this.generar_color_para_depurar();
        this.sprite["actor"] = this;
        try {
            this.iniciar();
        }
        catch (e) {
            this.pilas.mensajes.emitir_excepcion_al_editor(e, "iniciar actor");
        }
        this.sprite.update = function () {
            try {
                _this.actualizar();
            }
            catch (e) {
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizar actor");
            }
        };
        this.pilas.escena.agregar_actor(this);
    }
    ActorBase.prototype.iniciar = function () { };
    ActorBase.prototype.serializar = function () {
        return {
            tipo: this.tipo,
            x: Math.round(this.x),
            y: Math.round(this.y),
            centro_x: this.centro_x,
            centro_y: this.centro_y,
            rotacion: this.rotacion,
            escala_x: this.escala_x,
            escala_y: this.escala_y,
            imagen: this.sprite.key,
            transparencia: this.transparencia,
            id_color: this.id_color
        };
    };
    ActorBase.prototype.generar_color_para_depurar = function () {
        var opacidad = "FF";
        return this.pilas.utilidades.obtener_color_al_azar(opacidad);
    };
    ActorBase.prototype.actualizar = function () { };
    Object.defineProperty(ActorBase.prototype, "imagen", {
        get: function () {
            return this.sprite.frameName;
        },
        set: function (nombre) {
            this.sprite.loadTexture(nombre);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "x", {
        get: function () {
            var x = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(this.sprite.x, 0).x;
            return x;
        },
        set: function (_x) {
            this.pilas.utilidades.validar_numero(_x);
            var x = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, 0).x;
            this.sprite.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "y", {
        get: function () {
            var y = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(0, this.sprite.y).y;
            return y;
        },
        set: function (_y) {
            this.pilas.utilidades.validar_numero(_y);
            var y = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(0, _y).y;
            this.sprite.y = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "rotacion", {
        get: function () {
            return -this.sprite.angle % 360;
        },
        set: function (angulo) {
            this.pilas.utilidades.validar_numero(angulo);
            this.sprite.angle = -(angulo % 360);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "escala_x", {
        get: function () {
            return this.sprite.scaleX;
        },
        set: function (s) {
            this.pilas.utilidades.validar_numero(s);
            this.sprite.scaleX = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "escala_y", {
        get: function () {
            return this.sprite.scaleY;
        },
        set: function (s) {
            this.pilas.utilidades.validar_numero(s);
            this.sprite.scaleY = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "escala", {
        get: function () {
            return this.escala_x;
        },
        set: function (escala) {
            this.pilas.utilidades.validar_numero(escala);
            this.escala_x = escala;
            this.escala_y = escala;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "centro_y", {
        get: function () {
            return this.sprite.originY;
        },
        set: function (y) {
            var comunes = {
                centro: 0.5,
                arriba: 0,
                abajo: 1,
                medio: 0.5
            };
            if (comunes[y] !== undefined) {
                y = comunes[y];
            }
            this.pilas.utilidades.validar_numero(y);
            this.sprite.setOrigin(this.centro_x, y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "centro_x", {
        get: function () {
            return this.sprite.originX;
        },
        set: function (x) {
            var comunes = {
                centro: 0.5,
                izquierda: 0,
                derecha: 1,
                medio: 0.5
            };
            if (comunes[x] !== undefined) {
                x = comunes[x];
            }
            this.pilas.utilidades.validar_numero(x);
            this.sprite.setOrigin(x, this.centro_y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "transparencia", {
        get: function () {
            return (1 - this.sprite.alpha) * 100;
        },
        set: function (t) {
            this.pilas.utilidades.validar_numero(t);
            t = this.pilas.utilidades.limitar(t, 0, 100);
            this.sprite.alpha = 1 - t / 100;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.toString = function () {
        var clase = this.constructor["name"];
        return "<" + clase + " en (" + this.x + ", " + this.y + ")>";
    };
    ActorBase.prototype.crear_figura_rectangular = function (ancho, alto, estatico) {
        if (ancho === void 0) { ancho = 0; }
        if (alto === void 0) { alto = 0; }
        if (estatico === void 0) { estatico = false; }
        this.pilas.utilidades.validar_numero(ancho);
        this.pilas.utilidades.validar_numero(alto);
        this.sprite.game.physics.p2.enable([this.sprite], false);
        this.sprite.body.static = estatico;
        if (ancho && alto) {
            this.sprite.body.setRectangle(ancho, alto);
        }
        else {
            this.sprite.body.setRectangle(this.ancho, this.alto);
        }
        this.sprite.body.angle = -this.rotacion;
    };
    ActorBase.prototype.crear_figura_circular = function (radio, estatico) {
        if (radio === void 0) { radio = 0; }
        if (estatico === void 0) { estatico = false; }
        this.pilas.utilidades.validar_numero(radio);
        console.warn("TODO: tengo que leer la variable estatico y definirla en el cuerpo matter");
        if (radio) {
            this.sprite.setCircle(radio);
        }
        else {
            this.sprite.setCircle();
        }
        this.sprite.body.angle = -this.rotacion;
    };
    Object.defineProperty(ActorBase.prototype, "ancho", {
        get: function () {
            return this.sprite.width;
        },
        set: function (a) {
            throw new Error("No puede definir este atributo");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "alto", {
        get: function () {
            return this.sprite.height;
        },
        set: function (a) {
            throw new Error("No puede definir este atributo");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "estatico", {
        get: function () {
            if (this.sprite.body) {
                return this.sprite.body.static;
            }
        },
        set: function (estatico) {
            if (this.sprite.body) {
                if (estatico) {
                    this.sprite.body.velocity.x = 0;
                    this.sprite.body.velocity.y = 0;
                    this.sprite.body.angularVelocity = 0;
                }
                this.sprite.body.static = estatico;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "dinamico", {
        get: function () {
            return !this.estatico;
        },
        set: function (dinamico) {
            this.estatico = !dinamico;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "fijo", {
        get: function () {
            return this.sprite.fixedToCamera;
        },
        set: function (valor) {
            this.sprite.fixedToCamera = valor;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.cada_segundo = function () { };
    ActorBase.prototype.avanzar = function (rotacion, velocidad) {
        if (rotacion === void 0) { rotacion = null; }
        if (velocidad === void 0) { velocidad = 1; }
        rotacion = rotacion || this.rotacion;
        var r = this.pilas.utilidades.convertir_angulo_a_radianes(rotacion);
        this.x += Math.cos(r) * velocidad;
        this.y += Math.sin(r) * velocidad;
    };
    return ActorBase;
}());
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Actor.prototype.iniciar = function () { };
    Actor.prototype.actualizar = function () { };
    return Actor;
}(ActorBase));
var EscenaBase = (function () {
    function EscenaBase(pilas) {
        this.pilas = pilas;
        this.actores = [];
        this.pilas.utilidades.obtener_id_autoincremental();
        this.camara = new Camara(pilas);
        this.pilas.escenas.definir_escena_actual(this);
    }
    EscenaBase.prototype.agregar_actor = function (actor) {
        this.actores.push(actor);
    };
    EscenaBase.prototype.serializar = function () {
        return {
            camara_x: this.camara.x,
            camara_y: this.camara.y
        };
    };
    return EscenaBase;
}());
var Escena = (function (_super) {
    __extends(Escena, _super);
    function Escena() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cuadro = 0;
        return _this;
    }
    Escena.prototype.iniciar = function () { };
    Escena.prototype.actualizar = function () {
        this.cuadro += 1;
        if (this.cuadro % 60 === 0) {
            this.actores.map(function (actor) {
                actor.cada_segundo();
            });
        }
    };
    Escena.prototype.obtener_oscilacion = function (velocidad, intensidad) {
        return Math.sin(this.cuadro * velocidad * 0.1) * intensidad;
    };
    return Escena;
}(EscenaBase));
var Normal = (function (_super) {
    __extends(Normal, _super);
    function Normal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Normal.prototype.iniciar = function () { };
    Normal.prototype.actualizar = function () { };
    return Normal;
}(Escena));
var ActorDelEditor = (function () {
    function ActorDelEditor(funcion, datos) {
        var actor = funcion.call(datos.x, datos.y, datos.imagen);
    }
    return ActorDelEditor;
}());
var Modo = (function (_super) {
    __extends(Modo, _super);
    function Modo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Modo;
}(Phaser.Scene));
var ModoCargador = (function (_super) {
    __extends(ModoCargador, _super);
    function ModoCargador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModoCargador.prototype.preload = function () {
        this.pilas = pilas;
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
    ModoCargador.prototype.create = function () {
        this.pilas.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos");
        this.add.bitmapText(5, 5, "verdana3", "Carga finalizada\nEnviá la señal 'ejecutar_proyecto' para continuar.");
    };
    ModoCargador.prototype.cuando_progresa_la_carga = function (progreso) {
        this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", { progreso: Math.ceil(progreso * 100) });
    };
    return ModoCargador;
}(Modo));
var ModoEditor = (function (_super) {
    __extends(ModoEditor, _super);
    function ModoEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ancho = 500;
        _this.alto = 500;
        return _this;
    }
    ModoEditor.prototype.preload = function () { };
    ModoEditor.prototype.create = function (datos) {
        this.actores = [];
        this.pilas = datos.pilas;
        this.crear_fondo();
        this.crear_canvas_de_depuracion();
        this.posicionar_la_camara(datos.escena);
        this.crear_actores_desde_los_datos_de_la_escena(datos.escena);
        this.crear_manejadores_para_hacer_arrastrables_los_actores();
        this.fps = this.add.bitmapText(5, 5, "verdana3", "FPS");
    };
    ModoEditor.prototype.posicionar_la_camara = function (datos_de_la_escena) {
        this.cameras.cameras[0].x = datos_de_la_escena.camara_x;
        this.cameras.cameras[0].y = datos_de_la_escena.camara_y;
    };
    ModoEditor.prototype.crear_fondo = function () {
        this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "plano");
        this.fondo.depth = -1000;
        this.fondo.setOrigin(0);
    };
    ModoEditor.prototype.crear_manejadores_para_hacer_arrastrables_los_actores = function () {
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
    ModoEditor.prototype.crear_actores_desde_los_datos_de_la_escena = function (escena) {
        var _this = this;
        escena.actores.map(function (actor) {
            _this.crear_sprite_desde_actor(actor);
        });
    };
    ModoEditor.prototype.crear_sprite_desde_actor = function (actor) {
        var sprite = this.add.sprite(actor.x, actor.y, actor.imagen);
        sprite["setInteractive"]();
        sprite["actor"] = actor;
        this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
        this.input.setDraggable(sprite, undefined);
        this.actores.push(sprite);
    };
    ModoEditor.prototype.aplicar_atributos_de_actor_a_sprite = function (actor, sprite) {
        sprite.rotacion = actor.rotacion;
        sprite.scaleX = actor.escala_x;
        sprite.scaleY = actor.escala_y;
        sprite.originX = actor.centro_x;
        sprite.originY = actor.centro_y;
        sprite.alpha = 1 - actor.transparencia / 100;
    };
    ModoEditor.prototype.crear_canvas_de_depuracion = function () {
        var graphics = this.add.graphics({ x: 0, y: 0 });
        graphics.depth = 200;
        this.graphics = graphics;
    };
    ModoEditor.prototype.update = function () {
        var _this = this;
        if (this.pilas.depurador.mostrar_fps) {
            this.fps.alpha = 1;
            this.fps.text = "FPS: " + Math.round(this.pilas.game.loop.actualFps);
        }
        else {
            this.fps.alpha = 0;
        }
        if (this.pilas.depurador.modo_posicion_activado) {
            this.graphics.clear();
            this.actores.map(function (sprite) {
                _this.dibujar_punto_de_control(_this.graphics, sprite.x, sprite.y);
            });
        }
    };
    ModoEditor.prototype.dibujar_punto_de_control = function (graphics, x, y) {
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(x - 3, y - 3, 6, 6);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(x - 2, y - 2, 4, 4);
    };
    return ModoEditor;
}(Modo));
var ModoEjecucion = (function (_super) {
    __extends(ModoEjecucion, _super);
    function ModoEjecucion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.proyecto = {};
        _this.nombre_de_la_escena_inicial = null;
        return _this;
    }
    ModoEjecucion.prototype.preload = function () {
        this.load.image("pelota", "imagenes/pelota.png");
    };
    ModoEjecucion.prototype.create = function (datos) {
        this.actores = [];
        this.guardar_parametros_en_atributos(datos);
        this.crear_fondo();
        this.clases = this.obtener_referencias_a_clases();
        try {
            this.instanciar_escena(this.nombre_de_la_escena_inicial);
        }
        catch (e) {
            this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
        }
        this.matter.world.setBounds(0, 0, 500, 400, 32, true, true, false, true);
        this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_iniciar_ejecucion", {});
    };
    ModoEjecucion.prototype.instanciar_escena = function (nombre) {
        var escena = this.proyecto.escenas.filter(function (e) { return e.nombre == nombre; })[0];
        this.crear_escena(escena);
    };
    ModoEjecucion.prototype.crear_escena = function (datos_de_la_escena) {
        var _this = this;
        var escena = new this.clases[datos_de_la_escena.nombre](this.pilas);
        escena.camara.x = datos_de_la_escena.camara_x;
        escena.camara.y = datos_de_la_escena.camara_y;
        escena.iniciar();
        this.actores = datos_de_la_escena.actores.map(function (e) {
            return _this.crear_actor(e);
        });
    };
    ModoEjecucion.prototype.crear_actor = function (entidad) {
        var x = entidad.x;
        var y = entidad.y;
        var imagen = entidad.imagen;
        var actor = null;
        var clase = this.clases[entidad.tipo];
        if (clase) {
            actor = new this.clases[entidad.tipo](this.pilas, x, y, imagen);
            actor.tipo = entidad.tipo;
            actor.rotacion = entidad.rotacion;
            actor.centro_x = entidad.centro_x;
            actor.centro_y = entidad.centro_y;
            actor.escala_x = entidad.escala_x;
            actor.escala_y = entidad.escala_y;
            actor.transparencia = entidad.transparencia;
            actor.iniciar();
        }
        else {
            console.error(this.clases);
            var nombres_de_clases = Object.getOwnPropertyNames(this.clases);
            throw new Error("No existe c\u00F3digo para crear un actor de la clase " + entidad.tipo + ". Las clases disponibles son [" + nombres_de_clases.join(", ") + "]");
        }
        return actor;
    };
    ModoEjecucion.prototype.preRender = function () {
        if (this.permitir_modo_pausa) {
            try {
                console.log("Guardar fotos de entidades");
            }
            catch (e) {
                console.error("TODO Emitir error", e);
            }
        }
    };
    ModoEjecucion.prototype.obtener_referencias_a_clases = function () {
        var codigoDeExportacion = this.obtener_codigo_para_exportar_clases(this.codigo);
        var codigo_completo = this.codigo + codigoDeExportacion;
        try {
            return eval(codigo_completo);
        }
        catch (e) {
            console.error("TODO: emitir error al editor", e, "ejecutar el proyecto");
        }
    };
    ModoEjecucion.prototype.obtener_codigo_para_exportar_clases = function (codigo) {
        var re_creacion_de_clase = /var (.*) \= \/\*\* @class/g;
        var re_solo_clase = /var\ (\w+)/;
        var lista_de_clases = [];
        if (codigo.match(re_creacion_de_clase)) {
            lista_de_clases = codigo.match(re_creacion_de_clase).map(function (e) { return e.match(re_solo_clase)[1]; });
        }
        var diccionario = {};
        for (var i = 0; i < lista_de_clases.length; i++) {
            var item = lista_de_clases[i];
            diccionario[item] = item;
        }
        var diccionario_como_cadena = JSON.stringify(diccionario).replace(/"/g, "");
        return "\n__clases = " + diccionario_como_cadena + ";\n__clases;";
    };
    ModoEjecucion.prototype.guardar_parametros_en_atributos = function (datos) {
        this.pilas = datos.pilas;
        this.ancho = datos.proyecto.ancho;
        this.alto = datos.proyecto.alto;
        this.nombre_de_la_escena_inicial = datos.nombre_de_la_escena_inicial;
        this.proyecto = datos.proyecto;
        this.codigo = datos.codigo;
        this.permitir_modo_pausa = datos.permitir_modo_pausa;
    };
    ModoEjecucion.prototype.crear_fondo = function () {
        this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "plano");
        this.fondo.depth = -1000;
        this.fondo.setOrigin(0);
    };
    ModoEjecucion.prototype.update = function () { };
    return ModoEjecucion;
}(Modo));
