var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Actores = (function () {
    function Actores(pilas) {
        this.pilas = pilas;
    }
    Actores.prototype.crear_actor = function (nombre, clase) {
        if (clase === void 0) { clase = null; }
        if (!clase) {
            clase = window[nombre];
        }
        var actor = new clase(this.pilas);
        var p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);
        if (!p.nombre) {
            var nombre_asignado = this.pilas.escena.obtener_nombre_para(nombre);
            p.nombre = nombre_asignado;
        }
        actor.pre_iniciar(p);
        actor.iniciar();
        return actor;
    };
    Actores.prototype.vincular = function (nombre, clase) {
        var _this = this;
        if (!nombre || !clase) {
            throw new Error("Tiene que especificar el nombre del actor y la clase para vincularlo.");
        }
        this[nombre] = function () {
            return _this.crear_actor(nombre, clase);
        };
    };
    Actores.prototype.actor = function () {
        return this.crear_actor("Actor");
    };
    Actores.prototype.aceituna = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return this.crear_actor("aceituna");
    };
    Actores.prototype.caja = function () {
        return this.crear_actor("caja");
    };
    Actores.prototype.conejo = function () {
        return this.crear_actor("conejo");
    };
    Actores.prototype.logo = function () {
        return this.crear_actor("logo");
    };
    Actores.prototype.moneda = function () {
        return this.crear_actor("moneda");
    };
    Actores.prototype.nave = function () {
        return this.crear_actor("nave");
    };
    Actores.prototype.nube = function () {
        return this.crear_actor("nube");
    };
    Actores.prototype.pared = function () {
        return this.crear_actor("pared");
    };
    Actores.prototype.pelota = function () {
        return this.crear_actor("pelota");
    };
    Actores.prototype.plataforma = function () {
        return this.crear_actor("plataforma");
    };
    Actores.prototype.suelo = function () {
        return this.crear_actor("suelo");
    };
    Actores.prototype.techo = function () {
        return this.crear_actor("techo");
    };
    Actores.prototype.texto = function () {
        return this.crear_actor("texto");
    };
    Actores.prototype.laser = function () {
        return this.crear_actor("laser");
    };
    Actores.prototype.deslizador = function () {
        return this.crear_actor("deslizador");
    };
    Actores.prototype.boton = function () {
        return this.crear_actor("boton");
    };
    Actores.prototype.boton_de_control_izquierda = function () {
        return this.crear_actor("boton_de_control_izquierda");
    };
    Actores.prototype.boton_de_control_derecha = function () {
        return this.crear_actor("boton_de_control_derecha");
    };
    Actores.prototype.boton_de_control_arriba = function () {
        return this.crear_actor("boton_de_control_arriba");
    };
    Actores.prototype.boton_de_control_abajo = function () {
        return this.crear_actor("boton_de_control_abajo");
    };
    Actores.prototype.boton_de_control_espacio = function () {
        return this.crear_actor("boton_de_control_espacio");
    };
    Actores.prototype.robot = function () {
        return this.crear_actor("robot");
    };
    Actores.prototype.puntaje = function () {
        return this.crear_actor("puntaje");
    };
    Actores.prototype.reiniciar_escena = function () {
        return this.crear_actor("reiniciar_escena");
    };
    Actores.prototype.nube_animada = function () {
        return this.crear_actor("nube_animada");
    };
    Actores.prototype.pizarra = function () {
        return this.crear_actor("pizarra");
    };
    Actores.prototype.explosion = function () {
        return this.crear_actor("explosion");
    };
    Actores.prototype.boton_activable = function () {
        return this.crear_actor("boton_activable");
    };
    Actores.prototype.pantalla_completa = function () {
        return this.crear_actor("pantalla_completa");
    };
    Actores.prototype.barra_de_energia = function () {
        return this.crear_actor("barra_de_energia");
    };
    return Actores;
}());
var Animaciones = (function () {
    function Animaciones(pilas) {
        this.animaciones = {};
        this.pilas = pilas;
    }
    Animaciones.prototype.crear_animacion = function (nombre, cuadros, velocidad) {
        var frames = this.crear_frames_de_animacion(cuadros, nombre);
        if (!this.animaciones[nombre]) {
            var animacion = this.pilas.modo.anims.create({
                key: nombre,
                frames: frames,
                frameRate: velocidad
            });
            this.animaciones[nombre] = animacion;
        }
        else {
            var animacion = this.pilas.modo.anims.get(nombre);
            var cantidad = animacion.frames.length;
            for (var i = 0; i < cantidad; i++) {
                animacion.removeFrameAt(0);
            }
            animacion.addFrame(frames);
            animacion.msPerFrame = 1000 / velocidad;
        }
    };
    Animaciones.prototype.crear_frames_de_animacion = function (cuadros, nombre_de_la_animacion) {
        var _this = this;
        var frames = cuadros.map(function (cuadro) {
            if (_this.pilas.imagenes_precargadas.indexOf(cuadro) === -1) {
                var titulo = "No se puede crear la animaci\u00F3n \"" + nombre_de_la_animacion + "\"";
                var detalle = "El cuadro " + cuadro + " no existe.";
                throw Error(titulo + "\n" + detalle);
            }
            if (cuadro.indexOf(":") > -1) {
                return {
                    key: cuadro.split(":")[0],
                    frame: cuadro.split(":")[1]
                };
            }
            else {
                return { key: cuadro };
            }
        });
        return frames;
    };
    Animaciones.prototype.existe_animacion = function (nombre) {
        return this.animaciones[nombre] !== undefined;
    };
    return Animaciones;
}());
var Automata = (function () {
    function Automata(actor) {
        this.actor = actor;
        this._estado = "";
    }
    Object.defineProperty(Automata.prototype, "estado", {
        get: function () {
            return this._estado;
        },
        set: function (nombre) {
            this._estado = nombre;
            this.validar_que_existen_los_metodos_de_estado(nombre);
            this.iniciar_estado(nombre);
        },
        enumerable: true,
        configurable: true
    });
    Automata.prototype.iniciar_estado = function (nombre) {
        this.actor[nombre + "_iniciar"]();
    };
    Automata.prototype.actualizar = function () {
        if (this._estado !== "") {
            this.actor[this._estado + "_actualizar"]();
        }
    };
    Automata.prototype.cuando_finaliza_animacion = function (nombre) {
        if (this._estado !== "") {
            var metodo = this.actor[this._estado + "_cuando_finaliza_animacion"];
            if (metodo) {
                metodo.call(this, nombre);
            }
        }
    };
    Automata.prototype.validar_que_existen_los_metodos_de_estado = function (nombre) {
        var nombre_del_metodo_iniciar = nombre + "_iniciar";
        var nombre_del_metodo_actualizar = nombre + "_actualizar";
        if (!this.actor[nombre_del_metodo_iniciar]) {
            console.log("no hay metodo iniciar");
            throw new Error("Imposible usar el estado '" + nombre + "', porque no existe un m\u00E9todo llamado '" + nombre_del_metodo_iniciar + "'");
        }
        if (!this.actor[nombre_del_metodo_actualizar]) {
            console.log("no hay metodo actualizar");
            throw new Error("Imposible usar el estado '" + nombre + "', porque no existe un m\u00E9todo llamado '" + nombre_del_metodo_actualizar + "'");
        }
    };
    return Automata;
}());
var Camara = (function () {
    function Camara(pilas) {
        this.pilas = pilas;
    }
    Camara.prototype.seguir_al_actor = function (actor, suavidad, ignorar_limites) {
        if (suavidad === void 0) { suavidad = 10; }
        if (ignorar_limites === void 0) { ignorar_limites = false; }
        var dx = actor.x - this.pilas.camara.x;
        var dy = actor.y - this.pilas.camara.y;
        this.pilas.camara.x += dx / suavidad;
        this.pilas.camara.y += dy / suavidad;
        if (!ignorar_limites) {
            this.pilas.camara.x = Math.max(this.pilas.camara.x, 0);
            this.pilas.camara.y = Math.min(this.pilas.camara.y, 0);
        }
    };
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
        var actor = this.pilas.actores.actor();
        actor.imagen = "imagenes:basicos/invisible";
        var posicion_inicial_x = this.x;
        var posicion_inicial_y = this.y;
        actor.actualizar = function () {
            if (this.contador === undefined) {
                this.contador = 0;
            }
            this.contador += 1;
            if (this.contador > tiempo * 60) {
                this.pilas.camara.x = posicion_inicial_x;
                this.pilas.camara.y = posicion_inicial_y;
                this.eliminar();
            }
            else {
                this.pilas.camara.x = posicion_inicial_x + this.pilas.azar(-1, 1) * intensidad;
                this.pilas.camara.y = posicion_inicial_y + this.pilas.azar(-1, 1) * intensidad;
            }
        };
    };
    Object.defineProperty(Camara.prototype, "x", {
        get: function () {
            return this.camara_principal.scrollX;
        },
        set: function (x) {
            this.pilas.utilidades.validar_numero(x);
            this.camara_principal.setScroll(x, -this.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camara.prototype, "y", {
        get: function () {
            return -this.camara_principal.scrollY;
        },
        set: function (y) {
            this.pilas.utilidades.validar_numero(y);
            this.camara_principal.setScroll(this.x, -y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camara.prototype, "borde_izquierdo", {
        get: function () {
            return -this.camara_principal.midPoint.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camara.prototype, "borde_derecho", {
        get: function () {
            return this.camara_principal.midPoint.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camara.prototype, "borde_arriba", {
        get: function () {
            return this.camara_principal.midPoint.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camara.prototype, "borde_abajo", {
        get: function () {
            return -this.camara_principal.midPoint.y;
        },
        enumerable: true,
        configurable: true
    });
    return Camara;
}());
var Colores = (function () {
    function Colores(pilas) {
        this.pilas = pilas;
        this._lista_de_colores = [
            {
                nombre: "rojo",
                hexa: 0xff0000,
                ingles: "red"
            },
            {
                nombre: "verde",
                hexa: 0x00ff00,
                ingles: "green"
            },
            {
                nombre: "azul",
                hexa: 0x0000ff,
                ingles: "blue"
            },
            {
                nombre: "negro",
                hexa: 0x000000,
                ingles: "black"
            },
            {
                nombre: "amarillo",
                hexa: 0xffff00,
                ingles: "yellow"
            },
            {
                nombre: "rosa",
                hexa: 0xffc0cb,
                ingles: "PINK"
            },
            {
                nombre: "naranja",
                hexa: 0xffa500,
                ingles: "orange"
            },
            {
                nombre: "violeta",
                hexa: 0xee82ee,
                ingles: "violet"
            },
            {
                nombre: "cyan",
                hexa: 0x00ffff,
                ingles: "cyan"
            },
            {
                nombre: "marron",
                hexa: 0xa52a2a,
                ingles: "brown"
            },
            {
                nombre: "blanco",
                hexa: 0xffffff,
                ingles: "white"
            },
            {
                nombre: "gris",
                hexa: 0x808080,
                ingles: "gray"
            }
        ];
    }
    Colores.prototype.convertir_a_hexa = function (color) {
        if (typeof color === "number") {
            return color;
        }
        this.validar_color(color);
        var elemento = this._lista_de_colores.filter(function (e) { return e.nombre == color.toLowerCase(); });
        return elemento[0].hexa;
    };
    Colores.prototype.validar_color = function (color) {
        if (this.colores.indexOf(color) > -1) {
            return true;
        }
        else {
            throw Error("El color " + color + " es inv\u00E1lido");
        }
    };
    Object.defineProperty(Colores.prototype, "colores", {
        get: function () {
            return this._lista_de_colores.map(function (e) { return e.nombre; });
        },
        enumerable: true,
        configurable: true
    });
    Colores.prototype.generar = function (rojo, verde, azul) {
        return Phaser.Display.Color.GetColor(rojo, verde, azul);
    };
    return Colores;
}());
var Comportamiento = (function () {
    function Comportamiento(pilas, actor) {
        this.pilas = pilas;
        this.actor = actor;
    }
    Comportamiento.prototype.iniciar = function (parametros) { };
    Comportamiento.prototype.actualizar = function () {
        return false;
    };
    Comportamiento.prototype.terminar = function () { };
    return Comportamiento;
}());
var ComportamientoAparecer = (function (_super) {
    __extends(ComportamientoAparecer, _super);
    function ComportamientoAparecer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.velocidad = 1;
        return _this;
    }
    ComportamientoAparecer.prototype.iniciar = function (argumentos) {
        if (argumentos) {
            this.velocidad = argumentos.velocidad || 1;
        }
        else {
            this.velocidad = 1;
        }
    };
    ComportamientoAparecer.prototype.actualizar = function () {
        this.actor.transparencia -= this.velocidad;
        if (this.actor.transparencia <= 0) {
            return true;
        }
    };
    ComportamientoAparecer.prototype.terminar = function () { };
    return ComportamientoAparecer;
}(Comportamiento));
var ComportamientoDesaparecer = (function (_super) {
    __extends(ComportamientoDesaparecer, _super);
    function ComportamientoDesaparecer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.velocidad = 1;
        return _this;
    }
    ComportamientoDesaparecer.prototype.iniciar = function (argumentos) {
        if (argumentos) {
            this.velocidad = argumentos.velocidad || 1;
        }
        else {
            this.velocidad = 1;
        }
    };
    ComportamientoDesaparecer.prototype.actualizar = function () {
        this.actor.transparencia += this.velocidad;
        if (this.actor.transparencia >= 100) {
            return true;
        }
    };
    ComportamientoDesaparecer.prototype.terminar = function () { };
    return ComportamientoDesaparecer;
}(Comportamiento));
var ComportamientoEliminar = (function (_super) {
    __extends(ComportamientoEliminar, _super);
    function ComportamientoEliminar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComportamientoEliminar.prototype.iniciar = function () { };
    ComportamientoEliminar.prototype.actualizar = function () {
        this.actor.eliminar();
        return true;
    };
    ComportamientoEliminar.prototype.terminar = function () { };
    return ComportamientoEliminar;
}(Comportamiento));
var ComportamientoMover = (function (_super) {
    __extends(ComportamientoMover, _super);
    function ComportamientoMover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.demora = 1;
        _this.destino_x = 0;
        _this.destino_y = 0;
        return _this;
    }
    ComportamientoMover.prototype.iniciar = function (argumentos) {
        if (!argumentos) {
            argumentos = {};
        }
        this.destino_x = argumentos.x || 0;
        this.destino_y = argumentos.y || 0;
        this.demora = argumentos.demora || 1;
        var pixels_x = this.destino_x - this.actor.x;
        var pixels_y = this.destino_y - this.actor.y;
        this.dx = pixels_x / 60 / this.demora;
        this.dy = pixels_y / 60 / this.demora;
        this.tiempo = 0;
    };
    ComportamientoMover.prototype.actualizar = function () {
        this.tiempo += 1;
        this.actor.x += this.dx;
        this.actor.y += this.dy;
        if (this.tiempo >= this.demora * 60) {
            this.actor.x = this.destino_x;
            this.actor.y = this.destino_y;
            return true;
        }
    };
    ComportamientoMover.prototype.terminar = function () { };
    return ComportamientoMover;
}(Comportamiento));
var Comportamientos = (function () {
    function Comportamientos(pilas) {
        this.pilas = pilas;
        this._comportamientos = [];
        this.vincular("desaparecer", ComportamientoDesaparecer);
        this.vincular("aparecer", ComportamientoAparecer);
        this.vincular("eliminar", ComportamientoEliminar);
        this.vincular("mover", ComportamientoMover);
    }
    Comportamientos.prototype.buscar = function (comportamiento) {
        var lista = this.generar_lista_de_similitudes(comportamiento);
        lista = lista.sort(function (a, b) {
            if (a.similitud > b.similitud) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return lista[0].comportamiento.clase;
    };
    Comportamientos.prototype.generar_lista_de_similitudes = function (comportamiento) {
        var _this = this;
        return this._comportamientos.map(function (h) {
            return {
                similitud: _this.pilas.utilidades.obtener_similaridad(h.nombre, comportamiento),
                comportamiento: h
            };
        });
    };
    Comportamientos.prototype.listar = function () {
        return this._comportamientos.map(function (h) { return h.nombre; });
    };
    Comportamientos.prototype.vincular = function (nombre, clase) {
        var encontrado = this._comportamientos.find(function (comportamiento) {
            return comportamiento.nombre === nombre;
        });
        if (!clase || !nombre) {
            throw new Error("Para vincular un comportamiento tiene que especificar nombre y clase, envi\u00F3 nombre=" + nombre + " y clase=" + clase);
        }
        if (!encontrado) {
            this._comportamientos.push({
                nombre: nombre,
                clase: clase
            });
        }
        else {
            console.warn("No se vincul\u00F3 la clase " + nombre + " porque ya estaba vinculada con anterioridad.");
        }
    };
    Comportamientos.prototype.validar_si_existe = function (nombre) {
        var todos_los_nombres = this._comportamientos.map(function (c) { return c.nombre; });
        if (todos_los_nombres.indexOf(nombre) === -1) {
            var alternativa = this.pilas.utilidades.obtener_mas_similar(nombre, todos_los_nombres);
            throw new Error("No existe un comportamiento llamado \"" + nombre + "\", \u00BFquisiste decir \"" + alternativa + "\" o te falt\u00F3 vincularlo?");
        }
    };
    return Comportamientos;
}());
var Control = (function () {
    function Control(pilas) {
        this.pilas = pilas;
        this.conectar_teclas();
    }
    Control.prototype.terminar = function () {
    };
    Control.prototype.conectar_teclas = function () {
        var keyboard = this.pilas.modo.input.keyboard;
        this.teclas = keyboard.addKeys("LEFT,RIGHT,UP,DOWN,SPACE,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,SEMICOLON");
        this._simulaciones = {
            izquierda: false,
            derecha: false,
            arriba: false,
            abajo: false,
            espacio: false
        };
    };
    Control.prototype.se_pulsa_tecla = function (nombre, simulacion) {
        if (simulacion === void 0) { simulacion = undefined; }
        if (simulacion) {
            return this.teclas[nombre].isDown || this._simulaciones[simulacion];
        }
        else {
            return this.teclas[nombre].isDown;
        }
    };
    Object.defineProperty(Control.prototype, "arriba", {
        get: function () {
            return this.se_pulsa_tecla("UP", "arriba");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "abajo", {
        get: function () {
            return this.se_pulsa_tecla("DOWN", "abajo");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "izquierda", {
        get: function () {
            return this.se_pulsa_tecla("LEFT", "izquierda");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "derecha", {
        get: function () {
            return this.se_pulsa_tecla("RIGHT", "derecha");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "espacio", {
        get: function () {
            return this.se_pulsa_tecla("SPACE", "espacio");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_a", {
        get: function () {
            return this.se_pulsa_tecla("A");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_b", {
        get: function () {
            return this.se_pulsa_tecla("B");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_c", {
        get: function () {
            return this.se_pulsa_tecla("C");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_d", {
        get: function () {
            return this.se_pulsa_tecla("D");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_e", {
        get: function () {
            return this.se_pulsa_tecla("E");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_f", {
        get: function () {
            return this.se_pulsa_tecla("F");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_g", {
        get: function () {
            return this.se_pulsa_tecla("G");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_h", {
        get: function () {
            return this.se_pulsa_tecla("H");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_i", {
        get: function () {
            return this.se_pulsa_tecla("I");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_j", {
        get: function () {
            return this.se_pulsa_tecla("J");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_k", {
        get: function () {
            return this.se_pulsa_tecla("K");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_l", {
        get: function () {
            return this.se_pulsa_tecla("L");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_m", {
        get: function () {
            return this.se_pulsa_tecla("M");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_n", {
        get: function () {
            return this.se_pulsa_tecla("N");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_\u00F1", {
        get: function () {
            return this.se_pulsa_tecla("SEMICOLON");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_o", {
        get: function () {
            return this.se_pulsa_tecla("O");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_p", {
        get: function () {
            return this.se_pulsa_tecla("P");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_q", {
        get: function () {
            return this.se_pulsa_tecla("Q");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_r", {
        get: function () {
            return this.se_pulsa_tecla("R");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_s", {
        get: function () {
            return this.se_pulsa_tecla("S");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_t", {
        get: function () {
            return this.se_pulsa_tecla("T");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_u", {
        get: function () {
            return this.se_pulsa_tecla("U");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_v", {
        get: function () {
            return this.se_pulsa_tecla("V");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_w", {
        get: function () {
            return this.se_pulsa_tecla("W");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_x", {
        get: function () {
            return this.se_pulsa_tecla("X");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_y", {
        get: function () {
            return this.se_pulsa_tecla("Y");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_z", {
        get: function () {
            return this.se_pulsa_tecla("Z");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_1", {
        get: function () {
            return this.se_pulsa_tecla("1");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_2", {
        get: function () {
            return this.se_pulsa_tecla("2");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_3", {
        get: function () {
            return this.se_pulsa_tecla("3");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_4", {
        get: function () {
            return this.se_pulsa_tecla("4");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_5", {
        get: function () {
            return this.se_pulsa_tecla("5");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_6", {
        get: function () {
            return this.se_pulsa_tecla("6");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_7", {
        get: function () {
            return this.se_pulsa_tecla("7");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_8", {
        get: function () {
            return this.se_pulsa_tecla("8");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "tecla_9", {
        get: function () {
            return this.se_pulsa_tecla("9");
        },
        enumerable: true,
        configurable: true
    });
    Control.prototype.simular_pulsacion = function (nombre, pulsacion) {
        if (this._simulaciones[nombre] === undefined) {
            throw Error("No se puede simular la tecla " + nombre);
        }
        this._simulaciones[nombre] = pulsacion;
    };
    return Control;
}());
var Depurador = (function () {
    function Depurador(pilas) {
        this.pilas = pilas;
        this.modo_posicion_activado = false;
        this.mostrar_fps = false;
        this.mostrar_fisica = false;
        this.fisica_en_modo_ejecucion = false;
    }
    Depurador.prototype.definir_estados_de_depuracion = function (datos) {
        this.mostrar_fps = datos.fps;
        this.modo_posicion_activado = datos.pos;
        this.mostrar_fisica = datos.fisica;
        this.minimapa = datos.minimapa;
        this.fisica_en_modo_ejecucion = datos.fisica_en_modo_ejecucion;
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
var Eventos = (function () {
    function Eventos(pilas) {
        this.pilas = pilas;
    }
    Eventos.prototype.conectar = function (nombre_del_evento, funcion) {
        return this.pilas.escena.eventos.conectar(nombre_del_evento, funcion);
    };
    Eventos.prototype.desconectar = function (identificador_del_evento) {
        return this.pilas.escena.eventos.desconectar(identificador_del_evento);
    };
    Eventos.prototype.emitir_evento = function (identificador, datos) {
        return this.pilas.escena.eventos.emitir_evento(identificador, datos);
    };
    return Eventos;
}());
var EventosDeEscena = (function () {
    function EventosDeEscena(pilas) {
        this.pilas = pilas;
        this.conexiones = [];
        this.nombres_de_eventos = [
            "mueve_mouse",
            "click_de_mouse",
            "termina_click"
        ];
    }
    EventosDeEscena.prototype.conectar = function (nombre_del_evento, funcion) {
        if (this.nombres_de_eventos.indexOf(nombre_del_evento) === -1) {
            console.warn("No se puede conectar el evento " + nombre_del_evento);
            console.warn("Los eventos que existen son", this.nombres_de_eventos);
            return;
        }
        var id = this.generar_id(nombre_del_evento);
        this.conexiones.push({
            id: id,
            nombre_del_evento: nombre_del_evento,
            funcion: funcion
        });
        return id;
    };
    EventosDeEscena.prototype.desconectar = function (identificador_del_evento) {
        var indice = this.conexiones.findIndex(function (a) { return a.id === identificador_del_evento; });
        if (indice > -1) {
            this.conexiones.splice(indice, 1);
        }
        else {
            console.warn("No se encontr\u00F3 en evento " + identificador_del_evento);
        }
    };
    EventosDeEscena.prototype.generar_id = function (nombre) {
        var id = this.pilas.utilidades.obtener_id_autoincremental();
        return "evento_conectado:" + nombre + ":" + id;
    };
    EventosDeEscena.prototype.emitir_evento = function (identificador, datos) {
        this.conexiones.map(function (c) {
            if (c.nombre_del_evento === identificador) {
                c.funcion(datos);
            }
        });
    };
    return EventosDeEscena;
}());
var Fisica = (function () {
    function Fisica(pilas) {
        this.pilas = pilas;
    }
    Object.defineProperty(Fisica.prototype, "Matter", {
        get: function () {
            return Phaser.Physics.Matter["Matter"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fisica.prototype, "gravedad_x", {
        get: function () {
            return this.pilas.escena.gravedad_x;
        },
        set: function (v) {
            this.pilas.escena.gravedad_x = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fisica.prototype, "gravedad_y", {
        get: function () {
            return this.pilas.escena.gravedad_y;
        },
        set: function (v) {
            this.pilas.escena.gravedad_y = v;
        },
        enumerable: true,
        configurable: true
    });
    return Fisica;
}());
var Habilidad = (function () {
    function Habilidad(pilas, actor) {
        this.pilas = pilas;
        this.actor = actor;
    }
    Habilidad.prototype.iniciar = function () { };
    Habilidad.prototype.actualizar = function () { };
    Habilidad.prototype.eliminar = function () { };
    return Habilidad;
}());
var RotarConstantemente = (function (_super) {
    __extends(RotarConstantemente, _super);
    function RotarConstantemente() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RotarConstantemente.prototype.iniciar = function () { };
    RotarConstantemente.prototype.actualizar = function () {
        this.actor.rotacion += 10;
    };
    return RotarConstantemente;
}(Habilidad));
var Arrastrable = (function (_super) {
    __extends(Arrastrable, _super);
    function Arrastrable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.valor_inicial_dinamico = null;
        return _this;
    }
    Arrastrable.prototype.iniciar = function () {
        var input = this.pilas.modo.input;
        this.actor.sprite.setInteractive();
        input.setDraggable(this.actor.sprite);
        input.on("dragstart", this.cuando_comienza_a_arrastrar, this);
        input.on("drag", this.cuando_mueve, this);
        input.on("dragend", this.cuando_suelta, this);
    };
    Arrastrable.prototype.actualizar = function () { };
    Arrastrable.prototype.eliminar = function () {
        var input = this.pilas.modo.input;
        input.setDraggable(this.actor.sprite, false);
        input.off("dragstart", this.cuando_comienza_a_arrastrar, this);
        input.off("drag", this.cuando_mueve, this);
        input.off("dragend", this.cuando_suelta, this);
    };
    Arrastrable.prototype.cuando_comienza_a_arrastrar = function (_, objeto) {
        if (this.actor !== objeto.actor) {
            return;
        }
        this.valor_inicial_dinamico = objeto.actor.dinamico;
        objeto.actor.dinamico = false;
    };
    Arrastrable.prototype.cuando_mueve = function (_, objeto, x, y) {
        objeto.x = x;
        objeto.y = y;
    };
    Arrastrable.prototype.cuando_suelta = function (_, objeto) {
        if (this.actor !== objeto.actor) {
            return;
        }
        objeto.actor.dinamico = this.valor_inicial_dinamico;
    };
    return Arrastrable;
}(Habilidad));
var MoverConElTeclado = (function (_super) {
    __extends(MoverConElTeclado, _super);
    function MoverConElTeclado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoverConElTeclado.prototype.iniciar = function () { };
    MoverConElTeclado.prototype.actualizar = function () {
        var velocidad = 5;
        if (this.pilas.control.izquierda) {
            this.actor.x -= velocidad;
        }
        if (this.pilas.control.derecha) {
            this.actor.x += velocidad;
        }
        if (this.pilas.control.arriba) {
            this.actor.y += velocidad;
        }
        if (this.pilas.control.abajo) {
            this.actor.y -= velocidad;
        }
    };
    return MoverConElTeclado;
}(Habilidad));
var SeguirAlMouse = (function (_super) {
    __extends(SeguirAlMouse, _super);
    function SeguirAlMouse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeguirAlMouse.prototype.iniciar = function () { };
    SeguirAlMouse.prototype.actualizar = function () {
        this.actor.x = this.pilas.cursor_x;
        this.actor.y = this.pilas.cursor_y;
    };
    return SeguirAlMouse;
}(Habilidad));
var SeguirAlMouseLentamente = (function (_super) {
    __extends(SeguirAlMouseLentamente, _super);
    function SeguirAlMouseLentamente() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeguirAlMouseLentamente.prototype.iniciar = function () { };
    SeguirAlMouseLentamente.prototype.actualizar = function () {
        var destino_x = this.pilas.cursor_x;
        var destino_y = this.pilas.cursor_y;
        this.actor.x += (destino_x - this.actor.x) / 10;
        this.actor.y += (destino_y - this.actor.y) / 10;
    };
    return SeguirAlMouseLentamente;
}(Habilidad));
var OscilarVerticalmente = (function (_super) {
    __extends(OscilarVerticalmente, _super);
    function OscilarVerticalmente() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contador = 0;
        return _this;
    }
    OscilarVerticalmente.prototype.iniciar = function () { };
    OscilarVerticalmente.prototype.actualizar = function () {
        this.contador++;
        this.actor.y += Math.sin(this.contador / 20.0) / 4.0;
    };
    return OscilarVerticalmente;
}(Habilidad));
var OscilarRotacion = (function (_super) {
    __extends(OscilarRotacion, _super);
    function OscilarRotacion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contador = 0;
        return _this;
    }
    OscilarRotacion.prototype.iniciar = function () { };
    OscilarRotacion.prototype.actualizar = function () {
        this.contador++;
        this.actor.rotacion += Math.cos(this.contador / 20.0) / 2;
    };
    return OscilarRotacion;
}(Habilidad));
var OscilarTransparencia = (function (_super) {
    __extends(OscilarTransparencia, _super);
    function OscilarTransparencia() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contador = 0;
        return _this;
    }
    OscilarTransparencia.prototype.iniciar = function () { };
    OscilarTransparencia.prototype.actualizar = function () {
        this.contador++;
        this.actor.transparencia = 50 + Math.cos(this.contador / 10.0) * 50;
    };
    return OscilarTransparencia;
}(Habilidad));
var Habilidades = (function () {
    function Habilidades(pilas) {
        this.pilas = pilas;
        this._habilidades = [];
        this.vincular("rotar constantemente", RotarConstantemente);
        this.vincular("arrastrable", Arrastrable);
        this.vincular("mover con el teclado", MoverConElTeclado);
        this.vincular("seguir al mouse", SeguirAlMouse);
        this.vincular("seguir al mouse lentamente", SeguirAlMouseLentamente);
        this.vincular("oscilar verticalmente", OscilarVerticalmente);
        this.vincular("oscilar rotacion", OscilarRotacion);
        this.vincular("oscilar transparencia", OscilarTransparencia);
    }
    Habilidades.prototype.buscar = function (habilidad) {
        var lista = this.generar_lista_de_similitudes(habilidad);
        lista = lista.sort(function (a, b) {
            if (a.similitud > b.similitud) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return lista[0].habilidad.clase;
    };
    Habilidades.prototype.generar_lista_de_similitudes = function (habilidad) {
        var _this = this;
        return this._habilidades.map(function (h) {
            return {
                similitud: _this.pilas.utilidades.obtener_similaridad(h.nombre, habilidad),
                habilidad: h
            };
        });
    };
    Habilidades.prototype.listar = function () {
        return this._habilidades.map(function (h) { return h.nombre; });
    };
    Habilidades.prototype.vincular = function (nombre, clase) {
        var encontrado = this._habilidades.find(function (habilidad) {
            return habilidad.nombre === nombre;
        });
        if (!encontrado) {
            this._habilidades.push({
                nombre: nombre,
                clase: clase
            });
        }
        else {
            console.warn("No se vincul\u00F3 la clase " + nombre + " porque ya estaba vinculada con anterioridad.");
        }
    };
    return Habilidades;
}());
var Historia = (function () {
    function Historia(pilas) {
        this.pilas = pilas;
        this.fotos = [];
    }
    Historia.prototype.limpiar = function () {
        this.fotos = [];
    };
    Historia.prototype.serializar_escena = function (escena_actual) {
        this.fotos.push({
            escena: escena_actual.serializar(),
            actores: escena_actual.actores.filter(function (a) { return a.esta_vivo(); }).map(function (e) { return e.serializar(); })
        });
    };
    Historia.prototype.dibujar_puntos_de_las_posiciones_recorridas = function (graphics) {
        var _this = this;
        var cantidad = 60 * 7;
        var historia_reciente = this.fotos.slice(-cantidad);
        var cantidad_total = historia_reciente.length;
        var _loop_1 = function (i) {
            var historia = historia_reciente[i];
            historia.actores.map(function (entidad) {
                var _a = _this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y), x = _a.x, y = _a.y;
                graphics.fillStyle(entidad.id_color, i / cantidad_total);
                graphics.fillRect(x, y, 2, 2);
            });
        };
        for (var i = 0; i < cantidad_total; i++) {
            _loop_1(i);
        }
    };
    Historia.prototype.obtener_cantidad_de_posiciones = function () {
        return this.fotos.length - 1;
    };
    Historia.prototype.obtener_foto = function (posicion) {
        return this.fotos[posicion];
    };
    return Historia;
}());
var Huesos = (function () {
    function Huesos(pilas, nombre_de_datos_json, nombre_de_atlas, contenedor) {
        this.sprites = {};
        this.prefijo_de_imagenes = "";
        this.contenedor = contenedor;
        this.atlas = nombre_de_atlas;
        this.pilas = pilas;
        var scon = this.pilas.game.cache.json.get(nombre_de_datos_json);
        var data = new Data().load(scon);
        var pose = new Pose(data);
        var entidad = Object.keys(pose.getEntities())[0];
        pose.setEntity(entidad);
        this.pose = pose;
        this.definir_animacion(this.obtener_primer_animacion());
    }
    Huesos.prototype.obtener_animaciones = function () {
        return Object.keys(this.pose.getAnims());
    };
    Huesos.prototype.obtener_primer_animacion = function () {
        var animaciones = this.obtener_animaciones();
        return animaciones[0];
    };
    Huesos.prototype.definir_animacion = function (nombre) {
        if (nombre != this.animacion_actual) {
            this.eliminar_sprites();
            this.animacion_actual = nombre;
            this.pose.setAnim(nombre);
            this.pose.update(0);
            this.pose.setTime(0);
            this.pose.strike();
            this.actualizar_posicion(this.pose);
        }
    };
    Huesos.prototype.obtener_siguiente_animacion = function () {
        var animacion = this.animacion_actual;
        var animaciones = this.obtener_animaciones();
        var indice = animaciones.indexOf(animacion);
        indice += 1;
        if (indice >= animaciones.length) {
            indice = 0;
        }
        return animaciones[indice];
    };
    Huesos.prototype.actualizar_animacion = function (dt) {
        this.pose.update(dt);
        this.pose.strike();
        this.actualizar_posicion(this.pose);
    };
    Huesos.prototype.obtener_o_crear_sprite = function (nombre, imagen) {
        if (this.sprites[nombre]) {
            return this.sprites[nombre];
        }
        else {
            var sprite = null;
            if (this.atlas) {
                sprite = this.pilas.modo.add.sprite(0, 0, this.atlas, imagen);
            }
            else {
                sprite = this.pilas.modo.add.sprite(0, 0, imagen);
            }
            this.sprites[nombre] = sprite;
            return sprite;
        }
    };
    Huesos.prototype.actualizar_posicion = function (pose) {
        var _this = this;
        pose.object_array.map(function (data) {
            var imagen = pose.data.folder_array[data.folder_index].file_array[data.file_index].name;
            var sprite = _this.obtener_o_crear_sprite(data.name, _this.prefijo_de_imagenes + imagen);
            if (_this.prefijo_de_imagenes) {
                sprite.setTexture(_this.prefijo_de_imagenes + imagen);
            }
            sprite.setAlpha(data.alpha);
            sprite.x = data.world_space.position.x;
            sprite.y = -data.world_space.position.y;
            sprite.setScale(data.world_space.scale.x, data.world_space.scale.y);
            sprite.setDepth(data.world_space.z_index);
            sprite.setRotation(-data.world_space.rotation.rad);
            _this.contenedor.add(sprite);
        });
    };
    Huesos.prototype.eliminar_sprites = function () {
        var items = Object.keys(this.sprites);
        for (var i = 0; i < items.length; i++) {
            var sprite = this.sprites[items[i]];
            this.contenedor.remove(sprite);
            sprite.destroy();
        }
        this.sprites = {};
    };
    return Huesos;
}());
var DEPURAR_MENSAJES = false;
var DEPURAR_MENSAJES_DE_CARGA = false;
var Mensajes = (function () {
    function Mensajes(pilas) {
        this.pilas = pilas;
        this.agregar_manejador_de_eventos();
    }
    Mensajes.prototype.agregar_manejador_de_eventos = function () {
        window.addEventListener("message", this.atender_mensaje.bind(this), false);
    };
    Mensajes.prototype.atender_mensaje = function (e) {
        var nombre = e.data.tipo;
        var contexto = e.data.nombre_del_contexto;
        var metodo = "atender_mensaje_" + nombre;
        var datos = e.data;
        if (!contexto) {
            throw new Error("No lleg\u00F3 el nombre de contexto con el mensaje " + nombre);
        }
        if (DEPURAR_MENSAJES) {
            console.log("[editor \u2192 pilas] [contexto: " + contexto + "] llega el mensaje: " + nombre);
        }
        if (this[metodo]) {
            this[metodo](datos);
        }
        else {
            if (metodo !== "atender_mensaje_cambiar_prefijo_de_variante" && metodo !== "atender_mensaje_cambiar_animacion") {
                console.error("Imposible llamar al evento " + metodo, datos);
            }
        }
    };
    Mensajes.prototype.atender_mensaje_cambiar_zoom = function (datos) {
        this.pilas.modo.cameras.main.setZoom(datos.zoom);
    };
    Mensajes.prototype.atender_mensaje_iniciar_pilas = function (datos) {
        this.pilas.nombre_del_contexto = datos.nombre_del_contexto || "sin_nombre_de_contexto";
        this.pilas.iniciar_phaser(datos.ancho, datos.alto, datos.recursos, datos.opciones, datos.imagenes);
    };
    Mensajes.prototype.atender_mensaje_definir_estados_de_depuracion = function (datos) {
        this.pilas.depurador.definir_estados_de_depuracion(datos);
    };
    Mensajes.prototype.emitir_mensaje_al_editor = function (nombre, datos) {
        if (datos === void 0) { datos = null; }
        datos = datos || {};
        var contexto = this.pilas.nombre_del_contexto;
        datos.tipo = nombre;
        datos.nombre_del_contexto = contexto;
        if (nombre === "progreso_de_carga") {
            if (DEPURAR_MENSAJES_DE_CARGA) {
                console.log("[pilas \u2192 editor] [contexto: " + contexto + "] Emitiendo el mensaje de carga: " + nombre);
            }
        }
        else {
            if (DEPURAR_MENSAJES) {
                console.log("[pilas \u2192 editor] [contexto: " + contexto + "] Emitiendo el mensaje: " + nombre);
            }
        }
        window.parent.postMessage(datos, HOST);
    };
    Mensajes.prototype.atender_mensaje_define_escena = function (datos) {
        this.pilas.definir_modo("ModoEditor", {
            pilas: this.pilas,
            escena: datos.escena,
            proyecto: datos.proyecto
        });
    };
    Mensajes.prototype.atender_mensaje_definir_zoom_inicial_para_el_modo_editor = function (datos) {
        this.pilas.modo.cameras.main.setZoom(datos.zoom);
    };
    Mensajes.prototype.atender_mensaje_cuando_cambia_zoom_desde_el_selector_manual = function (datos) {
        this.pilas.modo.cameras.main.setZoom(datos.zoom);
    };
    Mensajes.prototype.atender_mensaje_cuando_cambia_grilla_desde_el_selector_manual = function (datos) {
        this.pilas.modo.cuando_cambia_grilla_desde_el_selector_manual(datos.grilla);
    };
    Mensajes.prototype.atender_mensaje_actualizar_escena_desde_el_editor = function (datos) {
        this.pilas.modo.cambiar_fondo(datos.escena.fondo);
        this.pilas.modo.posicionar_la_camara(datos.escena);
    };
    Mensajes.prototype.atender_mensaje_termina_de_reproducir_sonido = function () { };
    Mensajes.prototype.atender_mensaje_ejecutar_proyecto = function (datos) {
        var parametros = {
            pilas: this.pilas,
            nombre_de_la_escena_inicial: datos.nombre_de_la_escena_inicial,
            permitir_modo_pausa: datos.permitir_modo_pausa,
            codigo: datos.codigo,
            proyecto: datos.proyecto,
            es_cambio_de_escena: false
        };
        this.pilas.definir_modo("ModoEjecucion", parametros);
    };
    Mensajes.prototype.emitir_excepcion_al_editor = function (error, origen) {
        var stacktrace = error.stack.replace(/ht.*localhost:\d+\/*/g, "en: ").replace(/  at /g, "⇾ ");
        var detalle = {
            mensaje: error.message,
            stack: stacktrace
        };
        var fuente_grande = {
            font: "18px verdana"
        };
        var fuente_principal = {
            font: "16px verdana",
            wordWrap: { width: 400, useAdvancedWrap: true }
        };
        var fuente_pequena = {
            font: "14px verdana",
            fill: "#ddd"
        };
        var fondo = this.pilas.modo.add.graphics();
        fondo.fillStyle(0x000000, 0.75);
        fondo.fillRect(0, 0, 3000, 3000);
        fondo.setDepth(500000);
        var texto_titulo = this.pilas.modo.add.text(5, 5, "Se ha producido un error:", fuente_grande);
        var texto_detalle = this.pilas.modo.add.text(5, 30, detalle.mensaje, fuente_principal);
        var texto_stack = this.pilas.modo.add.text(5, 5 + 30 + texto_detalle.height, detalle.stack, fuente_pequena);
        texto_titulo.setDepth(500001);
        texto_detalle.setDepth(500001);
        texto_stack.setDepth(500001);
        fondo.setScrollFactor(0, 0);
        texto_titulo.setScrollFactor(0, 0);
        texto_detalle.setScrollFactor(0, 0);
        texto_stack.setScrollFactor(0, 0);
        this.emitir_mensaje_al_editor("error_de_ejecucion", detalle);
        console.error(error);
    };
    Mensajes.prototype.atender_mensaje_selecciona_actor_desde_el_editor = function (datos) {
        this.pilas.modo.destacar_actor_por_id(datos.id);
    };
    Mensajes.prototype.atender_mensaje_actualizar_actor_desde_el_editor = function (datos) {
        var sprite = this.pilas.modo.obtener_actor_por_id(datos.id);
        this.pilas.modo.actualizar_sprite_desde_datos(sprite, datos.actor);
    };
    Mensajes.prototype.atender_mensaje_pausar_escena = function () {
        var parametros = {
            pilas: this.pilas
        };
        this.pilas.definir_modo("ModoPausa", parametros);
    };
    Mensajes.prototype.atender_mensaje_cambiar_posicion = function (datos) {
        this.pilas.modo.actualizar_posicion(datos.posicion);
    };
    Mensajes.prototype.atender_mensaje_eliminar_actor_desde_el_editor = function (datos) {
        this.pilas.modo.eliminar_actor_por_id(datos.id);
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
        var colores = [0x82e0aa, 0xf8c471, 0xf0b27a, 0xf4f6f7, 0xb2babb, 0x85c1e9, 0xbb8fce, 0xf1948a, 0xd98880];
        return colores;
    };
    Utilidades.prototype.obtener_color_al_azar = function () {
        var colores = this.obtener_rampa_de_colores();
        var cantidad_de_colores = colores.length;
        return colores[Math.floor(Math.random() * cantidad_de_colores)];
    };
    Utilidades.prototype.limitar = function (valor, minimo, maximo) {
        return Math.min(Math.max(valor, minimo), maximo);
    };
    Utilidades.prototype.validar_numero = function (valor) {
        if (typeof valor !== "number") {
            throw new Error("El valor enviado no corresponde con un n\u00FAmero: " + valor);
        }
    };
    Utilidades.prototype.validar_que_este_vivo = function (actor) {
        if (!actor || !actor.esta_vivo()) {
            throw new Error("El actor \"" + actor.nombre + "\" ha sido eliminado, us\u00E1 el m\u00E9todo esta_vivo() del actor antes de acceder a el.");
        }
    };
    Utilidades.prototype.es_animacion = function (valor) {
        return (Array.isArray(valor) &&
            valor.every(function (e) {
                return typeof e === "number";
            }));
    };
    Utilidades.prototype.validar_parametro_numero_positivo = function (parametro, valor) {
        if (typeof valor !== "number" || valor < 0) {
            throw new Error("El valor enviado como par\u00E1metro \"" + parametro + "\" tiene que ser un n\u00FAmero mayor a 0, se envi\u00F3: " + valor);
        }
    };
    Utilidades.prototype.validar_parametro_booleano = function (parametro, valor) {
        if (typeof valor !== "boolean") {
            throw new Error("El valor enviado como par\u00E1metro \"" + parametro + "\" tiene que ser true o false, se envi\u00F3: " + valor);
        }
    };
    Utilidades.prototype.validar_parametro_lista_de_numeros_pares = function (parametro, valor) {
        if (!Array.isArray(valor)) {
            throw new Error("El valor enviado como par\u00E1metro \"" + parametro + "\" tiene que ser una lista de n\u00FAmeros, se envi\u00F3: " + valor);
        }
        if (valor.length % 2 !== 0) {
            throw new Error("El valor enviado como par\u00E1metro \"" + parametro + "\" tiene que tener una cantidad par de n\u00FAmeros, se contaron " + valor.length + " n\u00FAmeros en la lista enviada.");
        }
    };
    Utilidades.prototype.validar_parametro_numero_entero_cero_o_positivo = function (parametro, valor) {
        if (typeof valor !== "number" || valor !== parseInt("" + valor, 10) || valor < 0) {
            throw new Error("El valor enviado como par\u00E1metro \"" + parametro + "\" tiene que ser un n\u00FAmero entero mayor o igual a 0, se envi\u00F3: " + valor);
        }
    };
    Utilidades.prototype.convertir_angulo_a_radianes = function (grados) {
        return (grados * Math.PI) / 180;
    };
    Utilidades.prototype.convertir_radianes_a_angulos = function (radianes) {
        return (radianes * 180) / Math.PI;
    };
    Utilidades.prototype.es_firefox = function () {
        return /Firefox/.test(navigator.userAgent);
    };
    Utilidades.prototype.convertir_coordenada_de_pilas_a_phaser = function (x, y) {
        return { x: x + this.pilas._ancho / 2, y: this.pilas._alto / 2 - y };
    };
    Utilidades.prototype.convertir_coordenada_de_phaser_a_pilas = function (x, y) {
        return { x: x - this.pilas._ancho / 2, y: -y + this.pilas._alto / 2 };
    };
    Utilidades.prototype.combinar_propiedades = function (propiedades_iniciales, propiedades) {
        function extend(obj, src) {
            for (var key in src) {
                if (src.hasOwnProperty(key))
                    obj[key] = src[key];
            }
            return obj;
        }
        return extend(JSON.parse(JSON.stringify(propiedades_iniciales)), propiedades);
    };
    Utilidades.prototype.obtener_distancia_entre = function (desde_x, desde_y, hasta_x, hasta_y) {
        return Math.sqrt(Math.pow(Math.abs(desde_x - hasta_x), 2) + Math.pow(Math.abs(desde_y - hasta_y), 2));
    };
    Utilidades.prototype.obtener_similaridad = function (cadena1, cadena2) {
        function levenshtein_distance_b(a, b) {
            if (a.length == 0)
                return b.length;
            if (b.length == 0)
                return a.length;
            var matrix = [];
            var i;
            for (i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            var j;
            for (j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            for (i = 1; i <= b.length; i++) {
                for (j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) == a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    }
                    else {
                        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                    }
                }
            }
            return matrix[b.length][a.length];
        }
        return levenshtein_distance_b(cadena1, cadena2);
    };
    Utilidades.prototype.obtener_mas_similar = function (nombre, posibilidades) {
        var _this = this;
        var similitudes = posibilidades.map(function (h) {
            return {
                similitud: _this.obtener_similaridad(h, nombre),
                posiblidad: h
            };
        });
        similitudes = similitudes.sort(function (a, b) {
            if (a.similitud > b.similitud) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return similitudes[0].posiblidad;
    };
    Utilidades.prototype.validar_que_existe_imagen = function (nombre) {
        if (this.pilas.imagenes_precargadas.indexOf(nombre) === -1) {
            var sugerencia = this.pilas.utilidades.obtener_mas_similar(nombre, this.pilas.imagenes_precargadas);
            throw Error("No se encuentra la imagen \"" + nombre + "\"\n\u00BFQuisiste decir \"" + sugerencia + "\"?");
        }
    };
    Utilidades.prototype.sincronizar_contenedor = function (contenedor, sprite) {
        contenedor.x = sprite.x;
        contenedor.y = sprite.y;
        if (sprite.flipX) {
            contenedor.scaleX = -sprite.scaleX;
        }
        else {
            contenedor.scaleX = sprite.scaleX;
        }
        if (sprite.flipY) {
            contenedor.scaleY = -sprite.scaleY;
        }
        else {
            contenedor.scaleY = sprite.scaleY;
        }
        contenedor.angle = sprite.angle;
        contenedor.alpha = sprite.alpha;
        contenedor.setDepth(sprite.depth);
    };
    Utilidades.prototype.obtener_nombre_de_la_tecla_desde_un_evento = function (evento) {
        var tecla = evento.key;
        if (!tecla) {
            tecla = tecla.code;
        }
        var traducciones = {
            " ": "espacio",
            ArrowLeft: "izquierda",
            ArrowRight: "derecha",
            ArrowUp: "arriba",
            ArrowDown: "abajo",
            Alt: "alt",
            Control: "control",
            Shift: "shift",
            Tab: "tab",
            Backspace: "backspace",
            Meta: "meta",
            Escape: "escape",
            Enter: "enter"
        };
        if (traducciones[tecla]) {
            return traducciones[tecla];
        }
        return tecla;
    };
    return Utilidades;
}());
var HOST = "file://";
if (window.location.host) {
    HOST = window.location.origin;
}
var Pilas = (function () {
    function Pilas() {
        this.cursor_x = 0;
        this.cursor_y = 0;
        this.cursor_x_absoluta = 0;
        this.cursor_y_absoluta = 0;
        this.imagenes_precargadas = [];
        this.imagenes = [];
        this.Phaser = Phaser;
        this.mensajes = new Mensajes(this);
        this.colores = new Colores(this);
        this.depurador = new Depurador(this);
        this.utilidades = new Utilidades(this);
        this.escenas = new Escenas(this);
        this.historia = new Historia(this);
        this.sonidos = {};
        this.actores = new Actores(this);
        this.animaciones = new Animaciones(this);
        this.fisica = new Fisica(this);
        this.habilidades = new Habilidades(this);
        this.comportamientos = new Comportamientos(this);
        this.eventos = new Eventos(this);
    }
    Object.defineProperty(Pilas.prototype, "escena", {
        get: function () {
            return this.escenas.escena_actual;
        },
        set: function (v) {
            this.utilidades.acceso_incorrecto("escena");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pilas.prototype, "control", {
        get: function () {
            return this.escena.control;
        },
        set: function (c) {
            this.utilidades.acceso_incorrecto("control");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pilas.prototype, "camara", {
        get: function () {
            return this.escena.camara;
        },
        enumerable: true,
        configurable: true
    });
    Pilas.prototype.iniciar_phaser = function (ancho, alto, recursos, opciones, imagenes) {
        var _this = this;
        if (opciones.maximizar === undefined) {
            opciones.maximizar = true;
        }
        this.opciones = opciones;
        this.imagenes = imagenes;
        if (!recursos) {
            throw Error("No se puede iniciar phaser sin especificar una lista de recursos");
        }
        this._ancho = ancho;
        this._alto = alto;
        this.recursos = recursos;
        var configuracion = this.crear_configuracion(ancho, alto, opciones.maximizar, opciones.pixelart, opciones.transparente);
        if (opciones.fps === 30) {
            configuracion["fps"] = {
                target: opciones.fps,
                forceSetTimeOut: true
            };
        }
        if (opciones.esperar_antes_de_iniciar) {
            console.log("Esperando 1 segundo antes de iniciar ...");
            setTimeout(function () {
                _this.iniciar_phaser_desde_configuracion_y_cargar_escenas(configuracion);
            }, 1000);
        }
        else {
            this.iniciar_phaser_desde_configuracion_y_cargar_escenas(configuracion);
        }
    };
    Pilas.prototype.iniciar = function (ancho, alto, recursos, opciones, imagenes) {
        if (opciones === void 0) { opciones = {}; }
        if (imagenes === void 0) { imagenes = []; }
        if (opciones === undefined) {
            opciones = {};
        }
        if (recursos === undefined || recursos === null) {
            recursos = {
                imagenes: [
                    {
                        nombre: "sin_imagen",
                        ruta: "imagenes/sin_imagen.png"
                    }
                ],
                sonidos: [
                    {
                        nombre: "explosion",
                        ruta: "sonidos/explosion.wav"
                    },
                    {
                        nombre: "laser",
                        ruta: "sonidos/gallina.wav"
                    },
                    {
                        nombre: "laser",
                        ruta: "sonidos/laser.wav"
                    },
                    {
                        nombre: "moneda",
                        ruta: "sonidos/moneda.wav"
                    },
                    {
                        nombre: "salto-corto",
                        ruta: "sonidos/salto-corto.wav"
                    },
                    {
                        nombre: "salto-largo",
                        ruta: "sonidos/salto-largo.wav"
                    },
                    {
                        nombre: "seleccion-aguda",
                        ruta: "sonidos/seleccion-aguda.wav"
                    },
                    {
                        nombre: "seleccion-grave",
                        ruta: "sonidos/seleccion-grave.wav"
                    }
                ]
            };
        }
        opciones.modo_simple = true;
        this.iniciar_phaser(ancho, alto, recursos, opciones, imagenes);
        return this;
    };
    Pilas.prototype.listar_imagenes = function () {
        return this.imagenes_precargadas;
    };
    Pilas.prototype.iniciar_phaser_desde_configuracion_y_cargar_escenas = function (configuracion) {
        var game = new Phaser.Game(configuracion);
        game.scene.add("ModoCargador", ModoCargador);
        game.scene.add("ModoEditor", ModoEditor);
        game.scene.add("ModoEjecucion", ModoEjecucion);
        game.scene.add("ModoPausa", ModoPausa);
        game.scene.start("ModoCargador", { pilas: this });
        this.game = game;
    };
    Pilas.prototype.ejecutar = function () {
        console.warn("La función pilas.ejecutar() entró en desuso, no hace falta invocarla.");
    };
    Pilas.prototype.definir_modo = function (nombre, datos) {
        try {
            this.game.scene.stop("ModoCargador");
            this.game.scene.stop("ModoEjecucion");
            this.game.scene.stop("ModoEditor");
            this.game.scene.stop("ModoPausa");
        }
        catch (e) {
            console.warn(e);
        }
        this.modo = this.game.scene.getScene(nombre);
        this.definir_cursor("default");
        this.game.scene.start(nombre, datos);
    };
    Pilas.prototype.cambiar_escena = function (nombre) {
        this.modo.cambiar_escena(nombre);
    };
    Pilas.prototype.reiniciar_escena = function () {
        this.modo.cambiar_escena(this.escena.constructor.name);
    };
    Pilas.prototype.crear_configuracion = function (ancho, alto, maximizar, pixelart, transparente) {
        var escala = undefined;
        var color_de_fondo = "#000000";
        if (maximizar) {
            escala = {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            };
        }
        if (pixelart === undefined) {
            pixelart = true;
        }
        if (transparente === undefined) {
            transparente = false;
        }
        if (transparente) {
            color_de_fondo = "rgba(0,0,0,0)";
        }
        return {
            type: Phaser.AUTO,
            parent: "game",
            scale: escala,
            width: ancho,
            height: alto,
            backgroundColor: color_de_fondo,
            disableContextMenu: true,
            pixelArt: pixelart,
            autostart: false,
            transparent: transparente,
            fps: {},
            input: {
                keyboard: true,
                mouse: true,
                touch: true,
                gamepad: true
            },
            plugins: {
                global: [NineSlice.Plugin.DefaultCfg]
            },
            physics: {
                default: "matter",
                debug: false
            }
        };
    };
    Pilas.prototype.reproducir_sonido = function (nombre) {
        this.escena.planificar_reproducir_sonido(nombre);
    };
    Pilas.prototype.obtener_actores = function () {
        return this.escena.actores;
    };
    Pilas.prototype.buscar_actor = function (nombre) {
        return this.obtener_actor_por_nombre(nombre);
    };
    Pilas.prototype.obtener_actor_por_nombre = function (nombre) {
        var actor = this.obtener_actores().find(function (actor) { return actor.nombre === nombre; });
        if (actor === undefined) {
            throw Error("No se puede obtener un actor con el nombre '" + nombre + "', \u00BFTal vez se elimin\u00F3?");
        }
        else {
            return actor;
        }
    };
    Pilas.prototype.existe_un_actor_llamado = function (nombre) {
        var actor = this.obtener_actores().find(function (actor) { return actor.nombre === nombre; });
        return actor !== undefined;
    };
    Pilas.prototype.obtener_actor_por_etiqueta = function (etiqueta) {
        return this.obtener_actores().find(function (actor) {
            return actor.tiene_etiqueta(etiqueta);
        });
    };
    Pilas.prototype.obtener_todos_los_actores_con_la_etiqueta = function (etiqueta) {
        return this.obtener_actores().filter(function (actor) {
            if (actor._vivo) {
                return actor.tiene_etiqueta(etiqueta);
            }
        });
    };
    Pilas.prototype.obtener_cantidad_de_actores = function () {
        return this.obtener_actores().length;
    };
    Pilas.prototype.obtener_diccionario_de_actores = function () {
        var diccionario = {};
        this.obtener_actores().map(function (actor) {
            diccionario[actor.nombre] = actor;
        });
        return diccionario;
    };
    Pilas.prototype.obtener_actores_en = function (_x, _y) {
        var _a = this.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, _y), x = _a.x, y = _a.y;
        var actores = this.obtener_actores();
        return actores.filter(function (actor) {
            return actor.sprite.getBounds()["contains"](x, y);
        });
    };
    Pilas.prototype.escena_actual = function () {
        return this.escena;
    };
    Pilas.prototype.animar = function (actor, propiedad, valor, duracion) {
        if (duracion === void 0) { duracion = 0.5; }
        var configuracion = {
            targets: actor,
            ease: "Power1",
            duration: duracion * 1000
        };
        configuracion[propiedad] = valor[0];
        this.modo.tweens.add(configuracion);
    };
    Pilas.prototype.luego = function (duracion, tarea) {
        var _this = this;
        return this.modo.time.delayedCall(duracion * 1000, function () {
            try {
                tarea();
            }
            catch (e) {
                console.error(e);
                _this.mensajes.emitir_excepcion_al_editor(e, "Al ejecutar la tarea 'luego'");
                _this.modo.pausar();
            }
        });
    };
    Pilas.prototype.cada = function (duracion, tarea, veces) {
        var _this = this;
        var veces_que_se_ejecuto = 0;
        var time = this.modo.time.addEvent({
            delay: duracion * 1000,
            callback: function () {
                try {
                    if (tarea()) {
                        time.remove();
                    }
                    veces_que_se_ejecuto += 1;
                    if (veces && veces_que_se_ejecuto >= veces) {
                        time.remove();
                    }
                }
                catch (e) {
                    console.error(e);
                    _this.mensajes.emitir_excepcion_al_editor(e, "Al ejecutar la tarea 'cada'");
                    _this.modo.pausar();
                }
            },
            loop: true
        });
        return time;
    };
    Pilas.prototype.azar = function (desde, hasta) {
        if (desde > hasta) {
            throw Error("Rango inv\u00E1lido, el n\u00FAmero desde (" + desde + " en este caso) debe ser menor al hasta (" + hasta + ").");
        }
        return Math.floor(Math.random() * (hasta - desde + 1)) + desde;
    };
    Pilas.prototype.obtener_distancia_entre_puntos = function (x, y, x2, y2) {
        var dx = x - x2;
        var dy = y - y2;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Pilas.prototype.obtener_distancia_entre_actores = function (actor1, actor2) {
        return this.obtener_distancia_entre_puntos(actor1.x, actor1.y, actor2.x, actor2.y);
    };
    Pilas.prototype.obtener_angulo_entre_puntos = function (x, y, x2, y2) {
        var dx = x2 - x;
        var dy = y2 - y;
        var radianes = Math.atan(dy / dx);
        if (1 / dx < 0) {
            radianes += Math.PI;
        }
        if (1 / radianes < 0) {
            radianes += 2 * Math.PI;
        }
        return radianes * (180 / Math.PI);
    };
    Pilas.prototype.obtener_angulo_entre_actores = function (actor1, actor2) {
        if (!actor1.esta_vivo() || !actor2.esta_vivo()) {
            return 0;
        }
        return this.obtener_angulo_entre_puntos(actor1.x, actor1.y, actor2.x, actor2.y);
    };
    Pilas.prototype.ocultar_cursor = function () {
        this.modo.input.setDefaultCursor("none");
    };
    Pilas.prototype.definir_cursor = function (nombre) {
        var nombres = {
            normal: "default",
            pulsable: "hand",
            mano: "hand"
        };
        this.modo.input.setDefaultCursor(nombres[nombre] || nombre);
    };
    Pilas.prototype.observar = function (nombre, variable) {
        this.escena.observar(nombre, variable);
    };
    Pilas.prototype.clonar = function (nombre) {
        return this.modo.clonar_actor_por_nombre(nombre);
    };
    Pilas.prototype.clonar_en = function (nombre, x, y) {
        var actor = this.modo.clonar_actor_por_nombre(nombre);
        actor.x = x;
        actor.y = y;
        return actor;
    };
    Pilas.prototype.clonar_en_la_posión_del_cursor = function (nombre) {
        var actor = this.modo.clonar_actor_por_nombre(nombre);
        actor.x = this.cursor_x;
        actor.y = this.cursor_y;
        return actor;
    };
    Pilas.prototype.clonar_en_posicion_al_azar = function (nombre) {
        var x = this.azar(-200, 200);
        var y = this.azar(-200, 200);
        return this.clonar_en(nombre, x, y);
    };
    Pilas.prototype.es_multiplo = function (a, b) {
        return a % b === 0;
    };
    Pilas.prototype.enviar_mensaje_global = function (mensaje, datos) {
        if (datos === void 0) { datos = {}; }
        this.escena_actual().enviar_mensaje(mensaje, datos);
        var actores = this.obtener_actores();
        for (var i = 0; i < actores.length; i++) {
            actores[i].enviar_mensaje(mensaje, datos);
        }
    };
    Pilas.prototype.alternar_modo_pantalla_completa = function () {
        this.modo.scale.toggleFullscreen();
    };
    Pilas.prototype.solicitar_modo_pantalla_completa = function () {
        this.modo.scale.startFullscreen();
    };
    Pilas.prototype.solicitar_modo_ventana = function () {
        this.modo.scale.stopFullscreen();
    };
    return Pilas;
}());
var pilasengine = new Pilas();
var Sensor = (function () {
    function Sensor(figura) {
        this._figura = figura;
    }
    Object.defineProperty(Sensor.prototype, "colisiones", {
        get: function () {
            return this._figura.colisiones;
        },
        enumerable: true,
        configurable: true
    });
    Sensor.prototype.colisiona_con_etiqueta = function (etiqueta) {
        if (this._figura.colisiones.find(function (actor) { return actor.tiene_etiqueta(etiqueta); })) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(Sensor.prototype, "cantidad_de_colisiones", {
        get: function () {
            return this._figura.colisiones.length;
        },
        enumerable: true,
        configurable: true
    });
    return Sensor;
}());
var ActorBase = (function () {
    function ActorBase(pilas) {
        this.figura = "";
        this._etiqueta = null;
        this._vivo = true;
        this._animacion_en_curso = "";
        this._es_texto = false;
        this._comportamiento_actual = null;
        this._fondo = null;
        this._fondo_imagen = "";
        this._dialogo = null;
        this._fuente = "color-blanco-con-sombra";
        this._texto_con_borde = false;
        this._color_de_texto = "white";
        this.propiedades_base = {
            x: 0,
            y: 0,
            z: 0,
            imagen: "imagenes:basicos/sin_imagen",
            centro_x: 0.5,
            centro_y: 0.5,
            rotacion: 0,
            escala_x: 1,
            escala_y: 1,
            transparencia: 0,
            etiqueta: "actor",
            espejado: false,
            espejado_vertical: false,
            figura: "",
            figura_dinamica: true,
            figura_ancho: 100,
            figura_alto: 100,
            figura_radio: 40,
            figura_sin_rotacion: false,
            figura_rebote: 1,
            figura_sensor: false,
            es_texto: false,
            texto_con_borde: false,
            color: "white"
        };
        this.propiedades = {
            x: 0,
            y: 0,
            z: 0,
            imagen: "imagenes:basicos/sin_imagen",
            figura: ""
        };
        this.pilas = pilas;
        this.automata = new Automata(this);
        this.colisiones = [];
        this._habilidades = [];
    }
    Object.defineProperty(ActorBase.prototype, "propiedades_iniciales", {
        get: function () {
            return this.propiedades;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.pre_iniciar = function (propiedades) {
        var _this = this;
        var figura = propiedades.figura || "";
        this._id = propiedades.id || this.pilas.utilidades.obtener_id_autoincremental();
        this._nombre = propiedades.nombre;
        this.sensores = [];
        this._comportamientos = [];
        this._figura_ancho = propiedades.figura_ancho;
        this._figura_alto = propiedades.figura_alto;
        this._figura_radio = propiedades.figura_radio;
        this._es_texto = propiedades.es_texto;
        switch (figura) {
            case "rectangulo":
                this.sprite = this.crear_sprite("matter", propiedades.imagen);
                this.figura = figura;
                this.crear_figura_rectangular(propiedades.figura_ancho, propiedades.figura_alto);
                this.dinamico = propiedades.figura_dinamica;
                this.sin_rotacion = propiedades.figura_sin_rotacion;
                this.rebote = propiedades.figura_rebote;
                this.sensor = propiedades.figura_sensor;
                this.sprite.body["es_dinamica"] = this.dinamico;
                this.sprite.body["es_sensor"] = this.sensor;
                break;
            case "circulo":
                this.sprite = this.crear_sprite("matter", propiedades.imagen);
                this.figura = figura;
                this.crear_figura_circular(propiedades.figura_radio);
                this.dinamico = propiedades.figura_dinamica;
                this.sin_rotacion = propiedades.figura_sin_rotacion;
                this.rebote = propiedades.figura_rebote;
                this.sensor = propiedades.figura_sensor;
                this.sprite.body["es_dinamica"] = this.dinamico;
                this.sprite.body["es_sensor"] = this.sensor;
                break;
            case "ninguna":
            case "":
                this.figura = figura;
                this.sprite = this.crear_sprite("sprite", propiedades.imagen);
                break;
            default:
                throw Error("No se conoce el tipo de figura " + figura);
        }
        this.interactivo = true;
        this.rotacion = propiedades.rotacion || 0;
        this.id_color = this.generar_color_para_depurar();
        this.etiqueta = propiedades.etiqueta;
        this.escala_x = propiedades.escala_x || 1;
        this.escala_y = propiedades.escala_y || 1;
        this.tipo = propiedades.tipo;
        this.centro_x = propiedades.centro_x || 0.5;
        this.centro_y = propiedades.centro_y || 0.5;
        this.transparencia = propiedades.transparencia || 0;
        this.x = propiedades.x || 0;
        this.y = propiedades.y || 0;
        this.z = propiedades.z || 0;
        this.espejado = propiedades.espejado;
        this.espejado_vertical = propiedades.espejado_vertical;
        this.sprite["actor"] = this;
        if (propiedades.es_texto) {
            this.texto = propiedades.texto;
            this.fuente = propiedades.fuente;
            if (propiedades.fondo) {
                this.fondo = propiedades.fondo;
            }
        }
        this.sprite.update = function () {
            _this.ejecutar_de_modo_seguro(function () {
                _this.actualizar();
            });
        };
        this.sprite.on("animationcomplete", function (anim, frame) {
            _this.ejecutar_de_modo_seguro(function () {
                if (frame.isLast) {
                    var nombre = anim.key.split("-")[1];
                    _this.sprite.anims.play(anim.key);
                    _this.cuando_finaliza_animacion(nombre);
                    _this.automata.cuando_finaliza_animacion(nombre);
                }
            });
        });
        this.sprite.on("pointerdown", function (cursor) {
            _this.ejecutar_de_modo_seguro(function () {
                var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
                _this.cuando_hace_click(posicion.x, posicion.y, cursor);
            });
        });
        this.sprite.on("pointerup", function (cursor) {
            _this.ejecutar_de_modo_seguro(function () {
                var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
                _this.cuando_termina_de_hacer_click(posicion.x, posicion.y, cursor);
            });
        });
        this.sprite.on("pointerout", function (cursor) {
            _this.ejecutar_de_modo_seguro(function () {
                var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
                _this.cuando_sale(posicion.x, posicion.y, cursor);
            });
        });
        this.sprite.on("pointermove", function (cursor) {
            _this.ejecutar_de_modo_seguro(function () {
                var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
                _this.cuando_mueve(posicion.x, posicion.y, cursor);
            });
        });
        this.pilas.escena.agregar_actor(this);
    };
    ActorBase.prototype.ejecutar_de_modo_seguro = function (funcion) {
        try {
            funcion();
        }
        catch (e) {
            this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizar actor");
            this.pilas.modo.pausar();
        }
    };
    ActorBase.prototype.crear_sprite = function (tipo, imagen_inicial) {
        var galeria = null;
        var imagen = null;
        var sprite = null;
        this.pilas.utilidades.validar_que_existe_imagen(imagen_inicial);
        if (imagen_inicial.indexOf(":") > -1) {
            galeria = imagen_inicial.split(":")[0];
            imagen = imagen_inicial.split(":")[1];
        }
        else {
            galeria = null;
            imagen = imagen_inicial;
        }
        switch (tipo) {
            case "matter":
                if (galeria) {
                    sprite = this.pilas.modo.matter.add.sprite(0, 0, galeria, imagen);
                }
                else {
                    sprite = this.pilas.modo.matter.add.sprite(0, 0, imagen);
                }
                break;
            case "sprite":
                if (galeria) {
                    sprite = this.pilas.modo.add.sprite(0, 0, galeria, imagen);
                }
                else {
                    sprite = this.pilas.modo.add.sprite(0, 0, imagen);
                }
                break;
            default:
                throw Error("No se puede crear un sprite de tipo " + tipo);
        }
        return sprite;
    };
    ActorBase.prototype.copiar_atributos_de_sprite = function (origen, destino) {
        destino.x = origen.x;
        destino.y = origen.y;
        destino.angle = origen.angle;
        destino.scaleX = origen.scaleX;
        destino.scaleY = origen.scaleY;
        destino.alpha = origen.alpha;
        destino.flipX = origen.flipX;
        destino.flipY = origen.flipY;
        destino.depth = origen.depth;
        destino.setOrigin(origen.originX, origen.originY);
    };
    ActorBase.prototype.iniciar = function () { };
    Object.defineProperty(ActorBase.prototype, "interactivo", {
        get: function () {
            return this.sprite.input.enabled;
        },
        set: function (activo) {
            if (activo) {
                this.sprite.setInteractive();
            }
            else {
                this.sprite.disableInteractive();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "area_de_interactividad", {
        get: function () {
            var ancho = this.sprite.input.hitArea.width;
            var alto = this.sprite.input.hitArea.height;
            return { ancho: ancho, alto: alto };
        },
        set: function (v) {
            console.warn("No pude definir el area así, use definir_area_de_interactividad");
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.definir_area_de_interactividad = function (ancho, alto) {
        if (this.sprite) {
            this.sprite.width = ancho;
            this.sprite.height = alto;
            this.sprite.input.hitArea.width = ancho;
            this.sprite.input.hitArea.height = alto;
            this.sprite.setOrigin(this.centro_x, this.centro_y);
        }
        else {
            console.log("aún no tiene sprite");
        }
    };
    ActorBase.prototype.cuando_hace_click_en_la_pantalla = function (x, y, evento_original) { };
    Object.defineProperty(ActorBase.prototype, "fondo", {
        set: function (fondo) { },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.serializar = function () {
        var texto = "";
        var fondo = "";
        var fuente = "";
        if (this._es_texto) {
            texto = this._texto.text;
            fondo = this._fondo_imagen;
            fuente = this._fuente;
        }
        var sensores_serializados = [];
        if (this.sensores) {
            sensores_serializados = this.sensores.map(function (e) {
                return e.vertices.map(function (e) {
                    return {
                        x: e.x,
                        y: e.y,
                        isInternal: e.isInternal
                    };
                });
            });
        }
        return {
            tipo: this.tipo,
            x: Math.round(this.x),
            y: Math.round(this.y),
            z: Math.round(this.z),
            centro_x: this.centro_x,
            centro_y: this.centro_y,
            rotacion: this.rotacion,
            escala_x: this.escala_x,
            escala_y: this.escala_y,
            imagen: this.imagen,
            figura: this.figura,
            figura_ancho: this.figura_ancho,
            figura_alto: this.figura_alto,
            figura_radio: this.figura_radio,
            figura_dinamica: this.dinamico,
            figura_sensor: this.sensor,
            fijo: this.fijo,
            es_texto: this._es_texto,
            texto: texto,
            fondo: fondo,
            fuente: fuente,
            texto_con_borde: this._texto_con_borde,
            color_de_texto: this._color_de_texto,
            espejado: this.espejado,
            espejado_vertical: this.espejado_vertical,
            transparencia: this.transparencia,
            id_color: this.id_color,
            sensores: sensores_serializados
        };
    };
    Object.defineProperty(ActorBase.prototype, "etiqueta", {
        get: function () {
            return this._etiqueta;
        },
        set: function (etiqueta) {
            this._etiqueta = etiqueta;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.tiene_etiqueta = function (etiqueta) {
        return this.etiqueta === etiqueta;
    };
    ActorBase.prototype.generar_color_para_depurar = function () {
        return this.pilas.utilidades.obtener_color_al_azar();
    };
    ActorBase.prototype.pre_actualizar = function () {
        if (this.figura && this.sin_rotacion) {
            this.sprite.setAngularVelocity(0);
        }
        this.actualizar_comportamientos();
        this.automata.actualizar();
    };
    ActorBase.prototype.actualizar_comportamientos = function () {
        if (this._comportamiento_actual) {
            var termina = this._comportamiento_actual.actualizar();
            if (termina) {
                if (this._comportamientos.length > 0) {
                    this._adoptar_siguiente_comportamiento();
                }
                else {
                    this._comportamiento_actual = null;
                }
            }
        }
        else {
            if (this._comportamientos.length > 0) {
                this._adoptar_siguiente_comportamiento();
            }
        }
    };
    ActorBase.prototype._adoptar_siguiente_comportamiento = function () {
        var datos = this._comportamientos[0];
        var nombre = datos.nombre_del_comportamiento;
        var clase = this.pilas.comportamientos.buscar(nombre);
        if (clase) {
            var instancia = new clase(this.pilas, this);
            instancia.iniciar(datos.argumentos);
            if (this._comportamientos.length > 0) {
                this._comportamientos.shift();
                this._comportamiento_actual = instancia;
            }
        }
    };
    ActorBase.prototype.hacer = function (nombre_del_comportamiento, argumentos) {
        if (argumentos === void 0) { argumentos = undefined; }
        this.pilas.comportamientos.validar_si_existe(nombre_del_comportamiento);
        this._comportamientos.push({ nombre_del_comportamiento: nombre_del_comportamiento, argumentos: argumentos });
    };
    ActorBase.prototype.eliminar_comportamientos = function () {
        this._comportamientos = [];
        this._comportamiento_actual = null;
    };
    ActorBase.prototype.hacer_inmediatamente = function (nombre_del_comportamiento, argumentos) {
        if (argumentos === void 0) { argumentos = undefined; }
        this.eliminar_comportamientos();
        this.hacer(nombre_del_comportamiento, argumentos);
    };
    Object.defineProperty(ActorBase.prototype, "estado", {
        get: function () {
            return this.automata.estado;
        },
        set: function (estado) {
            this.automata.estado = estado;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.actualizar = function () { };
    ActorBase.prototype.actualizar_habilidades = function () {
        this._habilidades.map(function (h) {
            h.actualizar();
        });
    };
    ActorBase.prototype.actualizar_sensores = function () {
        var _this = this;
        var Body = this.pilas.Phaser.Physics.Matter.Matter.Body;
        this.sensores.map(function (s) {
            var _a = _this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(_this.x, _this.y), x = _a.x, y = _a.y;
            Body.setPosition(s, {
                x: x + s.distancia_x,
                y: y - s.distancia_y
            });
            Body.setVelocity(s, { x: 0, y: 0 });
            Body.setAngularVelocity(s, 0);
            s.colisiones = s.colisiones.filter(function (a) { return a._vivo; });
        });
    };
    Object.defineProperty(ActorBase.prototype, "imagen", {
        get: function () {
            if (this.sprite.frame.name === "__BASE") {
                return this.sprite.texture.key;
            }
            else {
                return this.sprite.texture.key + ":" + this.sprite.frame.name;
            }
        },
        set: function (nombre) {
            var galeria = null;
            var imagen = null;
            this.pilas.utilidades.validar_que_existe_imagen(nombre);
            if (nombre.indexOf(":") > -1) {
                galeria = nombre.split(":")[0];
                imagen = nombre.split(":")[1];
            }
            else {
                galeria = null;
                imagen = nombre;
            }
            if (galeria) {
                this.sprite.setTexture(galeria, imagen);
            }
            else {
                this.sprite.setTexture(imagen);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        set: function (a) {
            throw new Error("No puede definir este atributo");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (a) {
            throw new Error("No puede definir este atributo");
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
            if (this.pilas.utilidades.es_animacion(_x)) {
                this.pilas.animar(this, "x", _x);
            }
            else {
                this.pilas.utilidades.validar_numero(_x);
                var x = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, 0).x;
                this.sprite.x = x;
            }
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
            if (this.pilas.utilidades.es_animacion(_y)) {
                this.pilas.animar(this, "y", _y);
            }
            else {
                this.pilas.utilidades.validar_numero(_y);
                var y = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(0, _y).y;
                this.sprite.y = y;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "z", {
        get: function () {
            return -this.sprite.depth;
        },
        set: function (_z) {
            this.pilas.utilidades.validar_numero(_z);
            this.sprite.depth = -_z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "rotacion", {
        get: function () {
            return -this.sprite.angle % 360;
        },
        set: function (angulo) {
            if (this.pilas.utilidades.es_animacion(angulo)) {
                this.pilas.animar(this, "rotacion", angulo);
            }
            else {
                this.pilas.utilidades.validar_numero(angulo);
                this.sprite.angle = -(angulo % 360);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "escala_x", {
        get: function () {
            return this.sprite.scaleX;
        },
        set: function (s) {
            if (this.pilas.utilidades.es_animacion(s)) {
                this.pilas.animar(this, "escala_x", s);
            }
            else {
                this.pilas.utilidades.validar_numero(s);
                this.sprite.scaleX = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "escala_y", {
        get: function () {
            return this.sprite.scaleY;
        },
        set: function (s) {
            if (this.pilas.utilidades.es_animacion(s)) {
                this.pilas.animar(this, "escala_y", s);
            }
            else {
                this.pilas.utilidades.validar_numero(s);
                this.sprite.scaleY = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "escala", {
        get: function () {
            return this.escala_x;
        },
        set: function (escala) {
            if (this.pilas.utilidades.es_animacion(escala)) {
                this.pilas.animar(this, "escala", escala);
            }
            else {
                this.pilas.utilidades.validar_numero(escala);
                this.escala_x = escala;
                this.escala_y = escala;
            }
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
            if (this.pilas.utilidades.es_animacion(t)) {
                this.pilas.animar(this, "transparencia", t);
            }
            else {
                this.pilas.utilidades.validar_numero(t);
                t = this.pilas.utilidades.limitar(t, 0, 100);
                this.sprite.alpha = 1 - t / 100;
            }
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.toString = function () {
        var clase = this.constructor["name"];
        if (this.esta_vivo()) {
            var x = this.x.toFixed(2);
            var y = this.y.toFixed(2);
            return "<" + clase + " en (" + x + ", " + y + ")>";
        }
        else {
            "<" + clase + " eliminado>";
        }
    };
    ActorBase.prototype.fallar_si_no_tiene_figura = function () {
        if (!this.figura) {
            throw Error("Este actor no tiene figura f\u00EDsica, no se puede llamar a este m\u00E9todo");
        }
    };
    ActorBase.prototype.crear_figura_rectangular = function (ancho, alto) {
        if (ancho === void 0) { ancho = 0; }
        if (alto === void 0) { alto = 0; }
        this.fallar_si_no_tiene_figura();
        this.pilas.utilidades.validar_numero(ancho);
        this.pilas.utilidades.validar_numero(alto);
        this.sprite.setRectangle(ancho, alto);
    };
    ActorBase.prototype.crear_figura_circular = function (radio) {
        if (radio === void 0) { radio = 0; }
        this.fallar_si_no_tiene_figura();
        this.pilas.utilidades.validar_numero(radio);
        if (radio < 1) {
            radio = 30;
        }
        this.sprite.setCircle(radio);
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
            if (this.sprite.isStatic !== undefined) {
                return this.sprite.isStatic();
            }
            return false;
        },
        set: function (estatico) {
            if (this.sprite.setStatic !== undefined) {
                this.sprite.setStatic(estatico);
                this.sprite.setVelocity(0, 0);
            }
            else {
                console.warn("Este actor no tiene figura, ignorando valor estatico/dinámico.");
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
    ActorBase.prototype.impulsar = function (x, y) {
        this.fallar_si_no_tiene_figura();
        this.sprite.setVelocity(x, -y);
    };
    Object.defineProperty(ActorBase.prototype, "velocidad_x", {
        get: function () {
            this.fallar_si_no_tiene_figura();
            return this.sprite.body.velocity.x;
        },
        set: function (valor) {
            this.fallar_si_no_tiene_figura();
            this.sprite.setVelocityX(valor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "velocidad_y", {
        get: function () {
            this.fallar_si_no_tiene_figura();
            return -this.sprite.body.velocity.y;
        },
        set: function (valor) {
            this.fallar_si_no_tiene_figura();
            this.sprite.setVelocityY(-valor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "rebote", {
        get: function () {
            this.fallar_si_no_tiene_figura();
            return this.sprite.body.restitution;
        },
        set: function (valor) {
            this.pilas.utilidades.validar_numero(valor);
            this.fallar_si_no_tiene_figura();
            this.sprite.setBounce(valor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "sensor", {
        get: function () {
            if (this.sprite.body && this.sprite.body.isSensor !== undefined) {
                return this.sprite.isSensor();
            }
            return false;
        },
        set: function (valor) {
            this.fallar_si_no_tiene_figura();
            this.sprite.setSensor(valor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "fijo", {
        get: function () {
            return this.sprite.scrollFactorX == 0;
        },
        set: function (valor) {
            if (valor) {
                this.sprite.setScrollFactor(0, 0);
                if (this._texto) {
                    this._texto.setScrollFactor(0, 0);
                }
            }
            else {
                this.sprite.setScrollFactor(1, 1);
                if (this._texto) {
                    this._texto.setScrollFactor(1, 1);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "espejado", {
        get: function () {
            return this.sprite.flipX;
        },
        set: function (valor) {
            this.sprite.setFlipX(valor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "espejado_vertical", {
        get: function () {
            return this.sprite.flipY;
        },
        set: function (valor) {
            this.sprite.setFlipY(valor);
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.cada_segundo = function (segundos_transcurridos) { };
    ActorBase.prototype.avanzar = function (rotacion, velocidad) {
        if (rotacion === void 0) { rotacion = null; }
        if (velocidad === void 0) { velocidad = 1; }
        if (rotacion === null) {
            rotacion = this.rotacion;
        }
        var r = this.pilas.utilidades.convertir_angulo_a_radianes(rotacion);
        this.x += Math.cos(r) * velocidad;
        this.y += Math.sin(r) * velocidad;
    };
    ActorBase.prototype.crear_animacion = function (nombre, cuadros, velocidad) {
        this.pilas.animaciones.crear_animacion(nombre, cuadros, velocidad);
    };
    ActorBase.prototype.reproducir_animacion = function (nombre_de_la_animacion) {
        this.sprite.anims.play(nombre_de_la_animacion);
    };
    ActorBase.prototype.cuando_finaliza_animacion = function (animacion) { };
    Object.defineProperty(ActorBase.prototype, "animacion", {
        get: function () {
            return this._animacion_en_curso;
        },
        set: function (nombre) {
            if (this._animacion_en_curso !== nombre) {
                if (this.pilas.animaciones.existe_animacion(nombre)) {
                    this.reproducir_animacion(nombre);
                    this._animacion_en_curso = nombre;
                }
                else {
                    throw Error("No se ha creado la animaci\u00F3n '" + nombre + "' previamente");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.cuando_comienza_una_colision = function (actor) { };
    ActorBase.prototype.cuando_se_mantiene_una_colision = function (actor) { };
    ActorBase.prototype.cuando_termina_una_colision = function (actor) { };
    ActorBase.prototype.cuando_colisiona = function (actor) { };
    ActorBase.prototype.cuando_hace_click = function (x, y, evento_original) { };
    ActorBase.prototype.cuando_termina_de_hacer_click = function (x, y, evento_original) { };
    ActorBase.prototype.cuando_sale = function (x, y, evento_original) { };
    ActorBase.prototype.cuando_mueve = function (x, y, evento_original) { };
    ActorBase.prototype.cuando_pulsa_tecla = function (tecla, evento_original) { };
    ActorBase.prototype.cuando_suelta_tecla = function (tecla, evento_original) { };
    Object.defineProperty(ActorBase.prototype, "cantidad_de_colisiones", {
        get: function () {
            return this.colisiones.length;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.agregar_sensores_desde_lista = function (lista_de_sensores) {
        var _this = this;
        lista_de_sensores.map(function (sensor) {
            _this.agregar_sensor(sensor.ancho, sensor.alto, sensor.x, sensor.y, sensor.nombre);
        });
    };
    ActorBase.prototype.agregar_sensor = function (ancho, alto, x, y, nombre) {
        if (nombre === void 0) { nombre = "sin nombre"; }
        var pos = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(x, y);
        var figura = this.pilas.modo.matter.add.rectangle(pos.x, pos.y, ancho, alto, {
            isSensor: true,
            isStatic: false
        });
        figura.distancia_x = x;
        figura.distancia_y = y;
        figura["es_sensor"] = true;
        figura["es_dinamica"] = true;
        figura.sensor_del_actor = this;
        figura.colisiones = [];
        figura["nombre"] = nombre;
        this.sensores.push(figura);
        return figura;
    };
    ActorBase.prototype.eliminar = function () {
        this._vivo = false;
    };
    ActorBase.prototype.esta_vivo = function () {
        return this._vivo;
    };
    Object.defineProperty(ActorBase.prototype, "fuente", {
        get: function () {
            return "";
        },
        set: function (fuente) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "figura_ancho", {
        get: function () {
            return this._figura_ancho;
        },
        set: function (valor) {
            throw new Error("No puede definir este atributo");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "figura_alto", {
        get: function () {
            return this._figura_alto;
        },
        set: function (valor) {
            throw new Error("No puede definir este atributo");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "figura_radio", {
        get: function () {
            return this._figura_radio;
        },
        set: function (valor) {
            throw new Error("No puede definir este atributo");
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.decir = function (mensaje, duracion) {
        var _this = this;
        if (duracion === void 0) { duracion = 4; }
        if (this._dialogo) {
            this._dialogo.eliminar();
            this._dialogo = null;
        }
        var texto = this.pilas.actores.texto();
        texto.texto = mensaje;
        texto.x = this.x - 15;
        texto.y = this.y + this.alto;
        texto.fuente = "color-negro";
        texto.transparencia = 100;
        texto.transparencia = [0];
        texto.fondo = "imagenes:redimensionables/dialogo";
        texto.color = "black";
        texto.centro_x = 1;
        texto.centro_y = 1;
        texto.z = this.z - 1;
        texto.texto = mensaje;
        mantener_en_pantalla();
        function mantener_en_pantalla() {
            if (texto.x - texto.sprite.width < texto.pilas.camara.borde_izquierdo) {
                texto.x = texto.pilas.camara.borde_izquierdo + texto.sprite.width;
            }
            if (texto.x + 20 > texto.pilas.camara.borde_derecho) {
                texto.x = texto.pilas.camara.borde_derecho - 20;
            }
            if (texto.y + texto.sprite.height > texto.pilas.camara.borde_arriba) {
                texto.y = texto.pilas.camara.borde_arriba - texto.sprite.height;
            }
            if (texto.y - 15 < texto.pilas.camara.borde_abajo) {
                texto.y = texto.pilas.camara.borde_abajo + 15;
            }
        }
        texto.actualizar = function () {
            if (_this.esta_vivo()) {
                texto.x = _this.x - 15;
                texto.y = _this.y + _this.alto;
                mantener_en_pantalla();
            }
        };
        this._dialogo = texto;
        this.pilas.luego(duracion, function () {
            if (texto.esta_vivo()) {
                texto.eliminar();
                if (texto === _this._dialogo) {
                    _this._dialogo = null;
                }
            }
        });
    };
    ActorBase.prototype.aprender = function (habilidad) {
        var clase = this.pilas.habilidades.buscar(habilidad);
        if (clase) {
            if (this.tiene_habilidad(clase.name)) {
                console.warn("No se aplica la habilidad " + clase.name + " porque el actor ya la ten\u00EDa vinculada.");
            }
            else {
                var instancia = new clase(this.pilas, this);
                instancia.iniciar();
                this._habilidades.push(instancia);
            }
        }
    };
    ActorBase.prototype.olvidar = function (habilidad) {
        var clase = this.pilas.habilidades.buscar(habilidad);
        if (clase) {
            if (!this.tiene_habilidad(clase.name)) {
                console.warn("No se puede olvidar la habilidad '" + clase.name + "' porque el actor no la tiene.");
            }
            else {
                var indice = this._habilidades.findIndex(function (e) { return e.constructor.name == clase.name; });
                var habilidad_a_eliminar = this._habilidades[indice];
                habilidad_a_eliminar.eliminar();
                this._habilidades.splice(indice, 1);
            }
        }
    };
    ActorBase.prototype.tiene_habilidad = function (habilidad) {
        return (this._habilidades.filter(function (h) {
            return h.constructor.name === habilidad;
        }).length > 0);
    };
    ActorBase.prototype.aumentar = function (cantidad) {
        if (cantidad === void 0) { cantidad = 1; }
    };
    Object.defineProperty(ActorBase.prototype, "con_borde", {
        set: function (con_borde) {
            this._texto_con_borde = con_borde;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "color", {
        set: function (color) {
            this._color_de_texto = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "control", {
        get: function () {
            return this.pilas.control;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.obtener_distancia_al_punto = function (x, y) {
        return this.pilas.utilidades.obtener_distancia_entre(this.x, this.y, x, y);
    };
    ActorBase.prototype.obtener_distancia_al_actor = function (actor) {
        return this.obtener_distancia_al_punto(actor.x, actor.y);
    };
    ActorBase.prototype.mover_hacia_el_punto = function (x, y, velocidad) {
        if (velocidad === void 0) { velocidad = 10; }
        var angulo = this.pilas.obtener_angulo_entre_puntos(this.x, this.y, x, y);
        this.avanzar(angulo, velocidad);
    };
    ActorBase.prototype.enviar_mensaje = function (mensaje, datos) {
        if (datos === void 0) { datos = {}; }
        this.cuando_llega_un_mensaje(mensaje, datos);
        if (this["cuando_llega_el_mensaje_" + mensaje]) {
            this["cuando_llega_el_mensaje_" + mensaje](datos);
        }
    };
    ActorBase.prototype.cuando_llega_un_mensaje = function (mensaje, datos) {
        if (datos === void 0) { datos = {}; }
    };
    ActorBase.prototype.enviar_mensaje_global = function (mensaje, datos) {
        if (datos === void 0) { datos = {}; }
        this.pilas.enviar_mensaje_global(mensaje, datos);
    };
    Object.defineProperty(ActorBase.prototype, "camara", {
        get: function () {
            return this.pilas.camara;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.hacer_recorrido = function (posiciones, duracion, veces, seguir_rotacion) {
        var _this = this;
        if (duracion === void 0) { duracion = 1; }
        if (veces === void 0) { veces = 1; }
        if (seguir_rotacion === void 0) { seguir_rotacion = false; }
        this.pilas.utilidades.validar_parametro_lista_de_numeros_pares("posiciones", posiciones);
        this.pilas.utilidades.validar_parametro_numero_positivo("duracion", duracion);
        this.pilas.utilidades.validar_parametro_numero_entero_cero_o_positivo("veces", veces);
        var puntos_a_recorrer = [this.x, this.y].concat(posiciones);
        var curve = new Phaser.Curves.Spline(puntos_a_recorrer);
        var anterior_x = this.x;
        var anterior_y = this.y;
        this.pilas.modo.tweens.add({
            targets: { t: 0 },
            t: 1,
            ease: "Linear",
            duration: duracion * 1000,
            yoyo: false,
            repeat: veces - 1,
            onUpdate: function (tween, target) {
                var _a = curve.getPoint(target.t), x = _a.x, y = _a.y;
                if (_this.esta_vivo()) {
                    _this.x = x;
                    _this.y = y;
                    if (seguir_rotacion) {
                        var dx = _this.x - anterior_x;
                        var dy = _this.y - anterior_y;
                        _this.rotacion = _this.pilas.utilidades.convertir_radianes_a_angulos(Math.atan2(dy, dx));
                    }
                    anterior_x = x;
                    anterior_y = y;
                }
            }
        });
    };
    ActorBase.prototype.obtener_sensor = function (nombre) {
        var figura = this.sensores.find(function (e) { return e.nombre === nombre; });
        if (!figura) {
            var nombres_de_sensores = this.sensores.map(function (s) { return s.nombre; });
            if (nombres_de_sensores.length > 0) {
                var sugerencia = this.pilas.utilidades.obtener_mas_similar(nombre, nombres_de_sensores);
                throw Error("No existe un sensor que se llame \"" + nombre + "\". \u00BFQuisiste decir \"" + sugerencia + "\"?");
            }
            else {
                throw Error("No hay sensores creados, as\u00ED que no se busc\u00F3 si exist\u00EDa uno llamado \"" + nombre + "\".");
            }
        }
        if (figura) {
            return new Sensor(figura);
        }
    };
    ActorBase.prototype.reproducir_sonido = function (nombre) {
        return this.pilas.reproducir_sonido(nombre);
    };
    return ActorBase;
}());
var ActorTextoBase = (function (_super) {
    __extends(ActorTextoBase, _super);
    function ActorTextoBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/invisible",
            texto: "Hola mundo",
            es_texto: true,
            fuente: "color-blanco-con-sombra-grande"
        };
        _this.margen_interno = 30;
        return _this;
    }
    ActorTextoBase.prototype.iniciar = function () { };
    ActorTextoBase.prototype.pre_actualizar = function () {
        _super.prototype.pre_actualizar.call(this);
        this.copiar_atributos_de_sprite(this.sprite, this._texto);
        if (this._fondo) {
            this.copiar_atributos_de_sprite(this.sprite, this._fondo);
            this._texto.depth = this._texto.depth + 1;
            this._fondo.x += this.margen_interno * this.sprite.originX - this.margen_interno * 0.5;
            this._fondo.y += this.margen_interno * this.sprite.originY - this.margen_interno * 0.5;
            if (this._fondo_imagen.includes("dialogo")) {
                this._fondo.y += 4;
            }
            if (this.fijo) {
                this._fondo.setScrollFactor(0, 0);
            }
            else {
                this._fondo.setScrollFactor(1, 1);
            }
        }
    };
    ActorTextoBase.prototype.actualizar = function () { };
    Object.defineProperty(ActorTextoBase.prototype, "texto", {
        get: function () {
            return this._texto.text;
        },
        set: function (texto) {
            if (!this._texto) {
                this._texto = this.pilas.modo.add.bitmapText(0, 0, this._fuente, texto);
            }
            else {
                this._texto.text = texto;
            }
            this.actualizar_tamano_del_fondo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorTextoBase.prototype, "fuente", {
        get: function () {
            return this._fuente;
        },
        set: function (fuente) {
            var texto = this.texto;
            if (this._texto) {
                this._texto.destroy();
            }
            this._texto = this.pilas.modo.add.bitmapText(0, 0, fuente, texto);
            this._fuente = fuente;
            this.actualizar_tamano_del_fondo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorTextoBase.prototype, "fondo", {
        set: function (fondo) {
            this._fondo_imagen = fondo;
            if (!this._fondo) {
                this.crear_fondo(fondo);
            }
            else {
                this._fondo.destroy();
                this.crear_fondo(fondo);
            }
        },
        enumerable: true,
        configurable: true
    });
    ActorTextoBase.prototype.crear_fondo = function (fondo) {
        var imagen = null;
        if (fondo.indexOf(":") > -1) {
            var partes = fondo.split(":");
            imagen = { key: partes[0], frame: partes[1] };
        }
        else {
            imagen = fondo;
        }
        this._fondo = this.pilas.modo.add["nineslice"](0, 0, 30, 20, imagen, 10, 10);
        this.pre_actualizar();
        this.actualizar_tamano_del_fondo();
    };
    ActorTextoBase.prototype.actualizar_tamano_del_fondo = function () {
        this.definir_area_de_interactividad(this._texto.width, this._texto.height);
        if (!this._fondo) {
            return;
        }
        var ancho = this._texto.width + this.margen_interno;
        var alto = this._texto.height + this.margen_interno;
        this._fondo.resize(ancho, alto);
        this.definir_area_de_interactividad(ancho, alto);
    };
    ActorTextoBase.prototype.eliminar = function () {
        _super.prototype.eliminar.call(this);
    };
    return ActorTextoBase;
}(ActorBase));
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {};
        return _this;
    }
    Actor.prototype.iniciar = function () { };
    Actor.prototype.actualizar = function () { };
    return Actor;
}(ActorBase));
var PizarraBase = (function (_super) {
    __extends(PizarraBase, _super);
    function PizarraBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/sin_imagen"
        };
        return _this;
    }
    PizarraBase.prototype.iniciar = function () {
        this._canvas = this.pilas.modo.add.graphics();
    };
    PizarraBase.prototype.dibujar_circulo = function (x, y, radio, color) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (radio === void 0) { radio = 20; }
        if (color === void 0) { color = "negro"; }
        var colorHexa = this.pilas.colores.convertir_a_hexa(color);
        this._canvas.fillStyle(colorHexa, 1);
        this._canvas.fillCircle(x, -y, radio);
    };
    PizarraBase.prototype.dibujar_borde_de_circulo = function (x, y, radio, color, grosor) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (radio === void 0) { radio = 20; }
        if (color === void 0) { color = "negro"; }
        if (grosor === void 0) { grosor = 1; }
        var colorHexa = this.pilas.colores.convertir_a_hexa(color);
        this._canvas.lineStyle(grosor, colorHexa, 1);
        this._canvas.strokeCircle(x, -y, radio);
    };
    PizarraBase.prototype.dibujar_rectangulo = function (x, y, ancho, alto, color) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (ancho === void 0) { ancho = 20; }
        if (alto === void 0) { alto = 20; }
        if (color === void 0) { color = "negro"; }
        var colorHexa = this.pilas.colores.convertir_a_hexa(color);
        this._canvas.fillStyle(colorHexa, 1);
        this._canvas.fillRect(x, -y, ancho, alto);
    };
    PizarraBase.prototype.dibujar_borde_de_rectangulo = function (x, y, ancho, alto, color, grosor) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (ancho === void 0) { ancho = 20; }
        if (alto === void 0) { alto = 20; }
        if (color === void 0) { color = "negro"; }
        if (grosor === void 0) { grosor = 1; }
        var colorHexa = this.pilas.colores.convertir_a_hexa(color);
        this._canvas.lineStyle(grosor, colorHexa, 1);
        this._canvas.strokeRect(x, -y, ancho, alto);
    };
    PizarraBase.prototype.dibujar_linea = function (x, y, x1, y1, color, grosor) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (x1 === void 0) { x1 = 100; }
        if (y1 === void 0) { y1 = 100; }
        if (color === void 0) { color = "negro"; }
        if (grosor === void 0) { grosor = 1; }
        var colorHexa = this.pilas.colores.convertir_a_hexa(color);
        this._canvas.lineStyle(grosor, colorHexa, 1);
        this._canvas.lineBetween(x, -y, x1, -y1);
    };
    PizarraBase.prototype.limpiar = function () {
        this._canvas.clear();
    };
    PizarraBase.prototype.actualizar = function () { };
    PizarraBase.prototype.pre_actualizar = function () {
        this.pilas.utilidades.sincronizar_contenedor(this._canvas, this.sprite);
    };
    return PizarraBase;
}(Actor));
var aceituna = (function (_super) {
    __extends(aceituna, _super);
    function aceituna() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:objetos/aceituna"
        };
        return _this;
    }
    aceituna.prototype.iniciar = function () {
        this.imagen = "imagenes:objetos/aceituna";
    };
    return aceituna;
}(Actor));
var actor = (function (_super) {
    __extends(actor, _super);
    function actor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/sin_imagen"
        };
        return _this;
    }
    actor.prototype.iniciar = function () { };
    actor.prototype.actualizar = function () { };
    return actor;
}(Actor));
var barra_de_energia = (function (_super) {
    __extends(barra_de_energia, _super);
    function barra_de_energia() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/barra_de_energia"
        };
        _this.barra_largo = 200;
        _this.barra_alto = 15;
        _this.vida_actual = 100;
        _this.vida_anterior = 0;
        return _this;
    }
    barra_de_energia.prototype.iniciar = function () {
        _super.prototype.iniciar.call(this);
        this.imagen = "imagenes:basicos/invisible";
    };
    barra_de_energia.prototype.actualizar = function () {
        this.dibujar();
    };
    barra_de_energia.prototype.dibujar = function () {
        if (this.vida_actual === this.vida_anterior) {
            return;
        }
        this.vida_actual = Math.max(0, this.vida_actual);
        this.vida_actual = Math.min(100, this.vida_actual);
        this.vida_anterior = this.vida_actual;
        this.dibujar_barra();
    };
    barra_de_energia.prototype.dibujar_barra = function () {
        var vida = this.vida_actual;
        var largo = this.barra_largo;
        var alto = this.barra_alto;
        var x = -largo / 2;
        var y = +alto / 2;
        this.limpiar();
        this.dibujar_borde_de_rectangulo(x, y, largo, alto, "blanco", 4);
        this.dibujar_rectangulo(x, y, largo, alto, "rojo");
        this.dibujar_rectangulo(x, y, (largo / 100) * vida, alto, "amarillo");
    };
    return barra_de_energia;
}(PizarraBase));
var boton = (function (_super) {
    __extends(boton, _super);
    function boton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/invisible",
            fondo: "imagenes:redimensionables/gris",
            texto: "Botón",
            es_texto: true,
            z: -10,
            color: "black",
            fuente: "color-negro"
        };
        return _this;
    }
    boton.prototype.cuando_hace_click = function () {
        this.decir("¡has hecho click!");
        this.realizar_animacion_de_pulsacion();
    };
    boton.prototype.realizar_animacion_de_pulsacion = function () {
        var _this = this;
        this.y -= 2;
        this.pilas.luego(0.2, function () {
            _this.y += 2;
        });
    };
    boton.prototype.cuando_mueve = function () {
        this.pilas.definir_cursor("pointer");
    };
    boton.prototype.cuando_sale = function () {
        this.pilas.definir_cursor("normal");
    };
    return boton;
}(ActorTextoBase));
var boton_activable = (function (_super) {
    __extends(boton_activable, _super);
    function boton_activable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/invisible",
            fondo: "imagenes:redimensionables/gris",
            texto: "Botón",
            es_texto: true,
            z: -10,
            color: "black",
            fuente: "color-negro"
        };
        _this.habilitado = true;
        return _this;
    }
    boton_activable.prototype.cuando_hace_click = function () {
        if (this.habilitado) {
            this.decir("¡has hecho click!");
            this.realizar_animacion_de_pulsacion();
        }
    };
    boton_activable.prototype.realizar_animacion_de_pulsacion = function () {
        var _this = this;
        this.y -= 2;
        this.pilas.luego(0.2, function () {
            _this.y += 2;
        });
    };
    boton_activable.prototype.cuando_mueve = function () {
        if (this.habilitado) {
            this.pilas.definir_cursor("pointer");
        }
    };
    boton_activable.prototype.cuando_sale = function () {
        if (this.habilitado) {
            this.pilas.definir_cursor("normal");
        }
    };
    boton_activable.prototype.habilitar = function () {
        this.habilitado = true;
        this.transparencia = 0;
    };
    boton_activable.prototype.deshabilitar = function () {
        this.habilitado = false;
        this.transparencia = 30;
        this.pilas.definir_cursor("normal");
    };
    boton_activable.prototype.activar = function () {
        this.habilitar();
    };
    boton_activable.prototype.desactivar = function () {
        this.deshabilitar();
    };
    return boton_activable;
}(ActorTextoBase));
var boton_de_control_abajo = (function (_super) {
    __extends(boton_de_control_abajo, _super);
    function boton_de_control_abajo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:botones/botones_abajo",
            z: -100
        };
        _this.pulsado = false;
        return _this;
    }
    boton_de_control_abajo.prototype.iniciar = function () { };
    boton_de_control_abajo.prototype.actualizar = function () {
        if (this.pulsado) {
            this.transparencia = 0;
        }
        else {
            this.transparencia = 50;
        }
        this.pilas.control.simular_pulsacion("abajo", this.pulsado);
    };
    boton_de_control_abajo.prototype.cuando_hace_click = function () {
        this.pulsado = true;
    };
    boton_de_control_abajo.prototype.cuando_sale = function () {
        this.pulsado = false;
    };
    boton_de_control_abajo.prototype.cuando_termina_de_hacer_click = function () {
        this.pulsado = false;
    };
    return boton_de_control_abajo;
}(Actor));
var boton_de_control_arriba = (function (_super) {
    __extends(boton_de_control_arriba, _super);
    function boton_de_control_arriba() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:botones/botones_arriba",
            z: -100
        };
        _this.pulsado = false;
        return _this;
    }
    boton_de_control_arriba.prototype.iniciar = function () { };
    boton_de_control_arriba.prototype.actualizar = function () {
        if (this.pulsado) {
            this.transparencia = 0;
        }
        else {
            this.transparencia = 50;
        }
        this.pilas.control.simular_pulsacion("arriba", this.pulsado);
    };
    boton_de_control_arriba.prototype.cuando_hace_click = function () {
        this.pulsado = true;
    };
    boton_de_control_arriba.prototype.cuando_sale = function () {
        this.pulsado = false;
    };
    boton_de_control_arriba.prototype.cuando_termina_de_hacer_click = function () {
        this.pulsado = false;
    };
    return boton_de_control_arriba;
}(Actor));
var boton_de_control_derecha = (function (_super) {
    __extends(boton_de_control_derecha, _super);
    function boton_de_control_derecha() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:botones/botones_derecha",
            z: -100
        };
        _this.pulsado = false;
        return _this;
    }
    boton_de_control_derecha.prototype.iniciar = function () { };
    boton_de_control_derecha.prototype.actualizar = function () {
        if (this.pulsado) {
            this.transparencia = 0;
        }
        else {
            this.transparencia = 50;
        }
        this.pilas.control.simular_pulsacion("derecha", this.pulsado);
    };
    boton_de_control_derecha.prototype.cuando_hace_click = function () {
        this.pulsado = true;
    };
    boton_de_control_derecha.prototype.cuando_sale = function () {
        this.pulsado = false;
    };
    boton_de_control_derecha.prototype.cuando_termina_de_hacer_click = function () {
        this.pulsado = false;
    };
    return boton_de_control_derecha;
}(Actor));
var boton_de_control_espacio = (function (_super) {
    __extends(boton_de_control_espacio, _super);
    function boton_de_control_espacio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:botones/botones_a",
            z: -100
        };
        _this.pulsado = false;
        return _this;
    }
    boton_de_control_espacio.prototype.iniciar = function () { };
    boton_de_control_espacio.prototype.actualizar = function () {
        if (this.pulsado) {
            this.transparencia = 0;
        }
        else {
            this.transparencia = 50;
        }
        this.pilas.control.simular_pulsacion("espacio", this.pulsado);
    };
    boton_de_control_espacio.prototype.cuando_hace_click = function () {
        this.pulsado = true;
    };
    boton_de_control_espacio.prototype.cuando_sale = function () {
        this.pulsado = false;
    };
    boton_de_control_espacio.prototype.cuando_termina_de_hacer_click = function () {
        this.pulsado = false;
    };
    return boton_de_control_espacio;
}(Actor));
var boton_de_control_izquierda = (function (_super) {
    __extends(boton_de_control_izquierda, _super);
    function boton_de_control_izquierda() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:botones/botones_izquierda",
            z: -100
        };
        _this.pulsado = false;
        return _this;
    }
    boton_de_control_izquierda.prototype.iniciar = function () { };
    boton_de_control_izquierda.prototype.actualizar = function () {
        if (this.pulsado) {
            this.transparencia = 0;
        }
        else {
            this.transparencia = 50;
        }
        this.pilas.control.simular_pulsacion("izquierda", this.pulsado);
    };
    boton_de_control_izquierda.prototype.cuando_hace_click = function () {
        this.pulsado = true;
    };
    boton_de_control_izquierda.prototype.cuando_sale = function () {
        this.pulsado = false;
    };
    boton_de_control_izquierda.prototype.cuando_termina_de_hacer_click = function () {
        this.pulsado = false;
    };
    return boton_de_control_izquierda;
}(Actor));
var caja = (function (_super) {
    __extends(caja, _super);
    function caja() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            x: 0,
            y: 0,
            imagen: "imagenes:objetos/caja",
            etiqueta: "caja",
            figura: "rectangulo",
            figura_ancho: 45,
            figura_alto: 45,
            figura_rebote: 0.9
        };
        return _this;
    }
    caja.prototype.iniciar = function () { };
    return caja;
}(Actor));
var chispa = (function (_super) {
    __extends(chispa, _super);
    function chispa() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "",
            imagen: "imagenes:efectos/chispa-3",
            etiqueta: "chispa"
        };
        return _this;
    }
    chispa.prototype.iniciar = function () {
        this.animacion = "chispa";
    };
    chispa.prototype.actualizar = function () { };
    chispa.prototype.cuando_finaliza_animacion = function (nombre) {
        this.eliminar();
    };
    return chispa;
}(Actor));
var conejo = (function (_super) {
    __extends(conejo, _super);
    function conejo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            x: 0,
            y: 0,
            imagen: "imagenes:conejo/conejo_parado1",
            figura: "rectangulo",
            figura_ancho: 50,
            figura_alto: 100,
            figura_radio: 50,
            figura_sin_rotacion: true,
            figura_dinamica: true,
            figura_rebote: 0,
            sensores: [
                {
                    x: 0,
                    y: -51,
                    ancho: 64,
                    alto: 10,
                    nombre: "pies"
                }
            ]
        };
        _this.toca_el_suelo = false;
        _this.pies = null;
        return _this;
    }
    conejo.prototype.iniciar = function () {
        this.estado = "parado";
        this.pies = this.obtener_sensor("pies");
    };
    conejo.prototype.actualizar = function () {
        if (this.pies.colisiones.length > 0) {
            this.toca_el_suelo = true;
        }
        else {
            this.toca_el_suelo = false;
        }
    };
    conejo.prototype.parado_iniciar = function () {
        this.reproducir_animacion("conejo_parado");
    };
    conejo.prototype.parado_actualizar = function () {
        if (this.pilas.control.izquierda || this.pilas.control.derecha) {
            this.estado = "camina";
        }
        if (this.pilas.control.arriba && this.toca_el_suelo) {
            this.impulsar(0, 10);
            this.estado = "salta";
        }
        if (!this.toca_el_suelo) {
            this.estado = "salta";
        }
    };
    conejo.prototype.camina_iniciar = function () {
        this.reproducir_animacion("conejo_camina");
    };
    conejo.prototype.camina_actualizar = function () {
        if (this.pilas.control.izquierda) {
            this.x -= 5;
            this.espejado = true;
        }
        if (this.pilas.control.derecha) {
            this.x += 5;
            this.espejado = false;
        }
        if (!this.pilas.control.derecha && !this.pilas.control.izquierda) {
            this.estado = "parado";
            return;
        }
        if (this.pilas.control.arriba && this.toca_el_suelo) {
            this.impulsar(0, 10);
            this.estado = "salta";
        }
        if (!this.toca_el_suelo) {
            this.estado = "salta";
        }
    };
    conejo.prototype.salta_iniciar = function () {
        this.reproducir_animacion("conejo_salta");
    };
    conejo.prototype.salta_actualizar = function () {
        if (this.pilas.control.izquierda) {
            this.x -= 5;
        }
        if (this.pilas.control.derecha) {
            this.x += 5;
        }
        if (this.toca_el_suelo) {
            this.estado = "parado";
        }
    };
    conejo.prototype.cuando_comienza_una_colision = function (actor) {
        if (actor.etiqueta === "moneda") {
            this.pilas.reproducir_sonido("moneda");
            actor.eliminar();
        }
        if (actor.etiqueta === "plataforma") {
            if (this.velocidad_y > 0.1) {
                return true;
            }
        }
    };
    conejo.prototype.cuando_se_mantiene_una_colision = function (actor) { };
    conejo.prototype.cuando_termina_una_colision = function (actor) { };
    return conejo;
}(Actor));
var deslizador = (function (_super) {
    __extends(deslizador, _super);
    function deslizador() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            x: 0,
            y: 0,
            imagen: "imagenes:interfaz/interfaz_linea",
            etiqueta: "deslizador",
            figura: ""
        };
        _this.valor = 0;
        return _this;
    }
    deslizador.prototype.iniciar = function () {
        this.imagen = "imagenes:interfaz/interfaz_linea";
        this.esta_arrastrando_el_deslizador = false;
        this.crear_marca();
        this.conectar_eventos();
    };
    deslizador.prototype.conectar_eventos = function () {
        var _this = this;
        this.pilas.eventos.conectar("mueve_mouse", function (datos) {
            _this.cuando_mueve_el_mouse(datos);
        });
        this.pilas.eventos.conectar("termina_click", function () {
            _this.cuando_termina_de_hacer_click();
        });
    };
    deslizador.prototype.crear_marca = function () {
        this.marca = this.pilas.actores.actor();
        this.marca.imagen = "imagenes:interfaz/interfaz_deslizador";
        this.marca.interactivo = false;
    };
    deslizador.prototype.cuando_hace_click = function (x, y) {
        this.esta_arrastrando_el_deslizador = true;
        this.ajustar_marca(x);
    };
    deslizador.prototype.cuando_mueve_el_mouse = function (datos) {
        if (this.esta_arrastrando_el_deslizador) {
            this.ajustar_marca(datos.x);
        }
    };
    deslizador.prototype.cuando_termina_de_hacer_click = function () {
        this.esta_arrastrando_el_deslizador = false;
    };
    deslizador.prototype.actualizar = function () {
        this.marca.x = this.x - 90 + 1.8 * this.valor;
        this.marca.y = this.y;
    };
    deslizador.prototype.ajustar_marca = function (x) {
        var dx = x - this.x;
        dx = Math.max(dx, -90);
        dx = Math.min(dx, 90);
        this.valor = (dx + 90) / 1.8;
    };
    return deslizador;
}(Actor));
var explosion = (function (_super) {
    __extends(explosion, _super);
    function explosion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "",
            imagen: "imagenes:explosion/explosion_001",
            etiqueta: "explosion"
        };
        return _this;
    }
    explosion.prototype.iniciar = function () {
        this.animacion = "explosion";
        this.pilas.reproducir_sonido("explosion");
    };
    explosion.prototype.actualizar = function () { };
    explosion.prototype.cuando_finaliza_animacion = function (nombre) {
        this.eliminar();
    };
    return explosion;
}(Actor));
var gallina = (function (_super) {
    __extends(gallina, _super);
    function gallina() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            x: 0,
            y: 0,
            imagen: "imagenes:gallina/gallina_vuela_3",
            figura: "circulo",
            figura_radio: 30,
            figura_sin_rotacion: true,
            figura_dinamica: true,
            figura_rebote: 0
        };
        return _this;
    }
    gallina.prototype.iniciar = function () {
        this.crear_animacion("gallina_vuela", [
            "imagenes:gallina/gallina_vuela_1",
            "imagenes:gallina/gallina_vuela_1",
            "imagenes:gallina/gallina_vuela_2",
            "imagenes:gallina/gallina_vuela_3",
            "imagenes:gallina/gallina_vuela_2"
        ], 15);
        this.crear_animacion("gallina_muere", ["imagenes:gallina/gallina_muere"], 20);
        this.crear_animacion("gallina_sin_piel", ["imagenes:gallina/gallina_sin_piel"], 20);
        this.estado = "vuela";
    };
    gallina.prototype.actualizar = function () { };
    gallina.prototype.vuela_iniciar = function () {
        this.reproducir_animacion("gallina_vuela");
    };
    gallina.prototype.vuela_actualizar = function () { };
    gallina.prototype.vuela_cuando_comienza_una_colision = function (actor) { };
    return gallina;
}(Actor));
var golpe = (function (_super) {
    __extends(golpe, _super);
    function golpe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "",
            imagen: "imagenes:efectos/golpe-3",
            etiqueta: "golpe"
        };
        return _this;
    }
    golpe.prototype.iniciar = function () {
        this.animacion = "golpe";
    };
    golpe.prototype.actualizar = function () { };
    golpe.prototype.cuando_finaliza_animacion = function (nombre) {
        this.eliminar();
    };
    return golpe;
}(Actor));
var humo = (function (_super) {
    __extends(humo, _super);
    function humo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "",
            imagen: "imagenes:efectos/humo-03",
            etiqueta: "humo"
        };
        return _this;
    }
    humo.prototype.iniciar = function () {
        this.animacion = "humo";
    };
    humo.prototype.actualizar = function () { };
    humo.prototype.cuando_finaliza_animacion = function (nombre) {
        this.eliminar();
    };
    return humo;
}(Actor));
var laser = (function (_super) {
    __extends(laser, _super);
    function laser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:disparos/laser"
        };
        return _this;
    }
    laser.prototype.iniciar = function () {
        this.centro_x = 0.3;
        this.velocidad = 10;
        this.pilas.reproducir_sonido("laser");
    };
    laser.prototype.actualizar = function () {
        this.avanzar(this.rotacion, this.velocidad);
        this.eliminar_si_sale_de_la_pantalla();
    };
    laser.prototype.eliminar_si_sale_de_la_pantalla = function () {
        var izquierda = this.pilas.camara.borde_izquierdo;
        var derecha = this.pilas.camara.borde_derecho;
        var arriba = this.pilas.camara.borde_arriba;
        var abajo = this.pilas.camara.borde_abajo;
        if (this.x > derecha || this.x < izquierda || this.y > arriba || this.y < abajo) {
            this.eliminar();
        }
    };
    return laser;
}(Actor));
var logo = (function (_super) {
    __extends(logo, _super);
    function logo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/logo"
        };
        return _this;
    }
    logo.prototype.iniciar = function () { };
    return logo;
}(Actor));
var moneda = (function (_super) {
    __extends(moneda, _super);
    function moneda() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:objetos/moneda",
            etiqueta: "moneda",
            figura: "circulo",
            figura_radio: 10,
            figura_dinamica: false,
            figura_sensor: true
        };
        return _this;
    }
    return moneda;
}(Actor));
var nave = (function (_super) {
    __extends(nave, _super);
    function nave() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:nave/nave_reposo"
        };
        _this.velocidad = 5;
        return _this;
    }
    nave.prototype.iniciar = function () {
        this.animacion = "nave_en_reposo";
        this.cuadros_desde_el_ultimo_disparo = 0;
    };
    nave.prototype.actualizar = function () {
        this.cuadros_desde_el_ultimo_disparo += 1;
        if (this.pilas.control.izquierda) {
            this.rotacion += this.velocidad;
            this.animacion = "nave_girando_a_la_izquierda";
        }
        if (this.pilas.control.derecha) {
            this.rotacion -= this.velocidad;
            this.animacion = "nave_girando_a_la_derecha";
        }
        if (this.pilas.control.espacio && this.cuadros_desde_el_ultimo_disparo > 5) {
            this.disparar();
        }
        if (this.pilas.control.arriba) {
            this.avanzar(this.rotacion, this.velocidad);
            this.animacion = "nave_avanzando";
        }
        else {
            if (!this.pilas.control.izquierda && !this.pilas.control.derecha) {
                this.animacion = "nave_en_reposo";
            }
        }
    };
    nave.prototype.disparar = function () {
        var laser = this.pilas.actores.laser();
        laser.x = this.x;
        laser.y = this.y;
        laser.rotacion = this.rotacion;
        laser.z = this.z + 1;
        this.cuadros_desde_el_ultimo_disparo = 0;
    };
    return nave;
}(Actor));
var nube = (function (_super) {
    __extends(nube, _super);
    function nube() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "decoracion:objetos/nube"
        };
        return _this;
    }
    nube.prototype.iniciar = function () { };
    return nube;
}(Actor));
var nube_animada = (function (_super) {
    __extends(nube_animada, _super);
    function nube_animada() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "decoracion:objetos/decoracion_nube_1",
            z: 30
        };
        return _this;
    }
    nube_animada.prototype.iniciar = function () {
        this.z = 50;
        this.velocidad = 2;
    };
    nube_animada.prototype.actualizar = function () {
        this.x -= this.velocidad;
        if (this.x < -400) {
            this.x = 400;
            this.y = this.pilas.azar(-200, 200);
        }
    };
    return nube_animada;
}(Actor));
var pantalla_completa = (function (_super) {
    __extends(pantalla_completa, _super);
    function pantalla_completa() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:botones/pantalla-completa",
            es_texto: false,
            z: -10,
            transparencia: 50
        };
        return _this;
    }
    pantalla_completa.prototype.iniciar = function () {
        this.transparencia = 50;
    };
    pantalla_completa.prototype.cuando_hace_click = function () {
        this.pilas.alternar_modo_pantalla_completa();
    };
    pantalla_completa.prototype.cuando_mueve = function () {
        this.transparencia = 0;
    };
    pantalla_completa.prototype.cuando_sale = function () {
        this.transparencia = 0;
    };
    return pantalla_completa;
}(Actor));
var pared = (function (_super) {
    __extends(pared, _super);
    function pared() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "rectangulo",
            imagen: "imagenes:plataformas/pared",
            y: 0,
            figura_ancho: 20,
            figura_alto: 600,
            figura_dinamica: false,
            figura_rebote: 0
        };
        return _this;
    }
    pared.prototype.iniciar = function () { };
    return pared;
}(Actor));
var pelota = (function (_super) {
    __extends(pelota, _super);
    function pelota() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:objetos/pelota",
            figura: "circulo",
            figura_radio: 25
        };
        return _this;
    }
    pelota.prototype.iniciar = function () { };
    return pelota;
}(Actor));
var pizarra = (function (_super) {
    __extends(pizarra, _super);
    function pizarra() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/sin_imagen"
        };
        return _this;
    }
    pizarra.prototype.iniciar = function () {
        _super.prototype.iniciar.call(this);
        this.imagen = "imagenes:basicos/invisible";
        this.limpiar();
        var color = this.pilas.colores.generar(255, 100, 0);
        this.dibujar_circulo(100, 0, 40, color);
        this.dibujar_borde_de_circulo(100, 0, 40, "negro", 2);
        this.dibujar_circulo(100, 100, 20, "amarillo");
        this.dibujar_borde_de_circulo(100, 100, 20, "negro", 2);
        this.dibujar_rectangulo(-50, -50, 40, 90, "verde");
        this.dibujar_borde_de_rectangulo(-50, -50, 40, 90, "negro", 2);
        this.dibujar_linea(-100, 0, 200, 200, "rojo", 6);
    };
    pizarra.prototype.actualizar = function () { };
    return pizarra;
}(PizarraBase));
var plataforma = (function (_super) {
    __extends(plataforma, _super);
    function plataforma() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "rectangulo",
            imagen: "imagenes:plataformas/plataforma",
            etiqueta: "plataforma",
            y: 0,
            figura_ancho: 250,
            figura_alto: 40,
            figura_dinamica: false,
            figura_rebote: 0
        };
        return _this;
    }
    plataforma.prototype.iniciar = function () { };
    return plataforma;
}(Actor));
var puntaje = (function (_super) {
    __extends(puntaje, _super);
    function puntaje() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/invisible",
            texto: "PUNTAJE: 0",
            es_texto: true,
            z: -10,
            fuente: "color-blanco-con-sombra-chico"
        };
        _this.puntaje = 0;
        return _this;
    }
    puntaje.prototype.iniciar = function () {
        this.actualizar_texto();
    };
    puntaje.prototype.aumentar = function (cantidad) {
        if (cantidad === void 0) { cantidad = 1; }
        this.puntaje += cantidad;
        this.actualizar_texto();
    };
    puntaje.prototype.actualizar_texto = function () {
        this.texto = "PUNTAJE: " + this.puntaje;
    };
    return puntaje;
}(ActorTextoBase));
var reiniciar_escena = (function (_super) {
    __extends(reiniciar_escena, _super);
    function reiniciar_escena() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/invisible",
            fondo: "imagenes:redimensionables/gris",
            texto: "Reiniciar escena",
            es_texto: true,
            z: -10,
            fuente: "color-negro"
        };
        return _this;
    }
    reiniciar_escena.prototype.cuando_hace_click = function () {
        this.pilas.reiniciar_escena();
    };
    reiniciar_escena.prototype.cuando_mueve = function () {
        this.pilas.definir_cursor("pointer");
    };
    reiniciar_escena.prototype.cuando_sale = function () {
        this.pilas.definir_cursor("normal");
    };
    return reiniciar_escena;
}(ActorTextoBase));
var robot = (function (_super) {
    __extends(robot, _super);
    function robot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:objetos/robot",
            centro_y: 1
        };
        return _this;
    }
    robot.prototype.iniciar = function () {
        this.imagen = "imagenes:basicos/invisible";
        this.contenedor = this.pilas.modo.add.container();
        this.huesos = new Huesos(this.pilas, "robot", "atlas-robot", this.contenedor);
        this.huesos.definir_animacion("run");
    };
    robot.prototype.actualizar = function () {
        this.huesos.actualizar_animacion(20);
    };
    robot.prototype.pre_actualizar = function () {
        this.pilas.utilidades.sincronizar_contenedor(this.contenedor, this.sprite);
    };
    return robot;
}(Actor));
var suelo = (function (_super) {
    __extends(suelo, _super);
    function suelo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "rectangulo",
            imagen: "imagenes:plataformas/suelo",
            figura_ancho: 600,
            figura_alto: 25,
            figura_rebote: 0,
            figura_dinamica: false
        };
        return _this;
    }
    suelo.prototype.iniciar = function () { };
    return suelo;
}(Actor));
var techo = (function (_super) {
    __extends(techo, _super);
    function techo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "rectangulo",
            imagen: "imagenes:plataformas/techo",
            figura_ancho: 600,
            figura_alto: 25,
            figura_dinamica: false
        };
        return _this;
    }
    techo.prototype.iniciar = function () { };
    return techo;
}(Actor));
var texto = (function (_super) {
    __extends(texto, _super);
    function texto() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "imagenes:basicos/invisible",
            texto: "Hola mundo",
            es_texto: true,
            z: -10,
            fuente: "color-blanco-con-sombra"
        };
        return _this;
    }
    return texto;
}(ActorTextoBase));
var EscenaBase = (function () {
    function EscenaBase(pilas) {
        this._gravedad_x = 0;
        this._gravedad_y = 1;
        this.pilas = pilas;
        this.actores = [];
        this.pilas.utilidades.obtener_id_autoincremental();
        this.camara = new Camara(pilas);
        this.pilas.escenas.definir_escena_actual(this);
        this.control = new Control(pilas);
        this.eventos = new EventosDeEscena(pilas);
        this._observables = null;
        this._sonidos_para_reproducir = [];
        this._sonidos_en_reproduccion = {};
        this.desplazamiento_del_fondo_x = 0;
        this.desplazamiento_del_fondo_y = 0;
    }
    EscenaBase.prototype.reproducir_sonido = function (nombre) {
        return this.pilas.reproducir_sonido(nombre);
    };
    EscenaBase.prototype.planificar_reproducir_sonido = function (sonido) {
        this._sonidos_para_reproducir.push(sonido);
    };
    EscenaBase.prototype.observar = function (nombre, variable) {
        if (this._observables === null) {
            this._actor_visor_observables = this.pilas.actores.texto();
            this._actor_visor_observables.fijo = true;
            this._actor_visor_observables.centro_x = 0;
            this._actor_visor_observables.centro_y = 0;
            this._actor_visor_observables.x = 10 - this.pilas._ancho / 2;
            this._actor_visor_observables.y = -10 + this.pilas._alto / 2;
            this._observables = {};
            var self_1 = this;
            this._actor_visor_observables.actualizar = function () {
                var texto = JSON.stringify(self_1._observables, null, 4)
                    .replace(/{|}|"/g, "")
                    .replace(/,\n/g, "\n")
                    .replace(/    /g, "")
                    .trim();
                this.texto = texto;
            };
            this._actor_visor_observables.actualizar();
        }
        if (typeof variable == "number" && !Number.isInteger(variable)) {
            this._observables[nombre] = variable.toFixed(2);
        }
        else {
            this._observables[nombre] = "" + variable;
        }
    };
    EscenaBase.prototype.agregar_actor = function (actor) {
        this.actores.push(actor);
    };
    Object.defineProperty(EscenaBase.prototype, "gravedad_x", {
        get: function () {
            return this._gravedad_x;
        },
        set: function (v) {
            this._gravedad_x = v;
            this.actualizar_gravedad();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EscenaBase.prototype, "gravedad_y", {
        get: function () {
            return this._gravedad_y;
        },
        set: function (v) {
            this._gravedad_y = v;
            this.actualizar_gravedad();
        },
        enumerable: true,
        configurable: true
    });
    EscenaBase.prototype.actualizar_gravedad = function () {
        this.pilas.modo.matter.world.setGravity(this._gravedad_x, this._gravedad_y);
    };
    EscenaBase.prototype.obtener_nombre_para = function (nombre_propuesto) {
        var nombres_que_pueden_colisionar = this.actores.map(function (e) { return e.nombre; }).filter(function (e) { return e.startsWith(nombre_propuesto); });
        var contador = 1;
        var nombre_a_sugerir = nombre_propuesto;
        while (nombres_que_pueden_colisionar.indexOf(nombre_a_sugerir) > -1) {
            contador += 1;
            nombre_a_sugerir = nombre_propuesto + contador;
        }
        return nombre_a_sugerir;
    };
    EscenaBase.prototype.serializar = function () {
        return {
            camara_x: this.camara.x,
            camara_y: this.camara.y,
            ancho: this.ancho,
            alto: this.alto,
            fondo: this.fondo,
            desplazamiento_del_fondo_x: this.desplazamiento_del_fondo_x,
            desplazamiento_del_fondo_y: this.desplazamiento_del_fondo_y
        };
    };
    EscenaBase.prototype.pre_actualizar = function () { };
    EscenaBase.prototype.actualizar = function () { };
    EscenaBase.prototype.actualizar_actores = function () {
        var _this = this;
        var actores_a_eliminar = [];
        this.actores.map(function (actor) {
            try {
                if (!actor._vivo) {
                    actor.sprite.destroy();
                    if (actor["_canvas"]) {
                        actor["_canvas"].destroy();
                    }
                    actor.sensores.map(function (s) {
                        _this.pilas.modo.matter.world.remove(s);
                    });
                    if (actor._texto) {
                        actor._texto.destroy();
                    }
                    if (actor._fondo) {
                        actor._fondo.destroy();
                    }
                    actores_a_eliminar.push(actor);
                    return;
                }
                actor.pre_actualizar();
                actor.actualizar_habilidades();
                actor.actualizar();
                actor.actualizar_sensores();
            }
            catch (e) {
                console.error(e);
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizando actores");
                _this.pilas.modo.pausar();
            }
        });
        actores_a_eliminar.map(function (actor) {
            _this.quitar_actor_luego_de_eliminar(actor);
        });
    };
    EscenaBase.prototype.reproducir_sonidos_pendientes = function () {
        var _this = this;
        var sonidos = this._sonidos_para_reproducir;
        sonidos = sonidos.filter(function (v, i) { return sonidos.indexOf(v) === i; });
        var maximo = 20;
        var _loop_2 = function (i) {
            var nombre = sonidos[i];
            if (!this_1._sonidos_en_reproduccion[nombre]) {
                this_1._sonidos_en_reproduccion[nombre] = 0;
            }
            if (this_1._sonidos_en_reproduccion[nombre] < maximo) {
                this_1._sonidos_en_reproduccion[nombre] += 1;
                sonido = this_1.pilas.modo.sound.add(nombre);
                sonido.play();
                sonido.once("complete", function (music) {
                    _this._sonidos_en_reproduccion[nombre] -= 1;
                    _this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_reproducir_sonido", { sonido: nombre });
                });
            }
        };
        var this_1 = this, sonido;
        for (var i = 0; i < sonidos.length; i++) {
            _loop_2(i);
        }
        this._sonidos_para_reproducir = [];
    };
    EscenaBase.prototype.avisar_click_en_la_pantalla_a_los_actores = function (x, y, evento_original) {
        var _this = this;
        this.actores.map(function (actor) {
            try {
                actor.cuando_hace_click_en_la_pantalla(x, y, evento_original);
            }
            catch (e) {
                console.error(e);
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "avisando click de pantalla");
                _this.pilas.modo.pausar();
            }
        });
    };
    EscenaBase.prototype.avisar_cuando_pulsa_tecla_a_los_actores = function (tecla, evento_original) {
        var _this = this;
        this.actores.map(function (e) {
            try {
                e.cuando_pulsa_tecla(tecla, evento_original);
            }
            catch (e) {
                console.error(e);
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "avisando que pulsan tecla");
                _this.pilas.modo.pausar();
            }
        });
    };
    EscenaBase.prototype.avisar_cuando_suelta_tecla_a_los_actores = function (tecla, evento_original) {
        var _this = this;
        this.actores.map(function (e) {
            try {
                e.cuando_suelta_tecla(tecla, evento_original);
            }
            catch (e) {
                console.error(e);
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "avisando que pulsan tecla");
                _this.pilas.modo.pausar();
            }
        });
    };
    EscenaBase.prototype.quitar_actor_luego_de_eliminar = function (actor) {
        var posicion = this.actores.indexOf(actor);
        var id = actor["id"];
        if (posicion !== -1) {
            this.actores.splice(posicion, 1);
        }
        else {
            throw Error("Se intent\u00F3 eliminar un actor inexistente en la escena: id=" + id + " etiqueta=" + actor.etiqueta + ".");
        }
    };
    EscenaBase.prototype.terminar = function () {
        var _this = this;
        this.actores.map(function (e) {
            try {
                e.eliminar();
            }
            catch (e) {
                console.error(e);
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "avisando click de pantalla");
                _this.pilas.modo.pausar();
            }
        });
        this.actualizar();
        this.actualizar_actores();
        this.control.terminar();
    };
    EscenaBase.prototype.cuando_hace_click = function (x, y, evento_original) { };
    EscenaBase.prototype.cuando_mueve = function (x, y, evento_original) { };
    EscenaBase.prototype.cada_segundo = function (segundos_transcurridos) { };
    EscenaBase.prototype.cuando_pulsa_tecla = function (tecla, evento) { };
    EscenaBase.prototype.cuando_suelta_tecla = function (tecla, evento) { };
    EscenaBase.prototype.enviar_mensaje = function (mensaje, datos) {
        if (datos === void 0) { datos = {}; }
        this.cuando_llega_un_mensaje(mensaje, datos);
        if (this["cuando_llega_el_mensaje_" + mensaje]) {
            this["cuando_llega_el_mensaje_" + mensaje](datos);
        }
    };
    EscenaBase.prototype.cuando_llega_un_mensaje = function (mensaje, datos) {
        if (datos === void 0) { datos = {}; }
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
    Escena.prototype.pre_actualizar = function () {
        this.cuadro += 1;
        if (this.cuadro % 60 === 0) {
            var segundos_transcurridos_1 = Math.floor(this.cuadro / 60);
            this.cada_segundo(segundos_transcurridos_1);
            this.actores.map(function (actor) {
                actor.cada_segundo(segundos_transcurridos_1);
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
function loadBool(json, key, def) {
    var value = json[key];
    switch (typeof value) {
        case "string":
            return value === "true" ? true : false;
        case "boolean":
            return value;
        default:
            return def || false;
    }
}
function saveBool(json, key, value, def) {
    if (typeof def !== "boolean" || value !== def) {
        json[key] = value;
    }
}
function loadFloat(json, key, def) {
    var value = json[key];
    switch (typeof value) {
        case "string":
            return parseFloat(value);
        case "number":
            return value;
        default:
            return def || 0;
    }
}
function saveFloat(json, key, value, def) {
    if (typeof def !== "number" || value !== def) {
        json[key] = value;
    }
}
function loadInt(json, key, def) {
    var value = json[key];
    switch (typeof value) {
        case "string":
            return parseInt(value, 10);
        case "number":
            return 0 | value;
        default:
            return def || 0;
    }
}
function saveInt(json, key, value, def) {
    if (typeof def !== "number" || value !== def) {
        json[key] = value;
    }
}
function loadString(json, key, def) {
    var value = json[key];
    switch (typeof value) {
        case "string":
            return value;
        default:
            return def || "";
    }
}
function saveString(json, key, value, def) {
    if (typeof def !== "string" || value !== def) {
        json[key] = value;
    }
}
function makeArray(value) {
    if (typeof value === "object" && typeof value.length === "number") {
        return value;
    }
    if (typeof value !== "undefined") {
        return [value];
    }
    return [];
}
function wrap(num, min, max) {
    if (min < max) {
        if (num < min) {
            return max - ((min - num) % (max - min));
        }
        else {
            return min + ((num - min) % (max - min));
        }
    }
    else if (min === max) {
        return min;
    }
    else {
        return num;
    }
}
function interpolateLinear(a, b, t) {
    return a + (b - a) * t;
}
function interpolateQuadratic(a, b, c, t) {
    return interpolateLinear(interpolateLinear(a, b, t), interpolateLinear(b, c, t), t);
}
function interpolateCubic(a, b, c, d, t) {
    return interpolateLinear(interpolateQuadratic(a, b, c, t), interpolateQuadratic(b, c, d, t), t);
}
function interpolateQuartic(a, b, c, d, e, t) {
    return interpolateLinear(interpolateCubic(a, b, c, d, t), interpolateCubic(b, c, d, e, t), t);
}
function interpolateQuintic(a, b, c, d, e, f, t) {
    return interpolateLinear(interpolateQuartic(a, b, c, d, e, t), interpolateQuartic(b, c, d, e, f, t), t);
}
function interpolateBezier(x1, y1, x2, y2, t) {
    function SampleCurve(a, b, c, t) {
        return ((a * t + b) * t + c) * t;
    }
    function SampleCurveDerivativeX(ax, bx, cx, t) {
        return (3.0 * ax * t + 2.0 * bx) * t + cx;
    }
    function SolveEpsilon(duration) {
        return 1.0 / (200.0 * duration);
    }
    function Solve(ax, bx, cx, ay, by, cy, x, epsilon) {
        return SampleCurve(ay, by, cy, SolveCurveX(ax, bx, cx, x, epsilon));
    }
    function SolveCurveX(ax, bx, cx, x, epsilon) {
        var t0;
        var t1;
        var t2;
        var x2;
        var d2;
        var i;
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = SampleCurve(ax, bx, cx, t2) - x;
            if (Math.abs(x2) < epsilon)
                return t2;
            d2 = SampleCurveDerivativeX(ax, bx, cx, t2);
            if (Math.abs(d2) < epsilon)
                break;
            t2 = t2 - x2 / d2;
        }
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;
        if (t2 < t0)
            return t0;
        if (t2 > t1)
            return t1;
        while (t0 < t1) {
            x2 = SampleCurve(ax, bx, cx, t2);
            if (Math.abs(x2 - x) < epsilon)
                return t2;
            if (x > x2)
                t0 = t2;
            else
                t1 = t2;
            t2 = (t1 - t0) * 0.5 + t0;
        }
        return t2;
    }
    var duration = 1;
    var cx = 3.0 * x1;
    var bx = 3.0 * (x2 - x1) - cx;
    var ax = 1.0 - cx - bx;
    var cy = 3.0 * y1;
    var by = 3.0 * (y2 - y1) - cy;
    var ay = 1.0 - cy - by;
    return Solve(ax, bx, cx, ay, by, cy, t, SolveEpsilon(duration));
}
function tween(a, b, t) {
    return a + (b - a) * t;
}
function wrapAngleRadians(angle) {
    if (angle <= 0.0) {
        return ((angle - Math.PI) % (2.0 * Math.PI)) + Math.PI;
    }
    else {
        return ((angle + Math.PI) % (2.0 * Math.PI)) - Math.PI;
    }
}
function tweenAngleRadians(a, b, t, spin) {
    if (spin === 0) {
        return a;
    }
    else if (spin > 0) {
        if (b - a < 0.0) {
            b += 2.0 * Math.PI;
        }
    }
    else if (spin < 0) {
        if (b - a > 0.0) {
            b -= 2.0 * Math.PI;
        }
    }
    return wrapAngleRadians(a + wrapAngleRadians(b - a) * t);
}
var Angle = (function () {
    function Angle(rad) {
        if (rad === void 0) { rad = 0; }
        this.rad = 0;
        this.rad = rad;
    }
    Object.defineProperty(Angle.prototype, "deg", {
        get: function () {
            return (this.rad * 180) / Math.PI;
        },
        set: function (value) {
            this.rad = (value * Math.PI) / 180;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Angle.prototype, "cos", {
        get: function () {
            return Math.cos(this.rad);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Angle.prototype, "sin", {
        get: function () {
            return Math.sin(this.rad);
        },
        enumerable: true,
        configurable: true
    });
    Angle.prototype.selfIdentity = function () {
        this.rad = 0;
        return this;
    };
    Angle.prototype.copy = function (other) {
        this.rad = other.rad;
        return this;
    };
    Angle.add = function (a, b, out) {
        if (out === void 0) { out = new Angle(); }
        out.rad = wrapAngleRadians(a.rad + b.rad);
        return out;
    };
    Angle.prototype.add = function (other, out) {
        if (out === void 0) { out = new Angle(); }
        return Angle.add(this, other, out);
    };
    Angle.prototype.selfAdd = function (other) {
        return Angle.add(this, other, this);
    };
    Angle.tween = function (a, b, pct, spin, out) {
        if (out === void 0) { out = new Angle(); }
        out.rad = tweenAngleRadians(a.rad, b.rad, pct, spin);
        return out;
    };
    Angle.prototype.tween = function (other, pct, spin, out) {
        if (out === void 0) { out = new Angle(); }
        return Angle.tween(this, other, pct, spin, out);
    };
    Angle.prototype.selfTween = function (other, pct, spin) {
        return Angle.tween(this, other, pct, spin, this);
    };
    return Angle;
}());
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        this.x = 0.0;
        this.y = 0.0;
        this.x = x;
        this.y = y;
    }
    Vector.prototype.copy = function (other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    };
    Vector.equal = function (a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 1e-6; }
        if (Math.abs(a.x - b.x) > epsilon) {
            return false;
        }
        if (Math.abs(a.y - b.y) > epsilon) {
            return false;
        }
        return true;
    };
    Vector.add = function (a, b, out) {
        if (out === void 0) { out = new Vector(); }
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        return out;
    };
    Vector.prototype.add = function (other, out) {
        if (out === void 0) { out = new Vector(); }
        return Vector.add(this, other, out);
    };
    Vector.prototype.selfAdd = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Vector.tween = function (a, b, pct, out) {
        if (out === void 0) { out = new Vector(); }
        out.x = tween(a.x, b.x, pct);
        out.y = tween(a.y, b.y, pct);
        return out;
    };
    Vector.prototype.tween = function (other, pct, out) {
        if (out === void 0) { out = new Vector(); }
        return Vector.tween(this, other, pct, out);
    };
    Vector.prototype.selfTween = function (other, pct) {
        return Vector.tween(this, other, pct, this);
    };
    return Vector;
}());
var Position = (function (_super) {
    __extends(Position, _super);
    function Position() {
        return _super.call(this, 0.0, 0.0) || this;
    }
    return Position;
}(Vector));
var Rotation = (function (_super) {
    __extends(Rotation, _super);
    function Rotation() {
        return _super.call(this, 0.0) || this;
    }
    return Rotation;
}(Angle));
var Scale = (function (_super) {
    __extends(Scale, _super);
    function Scale() {
        return _super.call(this, 1.0, 1.0) || this;
    }
    Scale.prototype.selfIdentity = function () {
        this.x = 1.0;
        this.y = 1.0;
        return this;
    };
    return Scale;
}(Vector));
var Pivot = (function (_super) {
    __extends(Pivot, _super);
    function Pivot() {
        return _super.call(this, 0.0, 1.0) || this;
    }
    Pivot.prototype.selfIdentity = function () {
        this.x = 0.0;
        this.y = 1.0;
        return this;
    };
    return Pivot;
}(Vector));
var Space = (function () {
    function Space() {
        this.position = new Position();
        this.rotation = new Rotation();
        this.scale = new Scale();
    }
    Space.prototype.copy = function (other) {
        var space = this;
        space.position.copy(other.position);
        space.rotation.copy(other.rotation);
        space.scale.copy(other.scale);
        return space;
    };
    Space.prototype.load = function (json) {
        var space = this;
        space.position.x = loadFloat(json, "x", 0.0);
        space.position.y = loadFloat(json, "y", 0.0);
        space.rotation.deg = loadFloat(json, "angle", 0.0);
        space.scale.x = loadFloat(json, "scale_x", 1.0);
        space.scale.y = loadFloat(json, "scale_y", 1.0);
        return space;
    };
    Space.equal = function (a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 1e-6; }
        if (Math.abs(a.position.x - b.position.x) > epsilon) {
            return false;
        }
        if (Math.abs(a.position.y - b.position.y) > epsilon) {
            return false;
        }
        if (Math.abs(a.rotation.rad - b.rotation.rad) > epsilon) {
            return false;
        }
        if (Math.abs(a.scale.x - b.scale.x) > epsilon) {
            return false;
        }
        if (Math.abs(a.scale.y - b.scale.y) > epsilon) {
            return false;
        }
        return true;
    };
    Space.identity = function (out) {
        if (out === void 0) { out = new Space(); }
        out.position.x = 0.0;
        out.position.y = 0.0;
        out.rotation.rad = 0.0;
        out.scale.x = 1.0;
        out.scale.y = 1.0;
        return out;
    };
    Space.translate = function (space, x, y) {
        x *= space.scale.x;
        y *= space.scale.y;
        var rad = space.rotation.rad;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var tx = c * x - s * y;
        var ty = s * x + c * y;
        space.position.x += tx;
        space.position.y += ty;
        return space;
    };
    Space.rotate = function (space, rad) {
        space.rotation.rad = wrapAngleRadians(space.rotation.rad + rad);
        return space;
    };
    Space.scale = function (space, x, y) {
        space.scale.x *= x;
        space.scale.y *= y;
        return space;
    };
    Space.invert = function (space, out) {
        out = out || new Space();
        var inv_scale_x = 1.0 / space.scale.x;
        var inv_scale_y = 1.0 / space.scale.y;
        var inv_rotation = -space.rotation.rad;
        var inv_x = -space.position.x;
        var inv_y = -space.position.y;
        out.scale.x = inv_scale_x;
        out.scale.y = inv_scale_y;
        out.rotation.rad = inv_rotation;
        var x = inv_x;
        var y = inv_y;
        var rad = inv_rotation;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var tx = c * x - s * y;
        var ty = s * x + c * y;
        out.position.x = tx * inv_scale_x;
        out.position.y = ty * inv_scale_y;
        return out;
    };
    Space.combine = function (a, b, out) {
        out = out || new Space();
        var x = b.position.x * a.scale.x;
        var y = b.position.y * a.scale.y;
        var rad = a.rotation.rad;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var tx = c * x - s * y;
        var ty = s * x + c * y;
        out.position.x = tx + a.position.x;
        out.position.y = ty + a.position.y;
        if (a.scale.x * a.scale.y < 0.0) {
            out.rotation.rad = wrapAngleRadians(a.rotation.rad - b.rotation.rad);
        }
        else {
            out.rotation.rad = wrapAngleRadians(b.rotation.rad + a.rotation.rad);
        }
        out.scale.x = b.scale.x * a.scale.x;
        out.scale.y = b.scale.y * a.scale.y;
        return out;
    };
    Space.extract = function (ab, a, out) {
        out = out || new Space();
        out.scale.x = ab.scale.x / a.scale.x;
        out.scale.y = ab.scale.y / a.scale.y;
        if (a.scale.x * a.scale.y < 0.0) {
            out.rotation.rad = wrapAngleRadians(a.rotation.rad + ab.rotation.rad);
        }
        else {
            out.rotation.rad = wrapAngleRadians(ab.rotation.rad - a.rotation.rad);
        }
        var x = ab.position.x - a.position.x;
        var y = ab.position.y - a.position.y;
        var rad = -a.rotation.rad;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var tx = c * x - s * y;
        var ty = s * x + c * y;
        out.position.x = tx / a.scale.x;
        out.position.y = ty / a.scale.y;
        return out;
    };
    Space.transform = function (space, v, out) {
        out = out || new Vector();
        var x = v.x * space.scale.x;
        var y = v.y * space.scale.y;
        var rad = space.rotation.rad;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var tx = c * x - s * y;
        var ty = s * x + c * y;
        out.x = tx + space.position.x;
        out.y = ty + space.position.y;
        return out;
    };
    Space.untransform = function (space, v, out) {
        out = out || new Vector();
        var x = v.x - space.position.x;
        var y = v.y - space.position.y;
        var rad = -space.rotation.rad;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var tx = c * x - s * y;
        var ty = s * x + c * y;
        out.x = tx / space.scale.x;
        out.y = ty / space.scale.y;
        return out;
    };
    Space.tween = function (a, b, pct, spin, out) {
        out.position.x = tween(a.position.x, b.position.x, pct);
        out.position.y = tween(a.position.y, b.position.y, pct);
        out.rotation.rad = tweenAngleRadians(a.rotation.rad, b.rotation.rad, pct, spin);
        out.scale.x = tween(a.scale.x, b.scale.x, pct);
        out.scale.y = tween(a.scale.y, b.scale.y, pct);
        return out;
    };
    return Space;
}());
var Element = (function () {
    function Element() {
        this.id = -1;
        this.name = "";
    }
    Element.prototype.load = function (json) {
        this.id = loadInt(json, "id", -1);
        this.name = loadString(json, "name", "");
        return this;
    };
    return Element;
}());
var File = (function (_super) {
    __extends(File, _super);
    function File(type) {
        var _this = _super.call(this) || this;
        _this.type = "unknown";
        _this.type = type;
        return _this;
    }
    File.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var type = loadString(json, "type", "image");
        if (this.type !== type)
            throw new Error();
        return this;
    };
    return File;
}(Element));
var ImageFile = (function (_super) {
    __extends(ImageFile, _super);
    function ImageFile() {
        var _this = _super.call(this, "image") || this;
        _this.width = 0;
        _this.height = 0;
        _this.pivot = new Pivot();
        return _this;
    }
    ImageFile.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.width = loadInt(json, "width", 0);
        this.height = loadInt(json, "height", 0);
        this.pivot.x = loadFloat(json, "pivot_x", 0.0);
        this.pivot.y = loadFloat(json, "pivot_y", 1.0);
        return this;
    };
    return ImageFile;
}(File));
var SoundFile = (function (_super) {
    __extends(SoundFile, _super);
    function SoundFile() {
        return _super.call(this, "sound") || this;
    }
    SoundFile.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        return this;
    };
    return SoundFile;
}(File));
var Folder = (function (_super) {
    __extends(Folder, _super);
    function Folder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.file_array = [];
        return _this;
    }
    Folder.prototype.load = function (json) {
        var _this = this;
        _super.prototype.load.call(this, json);
        this.file_array = [];
        json.file = makeArray(json.file);
        json.file.forEach(function (file_json) {
            switch (file_json.type) {
                case "image":
                default:
                    _this.file_array.push(new ImageFile().load(file_json));
                    break;
                case "sound":
                    _this.file_array.push(new SoundFile().load(file_json));
                    break;
            }
        });
        return this;
    };
    return Folder;
}(Element));
var BaseObject = (function () {
    function BaseObject(type) {
        this.type = "unknown";
        this.name = "";
        this.type = type;
    }
    BaseObject.prototype.load = function (json) {
        var type = loadString(json, "type", "sprite");
        if (this.type !== type)
            throw new Error();
        return this;
    };
    return BaseObject;
}());
var SpriteObject = (function (_super) {
    __extends(SpriteObject, _super);
    function SpriteObject() {
        var _this = _super.call(this, "sprite") || this;
        _this.parent_index = -1;
        _this.folder_index = -1;
        _this.file_index = -1;
        _this.local_space = new Space();
        _this.world_space = new Space();
        _this.default_pivot = false;
        _this.pivot = new Pivot();
        _this.z_index = 0;
        _this.alpha = 1.0;
        return _this;
    }
    SpriteObject.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.parent_index = loadInt(json, "parent", -1);
        this.folder_index = loadInt(json, "folder", -1);
        this.file_index = loadInt(json, "file", -1);
        this.local_space.load(json);
        this.world_space.copy(this.local_space);
        if (typeof json["pivot_x"] !== "undefined" || typeof json["pivot_y"] !== "undefined") {
            this.pivot.x = loadFloat(json, "pivot_x", 0.0);
            this.pivot.y = loadFloat(json, "pivot_y", 1.0);
        }
        else {
            this.default_pivot = true;
        }
        this.z_index = 99;
        this.alpha = loadFloat(json, "a", 1.0);
        return this;
    };
    SpriteObject.prototype.copy = function (other) {
        this.parent_index = other.parent_index;
        this.folder_index = other.folder_index;
        this.file_index = other.file_index;
        this.local_space.copy(other.local_space);
        this.world_space.copy(other.world_space);
        this.default_pivot = other.default_pivot;
        this.pivot.copy(other.pivot);
        this.z_index = other.z_index;
        this.alpha = other.alpha;
        return this;
    };
    SpriteObject.prototype.tween = function (other, pct, spin) {
        Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
        if (!this.default_pivot) {
            Vector.tween(this.pivot, other.pivot, pct, this.pivot);
        }
        this.alpha = tween(this.alpha, other.alpha, pct);
    };
    return SpriteObject;
}(BaseObject));
var Bone = (function (_super) {
    __extends(Bone, _super);
    function Bone() {
        var _this = _super.call(this, "bone") || this;
        _this.parent_index = -1;
        _this.local_space = new Space();
        _this.world_space = new Space();
        return _this;
    }
    Bone.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.parent_index = loadInt(json, "parent", -1);
        this.local_space.load(json);
        this.world_space.copy(this.local_space);
        return this;
    };
    Bone.prototype.copy = function (other) {
        this.parent_index = other.parent_index;
        this.local_space.copy(other.local_space);
        this.world_space.copy(other.world_space);
        return this;
    };
    Bone.prototype.tween = function (other, pct, spin) {
        Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
    };
    return Bone;
}(BaseObject));
var BoxObject = (function (_super) {
    __extends(BoxObject, _super);
    function BoxObject() {
        var _this = _super.call(this, "box") || this;
        _this.parent_index = -1;
        _this.local_space = new Space();
        _this.world_space = new Space();
        _this.pivot = new Pivot();
        return _this;
    }
    BoxObject.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.parent_index = loadInt(json, "parent", -1);
        this.local_space.load(json);
        this.world_space.copy(this.local_space);
        this.pivot.x = loadFloat(json, "pivot_x", 0.0);
        this.pivot.y = loadFloat(json, "pivot_y", 1.0);
        return this;
    };
    BoxObject.prototype.copy = function (other) {
        this.parent_index = other.parent_index;
        this.local_space.copy(other.local_space);
        this.world_space.copy(other.world_space);
        this.pivot.copy(other.pivot);
        return this;
    };
    BoxObject.prototype.tween = function (other, pct, spin) {
        Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
    };
    return BoxObject;
}(BaseObject));
var PointObject = (function (_super) {
    __extends(PointObject, _super);
    function PointObject() {
        var _this = _super.call(this, "point") || this;
        _this.parent_index = -1;
        _this.local_space = new Space();
        _this.world_space = new Space();
        return _this;
    }
    PointObject.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.parent_index = loadInt(json, "parent", -1);
        this.local_space.load(json);
        this.world_space.copy(this.local_space);
        return this;
    };
    PointObject.prototype.copy = function (other) {
        this.parent_index = other.parent_index;
        this.local_space.copy(other.local_space);
        this.world_space.copy(other.world_space);
        return this;
    };
    PointObject.prototype.tween = function (other, pct, spin) {
        Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
    };
    return PointObject;
}(BaseObject));
var SoundObject = (function (_super) {
    __extends(SoundObject, _super);
    function SoundObject() {
        var _this = _super.call(this, "sound") || this;
        _this.folder_index = -1;
        _this.file_index = -1;
        _this.trigger = false;
        _this.volume = 1.0;
        _this.panning = 0.0;
        return _this;
    }
    SoundObject.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.folder_index = loadInt(json, "folder", -1);
        this.file_index = loadInt(json, "file", -1);
        this.trigger = loadBool(json, "trigger", false);
        this.volume = loadFloat(json, "volume", 1.0);
        this.panning = loadFloat(json, "panning", 0.0);
        return this;
    };
    SoundObject.prototype.copy = function (other) {
        this.folder_index = other.folder_index;
        this.file_index = other.file_index;
        this.trigger = other.trigger;
        this.volume = other.volume;
        this.panning = other.panning;
        return this;
    };
    SoundObject.prototype.tween = function (other, pct, spin) {
        this.volume = tween(this.volume, other.volume, pct);
        this.panning = tween(this.panning, other.panning, pct);
    };
    return SoundObject;
}(BaseObject));
var EntityObject = (function (_super) {
    __extends(EntityObject, _super);
    function EntityObject() {
        var _this = _super.call(this, "entity") || this;
        _this.parent_index = -1;
        _this.local_space = new Space();
        _this.world_space = new Space();
        _this.entity_index = -1;
        _this.animation_index = -1;
        _this.animation_time = 0.0;
        return _this;
    }
    EntityObject.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.parent_index = loadInt(json, "parent", -1);
        this.local_space.load(json);
        this.world_space.copy(this.local_space);
        this.entity_index = loadInt(json, "entity", -1);
        this.animation_index = loadInt(json, "animation", -1);
        this.animation_time = loadFloat(json, "t", 0.0);
        return this;
    };
    EntityObject.prototype.copy = function (other) {
        this.parent_index = other.parent_index;
        this.local_space.copy(other.local_space);
        this.world_space.copy(other.world_space);
        this.entity_index = other.entity_index;
        this.animation_index = other.animation_index;
        this.animation_time = other.animation_time;
        return this;
    };
    EntityObject.prototype.tween = function (other, pct, spin) {
        Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
        this.animation_time = tween(this.animation_time, other.animation_time, pct);
    };
    return EntityObject;
}(BaseObject));
var VariableObject = (function (_super) {
    __extends(VariableObject, _super);
    function VariableObject() {
        return _super.call(this, "variable") || this;
    }
    VariableObject.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        return this;
    };
    VariableObject.prototype.copy = function (other) {
        return this;
    };
    VariableObject.prototype.tween = function (other, pct, spin) { };
    return VariableObject;
}(BaseObject));
var Ref = (function (_super) {
    __extends(Ref, _super);
    function Ref() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parent_index = -1;
        _this.timeline_index = -1;
        _this.keyframe_index = -1;
        return _this;
    }
    Ref.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.parent_index = loadInt(json, "parent", -1);
        this.timeline_index = loadInt(json, "timeline", -1);
        this.keyframe_index = loadInt(json, "key", -1);
        return this;
    };
    return Ref;
}(Element));
var BoneRef = (function (_super) {
    __extends(BoneRef, _super);
    function BoneRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BoneRef;
}(Ref));
var ObjectRef = (function (_super) {
    __extends(ObjectRef, _super);
    function ObjectRef() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.z_index = 0;
        return _this;
    }
    ObjectRef.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.z_index = loadInt(json, "z_index", 0);
        return this;
    };
    return ObjectRef;
}(Ref));
var Keyframe = (function (_super) {
    __extends(Keyframe, _super);
    function Keyframe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = 0;
        return _this;
    }
    Keyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.time = loadInt(json, "time", 0);
        return this;
    };
    Keyframe.find = function (array, time) {
        if (array.length <= 0) {
            return -1;
        }
        if (time < array[0].time) {
            return -1;
        }
        var last = array.length - 1;
        if (time >= array[last].time) {
            return last;
        }
        var lo = 0;
        var hi = last;
        if (hi === 0) {
            return 0;
        }
        var current = hi >> 1;
        while (true) {
            if (array[current + 1].time <= time) {
                lo = current + 1;
            }
            else {
                hi = current;
            }
            if (lo === hi) {
                return lo;
            }
            current = (lo + hi) >> 1;
        }
    };
    Keyframe.compare = function (a, b) {
        return a.time - b.time;
    };
    return Keyframe;
}(Element));
var Curve = (function () {
    function Curve() {
        this.type = "linear";
        this.c1 = 0.0;
        this.c2 = 0.0;
        this.c3 = 0.0;
        this.c4 = 0.0;
    }
    Curve.prototype.load = function (json) {
        this.type = loadString(json, "curve_type", "linear");
        this.c1 = loadFloat(json, "c1", 0.0);
        this.c2 = loadFloat(json, "c2", 0.0);
        this.c3 = loadFloat(json, "c3", 0.0);
        this.c4 = loadFloat(json, "c4", 0.0);
        return this;
    };
    Curve.prototype.evaluate = function (t) {
        switch (this.type) {
            case "instant":
                return 0.0;
            case "linear":
                return t;
            case "quadratic":
                return interpolateQuadratic(0.0, this.c1, 1.0, t);
            case "cubic":
                return interpolateCubic(0.0, this.c1, this.c2, 1.0, t);
            case "quartic":
                return interpolateQuartic(0.0, this.c1, this.c2, this.c3, 1.0, t);
            case "quintic":
                return interpolateQuintic(0.0, this.c1, this.c2, this.c3, this.c4, 1.0, t);
            case "bezier":
                return interpolateBezier(this.c1, this.c2, this.c3, this.c4, t);
        }
        return 0.0;
    };
    return Curve;
}());
var MainlineKeyframe = (function (_super) {
    __extends(MainlineKeyframe, _super);
    function MainlineKeyframe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curve = new Curve();
        return _this;
    }
    MainlineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var mainline_keyframe = this;
        mainline_keyframe.curve.load(json);
        mainline_keyframe.bone_ref_array = [];
        json.bone_ref = makeArray(json.bone_ref);
        json.bone_ref.forEach(function (bone_ref_json) {
            mainline_keyframe.bone_ref_array.push(new BoneRef().load(bone_ref_json));
        });
        mainline_keyframe.bone_ref_array.sort(function (a, b) {
            return a.id - b.id;
        });
        mainline_keyframe.object_ref_array = [];
        json.object_ref = makeArray(json.object_ref);
        json.object_ref.forEach(function (object_ref_json) {
            mainline_keyframe.object_ref_array.push(new ObjectRef().load(object_ref_json));
        });
        mainline_keyframe.object_ref_array.sort(function (a, b) {
            return a.id - b.id;
        });
        return mainline_keyframe;
    };
    return MainlineKeyframe;
}(Keyframe));
var Mainline = (function () {
    function Mainline() {
    }
    Mainline.prototype.load = function (json) {
        var mainline = this;
        mainline.keyframe_array = [];
        json.key = makeArray(json.key);
        json.key.forEach(function (key_json) {
            mainline.keyframe_array.push(new MainlineKeyframe().load(key_json));
        });
        mainline.keyframe_array.sort(Keyframe.compare);
        return mainline;
    };
    return Mainline;
}());
var TimelineKeyframe = (function (_super) {
    __extends(TimelineKeyframe, _super);
    function TimelineKeyframe(type) {
        var _this = _super.call(this) || this;
        _this.type = "unknown";
        _this.spin = 1;
        _this.curve = new Curve();
        _this.type = type;
        return _this;
    }
    TimelineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.spin = loadInt(json, "spin", 1);
        this.curve.load(json);
        return this;
    };
    return TimelineKeyframe;
}(Keyframe));
var SpriteTimelineKeyframe = (function (_super) {
    __extends(SpriteTimelineKeyframe, _super);
    function SpriteTimelineKeyframe() {
        return _super.call(this, "sprite") || this;
    }
    SpriteTimelineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.sprite = new SpriteObject().load(json.object);
        return this;
    };
    return SpriteTimelineKeyframe;
}(TimelineKeyframe));
var BoneTimelineKeyframe = (function (_super) {
    __extends(BoneTimelineKeyframe, _super);
    function BoneTimelineKeyframe() {
        return _super.call(this, "bone") || this;
    }
    BoneTimelineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        json.bone.type = json.bone.type || "bone";
        this.bone = new Bone().load(json.bone);
        return this;
    };
    return BoneTimelineKeyframe;
}(TimelineKeyframe));
var BoxTimelineKeyframe = (function (_super) {
    __extends(BoxTimelineKeyframe, _super);
    function BoxTimelineKeyframe() {
        return _super.call(this, "box") || this;
    }
    BoxTimelineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        json.object.type = json.object.type || "box";
        this.box = new BoxObject().load(json.object);
        return this;
    };
    return BoxTimelineKeyframe;
}(TimelineKeyframe));
var PointTimelineKeyframe = (function (_super) {
    __extends(PointTimelineKeyframe, _super);
    function PointTimelineKeyframe() {
        return _super.call(this, "point") || this;
    }
    PointTimelineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        json.object.type = json.object.type || "point";
        this.point = new PointObject().load(json.object);
        return this;
    };
    return PointTimelineKeyframe;
}(TimelineKeyframe));
var SoundTimelineKeyframe = (function (_super) {
    __extends(SoundTimelineKeyframe, _super);
    function SoundTimelineKeyframe() {
        return _super.call(this, "sound") || this;
    }
    SoundTimelineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        json.object.type = json.object.type || "sound";
        this.sound = new SoundObject().load(json.object);
        return this;
    };
    return SoundTimelineKeyframe;
}(TimelineKeyframe));
var EntityTimelineKeyframe = (function (_super) {
    __extends(EntityTimelineKeyframe, _super);
    function EntityTimelineKeyframe() {
        return _super.call(this, "entity") || this;
    }
    EntityTimelineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        json.object.type = json.object.type || "entity";
        this.entity = new EntityObject().load(json.object);
        return this;
    };
    return EntityTimelineKeyframe;
}(TimelineKeyframe));
var VariableTimelineKeyframe = (function (_super) {
    __extends(VariableTimelineKeyframe, _super);
    function VariableTimelineKeyframe() {
        return _super.call(this, "variable") || this;
    }
    VariableTimelineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        json.object.type = json.object.type || "variable";
        this.variable = new VariableObject().load(json.object);
        return this;
    };
    return VariableTimelineKeyframe;
}(TimelineKeyframe));
var TagDef = (function (_super) {
    __extends(TagDef, _super);
    function TagDef() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag_index = -1;
        return _this;
    }
    TagDef.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        return this;
    };
    return TagDef;
}(Element));
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag_def_index = -1;
        return _this;
    }
    Tag.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.tag_def_index = loadInt(json, "t", -1);
        return this;
    };
    return Tag;
}(Element));
var TaglineKeyframe = (function (_super) {
    __extends(TaglineKeyframe, _super);
    function TaglineKeyframe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaglineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var tagline_keyframe = this;
        tagline_keyframe.tag_array = [];
        json.tag = makeArray(json.tag);
        json.tag.forEach(function (tag_json) {
            tagline_keyframe.tag_array.push(new Tag().load(tag_json));
        });
        return this;
    };
    return TaglineKeyframe;
}(Keyframe));
var Tagline = (function (_super) {
    __extends(Tagline, _super);
    function Tagline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keyframe_array = [];
        return _this;
    }
    Tagline.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var tagline = this;
        tagline.keyframe_array = [];
        json.key = makeArray(json.key);
        json.key.forEach(function (key_json) {
            tagline.keyframe_array.push(new TaglineKeyframe().load(key_json));
        });
        return this;
    };
    return Tagline;
}(Element));
var VarlineKeyframe = (function (_super) {
    __extends(VarlineKeyframe, _super);
    function VarlineKeyframe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VarlineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var varline_keyframe = this;
        switch (typeof json.val) {
            case "number":
                varline_keyframe.val = loadFloat(json, "val", 0.0);
                break;
            case "string":
                varline_keyframe.val = loadString(json, "val", "");
                break;
        }
        return this;
    };
    return VarlineKeyframe;
}(Keyframe));
var Varline = (function (_super) {
    __extends(Varline, _super);
    function Varline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.var_def_index = -1;
        return _this;
    }
    Varline.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var varline = this;
        varline.var_def_index = loadInt(json, "def", -1);
        varline.keyframe_array = [];
        json.key = makeArray(json.key);
        json.key.forEach(function (key_json) {
            varline.keyframe_array.push(new VarlineKeyframe().load(key_json));
        });
        return this;
    };
    return Varline;
}(Element));
var Meta = (function (_super) {
    __extends(Meta, _super);
    function Meta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Meta.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var meta = this;
        meta.tagline = new Tagline();
        if (json.tagline) {
            meta.tagline.load(json.tagline);
        }
        meta.varline_array = [];
        json.valline = json.valline || null;
        json.varline = json.varline || json.valline;
        if (json.varline) {
            json.varline = makeArray(json.varline);
            json.varline.forEach(function (varline_json) {
                meta.varline_array.push(new Varline().load(varline_json));
            });
        }
        return this;
    };
    return Meta;
}(Element));
var Timeline = (function (_super) {
    __extends(Timeline, _super);
    function Timeline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "sprite";
        _this.object_index = -1;
        return _this;
    }
    Timeline.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var timeline = this;
        timeline.type = loadString(json, "object_type", "sprite");
        timeline.object_index = loadInt(json, "obj", -1);
        timeline.keyframe_array = [];
        json.key = makeArray(json.key);
        switch (timeline.type) {
            case "sprite":
                json.key.forEach(function (key_json) {
                    timeline.keyframe_array.push(new SpriteTimelineKeyframe().load(key_json));
                });
                break;
            case "bone":
                json.key.forEach(function (key_json) {
                    timeline.keyframe_array.push(new BoneTimelineKeyframe().load(key_json));
                });
                break;
            case "box":
                json.key.forEach(function (key_json) {
                    timeline.keyframe_array.push(new BoxTimelineKeyframe().load(key_json));
                });
                break;
            case "point":
                json.key.forEach(function (key_json) {
                    timeline.keyframe_array.push(new PointTimelineKeyframe().load(key_json));
                });
                break;
            case "sound":
                json.key.forEach(function (key_json) {
                    timeline.keyframe_array.push(new SoundTimelineKeyframe().load(key_json));
                });
                break;
            case "entity":
                json.key.forEach(function (key_json) {
                    timeline.keyframe_array.push(new EntityTimelineKeyframe().load(key_json));
                });
                break;
            case "variable":
                json.key.forEach(function (key_json) {
                    timeline.keyframe_array.push(new VariableTimelineKeyframe().load(key_json));
                });
                break;
            default:
                console.log("TODO: Timeline::load", timeline.type, json.key);
                break;
        }
        timeline.keyframe_array.sort(Keyframe.compare);
        if (json.meta) {
            timeline.meta = new Meta().load(json.meta);
        }
        return timeline;
    };
    return Timeline;
}(Element));
var SoundlineKeyframe = (function (_super) {
    __extends(SoundlineKeyframe, _super);
    function SoundlineKeyframe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoundlineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        json.object.type = json.object.type || "sound";
        this.sound = new SoundObject().load(json.object);
        return this;
    };
    return SoundlineKeyframe;
}(Keyframe));
var Soundline = (function (_super) {
    __extends(Soundline, _super);
    function Soundline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Soundline.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var soundline = this;
        soundline.keyframe_array = [];
        json.key = makeArray(json.key);
        json.key.forEach(function (key_json) {
            soundline.keyframe_array.push(new SoundlineKeyframe().load(key_json));
        });
        soundline.keyframe_array.sort(Keyframe.compare);
        return this;
    };
    return Soundline;
}(Element));
var EventlineKeyframe = (function (_super) {
    __extends(EventlineKeyframe, _super);
    function EventlineKeyframe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventlineKeyframe.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        return this;
    };
    return EventlineKeyframe;
}(Keyframe));
var Eventline = (function (_super) {
    __extends(Eventline, _super);
    function Eventline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Eventline.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var eventline = this;
        eventline.keyframe_array = [];
        json.key = makeArray(json.key);
        json.key.forEach(function (key_json) {
            eventline.keyframe_array.push(new EventlineKeyframe().load(key_json));
        });
        eventline.keyframe_array.sort(Keyframe.compare);
        return this;
    };
    return Eventline;
}(Element));
var MapInstruction = (function () {
    function MapInstruction() {
        this.folder_index = -1;
        this.file_index = -1;
        this.target_folder_index = -1;
        this.target_file_index = -1;
    }
    MapInstruction.prototype.load = function (json) {
        var map_instruction = this;
        map_instruction.folder_index = loadInt(json, "folder", -1);
        map_instruction.file_index = loadInt(json, "file", -1);
        map_instruction.target_folder_index = loadInt(json, "target_folder", -1);
        map_instruction.target_file_index = loadInt(json, "target_file", -1);
        return this;
    };
    return MapInstruction;
}());
var CharacterMap = (function (_super) {
    __extends(CharacterMap, _super);
    function CharacterMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map_instruction_array = [];
        return _this;
    }
    CharacterMap.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var character_map = this;
        character_map.map_instruction_array = [];
        json.map = makeArray(json.map);
        json.map.forEach(function (map_json) {
            var map_instruction = new MapInstruction().load(map_json);
            character_map.map_instruction_array.push(map_instruction);
        });
        return this;
    };
    return CharacterMap;
}(Element));
var VarDef = (function (_super) {
    __extends(VarDef, _super);
    function VarDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VarDef.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.type = this.default_value = loadString(json, "type", "");
        switch (this.type) {
            case "int":
                this.value = this.default_value = loadInt(json, "default_value", 0);
                break;
            case "float":
                this.value = this.default_value = loadFloat(json, "default_value", 0.0);
                break;
            case "string":
                this.value = this.default_value = loadString(json, "default_value", "");
                break;
        }
        return this;
    };
    return VarDef;
}(Element));
var VarDefs = (function (_super) {
    __extends(VarDefs, _super);
    function VarDefs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VarDefs.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var var_defs = this;
        this.var_def_array = [];
        var json_var_def_array = [];
        if (typeof json.i === "object") {
            json_var_def_array = makeArray(json.i);
        }
        else if (typeof json === "object" && typeof json.length === "number") {
            json_var_def_array = makeArray(json);
        }
        json_var_def_array.forEach(function (var_def_json) {
            var_defs.var_def_array.push(new VarDef().load(var_def_json));
        });
        return this;
    };
    return VarDefs;
}(Element));
var ObjInfo = (function (_super) {
    __extends(ObjInfo, _super);
    function ObjInfo(type) {
        var _this = _super.call(this) || this;
        _this.type = "unknown";
        _this.type = type;
        return _this;
    }
    ObjInfo.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.var_defs = new VarDefs().load(json.var_defs || {});
        return this;
    };
    return ObjInfo;
}(Element));
var SpriteFrame = (function () {
    function SpriteFrame() {
        this.folder_index = -1;
        this.file_index = -1;
    }
    SpriteFrame.prototype.load = function (json) {
        this.folder_index = loadInt(json, "folder", -1);
        this.file_index = loadInt(json, "file", -1);
        return this;
    };
    return SpriteFrame;
}());
var SpriteObjInfo = (function (_super) {
    __extends(SpriteObjInfo, _super);
    function SpriteObjInfo() {
        return _super.call(this, "sprite") || this;
    }
    SpriteObjInfo.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var obj_info = this;
        obj_info.sprite_frame_array = [];
        json.frames = makeArray(json.frames);
        json.frames.forEach(function (frames_json) {
            obj_info.sprite_frame_array.push(new SpriteFrame().load(frames_json));
        });
        return this;
    };
    return SpriteObjInfo;
}(ObjInfo));
var BoneObjInfo = (function (_super) {
    __extends(BoneObjInfo, _super);
    function BoneObjInfo() {
        var _this = _super.call(this, "bone") || this;
        _this.w = 0;
        _this.h = 0;
        return _this;
    }
    BoneObjInfo.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.w = loadInt(json, "w", 0);
        this.h = loadInt(json, "h", 0);
        return this;
    };
    return BoneObjInfo;
}(ObjInfo));
var BoxObjInfo = (function (_super) {
    __extends(BoxObjInfo, _super);
    function BoxObjInfo() {
        var _this = _super.call(this, "box") || this;
        _this.w = 0;
        _this.h = 0;
        return _this;
    }
    BoxObjInfo.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        this.w = loadInt(json, "w", 0);
        this.h = loadInt(json, "h", 0);
        return this;
    };
    return BoxObjInfo;
}(ObjInfo));
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.length = 0;
        _this.looping = "true";
        _this.loop_to = 0;
        _this.min_time = 0;
        _this.max_time = 0;
        return _this;
    }
    Animation.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var anim = this;
        anim.length = loadInt(json, "length", 0);
        anim.looping = loadString(json, "looping", "true");
        anim.loop_to = loadInt(json, "loop_to", 0);
        anim.mainline = new Mainline().load(json.mainline || {});
        anim.timeline_array = [];
        json.timeline = makeArray(json.timeline);
        json.timeline.forEach(function (timeline_json) {
            anim.timeline_array.push(new Timeline().load(timeline_json));
        });
        anim.soundline_array = [];
        json.soundline = makeArray(json.soundline);
        json.soundline.forEach(function (soundline_json) {
            anim.soundline_array.push(new Soundline().load(soundline_json));
        });
        anim.eventline_array = [];
        json.eventline = makeArray(json.eventline);
        json.eventline.forEach(function (eventline_json) {
            anim.eventline_array.push(new Eventline().load(eventline_json));
        });
        if (json.meta) {
            anim.meta = new Meta().load(json.meta);
        }
        anim.min_time = 0;
        anim.max_time = anim.length;
        return this;
    };
    return Animation;
}(Element));
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Entity.prototype.load = function (json) {
        _super.prototype.load.call(this, json);
        var entity = this;
        entity.character_map_map = {};
        entity.character_map_keys = [];
        json.character_map = makeArray(json.character_map);
        json.character_map.forEach(function (character_map_json) {
            var character_map = new CharacterMap().load(character_map_json);
            entity.character_map_map[character_map.name] = character_map;
            entity.character_map_keys.push(character_map.name);
        });
        this.var_defs = new VarDefs().load(json.var_defs || {});
        entity.obj_info_map = {};
        entity.obj_info_keys = [];
        json.obj_info = makeArray(json.obj_info);
        json.obj_info.forEach(function (obj_info_json) {
            var obj_info;
            switch (obj_info_json.type) {
                case "sprite":
                    obj_info = new SpriteObjInfo().load(obj_info_json);
                    break;
                case "bone":
                    obj_info = new BoneObjInfo().load(obj_info_json);
                    break;
                case "box":
                    obj_info = new BoxObjInfo().load(obj_info_json);
                    break;
                case "point":
                case "sound":
                case "entity":
                case "variable":
                default:
                    console.log("TODO: Entity.load", obj_info_json.type, obj_info_json);
                    obj_info = new ObjInfo(obj_info_json.type).load(obj_info_json);
                    break;
            }
            entity.obj_info_map[obj_info.name] = obj_info;
            entity.obj_info_keys.push(obj_info.name);
        });
        entity.animation_map = {};
        entity.animation_keys = [];
        json.animation = makeArray(json.animation);
        json.animation.forEach(function (animation_json) {
            var animation = new Animation().load(animation_json);
            entity.animation_map[animation.name] = animation;
            entity.animation_keys.push(animation.name);
        });
        return this;
    };
    return Entity;
}(Element));
var Data = (function () {
    function Data() {
        this.folder_array = [];
        this.tag_def_array = [];
        this.entity_map = {};
        this.entity_keys = [];
    }
    Data.prototype.load = function (json) {
        var data = this;
        var scon_version = loadString(json, "scon_version", "");
        var generator = loadString(json, "generator", "");
        var generator_version = loadString(json, "generator_version", "");
        data.folder_array = [];
        json.folder = makeArray(json.folder);
        json.folder.forEach(function (folder_json) {
            data.folder_array.push(new Folder().load(folder_json));
        });
        data.tag_def_array = [];
        json.tag_list = makeArray(json.tag_list);
        json.tag_list.forEach(function (tag_list_json) {
            data.tag_def_array.push(new TagDef().load(tag_list_json));
        });
        data.entity_map = {};
        data.entity_keys = [];
        json.entity = makeArray(json.entity);
        json.entity.forEach(function (entity_json) {
            var entity = new Entity().load(entity_json);
            data.entity_map[entity.name] = entity;
            data.entity_keys.push(entity.name);
        });
        data.entity_keys.forEach(function (entity_key) {
            var entity = data.entity_map[entity_key];
            entity.animation_keys.forEach(function (animation_key) {
                var animation = entity.animation_map[animation_key];
                animation.timeline_array.forEach(function (timeline) {
                    timeline.keyframe_array.forEach(function (timeline_keyframe) {
                        if (timeline_keyframe instanceof SpriteTimelineKeyframe) {
                            var sprite = timeline_keyframe.sprite;
                            if (sprite.default_pivot) {
                                var folder = data.folder_array[sprite.folder_index];
                                var file = folder && folder.file_array[sprite.file_index];
                                if (file) {
                                    sprite.pivot.copy(file.pivot);
                                }
                            }
                        }
                    });
                });
            });
        });
        return this;
    };
    Data.prototype.getEntities = function () {
        return this.entity_map;
    };
    Data.prototype.getEntityKeys = function () {
        return this.entity_keys;
    };
    Data.prototype.getAnims = function (entity_key) {
        var entity = this.entity_map && this.entity_map[entity_key];
        if (entity) {
            return entity.animation_map;
        }
        return {};
    };
    Data.prototype.getAnimKeys = function (entity_key) {
        var entity = this.entity_map && this.entity_map[entity_key];
        if (entity) {
            return entity.animation_keys;
        }
        return [];
    };
    return Data;
}());
var Pose = (function () {
    function Pose(data) {
        this.entity_key = "";
        this.character_map_key_array = [];
        this.anim_key = "";
        this.time = 0;
        this.elapsed_time = 0;
        this.dirty = true;
        this.bone_array = [];
        this.object_array = [];
        this.sound_array = [];
        this.event_array = [];
        this.tag_array = [];
        this.var_map = {};
        this.data = data;
    }
    Pose.prototype.getEntities = function () {
        if (this.data) {
            return this.data.getEntities();
        }
        return null;
    };
    Pose.prototype.getEntityKeys = function () {
        if (this.data) {
            return this.data.getEntityKeys();
        }
        return null;
    };
    Pose.prototype.curEntity = function () {
        var entity_map = this.data.entity_map;
        return entity_map && entity_map[this.entity_key];
    };
    Pose.prototype.getEntity = function () {
        return this.entity_key;
    };
    Pose.prototype.setEntity = function (entity_key) {
        if (this.entity_key !== entity_key) {
            this.entity_key = entity_key;
            this.anim_key = "";
            this.time = 0;
            this.dirty = true;
            this.bone_array = [];
            this.object_array = [];
        }
    };
    Pose.prototype.getAnims = function () {
        if (this.data) {
            return this.data.getAnims(this.entity_key);
        }
        return null;
    };
    Pose.prototype.getAnimKeys = function () {
        if (this.data) {
            return this.data.getAnimKeys(this.entity_key);
        }
        return null;
    };
    Pose.prototype.curAnim = function () {
        var anims = this.getAnims();
        return anims && anims[this.anim_key];
    };
    Pose.prototype.curAnimLength = function () {
        var pose = this;
        var data = pose.data;
        var entity = data && data.entity_map[pose.entity_key];
        var anim = entity && entity.animation_map[pose.anim_key];
        return (anim && anim.length) || 0;
    };
    Pose.prototype.getAnim = function () {
        return this.anim_key;
    };
    Pose.prototype.setAnim = function (anim_key) {
        if (this.anim_key !== anim_key) {
            this.anim_key = anim_key;
            var anim = this.curAnim();
            if (anim) {
                this.time = wrap(this.time, anim.min_time, anim.max_time);
            }
            this.elapsed_time = 0;
            this.dirty = true;
        }
    };
    Pose.prototype.getTime = function () {
        return this.time;
    };
    Pose.prototype.setTime = function (time) {
        var anim = this.curAnim();
        if (anim) {
            time = wrap(time, anim.min_time, anim.max_time);
        }
        if (this.time !== time) {
            this.time = time;
            this.elapsed_time = 0;
            this.dirty = true;
        }
    };
    Pose.prototype.update = function (elapsed_time) {
        var pose = this;
        pose.elapsed_time += elapsed_time;
        pose.dirty = true;
    };
    Pose.prototype.strike = function () {
        var pose = this;
        if (!pose.dirty) {
            return;
        }
        pose.dirty = false;
        var entity = pose.curEntity();
        pose.var_map = pose.var_map || {};
        entity.var_defs.var_def_array.forEach(function (var_def) {
            if (!(var_def.name in pose.var_map)) {
                pose.var_map[var_def.name] = var_def.default_value;
            }
        });
        var anim = pose.curAnim();
        var prev_time = pose.time;
        var elapsed_time = pose.elapsed_time;
        pose.time = pose.time + pose.elapsed_time;
        pose.elapsed_time = 0;
        var wrapped_min = false;
        var wrapped_max = false;
        if (anim) {
            wrapped_min = elapsed_time < 0 && pose.time <= anim.min_time;
            wrapped_max = elapsed_time > 0 && pose.time >= anim.max_time;
            pose.time = wrap(pose.time, anim.min_time, anim.max_time);
        }
        var time = pose.time;
        if (anim) {
            var mainline_keyframe_array = anim.mainline.keyframe_array;
            var mainline_keyframe_index1 = Keyframe.find(mainline_keyframe_array, time);
            var mainline_keyframe_index2 = (mainline_keyframe_index1 + 1) % mainline_keyframe_array.length;
            var mainline_keyframe1 = mainline_keyframe_array[mainline_keyframe_index1];
            var mainline_keyframe2 = mainline_keyframe_array[mainline_keyframe_index2];
            var mainline_time1 = mainline_keyframe1.time;
            var mainline_time2 = mainline_keyframe2.time;
            if (mainline_time2 < mainline_time1) {
                mainline_time2 = anim.length;
            }
            var mainline_time_1 = time;
            if (mainline_time1 !== mainline_time2) {
                var mainline_tween = (time - mainline_time1) / (mainline_time2 - mainline_time1);
                mainline_tween = mainline_keyframe1.curve.evaluate(mainline_tween);
                mainline_time_1 = tween(mainline_time1, mainline_time2, mainline_tween);
            }
            var timeline_array_1 = anim.timeline_array;
            var data_bone_array = mainline_keyframe1.bone_ref_array;
            var pose_bone_array_1 = pose.bone_array;
            data_bone_array.forEach(function (data_bone, bone_index) {
                var timeline_index = data_bone.timeline_index;
                var timeline = timeline_array_1[timeline_index];
                var timeline_keyframe_array = timeline.keyframe_array;
                var keyframe_index1 = data_bone.keyframe_index;
                var keyframe_index2 = (keyframe_index1 + 1) % timeline_keyframe_array.length;
                var timeline_keyframe1 = timeline_keyframe_array[keyframe_index1];
                var timeline_keyframe2 = timeline_keyframe_array[keyframe_index2];
                var time1 = timeline_keyframe1.time;
                var time2 = timeline_keyframe2.time;
                if (time2 < time1) {
                    time2 = anim.length;
                }
                var pct = 0.0;
                if (time1 !== time2) {
                    pct = (mainline_time_1 - time1) / (time2 - time1);
                    pct = timeline_keyframe1.curve.evaluate(pct);
                }
                var pose_bone = (pose_bone_array_1[bone_index] = pose_bone_array_1[bone_index] || new Bone());
                var bone_timeline_keyframe1 = timeline_keyframe1;
                var bone_timeline_keyframe2 = timeline_keyframe2;
                pose_bone.copy(bone_timeline_keyframe1.bone).tween(bone_timeline_keyframe2.bone, pct, timeline_keyframe1.spin);
                pose_bone.name = timeline.name;
                pose_bone.parent_index = data_bone.parent_index;
            });
            pose_bone_array_1.length = data_bone_array.length;
            pose_bone_array_1.forEach(function (bone) {
                var parent_bone = pose_bone_array_1[bone.parent_index];
                if (parent_bone) {
                    Space.combine(parent_bone.world_space, bone.local_space, bone.world_space);
                }
                else {
                    bone.world_space.copy(bone.local_space);
                }
            });
            var data_object_array = mainline_keyframe1.object_ref_array;
            var pose_object_array_1 = pose.object_array;
            data_object_array.forEach(function (data_object, object_index) {
                var timeline_index = data_object.timeline_index;
                var timeline = timeline_array_1[timeline_index];
                var timeline_keyframe_array = timeline.keyframe_array;
                var keyframe_index1 = data_object.keyframe_index;
                var keyframe_index2 = (keyframe_index1 + 1) % timeline_keyframe_array.length;
                var timeline_keyframe1 = timeline_keyframe_array[keyframe_index1];
                var timeline_keyframe2 = timeline_keyframe_array[keyframe_index2];
                var time1 = timeline_keyframe1.time;
                var time2 = timeline_keyframe2.time;
                if (time2 < time1) {
                    time2 = anim.length;
                }
                var pct = 0.0;
                if (time1 !== time2) {
                    pct = (mainline_time_1 - time1) / (time2 - time1);
                    pct = timeline_keyframe1.curve.evaluate(pct);
                }
                switch (timeline.type) {
                    case "sprite":
                        var pose_sprite = (pose_object_array_1[object_index] = pose_object_array_1[object_index] || new SpriteObject());
                        var sprite_timeline_keyframe1 = timeline_keyframe1;
                        var sprite_timeline_keyframe2 = timeline_keyframe2;
                        pose_sprite.copy(sprite_timeline_keyframe1.sprite).tween(sprite_timeline_keyframe2.sprite, pct, timeline_keyframe1.spin);
                        pose_sprite.name = timeline.name;
                        pose_sprite.parent_index = data_object.parent_index;
                        pose_sprite['z_index_secundario'] = data_object.z_index;
                        break;
                    case "bone":
                        var pose_bone = (pose_object_array_1[object_index] = pose_object_array_1[object_index] || new Bone());
                        var bone_timeline_keyframe1 = timeline_keyframe1;
                        var bone_timeline_keyframe2 = timeline_keyframe2;
                        pose_bone.copy(bone_timeline_keyframe1.bone).tween(bone_timeline_keyframe2.bone, pct, timeline_keyframe1.spin);
                        pose_bone.name = timeline.name;
                        pose_bone.parent_index = data_object.parent_index;
                        break;
                    case "box":
                        var pose_box = (pose_object_array_1[object_index] = pose_object_array_1[object_index] || new BoxObject());
                        var box_timeline_keyframe1 = timeline_keyframe1;
                        var box_timeline_keyframe2 = timeline_keyframe2;
                        pose_box.copy(box_timeline_keyframe1.box).tween(box_timeline_keyframe2.box, pct, timeline_keyframe1.spin);
                        pose_box.name = timeline.name;
                        pose_box.parent_index = data_object.parent_index;
                        break;
                    case "point":
                        var pose_point = (pose_object_array_1[object_index] = pose_object_array_1[object_index] || new PointObject());
                        var point_timeline_keyframe1 = timeline_keyframe1;
                        var point_timeline_keyframe2 = timeline_keyframe2;
                        pose_point.copy(point_timeline_keyframe1.point).tween(point_timeline_keyframe2.point, pct, timeline_keyframe1.spin);
                        pose_point.name = timeline.name;
                        pose_point.parent_index = data_object.parent_index;
                        break;
                    case "sound":
                        var pose_sound = (pose_object_array_1[object_index] = pose_object_array_1[object_index] || new SoundObject());
                        var sound_timeline_keyframe1 = timeline_keyframe1;
                        var sound_timeline_keyframe2 = timeline_keyframe2;
                        pose_sound.copy(sound_timeline_keyframe1.sound).tween(sound_timeline_keyframe2.sound, pct, timeline_keyframe1.spin);
                        pose_sound.name = timeline.name;
                        break;
                    case "entity":
                        var pose_entity = (pose_object_array_1[object_index] = pose_object_array_1[object_index] || new EntityObject());
                        var entity_timeline_keyframe1 = timeline_keyframe1;
                        var entity_timeline_keyframe2 = timeline_keyframe2;
                        pose_entity.copy(entity_timeline_keyframe1.entity).tween(entity_timeline_keyframe2.entity, pct, timeline_keyframe1.spin);
                        pose_entity.name = timeline.name;
                        pose_entity.parent_index = data_object.parent_index;
                        break;
                    case "variable":
                        var pose_variable = (pose_object_array_1[object_index] = pose_object_array_1[object_index] || new VariableObject());
                        var variable_timeline_keyframe1 = timeline_keyframe1;
                        var variable_timeline_keyframe2 = timeline_keyframe2;
                        pose_variable.name = timeline.name;
                        pose_variable.copy(variable_timeline_keyframe1.variable).tween(variable_timeline_keyframe2.variable, pct, timeline_keyframe1.spin);
                        break;
                    default:
                        throw new Error(timeline.type);
                }
            });
            pose_object_array_1.length = data_object_array.length;
            pose.character_map_key_array.forEach(function (character_map_key) {
                var character_map = entity.character_map_map[character_map_key];
                if (character_map) {
                    character_map.map_instruction_array.forEach(function (map_instruction) {
                        pose_object_array_1.forEach(function (object) {
                            switch (object.type) {
                                case "sprite":
                                    var sprite_object = object;
                                    if (sprite_object.folder_index === map_instruction.folder_index && sprite_object.file_index === map_instruction.file_index) {
                                        sprite_object.folder_index = map_instruction.target_folder_index;
                                        sprite_object.file_index = map_instruction.target_file_index;
                                    }
                                    break;
                                case "bone":
                                case "box":
                                case "sound":
                                case "event":
                                case "entity":
                                case "variable":
                                    break;
                                default:
                                    throw new Error(object.type);
                            }
                        });
                    });
                }
            });
            pose_object_array_1.forEach(function (object) {
                switch (object.type) {
                    case "sprite":
                        var sprite_object = object;
                        var bone = pose_bone_array_1[sprite_object.parent_index];
                        if (bone) {
                            Space.combine(bone.world_space, sprite_object.local_space, sprite_object.world_space);
                        }
                        else {
                            sprite_object.world_space.copy(sprite_object.local_space);
                        }
                        var folder = pose.data.folder_array[sprite_object.folder_index];
                        var file = folder && folder.file_array[sprite_object.file_index];
                        if (file) {
                            var image_file = file;
                            var pivot = sprite_object.default_pivot ? image_file.pivot : sprite_object.pivot;
                            var offset_x = (0.5 - pivot.x) * image_file.width;
                            var offset_y = (0.5 - pivot.y) * image_file.height;
                            Space.translate(sprite_object.world_space, offset_x, offset_y);
                        }
                        break;
                    case "bone": {
                        var bone_object = object;
                        var bone_1 = pose_bone_array_1[bone_object.parent_index];
                        if (bone_1) {
                            Space.combine(bone_1.world_space, bone_object.local_space, bone_object.world_space);
                        }
                        else {
                            bone_object.world_space.copy(bone_object.local_space);
                        }
                        break;
                    }
                    case "box": {
                        var box_object = object;
                        var bone_2 = pose_bone_array_1[box_object.parent_index];
                        if (bone_2) {
                            Space.combine(bone_2.world_space, box_object.local_space, box_object.world_space);
                        }
                        else {
                            box_object.world_space.copy(box_object.local_space);
                        }
                        var obj_info = entity.obj_info_map[object.name];
                        if (obj_info) {
                            var box_obj_info = obj_info;
                            var offset_x = (0.5 - box_object.pivot.x) * box_obj_info.w;
                            var offset_y = (0.5 - box_object.pivot.y) * box_obj_info.h;
                            Space.translate(box_object.world_space, offset_x, offset_y);
                        }
                        break;
                    }
                    case "point": {
                        var point_object = object;
                        var bone_3 = pose_bone_array_1[point_object.parent_index];
                        if (bone_3) {
                            Space.combine(bone_3.world_space, point_object.local_space, point_object.world_space);
                        }
                        else {
                            point_object.world_space.copy(point_object.local_space);
                        }
                        break;
                    }
                    case "sound":
                        break;
                    case "entity": {
                        var entity_object = object;
                        var bone_4 = pose_bone_array_1[entity_object.parent_index];
                        if (bone_4) {
                            Space.combine(bone_4.world_space, entity_object.local_space, entity_object.world_space);
                        }
                        else {
                            entity_object.world_space.copy(entity_object.local_space);
                        }
                        break;
                    }
                    case "variable":
                        break;
                    default:
                        throw new Error(object.type);
                }
            });
            pose_object_array_1.forEach(function (object) {
                switch (object.type) {
                    case "entity":
                        var entity_object = object;
                        var sub_pose = (entity_object.pose = entity_object.pose || new Pose(pose.data));
                        var sub_entity_key = sub_pose.data.entity_keys[entity_object.entity_index];
                        if (sub_entity_key !== sub_pose.getEntity()) {
                            sub_pose.setEntity(sub_entity_key);
                        }
                        var sub_entity = sub_pose.curEntity();
                        var sub_anim_key = sub_entity.animation_keys[entity_object.animation_index];
                        if (sub_anim_key !== sub_pose.getAnim()) {
                            sub_pose.setAnim(sub_anim_key);
                            var anim_length = sub_pose.curAnimLength();
                            var sub_time = entity_object.animation_time * anim_length;
                            sub_pose.setTime(sub_time);
                        }
                        else {
                            var anim_length = sub_pose.curAnimLength();
                            var sub_time = entity_object.animation_time * anim_length;
                            var sub_dt = sub_time - sub_pose.getTime();
                            sub_pose.update(sub_dt);
                        }
                        sub_pose.strike();
                        break;
                }
            });
            pose.sound_array = [];
            anim.soundline_array.forEach(function (soundline) {
                function add_sound(sound_keyframe) {
                    var folder = pose.data.folder_array[sound_keyframe.sound.folder_index];
                    var file = folder && folder.file_array[sound_keyframe.sound.file_index];
                    pose.sound_array.push({ name: file.name, volume: sound_keyframe.sound.volume, panning: sound_keyframe.sound.panning });
                }
                if (elapsed_time < 0) {
                    if (wrapped_min) {
                        soundline.keyframe_array.forEach(function (sound_keyframe) {
                            if ((anim.min_time <= sound_keyframe.time && sound_keyframe.time < prev_time) || (time <= sound_keyframe.time && sound_keyframe.time <= anim.max_time)) {
                                add_sound(sound_keyframe);
                            }
                        });
                    }
                    else {
                        soundline.keyframe_array.forEach(function (sound_keyframe) {
                            if (time <= sound_keyframe.time && sound_keyframe.time < prev_time) {
                                add_sound(sound_keyframe);
                            }
                        });
                    }
                }
                else {
                    if (wrapped_max) {
                        soundline.keyframe_array.forEach(function (sound_keyframe) {
                            if ((anim.min_time <= sound_keyframe.time && sound_keyframe.time <= time) || (prev_time < sound_keyframe.time && sound_keyframe.time <= anim.max_time)) {
                                add_sound(sound_keyframe);
                            }
                        });
                    }
                    else {
                        soundline.keyframe_array.forEach(function (sound_keyframe) {
                            if (prev_time < sound_keyframe.time && sound_keyframe.time <= time) {
                                add_sound(sound_keyframe);
                            }
                        });
                    }
                }
            });
            pose.event_array = [];
            anim.eventline_array.forEach(function (eventline) {
                function add_event(event_keyframe) {
                    pose.event_array.push(eventline.name);
                }
                if (elapsed_time < 0) {
                    if (wrapped_min) {
                        eventline.keyframe_array.forEach(function (event_keyframe) {
                            if ((anim.min_time <= event_keyframe.time && event_keyframe.time < prev_time) || (time <= event_keyframe.time && event_keyframe.time <= anim.max_time)) {
                                add_event(event_keyframe);
                            }
                        });
                    }
                    else {
                        eventline.keyframe_array.forEach(function (event_keyframe) {
                            if (time <= event_keyframe.time && event_keyframe.time < prev_time) {
                                add_event(event_keyframe);
                            }
                        });
                    }
                }
                else {
                    if (wrapped_max) {
                        eventline.keyframe_array.forEach(function (event_keyframe) {
                            if ((anim.min_time <= event_keyframe.time && event_keyframe.time <= time) || (prev_time < event_keyframe.time && event_keyframe.time <= anim.max_time)) {
                                add_event(event_keyframe);
                            }
                        });
                    }
                    else {
                        eventline.keyframe_array.forEach(function (event_keyframe) {
                            if (prev_time < event_keyframe.time && event_keyframe.time <= time) {
                                add_event(event_keyframe);
                            }
                        });
                    }
                }
            });
            if (anim.meta) {
                if (anim.meta.tagline) {
                    var add_tag_1 = function (tag_keyframe) {
                        pose.tag_array = [];
                        tag_keyframe.tag_array.forEach(function (tag) {
                            var tag_def = pose.data.tag_def_array[tag.tag_def_index];
                            pose.tag_array.push(tag_def.name);
                        });
                        pose.tag_array.sort();
                    };
                    if (elapsed_time < 0) {
                        if (wrapped_min) {
                            anim.meta.tagline.keyframe_array.forEach(function (tag_keyframe) {
                                if ((anim.min_time <= tag_keyframe.time && tag_keyframe.time < prev_time) || (time <= tag_keyframe.time && tag_keyframe.time <= anim.max_time)) {
                                    add_tag_1(tag_keyframe);
                                }
                            });
                        }
                        else {
                            anim.meta.tagline.keyframe_array.forEach(function (tag_keyframe) {
                                if (time <= tag_keyframe.time && tag_keyframe.time < prev_time) {
                                    add_tag_1(tag_keyframe);
                                }
                            });
                        }
                    }
                    else {
                        if (wrapped_max) {
                            anim.meta.tagline.keyframe_array.forEach(function (tag_keyframe) {
                                if ((anim.min_time <= tag_keyframe.time && tag_keyframe.time <= time) || (prev_time < tag_keyframe.time && tag_keyframe.time <= anim.max_time)) {
                                    add_tag_1(tag_keyframe);
                                }
                            });
                        }
                        else {
                            anim.meta.tagline.keyframe_array.forEach(function (tag_keyframe) {
                                if (prev_time < tag_keyframe.time && tag_keyframe.time <= time) {
                                    add_tag_1(tag_keyframe);
                                }
                            });
                        }
                    }
                }
                pose.var_map = pose.var_map || {};
                anim.meta.varline_array.forEach(function (varline) {
                    var keyframe_array = varline.keyframe_array;
                    var keyframe_index1 = Keyframe.find(keyframe_array, time);
                    if (keyframe_index1 !== -1) {
                        var keyframe_index2 = (keyframe_index1 + 1) % keyframe_array.length;
                        var keyframe1 = keyframe_array[keyframe_index1];
                        var keyframe2 = keyframe_array[keyframe_index2];
                        var time1 = keyframe1.time;
                        var time2 = keyframe2.time;
                        if (time2 < time1) {
                            time2 = anim.length;
                        }
                        var pct = 0.0;
                        if (time1 !== time2) {
                            pct = (time - time1) / (time2 - time1);
                        }
                        var var_def = entity.var_defs.var_def_array[varline.var_def_index];
                        var val = 0;
                        switch (var_def.type) {
                            case "int":
                                val = 0 | tween(+keyframe1.val, +keyframe2.val, pct);
                                break;
                            case "float":
                                val = tween(+keyframe1.val, +keyframe2.val, pct);
                                break;
                            case "string":
                                val = keyframe1.val;
                        }
                        pose.var_map[var_def.name] = val;
                    }
                });
            }
        }
    };
    return Pose;
}());
var Modo = (function (_super) {
    __extends(Modo, _super);
    function Modo(data) {
        var _this = _super.call(this, data) || this;
        _this._nombre_del_fondo = "";
        _this.es_modo_ejecucion = false;
        return _this;
    }
    Modo.prototype.create = function (datos, ancho, alto) {
        this.ancho = ancho;
        this.alto = alto;
        this.canvas_fisica = this.sys.add.graphics({ x: 0, y: 0 });
        this.canvas_fisica.depth = 99999;
        this.crear_indicadores_de_rendimiento_fps();
        this.crear_canvas_de_depuracion();
        this.pilas = datos.pilas;
        if (datos.proyecto && datos.proyecto.fps === 30) {
            this.matter.set30Hz();
        }
    };
    Modo.prototype.crear_indicadores_de_rendimiento_fps = function () {
        this.fps = this.add.bitmapText(5, 10, "color-blanco-con-sombra", "");
        this.fps.scrollFactorX = 0;
        this.fps.scrollFactorY = 0;
        this.fps.depth = 999999;
    };
    Modo.prototype.destacar_actor_por_id = function (id) {
        var actor = this.obtener_actor_por_id(id);
        if (actor) {
            actor.destacar();
        }
    };
    Modo.prototype.crear_canvas_de_depuracion = function () {
        var graphics = this.add.graphics();
        graphics.depth = 20000;
        this.graphics = graphics;
    };
    Modo.prototype.crear_manejadores_para_controlar_el_zoom = function (emitir_mensajes_al_editor) {
        var escena = this;
        this.input.on("wheel", function (pointer, currentlyOver, dx, dy, dz, event) {
            var zoom = this.cameras.main.zoom;
            if (dy > 0) {
                zoom += 0.25;
            }
            else {
                zoom -= 0.25;
            }
            zoom = Math.max(1, zoom);
            zoom = Math.min(5, zoom);
            if (emitir_mensajes_al_editor) {
                escena.pilas.mensajes.emitir_mensaje_al_editor("cambia_zoom", { zoom: zoom });
            }
            this.cameras.main.setZoom(zoom);
        });
    };
    Modo.prototype.update = function (actores) {
        var _this = this;
        this.graphics.clear();
        actores = actores || this.actores;
        if (this.pilas.depurador.modo_posicion_activado && !this.es_modo_ejecucion) {
            actores.map(function (sprite) {
                _this.dibujar_punto_de_control(_this.graphics, sprite.x, sprite.y);
            });
        }
        if (this.fps) {
            if (this.pilas.depurador.mostrar_fps && !this.es_modo_ejecucion) {
                this.fps.alpha = 1;
                var x = this.pilas.cursor_x;
                var y = this.pilas.cursor_y;
                this.fps.text = [
                    "FPS: " + Math.round(this.pilas.game.loop["actualFps"]),
                    "Cantidad de actores: " + actores.length,
                    "Cursor X: " + x,
                    "Cursor Y: " + y
                ].join("\n");
            }
            else {
                this.fps.alpha = 0;
            }
        }
    };
    Modo.prototype.actualizar_canvas_fisica = function () {
        var canvas = this.canvas_fisica;
        var figuras = pilasengine.modo.matter.world.localWorld.bodies;
        canvas.clear();
        for (var i = 0; i < figuras.length; i++) {
            var figura = figuras[i];
            var color = null;
            if (figura.es_sensor) {
                color = 0xff4040;
            }
            else {
                if (figura.es_dinamica) {
                    color = 0x00ff00;
                }
                else {
                    color = 0x0000ff;
                }
            }
            this.dibujar_figura_desde_vertices(canvas, 2, color, figura.vertices);
        }
    };
    Modo.prototype.dibujar_figura_desde_vertices = function (canvas, linea, color, vertices) {
        canvas.beginPath();
        canvas.lineStyle(linea, color, 2);
        canvas.moveTo(vertices[0].x, vertices[0].y);
        var vertLength = vertices.length;
        for (var j = 1; j < vertLength; j++) {
            if (!vertices[j - 1].isInternal) {
                canvas.lineTo(vertices[j].x, vertices[j].y);
            }
            else {
                canvas.moveTo(vertices[j].x, vertices[j].y);
            }
            if (vertices[j].isInternal) {
                canvas.moveTo(vertices[(j + 1) % vertices.length].x, vertices[(j + 1) % vertices.length].y);
            }
        }
        canvas.lineTo(vertices[0].x, vertices[0].y);
        canvas.closePath();
        canvas.strokePath();
    };
    Modo.prototype.obtener_posicion_de_la_camara = function () {
        var x = this.pilas.modo.cameras.cameras[0].scrollX;
        var y = this.pilas.modo.cameras.cameras[0].scrollY;
        return { x: x, y: y };
    };
    Modo.prototype.crear_fondo = function (fondo, ancho, alto) {
        this._nombre_del_fondo = fondo;
        this.pilas.utilidades.validar_que_existe_imagen(fondo);
        ancho = ancho || this.ancho;
        alto = alto || this.alto;
        if (fondo.indexOf(":") > -1) {
            var g = fondo.split(":")[0];
            var i = fondo.split(":")[1];
            this.fondo = this.add.tileSprite(0, 0, ancho, alto, g, i);
        }
        else {
            this.fondo = this.add.tileSprite(0, 0, ancho, alto, fondo);
        }
        this.fondo.depth = -20000;
        this.fondo.setOrigin(0);
    };
    Modo.prototype.posicionar_fondo = function (dx, dy) {
        if (!dx) {
            dx = 0;
        }
        if (!dy) {
            dy = 0;
        }
        var posicion_de_la_camara = this.obtener_posicion_de_la_camara();
        if (this.fondo) {
            this.fondo.x = posicion_de_la_camara.x;
            this.fondo.y = posicion_de_la_camara.y;
            this.fondo.tilePositionX = posicion_de_la_camara.x + dx;
            this.fondo.tilePositionY = posicion_de_la_camara.y + dy;
        }
    };
    Modo.prototype.cambiar_fondo = function (fondo, ancho, alto) {
        if (ancho === void 0) { ancho = null; }
        if (alto === void 0) { alto = null; }
        if (fondo !== this._nombre_del_fondo) {
            this.fondo.destroy();
            this.fondo = null;
            this.crear_fondo(fondo, ancho, alto);
        }
    };
    Modo.prototype.obtener_actor_por_id = function (id) {
        return this.pilas.modo.actores.filter(function (e) { return e.id === id; })[0];
    };
    Modo.prototype.actualizar_sprite_desde_datos = function (sprite, actor) {
        var _this = this;
        var coordenada = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(actor.x, actor.y);
        this.pilas.utilidades.validar_que_existe_imagen(actor.imagen);
        if (actor.imagen.indexOf(":") > -1) {
            var g = actor.imagen.split(":")[0];
            var i = actor.imagen.split(":")[1];
            sprite.setTexture(g, i);
        }
        else {
            sprite.setTexture(actor.imagen);
        }
        sprite.input.hitArea.width = sprite.width;
        sprite.input.hitArea.height = sprite.height;
        if (actor.activo === false) {
            sprite.alpha = 0.5;
        }
        else {
            sprite.alpha = 1 - actor.transparencia / 100;
        }
        sprite.id = actor.id;
        sprite.x = coordenada.x;
        sprite.y = coordenada.y;
        sprite.angle = -actor.rotacion;
        sprite.scaleX = actor.escala_x;
        sprite.scaleY = actor.escala_y;
        sprite.depth = -actor.z || 0;
        sprite.setOrigin(actor.centro_x, actor.centro_y);
        if (sprite.figura) {
            this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, sprite.figura);
        }
        if (actor.figura) {
            sprite.figura = this.crear_figura_estatica_para(actor);
        }
        this.actualizar_sensores_del_actor(actor, sprite);
        sprite.setFlipX(actor.espejado);
        sprite.setFlipY(actor.espejado_vertical);
        if (actor.es_texto) {
            if (sprite["texto"] && sprite["texto_fuente"] !== actor.fuente) {
                sprite["texto"].destroy();
                sprite["texto"] = undefined;
                if (sprite["fondo"]) {
                    sprite["fondo"].destroy();
                }
            }
            if (!sprite["texto"]) {
                sprite["texto"] = this.add.bitmapText(0, 0, actor.fuente, actor.texto);
                sprite["texto_fuente"] = actor.fuente;
                sprite.update = function () {
                    _this.copiar_valores_de_sprite_a_texto(sprite);
                };
                if (actor.fondo) {
                    var imagen = this.obtener_imagen_para_nineslice(actor.fondo);
                    var f = this.add["nineslice"](0, 0, 30, 20, imagen, 10, 10);
                    sprite["fondo"] = f;
                    sprite["fondo_imagen"] = actor.fondo;
                }
            }
            sprite["texto"].text = actor.texto;
            if (actor.fondo !== sprite["fondo_imagen"]) {
                if (sprite["fondo"]) {
                    sprite["fondo"].destroy();
                }
                if (actor.fondo) {
                    var imagen = this.obtener_imagen_para_nineslice(actor.fondo);
                    var f = this.add["nineslice"](0, 0, 30, 20, imagen, 10, 10);
                    sprite["fondo"] = f;
                    sprite["fondo_imagen"] = actor.fondo;
                }
            }
            this.copiar_valores_de_sprite_a_texto(sprite);
        }
    };
    Modo.prototype.actualizar_sensores_del_actor = function (actor, sprite) {
        var _this = this;
        if (sprite.sensores) {
            sprite.sensores.map(function (sensor) {
                _this.pilas.Phaser.Physics.Matter.Matter.World.remove(_this.pilas.modo.matter.world.localWorld, sensor);
            });
        }
        if (actor.sensores) {
            sprite.sensores = actor.sensores.map(function (sensor) {
                var figura = _this.matter.add.rectangle(sensor.x + sprite.x, -sensor.y + sprite.y, sensor.ancho, sensor.alto, {
                    isStatic: true
                });
                figura["es_sensor"] = true;
                figura["dx"] = sensor.x;
                figura["dy"] = sensor.y;
                return figura;
            });
        }
    };
    Modo.prototype.obtener_imagen_para_nineslice = function (imagen) {
        if (imagen.indexOf(":") > -1) {
            var partes = imagen.split(":");
            return { key: partes[0], frame: partes[1] };
        }
        else {
            return imagen;
        }
    };
    Modo.prototype.copiar_valores_de_sprite_a_texto = function (sprite) {
        var texto = sprite["texto"];
        var fondo = sprite["fondo"];
        texto.x = sprite.x;
        texto.y = sprite.y;
        texto.angle = sprite.angle;
        texto.scaleX = sprite.scaleX;
        texto.scaleY = sprite.scaleY;
        texto.alpha = sprite.alpha;
        texto.flipX = sprite.flipX;
        texto.flipY = sprite.flipY;
        texto.setOrigin(sprite.originX, sprite.originY);
        texto.depth = sprite.depth + 0.1;
        if (sprite.input) {
            sprite.input.hitArea.width = texto.width;
            sprite.input.hitArea.height = texto.height;
            sprite.input.hitArea.x = -texto.width / 2;
            sprite.input.hitArea.y = -texto.height / 2;
        }
        if (fondo) {
            var margen = 30;
            fondo.x = sprite.x;
            fondo.y = sprite.y;
            fondo.angle = sprite.angle;
            fondo.scaleX = sprite.scaleX;
            fondo.scaleY = sprite.scaleY;
            fondo.setOrigin(sprite.originX, sprite.originY);
            fondo.alpha = sprite.alpha;
            fondo.flipX = sprite.flipX;
            fondo.flipY = sprite.flipY;
            fondo.resize(texto.width + margen, texto.height + margen);
            if (sprite["fondo_imagen"].includes("dialogo")) {
                fondo.y += 4;
            }
            fondo.depth = texto.depth - 1;
            sprite.width = texto.width + margen;
            sprite.height = texto.height + margen;
            if (sprite.input) {
                sprite.setOrigin(sprite.originX, sprite.originY);
                sprite.input.hitArea.width = texto.width + margen;
                sprite.input.hitArea.height = texto.height + margen;
            }
        }
    };
    Modo.prototype.crear_figura_estatica_para = function (actor) {
        var coordenada = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(actor.x, actor.y);
        var angulo = this.pilas.utilidades.convertir_angulo_a_radianes(-actor.rotacion);
        var figura = null;
        if (actor.figura === "rectangulo") {
            figura = this.matter.add.rectangle(coordenada.x, coordenada.y, actor.figura_ancho, actor.figura_alto, {
                isStatic: true,
                angle: angulo
            });
            figura.es_sensor = actor.figura_sensor;
            figura.es_dinamica = actor.figura_dinamica;
            return figura;
        }
        if (actor.figura === "circulo") {
            var figura_1 = this.matter.add.circle(coordenada.x, coordenada.y, actor.figura_radio, {
                isStatic: true,
                angule: angulo
            }, 25);
            figura_1["es_sensor"] = actor.figura_sensor;
            figura_1["es_dinamica"] = actor.figura_dinamica;
            return figura_1;
        }
        throw Error("No se reconoce la figura " + actor.figura + " en este modo.");
    };
    Modo.prototype.actualizar_posicion = function (posicion) {
        if (posicion === void 0) { posicion = null; }
        throw Error("No se puede actualizar posicion en este modo. Solo se puede en el modo pausa.");
    };
    Modo.prototype.dibujar_punto_de_control = function (graphics, x, y) {
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(x - 3, y - 3, 6, 6);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(x - 2, y - 2, 4, 4);
    };
    return Modo;
}(Phaser.Scene));
var ModoCargador = (function (_super) {
    __extends(ModoCargador, _super);
    function ModoCargador() {
        return _super.call(this, { key: "ModoCargador" }) || this;
    }
    ModoCargador.prototype.preload = function () {
        var _this = this;
        this.load.crossOrigin = "anonymous";
        this.contador = 0;
        this.crear_indicador_de_carga();
        this.load.multiatlas("imagenes", "imagenes.json", "./");
        this.load.multiatlas("bloques", "bloques.json", "./");
        this.load.multiatlas("decoracion", "decoracion.json", "./");
        this.load.multiatlas("fuentes", "fuentes.json", "./");
        this.load.json("fuentes-datos-json", "fuentes-datos.json");
        for (var i = 0; i < this.pilas.recursos.sonidos.length; i++) {
            var sonido = this.pilas.recursos.sonidos[i];
            this.load.audio(sonido.nombre, sonido.ruta, {});
        }
        if (this.pilas.recursos.atlas) {
            for (var i = 0; i < this.pilas.recursos.atlas.length; i++) {
                var atlas = this.pilas.recursos.atlas[i];
                this.load.multiatlas(atlas.nombre, atlas.archivo, atlas.ruta);
            }
        }
        if (this.pilas.recursos.huesos) {
            for (var i = 0; i < this.pilas.recursos.huesos.length; i++) {
                var hueso = this.pilas.recursos.huesos[i];
                this.load.json(hueso.nombre, hueso.ruta);
            }
        }
        else {
            this.load.multiatlas("atlas-robot", "robot.json", "./");
            this.load.json("robot", "robot.scon");
        }
        if (this.pilas.recursos.imagenes) {
            for (var i = 0; i < this.pilas.recursos.imagenes.length; i++) {
                var imagen = this.pilas.recursos.imagenes[i];
                this.load.image(imagen.nombre, imagen.ruta);
            }
        }
        if (this.pilas.imagenes) {
            this.pilas.imagenes.map(function (item) {
                _this.textures.addBase64(item.nombre, item.contenido);
            });
        }
        this.load.on("progress", this.cuando_progresa_la_carga, this);
    };
    ModoCargador.prototype.init = function (data) {
        this.pilas = data.pilas;
    };
    ModoCargador.prototype.crear_indicador_de_carga = function () {
        var progressBox = this.add.graphics();
        var borde = this.add.graphics();
        this.barra_de_progreso = this.add.graphics();
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: "Iniciando ...",
            style: {
                font: "14px verdana",
                fill: "#ffffff"
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        this.x = width / 2 - 310 / 2;
        borde.lineStyle(1, 0x555555, 1);
        borde.strokeRect(this.x, 220, 310, 20);
        progressBox.fillStyle(0x222222, 1);
        progressBox.fillRect(this.x, 220, 310, 20);
    };
    ModoCargador.prototype.update = function () {
        this.contador += 1;
        if (this.contador === 60) {
            var msg = "Carga finalizada\nTiene que enviar la señal 'ejecutar_proyecto'";
            this.add.text(5, 5, msg);
        }
    };
    ModoCargador.prototype.notificar_imagenes_cargadas = function () {
        var imagenes = [];
        for (var key in this.game.textures.list) {
            if (key.indexOf("__") === -1 && key) {
                var contenido = this.game.textures.list[key];
                if (contenido.frameTotal === 1) {
                    imagenes.push(key);
                }
                else {
                    var frames_1 = contenido.getFrameNames();
                    for (var i = 0; i < frames_1.length; i++) {
                        imagenes.push(key + ":" + frames_1[i]);
                    }
                }
            }
        }
        this.pilas.imagenes_precargadas = imagenes;
    };
    ModoCargador.prototype.create = function () {
        this.crear_fuente_bitmap("color-negro");
        this.crear_fuente_bitmap("color-blanco");
        this.crear_fuente_bitmap("color-blanco-con-sombra-chico");
        this.crear_fuente_bitmap("color-blanco-con-sombra-grande");
        this.crear_fuente_bitmap("color-blanco-con-sombra-medio");
        this.crear_fuente_bitmap("color-blanco-con-sombra");
        this.crear_fuente_bitmap("pixel-color-negro");
        this.crear_fuente_bitmap("pixel-color-blanco");
        _super.prototype.create.call(this, { pilas: this.pilas }, 500, 500);
        this.notificar_imagenes_cargadas();
        if (this.pilas.opciones.modo_simple) {
            this.pilas.definir_modo("ModoEjecucion", {
                pilas: this.pilas,
                nombre_de_la_escena_inicial: "principal",
                es_cambio_de_escena: false,
                codigo: "\n\n        var __extends = (this && this.__extends) || (function () {\n          var extendStatics = function (d, b) {\n              extendStatics = Object.setPrototypeOf ||\n                  ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n                  function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n              return extendStatics(d, b);\n          }\n          return function (d, b) {\n              extendStatics(d, b);\n              function __() { this.constructor = d; }\n              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n          };\n      })();\n      var Proyecto = /** @class */ (function () {\n          function Proyecto() {\n          }\n          Proyecto.prototype.iniciar = function () {\n          };\n          return Proyecto;\n      }());\n      var principal = /** @class */ (function (_super) {\n          __extends(principal, _super);\n          function principal() {\n              return _super !== null && _super.apply(this, arguments) || this;\n          }\n          principal.prototype.iniciar = function () {\n          };\n          principal.prototype.actualizar = function () {\n          };\n          return principal;\n      }(Escena));\n      ",
                proyecto: {
                    alto: 200,
                    ancho: 200,
                    titulo: "sin usar",
                    escena_inicial: 3,
                    codigos: {
                        escenas: [
                            {
                                nombre: "principal",
                                codigo: "\n                  class principal extends Escena {\n                    iniciar() {\n\n                    }\n\n                    actualizar() {\n\n                    }\n                  }"
                            }
                        ],
                        actores: []
                    },
                    escenas: [
                        {
                            nombre: "principal",
                            id: 3,
                            ancho: 200,
                            alto: 200,
                            fondo: "decoracion:fondos/fondo-plano",
                            actores: [],
                            camara_x: 0,
                            camara_y: 0
                        }
                    ]
                }
            });
        }
        else {
            this.pilas.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos");
        }
    };
    ModoCargador.prototype.crear_fuente_bitmap = function (nombre) {
        var ParseXMLBitmapFont = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont;
        var frame = this.sys.textures.getFrame("fuentes", nombre);
        var json = this.sys.cache.json.get("fuentes-datos-json");
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(json[nombre].contenido, "application/xml");
        var data = ParseXMLBitmapFont(xmlDoc, undefined, undefined, nombre);
        this.sys.cache.bitmapFont.add(nombre, { data: data, texture: "fuentes", frame: nombre });
    };
    ModoCargador.prototype.cuando_progresa_la_carga = function (progreso) {
        this.barra_de_progreso.clear();
        this.barra_de_progreso.fillStyle(0xffffff, 1);
        this.barra_de_progreso.fillRect(this.x + 5, 220 + 5, 300 * progreso, 10);
        if (this.pilas.opciones.modo_simple) {
        }
        else {
            this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", {
                progreso: Math.ceil(progreso * 100)
            });
        }
    };
    return ModoCargador;
}(Modo));
var ModoEditor = (function (_super) {
    __extends(ModoEditor, _super);
    function ModoEditor() {
        return _super.call(this, { key: "ModoEditor" }) || this;
    }
    ModoEditor.prototype.preload = function () { };
    ModoEditor.prototype.create = function (datos) {
        _super.prototype.create.call(this, datos, datos.proyecto.ancho, datos.proyecto.alto);
        this.actores = [];
        this.pilas = datos.pilas;
        this.usar_grilla = false;
        this.tamaño_de_la_grilla = 256;
        this.crear_sprite_para_el_cursor_de_la_grilla();
        this.crear_fondo(datos.escena.fondo, datos.escena.ancho, datos.escena.alto);
        this.posicionar_la_camara(datos.escena);
        this.aplicar_limites_a_la_camara(datos.escena);
        this.crear_minimap(datos.escena);
        this.crear_sprite_con_el_borde_de_la_camara(datos.escena);
        this.crear_actores_desde_los_datos_de_la_escena(datos.escena);
        this.hacer_que_el_fondo_se_pueda_arrastrar();
        this.crear_manejadores_para_hacer_arrastrables_los_actores_y_la_camara();
        this.crear_manejadores_para_controlar_el_zoom(true);
        this.conectar_movimiento_del_mouse();
        this.conectar_eventos_de_teclado();
        this.pilas.game.scale.scaleMode = Phaser.Scale.FIT;
        this.pilas.game.scale.resize(this.ancho, this.alto);
    };
    ModoEditor.prototype.conectar_eventos_de_teclado = function () {
        this.input.keyboard.on("keyup", this.manejar_evento_key_up.bind(this));
    };
    ModoEditor.prototype.crear_fondo = function (fondo, ancho, alto) {
        if (ancho === void 0) { ancho = null; }
        if (alto === void 0) { alto = null; }
        this._nombre_del_fondo = fondo;
        this.pilas.utilidades.validar_que_existe_imagen(fondo);
        ancho = ancho || this.ancho;
        alto = alto || this.alto;
        if (fondo.indexOf(":") > -1) {
            var g = fondo.split(":")[0];
            var i = fondo.split(":")[1];
            this.fondo = this.add.tileSprite(0, 0, ancho, alto, g, i);
        }
        else {
            this.fondo = this.add.tileSprite(0, 0, ancho, alto, fondo);
        }
        this.fondo.depth = -20000;
        this.fondo.setOrigin(0);
    };
    ModoEditor.prototype.manejar_evento_key_up = function (evento) {
        if (evento.key === "d") {
            this.pilas.mensajes.emitir_mensaje_al_editor("duplicar_el_actor_seleccionado", {});
        }
        if (evento.key === "x") {
            this.pilas.mensajes.emitir_mensaje_al_editor("eliminar_el_actor_seleccionado", {});
        }
        if (evento.key === "n") {
            this.pilas.mensajes.emitir_mensaje_al_editor("crear_un_actor_desde_atajo", {});
        }
    };
    ModoEditor.prototype.crear_sprite_para_el_cursor_de_la_grilla = function () {
        var x = 0;
        var y = 0;
        if (this.sprite_cursor_de_la_grilla) {
            x = this.sprite_cursor_de_la_grilla.x;
            y = this.sprite_cursor_de_la_grilla.y;
            this.sprite_cursor_de_la_grilla.destroy();
        }
        var sprite = this.add.rectangle(x, y, this.tamaño_de_la_grilla, this.tamaño_de_la_grilla);
        sprite.setStrokeStyle(1, 0xffffff);
        sprite.depth = 9999999;
        this.sprite_cursor_de_la_grilla = sprite;
    };
    ModoEditor.prototype.crear_minimap = function (escena) {
        var game = this;
        var w = 100;
        var h = 70;
        var p = 5;
        var width = this.ancho;
        var height = this.alto;
        var ancho_del_escenario = escena.ancho;
        var alto_del_escenario = escena.alto;
        this.minimap = game.cameras.add(width - w - p, height - h - p, w, h).setZoom(0.1);
        this.minimap.setBounds(0, 0, ancho_del_escenario, alto_del_escenario);
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 0;
        this.minimap.scrollY = 0;
        this.minimap.inputEnabled = false;
        this.minimap.ignore(this.fondo);
        this.minimap.ignore(this.fps);
    };
    ModoEditor.prototype.crear_sprite_con_el_borde_de_la_camara = function (_a) {
        var camara_x = _a.camara_x, camara_y = _a.camara_y;
        this.sprite_borde_de_la_camara = this.add.rectangle(this.ancho / 2, this.alto / 2, this.ancho, this.alto);
        this.sprite_borde_de_la_camara.setStrokeStyle(3, 0xffffff);
        this.sprite_borde_de_la_camara.depth = 999999;
        this.sprite_borde_de_la_camara.x = camara_x + this.ancho / 2;
        this.sprite_borde_de_la_camara.y = -camara_y + this.alto / 2;
        this.cameras.cameras[0].ignore(this.sprite_borde_de_la_camara);
    };
    ModoEditor.prototype.hacer_que_el_fondo_se_pueda_arrastrar = function () {
        this.fondo.setInteractive();
        this.input.setDraggable(this.fondo, undefined);
        this.fondo["es_fondo"] = true;
    };
    ModoEditor.prototype.aplicar_limites_a_la_camara = function (escena) {
        this.cameras.cameras[0].setBounds(0, 0, escena.ancho, escena.alto);
    };
    ModoEditor.prototype.conectar_movimiento_del_mouse = function () {
        var _this = this;
        this.input.on("pointermove", function (evento) {
            var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
            _this.pilas.cursor_x = Math.trunc(posicion.x);
            _this.pilas.cursor_y = Math.trunc(posicion.y);
            var posicion_absoluta = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
            _this.pilas.cursor_x_absoluta = Math.trunc(posicion_absoluta.x);
            _this.pilas.cursor_y_absoluta = Math.trunc(posicion_absoluta.y);
        });
    };
    ModoEditor.prototype.crear_manejadores_para_hacer_arrastrables_los_actores_y_la_camara = function () {
        var _this = this;
        var escena = this;
        this.input.on("dragstart", function (pointer, gameObject) {
            _this.mover_cursor_de_la_grilla(pointer.worldX, pointer.worldY);
            _this.posicion_anterior_de_arrastre = pointer.position.clone();
            if (!gameObject["es_fondo"]) {
                escena.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_mover_un_actor", { id: gameObject.id });
            }
            if (escena.pilas.utilidades.es_firefox()) {
                escena.input.setDefaultCursor("grabbing");
            }
            else {
                escena.input.setDefaultCursor("-webkit-grabbing");
            }
        });
        this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
            if (gameObject["es_fondo"]) {
                _this.desplazar_la_camara_desde_el_evento_drag(pointer);
            }
            else {
                _this.desplazar_actor_desde_el_evento_drag(gameObject, pointer);
            }
        });
        this.input.on("dragend", function (pointer, gameObject) {
            escena.input.setDefaultCursor("default");
            if (!gameObject["es_fondo"]) {
                if (_this.usar_grilla) {
                    _this.ajustar_posicion_a_la_grilla(gameObject);
                }
                var posicion = escena.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(gameObject.x, gameObject.y);
                escena.pilas.mensajes.emitir_mensaje_al_editor("termina_de_mover_un_actor", { id: gameObject.id, x: posicion.x, y: posicion.y });
            }
        });
    };
    ModoEditor.prototype.ajustar_posicion_a_la_grilla = function (gameObject) {
        gameObject.x = this.sprite_cursor_de_la_grilla.x;
        gameObject.y = this.sprite_cursor_de_la_grilla.y;
        this.ajustar_figura(gameObject);
        this.ajustar_sensores(gameObject);
    };
    ModoEditor.prototype.cuando_cambia_grilla_desde_el_selector_manual = function (grilla) {
        if (grilla === 0) {
            this.usar_grilla = false;
            this.tamaño_de_la_grilla = 0;
        }
        else {
            this.usar_grilla = true;
            this.tamaño_de_la_grilla = grilla;
        }
        this.crear_sprite_para_el_cursor_de_la_grilla();
        if (grilla === 0) {
            this.sprite_cursor_de_la_grilla.alpha = 0;
        }
        else {
            this.sprite_cursor_de_la_grilla.alpha = 1;
        }
    };
    ModoEditor.prototype.desplazar_la_camara_desde_el_evento_drag = function (pointer) {
        var zoom = this.cameras.main.zoom;
        var factor = this.obtener_factores();
        var dx = this.posicion_anterior_de_arrastre.x - pointer.position.x;
        var dy = this.posicion_anterior_de_arrastre.y - pointer.position.y;
        this.cameras.main.scrollX += dx / factor.x / zoom;
        this.cameras.main.scrollY += dy / factor.y / zoom;
        this.posicion_anterior_de_arrastre = pointer.position.clone();
        this.actualizar_posicion_del_minimap_y_el_borde_de_camara();
    };
    ModoEditor.prototype.obtener_factores = function () {
        var factor_horizontal = Math.min(1, this.ancho / this.alto);
        var factor_vertical = Math.min(1, this.alto / this.ancho);
        return { x: factor_horizontal, y: factor_vertical };
    };
    ModoEditor.prototype.desplazar_actor_desde_el_evento_drag = function (gameObject, pointer) {
        var zoom = this.cameras.main.zoom;
        var factor = this.obtener_factores();
        var dx = (pointer.position.x - this.posicion_anterior_de_arrastre.x) / factor.x / zoom;
        var dy = (pointer.position.y - this.posicion_anterior_de_arrastre.y) / factor.y / zoom;
        gameObject.x += dx;
        gameObject.y += dy;
        this.mover_cursor_de_la_grilla(gameObject.x, gameObject.y);
        this.ajustar_figura(gameObject);
        this.ajustar_sensores(gameObject);
        this.posicion_anterior_de_arrastre = pointer.position.clone();
    };
    ModoEditor.prototype.ajustar_figura = function (gameObject) {
        var matter = this.pilas.Phaser.Physics.Matter.Matter;
        if (gameObject.figura) {
            var figura = gameObject.figura;
            matter.Body.setPosition(figura, {
                x: gameObject.x,
                y: gameObject.y
            });
        }
    };
    ModoEditor.prototype.ajustar_sensores = function (sprite) {
        var matter = this.pilas.Phaser.Physics.Matter.Matter;
        if (sprite.sensores) {
            sprite.sensores.map(function (sensor) {
                matter.Body.setPosition(sensor, {
                    x: sprite.x + sensor.dx,
                    y: sprite.y - sensor.dy
                });
            });
        }
    };
    ModoEditor.prototype.mover_cursor_de_la_grilla = function (x, y) {
        this.sprite_cursor_de_la_grilla.x = Math.round(x / this.tamaño_de_la_grilla) * this.tamaño_de_la_grilla;
        this.sprite_cursor_de_la_grilla.y = Math.round(y / this.tamaño_de_la_grilla) * this.tamaño_de_la_grilla;
    };
    ModoEditor.prototype.actualizar_posicion_del_minimap_y_el_borde_de_camara = function (emitir_evento) {
        if (emitir_evento === void 0) { emitir_evento = true; }
        var _a = this.obtener_posicion_de_desplazamiento_de_la_camara(), x = _a.x, y = _a.y;
        this.sprite_borde_de_la_camara.x = x + this.ancho / 2;
        this.sprite_borde_de_la_camara.y = y + this.alto / 2;
        this.minimap.scrollX = x + this.ancho / 2;
        this.minimap.scrollY = y + this.alto / 2;
        if (emitir_evento) {
            this.pilas.mensajes.emitir_mensaje_al_editor("mientras_mueve_la_camara", { x: x, y: -y });
        }
    };
    ModoEditor.prototype.obtener_posicion_de_desplazamiento_de_la_camara = function () {
        var camara = this.cameras.main;
        var x = camara.scrollX;
        var y = camara.scrollY;
        var width = this.ancho;
        var height = this.alto;
        var bordes = camara.getBounds();
        if (x < bordes.x) {
            x = bordes.x;
        }
        if (x > bordes.width - width) {
            x = bordes.width - width;
        }
        if (y < bordes.y) {
            y = bordes.y;
        }
        if (y > bordes.height - height) {
            y = bordes.height - height;
        }
        return { x: x, y: y };
    };
    ModoEditor.prototype.crear_actores_desde_los_datos_de_la_escena = function (escena) {
        var _this = this;
        escena.actores.map(function (actor) {
            _this.crear_sprite_desde_actor(actor);
        });
    };
    ModoEditor.prototype.crear_sprite_desde_actor = function (actor) {
        var _this = this;
        this.pilas.utilidades.validar_que_existe_imagen(actor.imagen);
        var sprite = null;
        if (actor.imagen.indexOf(":") > -1) {
            var g = actor.imagen.split(":")[0];
            var i = actor.imagen.split(":")[1];
            sprite = this.add.sprite(0, 0, g, i);
        }
        else {
            sprite = this.add.sprite(0, 0, actor.imagen);
        }
        sprite["setInteractive"]();
        sprite["actor"] = actor;
        sprite["destacandose"] = false;
        sprite["destacar"] = function () {
            sprite["destacandose"] = true;
            _this.crear_destello(sprite, function () {
                sprite["destacandose"] = false;
            });
        };
        this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
        this.input.setDraggable(sprite, undefined);
        this.actores.push(sprite);
    };
    ModoEditor.prototype.crear_destello = function (sprite, cuando_termina) {
        var _this = this;
        var t = sprite.texture;
        var cuadro = sprite.frame.name;
        var sprite2 = this.add.sprite(0, 0, t.key, cuadro);
        this.copiar_atributos_excepto_alpha(sprite, sprite2);
        sprite2.setTintFill(0xffffff);
        sprite2.setAlpha(0.4);
        this.tweens.add({
            targets: sprite2,
            alpha: 0.7,
            duration: 100,
            ease: "Power2",
            yoyo: true,
            delay: 0,
            onUpdate: function () {
                _this.copiar_atributos_excepto_alpha(sprite, sprite2);
            },
            onComplete: function () {
                sprite2.destroy();
                cuando_termina();
            }
        });
    };
    ModoEditor.prototype.copiar_atributos_excepto_alpha = function (origen, destino) {
        destino.x = origen.x;
        destino.y = origen.y;
        destino.angle = origen.angle;
        destino.scaleX = origen.scaleX;
        destino.scaleY = origen.scaleY;
        destino.flipX = origen.flipX;
        destino.flipY = origen.flipY;
        destino.depth = origen.depth;
        destino.setOrigin(origen.originX, origen.originY);
    };
    ModoEditor.prototype.aplicar_atributos_de_actor_a_sprite = function (actor, sprite) {
        this.actualizar_sprite_desde_datos(sprite, actor);
    };
    ModoEditor.prototype.update = function () {
        _super.prototype.update.call(this, this.actores);
        if (this.pilas.depurador.minimapa) {
            this.minimap.setAlpha(1);
        }
        else {
            this.minimap.setAlpha(0);
        }
        this.actores.map(function (a) {
            a.update();
        });
        this.minimap.y = this.scale.baseSize.height - 75;
        this.minimap.x = this.scale.baseSize.width - 105;
        if (this.pilas.depurador.mostrar_fisica) {
            this.canvas_fisica.setAlpha(1);
            this.actualizar_canvas_fisica();
        }
        else {
            this.canvas_fisica.setAlpha(0);
        }
    };
    ModoEditor.prototype.eliminar_actor_por_id = function (id) {
        var _this = this;
        var indice = this.actores.findIndex(function (e) { return e.id === id; });
        var actor_a_eliminar = this.actores.splice(indice, 1);
        if (actor_a_eliminar[0].figura) {
            this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, actor_a_eliminar[0].figura);
        }
        if (actor_a_eliminar[0].sensores) {
            actor_a_eliminar[0].sensores.map(function (sensor) {
                _this.pilas.Phaser.Physics.Matter.Matter.World.remove(_this.pilas.modo.matter.world.localWorld, sensor);
            });
        }
        if (actor_a_eliminar[0]["texto"]) {
            actor_a_eliminar[0]["texto"].destroy();
        }
        if (actor_a_eliminar[0]["fondo"]) {
            actor_a_eliminar[0]["fondo"].destroy();
        }
        actor_a_eliminar[0].destroy();
    };
    ModoEditor.prototype.posicionar_la_camara = function (datos_de_la_escena) {
        this.cameras.cameras[0].setScroll(datos_de_la_escena.camara_x, -datos_de_la_escena.camara_y);
        try {
            this.actualizar_posicion_del_minimap_y_el_borde_de_camara(false);
        }
        catch (e) { }
    };
    ModoEditor.prototype.cambiar_fondo = function (fondo) {
        var ancho = this.cameras.main.getBounds().width;
        var alto = this.cameras.main.getBounds().height;
        _super.prototype.cambiar_fondo.call(this, fondo, ancho, alto);
        this.minimap.ignore(this.fondo);
        this.hacer_que_el_fondo_se_pueda_arrastrar();
    };
    return ModoEditor;
}(Modo));
var ModoEjecucion = (function (_super) {
    __extends(ModoEjecucion, _super);
    function ModoEjecucion() {
        var _this = _super.call(this, { key: "ModoEjecucion" }) || this;
        _this.proyecto = {};
        _this.nombre_de_la_escena_inicial = null;
        _this._escena_en_ejecucion = null;
        _this.teclas = null;
        _this.instancia_de_proyecto = null;
        _this.es_modo_ejecucion = true;
        return _this;
    }
    ModoEjecucion.prototype.preload = function () { };
    ModoEjecucion.prototype.create = function (datos) {
        _super.prototype.create.call(this, datos, datos.proyecto.ancho, datos.proyecto.alto);
        this.actores = [];
        this.teclas = new Set();
        try {
            this.guardar_parametros_en_atributos(datos);
            var escena = this.obtener_escena_inicial();
            this.clases = this.obtener_referencias_a_clases();
            this.cargar_animaciones(datos);
            if (!datos.es_cambio_de_escena) {
                this.instanciar_proyecto();
            }
            this.instanciar_escena(this.nombre_de_la_escena_inicial);
            if (this.pilas.opciones.modo_simple) {
                if (this.pilas["onready"]) {
                    this.pilas["onready"](this.pilas);
                }
                else {
                    console.warn("Estas usando pilas en modo simple, pero no has indicado pilas.onready = () => { /* codigo */}");
                }
            }
            else {
                this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_iniciar_ejecucion", {});
            }
            this.pilas.historia.limpiar();
            this.conectar_eventos();
            this.vincular_eventos_de_colision();
            this.modificar_modo_de_pantalla();
        }
        catch (e) {
            console.error(e);
            this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
            this.pausar();
        }
    };
    ModoEjecucion.prototype.modificar_modo_de_pantalla = function () {
        this.pilas.game.scale.scaleMode = Phaser.Scale.FIT;
        this.pilas.game.scale.resize(this.ancho, this.alto);
    };
    ModoEjecucion.prototype.cargar_animaciones = function (datos) {
        var animaciones = datos.proyecto.animaciones;
        if (animaciones) {
            for (var i = 0; i < animaciones.length; i++) {
                var animación = animaciones[i];
                var cuadros_de_animacion = animación.cuadros.map(function (e) { return e.nombre; });
                this.pilas.animaciones.crear_animacion(animación.nombre, cuadros_de_animacion, animación.velocidad);
            }
        }
    };
    ModoEjecucion.prototype.conectar_eventos = function () {
        this.input.on("pointermove", this.manejar_evento_muevemouse.bind(this));
        this.input.on("pointerdown", this.manejar_evento_click_de_mouse.bind(this));
        this.input.on("pointerup", this.manejar_evento_termina_click.bind(this));
        this.input.keyboard.on("keydown", this.manejar_evento_key_down.bind(this));
        this.input.keyboard.on("keyup", this.manejar_evento_key_up.bind(this));
    };
    ModoEjecucion.prototype.manejar_evento_click_de_mouse = function (evento) {
        var x = evento.worldX;
        var y = evento.worldY;
        var posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(x, y);
        this.pilas.eventos.emitir_evento("click_de_mouse", {
            x: posicion.x,
            y: posicion.y,
            evento: evento
        });
        if (this._escena_en_ejecucion) {
            try {
                this._escena_en_ejecucion.cuando_hace_click(posicion.x, posicion.y, evento);
                this._escena_en_ejecucion.avisar_click_en_la_pantalla_a_los_actores(posicion.x, posicion.y, evento);
            }
            catch (e) {
                console.error(e);
                this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_hace_click");
                this.pausar();
            }
        }
    };
    ModoEjecucion.prototype.manejar_evento_termina_click = function (evento) {
        var x = evento.worldX;
        var y = evento.worldX;
        var p = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(x, y);
        this.pilas.eventos.emitir_evento("termina_click", {
            x: p.x,
            y: p.y,
            evento: evento
        });
    };
    ModoEjecucion.prototype.manejar_evento_muevemouse = function (evento) {
        var posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
        this.pilas.cursor_x = Math.trunc(posicion.x);
        this.pilas.cursor_y = Math.trunc(posicion.y);
        var posicion_absoluta = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
        this.pilas.cursor_x_absoluta = Math.trunc(posicion_absoluta.x);
        this.pilas.cursor_y_absoluta = Math.trunc(posicion_absoluta.y);
        this.pilas.eventos.emitir_evento("mueve_mouse", {
            x: posicion.x,
            y: posicion.y,
            evento: evento
        });
        if (this._escena_en_ejecucion) {
            try {
                this._escena_en_ejecucion.cuando_mueve(posicion.x, posicion.y, evento);
            }
            catch (e) {
                console.error(e);
                this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_mueve");
                this.pausar();
            }
        }
    };
    ModoEjecucion.prototype.manejar_evento_key_down = function (evento) {
        if (!this.teclas.has(evento.code)) {
            this.teclas.add(evento.code);
            var tecla = this.pilas.utilidades.obtener_nombre_de_la_tecla_desde_un_evento(evento);
            this._escena_en_ejecucion.cuando_pulsa_tecla(tecla, evento);
            this._escena_en_ejecucion.avisar_cuando_pulsa_tecla_a_los_actores(tecla, evento);
        }
    };
    ModoEjecucion.prototype.manejar_evento_key_up = function (evento) {
        this.teclas.delete(evento.code);
        if (evento.key === "Escape") {
            this.pilas.mensajes.emitir_mensaje_al_editor("pulsa_la_tecla_escape", {});
        }
        var tecla = this.pilas.utilidades.obtener_nombre_de_la_tecla_desde_un_evento(evento);
        this._escena_en_ejecucion.cuando_suelta_tecla(tecla, evento);
        this._escena_en_ejecucion.avisar_cuando_suelta_tecla_a_los_actores(tecla, evento);
    };
    ModoEjecucion.prototype.cambiar_escena = function (nombre) {
        var parametros = {
            pilas: this.pilas,
            nombre_de_la_escena_inicial: nombre,
            permitir_modo_pausa: this.permitir_modo_pausa,
            codigo: this.codigo,
            proyecto: this.proyecto,
            es_cambio_de_escena: true
        };
        this.pilas.definir_modo("ModoEjecucion", parametros);
    };
    ModoEjecucion.prototype.vincular_eventos_de_colision = function () {
        var _this = this;
        var pilas = this.pilas;
        var modo = this;
        this.matter.world.on("beforeupdate", function (listener) {
            var cuerpos_estaticos = this.engine.world.bodies.filter(function (e) { return e.isStatic; });
            cuerpos_estaticos.map(function (cuerpo) {
                try {
                    var otros_cuerpos = cuerpos_estaticos.filter(function (c) { return c.id !== cuerpo.id; });
                    var colisiones = pilas.Phaser.Physics.Matter.Matter.Query.collides(cuerpo, otros_cuerpos);
                    colisiones.map(function (colision) {
                        var figura_1 = colision.bodyA;
                        var figura_2 = colision.bodyB;
                        if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
                            var actor_a = figura_1.gameObject.actor;
                            var actor_b = figura_2.gameObject.actor;
                            if (actor_a._vivo && actor_b._vivo) {
                                var cancelar_1 = actor_a.cuando_colisiona(actor_b);
                                var cancelar_2 = actor_b.cuando_colisiona(actor_a);
                                if (cancelar_1 || cancelar_2) {
                                    colision.isActive = false;
                                }
                            }
                        }
                    });
                }
                catch (e) {
                    console.error(e);
                    pilas.mensajes.emitir_excepcion_al_editor(e, "al detectar colisiones");
                    modo.pausar();
                }
            });
        });
        this.matter.world.on("collisionstart", function (event) {
            try {
                for (var i = 0; i < event.pairs.length; i++) {
                    var colision = event.pairs[i];
                    var figura_1 = colision.bodyA;
                    var figura_2 = colision.bodyB;
                    if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
                        var actor_a = figura_1.gameObject.actor;
                        var actor_b = figura_2.gameObject.actor;
                        actor_a.colisiones.push(actor_b);
                        actor_b.colisiones.push(actor_a);
                        var cancelar_1 = actor_a.cuando_comienza_una_colision(actor_b);
                        var cancelar_2 = actor_b.cuando_comienza_una_colision(actor_a);
                        if (cancelar_1 || cancelar_2) {
                            colision.isActive = false;
                        }
                    }
                    else {
                        if (figura_2.sensor_del_actor && figura_1.gameObject && figura_2.sensor_del_actor !== figura_1.gameObject.actor) {
                            figura_2.colisiones.push(figura_1.gameObject.actor);
                        }
                        if (figura_1.sensor_del_actor && figura_2.gameObject && figura_1.sensor_del_actor !== figura_2.gameObject.actor) {
                            figura_1.colisiones.push(figura_2.gameObject.actor);
                        }
                    }
                }
            }
            catch (e) {
                console.error(e);
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
                _this.pausar();
            }
        });
        this.matter.world.on("collisionactive", function (event, a, b) {
            for (var i = 0; i < event.pairs.length; i++) {
                var colision = event.pairs[i];
                var figura_1 = colision.bodyA;
                var figura_2 = colision.bodyB;
                if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
                    var actor_a = figura_1.gameObject.actor;
                    var actor_b = figura_2.gameObject.actor;
                    if (actor_a.colisiones.indexOf(actor_b) === -1) {
                        actor_a.colisiones.push(actor_b);
                    }
                    if (actor_b.colisiones.indexOf(actor_a) === -1) {
                        actor_b.colisiones.push(actor_a);
                    }
                    actor_a.cuando_se_mantiene_una_colision(actor_b);
                    actor_b.cuando_se_mantiene_una_colision(actor_a);
                }
                else {
                }
            }
        });
        this.matter.world.on("collisionend", function (event, a, b) {
            try {
                for (var i = 0; i < event.pairs.length; i++) {
                    var colision = event.pairs[i];
                    var figura_1 = colision.bodyA;
                    var figura_2 = colision.bodyB;
                    if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
                        var actor_a = figura_1.gameObject.actor;
                        var actor_b = figura_2.gameObject.actor;
                        actor_a.colisiones.splice(actor_a.colisiones.indexOf(actor_b), 1);
                        actor_b.colisiones.splice(actor_b.colisiones.indexOf(actor_a), 1);
                        actor_a.cuando_termina_una_colision(actor_b);
                        actor_b.cuando_termina_una_colision(actor_a);
                    }
                    else {
                        if (figura_2.sensor_del_actor && figura_1.gameObject && figura_2.colisiones.indexOf(figura_1.gameObject.actor) > -1) {
                            figura_2.colisiones.splice(figura_2.colisiones.indexOf(figura_1.gameObject.actor), 1);
                        }
                        if (figura_1.sensor_del_actor && figura_2.gameObject && figura_1.colisiones.indexOf(figura_2.gameObject.actor) > -1) {
                            figura_1.colisiones.splice(figura_1.colisiones.indexOf(figura_2.gameObject.actor), 1);
                        }
                    }
                }
            }
            catch (e) {
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
                _this.pausar();
            }
        });
    };
    ModoEjecucion.prototype.obtener_escena_inicial = function () {
        var nombre = this.obtener_nombre_de_la_escena_inicial();
        return this.obtener_escena_por_nombre(nombre);
    };
    ModoEjecucion.prototype.obtener_nombre_de_la_escena_inicial = function () {
        return this.nombre_de_la_escena_inicial;
    };
    ModoEjecucion.prototype.obtener_escena_por_nombre = function (nombre) {
        var escenas_encontradas = this.proyecto.escenas.filter(function (e) { return e.nombre == nombre; });
        var nombres = this.proyecto.escenas.map(function (e) { return e.nombre; }).join(",");
        if (escenas_encontradas.length === 0) {
            throw Error("No se puede encontrar la escena '" + nombre + "' en " + nombres);
        }
        else {
            if (escenas_encontradas.length > 1) {
                throw Error("Hay m\u00E1s de una escena llamada '" + nombre + "'.");
            }
        }
        return escenas_encontradas[0];
    };
    ModoEjecucion.prototype.instanciar_proyecto = function () {
        var proyecto = new this.clases["Proyecto"](this.pilas);
        if (proyecto.iniciar) {
            proyecto.iniciar();
        }
        this.instancia_de_proyecto = proyecto;
    };
    ModoEjecucion.prototype.instanciar_escena = function (nombre) {
        var escena = this.obtener_escena_por_nombre(nombre);
        if (escena.fondo) {
            this.crear_fondo(escena.fondo, escena.ancho, escena.alto);
        }
        else {
            console.warn("Cuidado, la escena no tiene un fondo definido");
        }
        this.crear_escena(escena);
    };
    ModoEjecucion.prototype.crear_escena = function (datos_de_la_escena) {
        var _this = this;
        var nombre = datos_de_la_escena.nombre;
        if (!this.clases[nombre]) {
            throw new Error("No hay una clase con el nombre " + nombre);
        }
        var escena = new this.clases[nombre](this.pilas);
        escena.proyecto = this.instancia_de_proyecto;
        escena.camara.x = datos_de_la_escena.camara_x;
        escena.camara.y = datos_de_la_escena.camara_y;
        escena.fondo = datos_de_la_escena.fondo;
        escena.ancho = datos_de_la_escena.ancho;
        escena.alto = datos_de_la_escena.alto;
        if (datos_de_la_escena.gravedad_x !== undefined) {
            escena.gravedad_x = datos_de_la_escena.gravedad_x;
        }
        if (datos_de_la_escena.gravedad_y !== undefined) {
            escena.gravedad_y = datos_de_la_escena.gravedad_y;
        }
        this.actores = datos_de_la_escena.actores
            .map(function (e) {
            if (e.activo === false) {
                return false;
            }
            return _this.crear_actor(e);
        })
            .filter(function (e) { return e; });
        this._escena_en_ejecucion = escena;
        escena.iniciar();
    };
    ModoEjecucion.prototype.clonar_actor_por_nombre = function (nombre) {
        var nombres_de_todos_los_actores = this.obtener_nombres_de_actores();
        if (nombres_de_todos_los_actores.indexOf(nombre) === -1) {
            var nombre_mas_similar = this.pilas.utilidades.obtener_mas_similar(nombre, nombres_de_todos_los_actores);
            throw new Error("No se encuentra el actor \"" + nombre + "\", \u00BFquisiste decir \"" + nombre_mas_similar + "\"?");
        }
        var entidad = this.obtener_definicion_de_actor_por_nombre(nombre);
        entidad.id = undefined;
        return this.crear_actor(entidad);
    };
    ModoEjecucion.prototype.obtener_nombres_de_actores = function () {
        return this.obtener_entidades_de_actores_de_todas_las_escenas().map(function (entidad) { return entidad.nombre; });
    };
    ModoEjecucion.prototype.obtener_entidades_de_actores_de_todas_las_escenas = function () {
        return this.proyecto.escenas.map(function (escena) { return escena.actores; }).reduce(function (a, b) { return a.concat(b); });
    };
    ModoEjecucion.prototype.obtener_definicion_de_actor_por_nombre = function (nombre) {
        var entidades = this.obtener_entidades_de_actores_de_todas_las_escenas();
        return entidades.filter(function (entidad) { return entidad.nombre === nombre; })[0];
    };
    ModoEjecucion.prototype.crear_actor = function (entidad) {
        var x = entidad.x;
        var y = entidad.y;
        var imagen = entidad.imagen;
        var actor = null;
        var clase = this.clases[entidad.nombre];
        if (clase) {
            actor = new this.clases[entidad.nombre](this.pilas);
            actor.proyecto = this.instancia_de_proyecto;
            var p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);
            p = this.pilas.utilidades.combinar_propiedades(p, entidad);
            actor.pre_iniciar(p);
            actor.agregar_sensores_desde_lista(entidad.sensores);
            actor.iniciar();
            if (entidad.habilidades) {
                entidad.habilidades.map(function (habilidad) {
                    actor.aprender(habilidad);
                });
            }
        }
        else {
            var nombres_de_clases = Object.getOwnPropertyNames(this.clases);
            throw new Error("No existe c\u00F3digo para crear un actor de la clase " + entidad.nombre + ". Las clases disponibles son [" + nombres_de_clases.join(", ") + "]");
        }
        return actor;
    };
    ModoEjecucion.prototype.obtener_referencias_a_clases = function () {
        var codigoDeExportacion = this.obtener_codigo_para_exportar_clases(this.codigo);
        var codigo_completo = this.codigo + codigoDeExportacion;
        return eval(codigo_completo);
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
        return "__clases = " + diccionario_como_cadena + ";\n__clases;";
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
    ModoEjecucion.prototype.update = function () {
        _super.prototype.update.call(this, this.pilas.escena.actores);
        try {
            this.pilas.escena.pre_actualizar();
            this.pilas.escena.actualizar();
            this.pilas.escena.actualizar_actores();
            this.pilas.escena.reproducir_sonidos_pendientes();
            if (this.permitir_modo_pausa) {
                this.guardar_foto_de_entidades();
            }
        }
        catch (e) {
            console.error(e);
            this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizando escena");
            this.pilas.modo.pausar();
        }
        if (this.pilas.depurador.fisica_en_modo_ejecucion) {
            this.canvas_fisica.setAlpha(1);
            this.actualizar_canvas_fisica();
        }
        else {
            this.canvas_fisica.setAlpha(0);
        }
        this.posicionar_fondo(this.pilas.escena.desplazamiento_del_fondo_x, this.pilas.escena.desplazamiento_del_fondo_y);
    };
    ModoEjecucion.prototype.pausar = function () {
        console.warn("Pausando la escena a causa del error anterior.");
        this.scene.pause();
    };
    ModoEjecucion.prototype.guardar_foto_de_entidades = function () {
        this.pilas.historia.serializar_escena(this.pilas.escena);
    };
    ModoEjecucion.prototype.dibujar_punto_de_control = function (graphics, _x, _y) {
        graphics.fillStyle(0xffffff, 1);
        var _a = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, _y), x = _a.x, y = _a.y;
        graphics.fillRect(x - 3, y - 3, 6, 6);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(x - 2, y - 2, 4, 4);
    };
    return ModoEjecucion;
}(Modo));
var ModoPausa = (function (_super) {
    __extends(ModoPausa, _super);
    function ModoPausa() {
        var _this = _super.call(this, { key: "ModoPausa" }) || this;
        _this.fondo_anterior = null;
        _this._anterior_posicion_x_de_la_camara = 0;
        _this._anterior_posicion_y_de_la_camara = 0;
        return _this;
    }
    ModoPausa.prototype.crear_indicador_de_texto = function () {
        this.indicador_de_texto = this.add.bitmapText(5, 10, "color-blanco-con-sombra", "");
        this.indicador_de_texto.scrollFactorX = 0;
        this.indicador_de_texto.scrollFactorY = 0;
        this.indicador_de_texto.depth = 999999;
        this.indicador_de_texto.align = 2;
    };
    ModoPausa.prototype.preload = function () { };
    ModoPausa.prototype.create = function (datos) {
        _super.prototype.create.call(this, datos, datos.pilas._ancho, datos.pilas._alto);
        this.pilas = datos.pilas;
        this.posicion = this.pilas.historia.obtener_cantidad_de_posiciones();
        this.total = this.pilas.historia.obtener_cantidad_de_posiciones();
        this.sprites = [];
        this.crear_indicador_de_texto();
        this._anterior_valor_del_modo_posicion_activado = this.pilas.depurador.modo_posicion_activado;
        var foto = this.pilas.historia.obtener_foto(1);
        this.crear_fondo(foto.escena.fondo, foto.escena.ancho, foto.escena.alto);
        this.crear_canvas_de_depuracion_modo_pausa();
        this.actualizar_posicion(this.posicion);
        this.tecla_izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.tecla_derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        var t = this.pilas.historia.obtener_cantidad_de_posiciones();
        var datos_para_el_editor = { minimo: 0, posicion: t, maximo: t };
        this.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_depurar_en_modo_pausa", datos_para_el_editor);
        this.crear_manejadores_para_controlar_el_zoom(false);
    };
    ModoPausa.prototype.crear_sprites_desde_historia = function (posicion) {
        var _this = this;
        var foto = this.pilas.historia.obtener_foto(posicion);
        this.sprites.map(function (sprite) {
            if (sprite.figura) {
                _this.pilas.Phaser.Physics.Matter.Matter.World.remove(_this.pilas.modo.matter.world.localWorld, sprite.figura);
            }
            if (sprite["texto"]) {
                sprite["texto"].destroy();
            }
            if (sprite["fondo"]) {
                sprite["fondo"].destroy();
            }
            sprite.destroy();
        });
        this.graphics.clear();
        this.fondo.setAlpha(0.8);
        this.hacer_arratrable_el_fondo();
        this.limitar_movimiento_de_la_camara_a_los_bordes_actuales(foto.escena);
        this.posicionar_la_camara(foto.escena);
        this.posicionar_fondo(foto.escena);
        this.sprites = foto.actores.map(function (entidad) {
            if (_this.pilas.depurador.modo_posicion_activado) {
                var _a = _this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y), x = _a.x, y = _a.y;
                _this.dibujar_punto_de_control(_this.graphics, x, y);
            }
            return _this.crear_sprite_desde_entidad(entidad);
        });
        var minutos_como_numero = Math.floor(posicion / 60 / 60);
        var segundos_como_numero = Math.floor(posicion / 60) % 60;
        var minutos = ("0" + minutos_como_numero).slice(-2);
        var segundos = ("0" + segundos_como_numero).slice(-2);
        this.indicador_de_texto.text = "Tiempo: " + minutos + "' " + segundos + "''\nCuadro: " + posicion + "\nCantidad de actores: " + foto.actores.length;
        this.indicador_de_texto.x = this.ancho - this.indicador_de_texto.width - 10;
    };
    ModoPausa.prototype.posicionar_fondo = function (escena) {
        var dx = escena.desplazamiento_del_fondo_x || 0;
        var dy = escena.desplazamiento_del_fondo_y || 0;
        var posicion_de_la_camara = {
            x: escena.camara_x,
            y: -escena.camara_y
        };
        if (this.fondo) {
            this.fondo.x = posicion_de_la_camara.x;
            this.fondo.y = posicion_de_la_camara.y;
            this.fondo.tilePositionX = posicion_de_la_camara.x + dx;
            this.fondo.tilePositionY = posicion_de_la_camara.y + dy;
        }
    };
    ModoPausa.prototype.posicionar_la_camara = function (datos_de_la_escena) {
        var x = datos_de_la_escena.camara_x;
        var y = -datos_de_la_escena.camara_y;
        if (this._anterior_posicion_x_de_la_camara !== x || this._anterior_posicion_y_de_la_camara !== y) {
            this.cameras.cameras[0].setScroll(x, y);
            this._anterior_posicion_x_de_la_camara = x;
            this._anterior_posicion_y_de_la_camara = y;
        }
    };
    ModoPausa.prototype.limitar_movimiento_de_la_camara_a_los_bordes_actuales = function (escena) {
        var x = escena.camara_x;
        var y = -escena.camara_y;
        this.cameras.cameras[0].setBounds(x, y, this.ancho, this.alto);
    };
    ModoPausa.prototype.hacer_arratrable_el_fondo = function () {
        var _this = this;
        this.fondo.setInteractive();
        this.input.setDraggable(this.fondo, undefined);
        var escena = this;
        this.input.on("dragstart", function (pointer, gameObject) {
            _this.posicion_anterior_de_arrastre = pointer.position.clone();
            if (escena.pilas.utilidades.es_firefox()) {
                escena.input.setDefaultCursor("grabbing");
            }
            else {
                escena.input.setDefaultCursor("-webkit-grabbing");
            }
        });
        this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
            _this.desplazar_la_camara_desde_el_evento_drag(pointer);
        });
        this.input.on("dragend", function (pointer, gameObject) {
            escena.input.setDefaultCursor("default");
        });
    };
    ModoPausa.prototype.desplazar_la_camara_desde_el_evento_drag = function (pointer) {
        var zoom = this.cameras.main.zoom;
        var factor = this.obtener_factores();
        var dx = this.posicion_anterior_de_arrastre.x - pointer.position.x;
        var dy = this.posicion_anterior_de_arrastre.y - pointer.position.y;
        this.cameras.main.scrollX += dx / factor.x / zoom;
        this.cameras.main.scrollY += dy / factor.y / zoom;
        this.posicion_anterior_de_arrastre = pointer.position.clone();
    };
    ModoPausa.prototype.obtener_factores = function () {
        var factor_horizontal = Math.min(1, this.ancho / this.alto);
        var factor_vertical = Math.min(1, this.alto / this.ancho);
        return { x: factor_horizontal, y: factor_vertical };
    };
    ModoPausa.prototype.update = function () {
        if (this._anterior_valor_del_modo_posicion_activado !== this.pilas.depurador.modo_posicion_activado) {
            this.actualizar_posicion(this.posicion);
            this._anterior_valor_del_modo_posicion_activado = this.pilas.depurador.modo_posicion_activado;
        }
        if (this.tecla_derecha.isDown) {
            this.avanzar_posicion();
        }
        if (this.tecla_izquierda.isDown) {
            this.retroceder_posicion();
        }
        if (this.pilas.depurador.mostrar_fisica) {
            this.canvas_fisica.setAlpha(1);
        }
        else {
            this.canvas_fisica.setAlpha(0);
        }
    };
    ModoPausa.prototype.dibujar_sensores_sobre_canvas_fisica = function (posicion) {
        var _this = this;
        var canvas = this.canvas_fisica;
        var foto = this.pilas.historia.obtener_foto(posicion);
        foto.actores.map(function (entidad) {
            entidad.sensores.map(function (sensor) {
                _this.dibujar_figura_desde_vertices(canvas, 2, 0xff4040, sensor);
            });
        });
    };
    ModoPausa.prototype.crear_sprite_desde_entidad = function (entidad) {
        var nombre = entidad.imagen;
        var sprite = null;
        var galeria = null;
        var imagen = null;
        var _a = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y), x = _a.x, y = _a.y;
        if (nombre.indexOf(":") > -1) {
            galeria = nombre.split(":")[0];
            imagen = nombre.split(":")[1];
        }
        else {
            galeria = null;
            imagen = nombre;
        }
        if (galeria) {
            sprite = this.add.sprite(x, y, galeria, imagen);
        }
        else {
            sprite = this.add.sprite(x, y, imagen);
        }
        sprite.angle = -entidad.rotacion;
        sprite.setOrigin(entidad.centro_x, entidad.centro_y);
        sprite.scaleX = entidad.escala_x;
        sprite.scaleY = entidad.escala_y;
        sprite.alpha = 1 - entidad.transparencia / 100;
        sprite.setFlipX(entidad.espejado);
        sprite.setFlipY(entidad.espejado_vertical);
        sprite.depth = -entidad.z;
        if (entidad.fijo) {
            sprite.setScrollFactor(0, 0);
        }
        if (entidad.texto) {
            sprite["texto"] = this.pilas.modo.add.bitmapText(0, 0, entidad.fuente, entidad.texto);
            sprite["texto"].depth = sprite.depth;
            if (entidad.fondo) {
                var imagen_1 = this.obtener_imagen_para_nineslice(entidad.fondo);
                var f = this.pilas.modo.add.nineslice(40, 0, 30, 20, imagen_1, 10, 10);
                sprite["fondo"] = f;
                sprite["fondo_imagen"] = entidad.fondo;
            }
            this.copiar_valores_de_sprite_a_texto(sprite);
            if (sprite["fondo"]) {
                sprite["fondo"].depth = sprite["texto"].depth - 1;
                sprite["fondo"].x = sprite["texto"].x;
                sprite["fondo"].y = sprite["texto"].y;
                sprite["fondo"].x += 30 * sprite["texto"].originX - 30 * 0.5;
                sprite["fondo"].y += 30 * sprite["texto"].originY - 30 * 0.5;
                sprite["fondo"].setOrigin(sprite["texto"].originX, sprite["texto"].originY);
                if (entidad.fondo.includes("dialogo")) {
                    sprite["fondo"].y += 4;
                }
                if (entidad.fijo) {
                    sprite["fondo"].setScrollFactor(0, 0);
                }
            }
            if (entidad.fijo) {
                sprite["texto"].setScrollFactor(0, 0);
            }
        }
        if (entidad.figura) {
            sprite["figura"] = this.crear_figura_estatica_para(entidad);
            sprite["figura"].es_sensor = entidad.figura_sensor;
            sprite["figura"].es_dinamica = entidad.figura_dinamica;
        }
        return sprite;
    };
    ModoPausa.prototype.actualizar_posicion = function (posicion) {
        this.posicion = posicion;
        this.posicion = Math.min(this.posicion, this.total);
        this.posicion = Math.max(this.posicion, 0);
        this.crear_sprites_desde_historia(this.posicion);
        this.actualizar_canvas_fisica();
        this.dibujar_sensores_sobre_canvas_fisica(this.posicion);
    };
    ModoPausa.prototype.avanzar_posicion = function () {
        this.posicion += 1;
        this.actualizar_posicion(this.posicion);
        this.pilas.mensajes.emitir_mensaje_al_editor("cambia_posicion_dentro_del_modo_pausa", { posicion: this.posicion });
    };
    ModoPausa.prototype.retroceder_posicion = function () {
        this.posicion -= 1;
        this.actualizar_posicion(this.posicion);
        this.pilas.mensajes.emitir_mensaje_al_editor("cambia_posicion_dentro_del_modo_pausa", { posicion: this.posicion });
    };
    ModoPausa.prototype.crear_canvas_de_depuracion_modo_pausa = function () {
        var graphics_modo_pausa = this.add.graphics();
        graphics_modo_pausa.depth = 190;
        this.graphics_modo_pausa = graphics_modo_pausa;
        this.pilas.historia.dibujar_puntos_de_las_posiciones_recorridas(graphics_modo_pausa);
    };
    return ModoPausa;
}(Modo));
