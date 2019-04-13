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
    Actores.prototype.crear_actor = function (nombre) {
        var clase = window[nombre];
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
    Actores.prototype.actor = function () {
        return this.crear_actor("Actor");
    };
    Actores.prototype.aceituna = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return this.crear_actor("aceituna");
    };
    Actores.prototype.caja = function (x, y) {
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
    return Actores;
}());
var Animaciones = (function () {
    function Animaciones(pilas) {
        this.animaciones = {};
        this.pilas = pilas;
    }
    Animaciones.prototype.crear_animacion = function (actor, nombre_de_la_animacion, cuadros, velocidad) {
        var nombre = actor.id + "-" + nombre_de_la_animacion;
        if (!this.animaciones[nombre]) {
            var frames_1 = cuadros.map(function (nombre) {
                if (nombre.indexOf(".") > -1) {
                    return {
                        key: nombre.split(".")[1],
                        frame: nombre.split(".")[0]
                    };
                }
                else {
                    return { key: nombre };
                }
            });
            var animacion = pilas.modo.anims.create({
                key: nombre.split(".")[0],
                frames: frames_1,
                frameRate: velocidad,
                repeat: -1
            });
            this.animaciones[nombre] = animacion;
        }
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
        this.camara_principal.shake(250 * tiempo, 0.05 * intensidad);
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
    return Camara;
}());
var Control = (function () {
    function Control(pilas) {
        this.pilas = pilas;
        this.conectar_teclas();
    }
    Control.prototype.terminar = function () {
        this.desconectar_teclas();
    };
    Control.prototype.conectar_teclas = function () {
        var keyboard = this.pilas.modo.input.keyboard;
        this._izquierda = keyboard.addKey("LEFT");
        this._derecha = keyboard.addKey("RIGHT");
        this._arriba = keyboard.addKey("UP");
        this._abajo = keyboard.addKey("DOWN");
        this._espacio = keyboard.addKey("SPACE");
    };
    Control.prototype.desconectar_teclas = function () {
        var keyboard = this.pilas.modo.input.keyboard;
        keyboard.removeKey(this.espacio);
        keyboard.removeKey(this._izquierda);
        keyboard.removeKey(this._derecha);
        keyboard.removeKey(this._arriba);
        keyboard.removeKey(this._abajo);
        keyboard.removeKey(this._espacio);
    };
    Object.defineProperty(Control.prototype, "izquierda", {
        get: function () {
            return this._izquierda.isDown;
        },
        set: function (v) {
            this.pilas.utilidades.acceso_incorrecto("izquierda");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "derecha", {
        get: function () {
            return this._derecha.isDown;
        },
        set: function (v) {
            this.pilas.utilidades.acceso_incorrecto("derecha");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "arriba", {
        get: function () {
            return this._arriba.isDown;
        },
        set: function (v) {
            this.pilas.utilidades.acceso_incorrecto("arriba");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "abajo", {
        get: function () {
            return this._abajo.isDown;
        },
        set: function (v) {
            this.pilas.utilidades.acceso_incorrecto("abajo");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "espacio", {
        get: function () {
            return this._espacio.isDown;
        },
        set: function (v) {
            this.pilas.utilidades.acceso_incorrecto("espacio");
        },
        enumerable: true,
        configurable: true
    });
    return Control;
}());
var Depurador = (function () {
    function Depurador(pilas) {
        this.pilas = pilas;
        this.modo_posicion_activado = false;
        this.mostrar_fps = false;
        this.mostrar_fisica = false;
    }
    Depurador.prototype.definir_estados_de_depuracion = function (datos) {
        this.mostrar_fps = datos.fps;
        this.modo_posicion_activado = datos.pos;
        this.mostrar_fisica = datos.fisica;
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
    return Fisica;
}());
var Habilidad = (function () {
    function Habilidad(pilas, actor) {
        this.pilas = pilas;
        this.actor = actor;
    }
    Habilidad.prototype.iniciar = function () { };
    Habilidad.prototype.actualizar = function () { };
    return Habilidad;
}());
var RotarConstantemente = (function (_super) {
    __extends(RotarConstantemente, _super);
    function RotarConstantemente() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RotarConstantemente.prototype.iniciar = function () {
        console.log("iniciando rotarConstantemente");
    };
    RotarConstantemente.prototype.actualizar = function () {
        this.actor.rotacion += 10;
    };
    return RotarConstantemente;
}(Habilidad));
var Arrastrable = (function (_super) {
    __extends(Arrastrable, _super);
    function Arrastrable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arrastrable.prototype.iniciar = function () {
        var input = this.pilas.modo.input;
        this.actor.sprite.setInteractive();
        input.setDraggable(this.actor.sprite);
        input.on("drag", function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    };
    Arrastrable.prototype.actualizar = function () { };
    return Arrastrable;
}(Habilidad));
var Habilidades = (function () {
    function Habilidades(pilas) {
        this.pilas = pilas;
        this._habilidades = [];
        this.vincular("rotar constantemente", RotarConstantemente);
        this.vincular("arrastrable", Arrastrable);
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
            actores: escena_actual.actores.map(function (e) { return e.serializar(); })
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
        this.pilas.iniciar_phaser(datos.ancho, datos.alto, datos.recursos, datos.opciones);
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
        this.pilas.definir_modo("ModoEditor", {
            pilas: this.pilas,
            escena: datos.escena,
            proyecto: datos.proyecto
        });
    };
    Mensajes.prototype.atender_mensaje_actualizar_escena_desde_el_editor = function (datos) {
        this.pilas.modo.cambiar_fondo(datos.escena.fondo);
        this.pilas.modo.posicionar_la_camara(datos.escena);
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
    Mensajes.prototype.emitir_excepcion_al_editor = function (error, origen) {
        var detalle = {
            mensaje: error.message,
            stack: error.stack.toString()
        };
        var fuente_principal = {
            font: "14px verdana",
            fill: "#ddd"
        };
        var fuente_grande = {
            font: "16px verdana"
        };
        var fuente_pequena = {
            font: "10px verdana"
        };
        this.pilas.modo.add.text(5, 5, "Se ha producido un error.", fuente_grande);
        this.pilas.modo.add.text(5, 5 + 20, detalle.mensaje, fuente_principal);
        this.pilas.modo.add.text(5, 5 + 20 + 20, detalle.stack, fuente_pequena);
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
    Mensajes.prototype.atender_mensaje_actualizar_proyecto_desde_el_editor = function (datos) {
        var proyecto = datos.proyecto;
        this.pilas.game.resize(proyecto.ancho, proyecto.alto);
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
        var colores = [
            0x82e0aa,
            0xf8c471,
            0xf0b27a,
            0xf4f6f7,
            0xb2babb,
            0x85c1e9,
            0xbb8fce,
            0xf1948a,
            0xd98880
        ];
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
    Utilidades.prototype.es_animacion = function (valor) {
        return Array.isArray(valor) && valor.every(function (e) { return Number.isInteger(e); });
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
        this.Phaser = Phaser;
        this.mensajes = new Mensajes(this);
        this.depurador = new Depurador(this);
        this.utilidades = new Utilidades(this);
        this.escenas = new Escenas(this);
        this.historia = new Historia(this);
        this.sonidos = {};
        this.actores = new Actores(this);
        this.animaciones = new Animaciones(this);
        this.fisica = new Fisica(this);
        this.habilidades = new Habilidades(this);
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
    Pilas.prototype.iniciar_phaser = function (ancho, alto, recursos, opciones) {
        var _this = this;
        if (!recursos) {
            throw Error("No se puede iniciar phaser sin especificar una lista de recursos");
        }
        this._ancho = ancho;
        this._alto = alto;
        this.recursos = recursos;
        var configuracion = this.crear_configuracion(ancho, alto);
        if (opciones.esperar_antes_de_iniciar) {
            console.log("Esperando 1 segundo antes de iniciar ...");
            setTimeout(function () {
                _this.iniciar_phaser_desde_configuracion(configuracion);
            }, 1000);
        }
        else {
            this.iniciar_phaser_desde_configuracion(configuracion);
        }
    };
    Pilas.prototype.iniciar_phaser_desde_configuracion = function (configuracion) {
        var game = new Phaser.Game(configuracion);
        this.game = game;
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
        this.game.scene.start(nombre, datos);
    };
    Pilas.prototype.cambiar_escena = function (nombre) {
        this.modo.cambiar_escena(nombre);
    };
    Pilas.prototype.crear_configuracion = function (ancho, alto) {
        return {
            type: Phaser.AUTO,
            parent: "game",
            width: ancho,
            height: alto,
            backgroundColor: "#000000",
            disableContextMenu: true,
            pixelArt: false,
            input: {
                keyboard: true,
                mouse: true,
                touch: true,
                gamepad: true
            },
            scene: [ModoCargador, ModoEditor, ModoEjecucion, ModoPausa],
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
    Pilas.prototype.reproducir_sonido = function (nombre) {
        var music = this.modo.sound.add(nombre);
        music.play();
    };
    Pilas.prototype.obtener_actores = function () {
        return this.escena.actores;
    };
    Pilas.prototype.obtener_actor_por_nombre = function (nombre) {
        return this.obtener_actores().find(function (actor) { return actor.nombre === nombre; });
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
        this.modo.time.delayedCall(duracion * 1000, tarea);
    };
    return Pilas;
}());
var pilas = new Pilas();
var ActorBase = (function () {
    function ActorBase(pilas) {
        this.figura = "";
        this._etiqueta = null;
        this._vivo = true;
        this._animacion_en_curso = "";
        this._es_texto = false;
        this.propiedades_base = {
            x: 0,
            y: 0,
            z: 0,
            imagen: "sin_imagen",
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
            es_texto: false
        };
        this.propiedades = {
            x: 0,
            y: 0,
            z: 0,
            imagen: "sin_imagen",
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
        var imagen = null;
        var cuadro = null;
        if (propiedades.imagen.indexOf(".") > -1) {
            imagen = propiedades.imagen;
            cuadro = null;
        }
        else {
            imagen = propiedades.imagen.split(".")[0];
            cuadro = propiedades.imagen
                .split(".")
                .slice(1)
                .join(".");
        }
        this._id = propiedades.id;
        this._nombre = propiedades.nombre;
        this.sensores = [];
        this._figura_ancho = propiedades.figura_ancho;
        this._figura_alto = propiedades.figura_alto;
        this._figura_radio = propiedades.figura_radio;
        this._es_texto = propiedades.es_texto;
        if (propiedades.es_texto) {
            this.texto = propiedades.texto;
        }
        switch (figura) {
            case "rectangulo":
                this.sprite = this.pilas.modo.matter.add.sprite(0, 0, imagen, cuadro);
                this.figura = figura;
                this.crear_figura_rectangular(propiedades.figura_ancho, propiedades.figura_alto);
                this.dinamico = propiedades.figura_dinamica;
                this.sin_rotacion = propiedades.figura_sin_rotacion;
                this.rebote = propiedades.figura_rebote;
                this.sensor = propiedades.figura_sensor;
                break;
            case "circulo":
                this.sprite = this.pilas.modo.matter.add.sprite(0, 0, imagen, cuadro);
                this.figura = figura;
                this.crear_figura_circular(propiedades.figura_radio);
                this.dinamico = propiedades.figura_dinamica;
                this.sin_rotacion = propiedades.figura_sin_rotacion;
                this.rebote = propiedades.figura_rebote;
                this.sensor = propiedades.figura_sensor;
                break;
            case "ninguna":
            case "":
                this.figura = figura;
                this.sprite = this.pilas.modo.add.sprite(0, 0, imagen, cuadro);
                break;
            default:
                throw Error("No se conoce el tipo de figura " + figura);
        }
        this.sprite.setInteractive();
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
        this.sprite.update = function () {
            try {
                _this.actualizar();
            }
            catch (e) {
                _this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizar actor");
            }
        };
        this.sprite.on("pointerdown", function (cursor) {
            var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
            _this.cuando_hace_click(posicion.x, posicion.y, cursor);
        });
        this.sprite.on("pointerout", function (cursor) {
            var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
            _this.cuando_sale(posicion.x, posicion.y, cursor);
        });
        this.sprite.on("pointermove", function (cursor) {
            var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
            _this.cuando_mueve(posicion.x, posicion.y, cursor);
        });
        this.pilas.escena.agregar_actor(this);
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
        destino.setOrigin(origen.originX, origen.originY);
    };
    ActorBase.prototype.iniciar = function () { };
    ActorBase.prototype.serializar = function () {
        var texto = "";
        if (this._es_texto) {
            texto = this._texto.text;
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
            es_texto: this._es_texto,
            texto: texto,
            espejado: this.espejado,
            espejado_vertical: this.espejado_vertical,
            transparencia: this.transparencia,
            id_color: this.id_color
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
    ActorBase.prototype.generar_color_para_depurar = function () {
        return this.pilas.utilidades.obtener_color_al_azar();
    };
    ActorBase.prototype.pre_actualizar = function () {
        if (this.figura && this.sin_rotacion) {
            this.sprite.setAngularVelocity(0);
        }
        this.automata.actualizar();
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
        this.sensores.map(function (s) {
            var _a = _this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(_this.x, _this.y), x = _a.x, y = _a.y;
            _this.pilas.Phaser.Physics.Matter.Matter.Body.setPosition(s, {
                x: x + s.distancia_x,
                y: y - s.distancia_y
            });
            s.colisiones = s.colisiones.filter(function (a) { return a._vivo; });
        });
    };
    Object.defineProperty(ActorBase.prototype, "imagen", {
        get: function () {
            if (this.sprite.frame.name === "__BASE") {
                return this.sprite.texture.key;
            }
            else {
                return this.sprite.frame.name + "." + this.sprite.texture.key;
            }
        },
        set: function (nombre) {
            if (nombre.indexOf(".") > -1) {
                var key = nombre.split(".")[0];
                var frame = nombre
                    .split(".")
                    .slice(1)
                    .join(".");
                this.sprite.setTexture(key, frame);
            }
            else {
                this.sprite.setTexture(nombre);
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
                if (this.figura) {
                    pilas.Phaser.Physics.Matter.Matter.Body.scale(this.sprite.body, 1 / this.escala_x, 1 / this.escala_y);
                }
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
                if (this.figura) {
                    pilas.Phaser.Physics.Matter.Matter.Body.scale(this.sprite.body, 1 / this.escala_x, 1 / this.escala_y);
                }
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
        return "<" + clase + " en (" + this.x + ", " + this.y + ")>";
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
        if (radio) {
            this.sprite.setCircle(radio);
        }
        else {
            this.sprite.setCircle();
        }
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
            this.fallar_si_no_tiene_figura();
            return this.sprite.isStatic();
        },
        set: function (estatico) {
            this.fallar_si_no_tiene_figura();
            this.sprite.setStatic(estatico);
            this.sprite.setVelocity(0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "dinamico", {
        get: function () {
            this.fallar_si_no_tiene_figura();
            return !this.estatico;
        },
        set: function (dinamico) {
            this.fallar_si_no_tiene_figura();
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
            this.sprite.setVelocityX(-valor);
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
            this.fallar_si_no_tiene_figura();
            return this.sprite.body.isSensor;
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
            }
            else {
                this.sprite.setScrollFactor(1, 1);
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
    ActorBase.prototype.cada_segundo = function () { };
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
        this.pilas.animaciones.crear_animacion(this, nombre, cuadros, velocidad);
    };
    ActorBase.prototype.reproducir_animacion = function (nombre_de_la_animacion) {
        var nombre = this.id + "-" + nombre_de_la_animacion;
        this.sprite.anims.play(nombre);
    };
    Object.defineProperty(ActorBase.prototype, "animacion", {
        get: function () {
            return this._animacion_en_curso;
        },
        set: function (nombre) {
            if (this._animacion_en_curso !== nombre) {
                this.reproducir_animacion(nombre);
                this._animacion_en_curso = nombre;
            }
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.cuando_comienza_una_colision = function (actor) { };
    ActorBase.prototype.cuando_se_mantiene_una_colision = function (actor) { };
    ActorBase.prototype.cuando_termina_una_colision = function (actor) { };
    ActorBase.prototype.cuando_hace_click = function (x, y, evento_original) { };
    ActorBase.prototype.cuando_sale = function (x, y, evento_original) { };
    ActorBase.prototype.cuando_mueve = function (x, y, evento_original) { };
    Object.defineProperty(ActorBase.prototype, "cantidad_de_colisiones", {
        get: function () {
            return this.colisiones.length;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.agregar_sensor = function (ancho, alto, x, y) {
        var pos = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(x, y);
        var figura = this.pilas.modo.matter.add.rectangle(pos.x, pos.y, ancho, alto, {
            isSensor: true,
            isStatic: false
        });
        figura.distancia_x = x;
        figura.distancia_y = y;
        figura.sensor_del_actor = this;
        figura.colisiones = [];
        this.sensores.push(figura);
        return figura;
    };
    ActorBase.prototype.eliminar = function () {
        this._vivo = false;
    };
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
    ActorBase.prototype.decir = function (mensaje) {
        var texto = this.pilas.actores.texto();
        texto.texto = mensaje;
        texto.x = this.x + 15;
        texto.y = this.y + this.alto;
        texto.escala_y = 0;
        texto.escala_y = [1];
        this.pilas.luego(4, function () {
            texto.eliminar();
        });
    };
    ActorBase.prototype.aprender = function (habilidad) {
        var clase = this.pilas.habilidades.buscar(habilidad);
        if (clase) {
            if (this.tieneHabilidad(clase.name)) {
                console.warn("No se aplica la habilidad " + clase.name + " porque el actor ya la ten\u00EDa vinculada.");
            }
            else {
                var instancia = new clase(this.pilas, this);
                instancia.iniciar();
                this._habilidades.push(instancia);
            }
        }
    };
    ActorBase.prototype.tieneHabilidad = function (habilidad) {
        return (this._habilidades.filter(function (h) {
            return h.constructor.name === habilidad;
        }).length > 0);
    };
    return ActorBase;
}());
var ActorTextoBase = (function (_super) {
    __extends(ActorTextoBase, _super);
    function ActorTextoBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "invisible",
            texto: "Hola mundo",
            es_texto: true
        };
        _this._texto = null;
        return _this;
    }
    ActorTextoBase.prototype.iniciar = function () { };
    ActorTextoBase.prototype.pre_actualizar = function () {
        _super.prototype.pre_actualizar.call(this);
        this.copiar_atributos_de_sprite(this.sprite, this._texto);
    };
    ActorTextoBase.prototype.actualizar = function () { };
    Object.defineProperty(ActorTextoBase.prototype, "sombra", {
        set: function (valor) {
            if (valor) {
                this._texto.setShadow(2, 2, "black", 4);
            }
            else {
                this._texto.setShadow();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorTextoBase.prototype, "texto", {
        set: function (texto) {
            if (!this._texto) {
                this._texto = this.pilas.modo.add.text(0, 0, texto);
                this._texto.setFontFamily("verdana");
            }
            else {
                this._texto.setText(texto);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorTextoBase.prototype, "magnitud", {
        set: function (numero) {
            this._texto.setFontSize(numero);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorTextoBase.prototype, "color", {
        set: function (color) {
            this._texto.setColor(color);
        },
        enumerable: true,
        configurable: true
    });
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
var aceituna = (function (_super) {
    __extends(aceituna, _super);
    function aceituna() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "aceituna"
        };
        return _this;
    }
    aceituna.prototype.iniciar = function () {
        this.imagen = "aceituna";
    };
    return aceituna;
}(Actor));
var actor = (function (_super) {
    __extends(actor, _super);
    function actor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {};
        return _this;
    }
    actor.prototype.iniciar = function () { };
    actor.prototype.actualizar = function () { };
    return actor;
}(Actor));
var caja = (function (_super) {
    __extends(caja, _super);
    function caja() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            x: 0,
            y: 0,
            imagen: "caja",
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
var conejo = (function (_super) {
    __extends(conejo, _super);
    function conejo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            x: 0,
            y: 0,
            imagen: "conejo_parado1",
            figura: "rectangulo",
            figura_ancho: 50,
            figura_alto: 100,
            figura_radio: 50,
            figura_sin_rotacion: true,
            figura_dinamica: true,
            figura_rebote: 0
        };
        _this.toca_el_suelo = false;
        _this.pies = null;
        return _this;
    }
    conejo.prototype.iniciar = function () {
        this.crear_animacion("conejo_parado", ["conejo_parado1", "conejo_parado2"], 2);
        this.crear_animacion("conejo_camina", ["conejo_camina1", "conejo_camina2"], 20);
        this.crear_animacion("conejo_salta", ["conejo_salta"], 20);
        this.crear_animacion("conejo_muere", ["conejo_muere"], 1);
        this.estado = "parado";
        this.pies = this.agregar_sensor(50, 10, 0, -50);
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
var gallina = (function (_super) {
    __extends(gallina, _super);
    function gallina() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            x: 0,
            y: 0,
            imagen: "gallina_vuela_3",
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
            "gallina_vuela_1",
            "gallina_vuela_1",
            "gallina_vuela_2",
            "gallina_vuela_3",
            "gallina_vuela_2"
        ], 15);
        this.crear_animacion("gallina_muere", ["gallina_muere"], 20);
        this.crear_animacion("gallina_sin_piel", ["gallina_sin_piel"], 20);
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
var laser = (function (_super) {
    __extends(laser, _super);
    function laser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "laser"
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
        if (this.x > 400 || this.x < -400 || this.y > 400 || this.y < -400) {
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
            imagen: "logo"
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
            imagen: "moneda",
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
            imagen: "nave_en_reposo"
        };
        _this.velocidad = 5;
        return _this;
    }
    nave.prototype.iniciar = function () {
        this.crear_animacion("nave_en_reposo", ["nave_en_reposo"], 2);
        this.crear_animacion("nave_avanzando", ["nave_avanza_1", "nave_avanza_2"], 20);
        this.crear_animacion("nave_girando_a_la_izquierda", ["nave_izquierda_1", "nave_izquierda_2"], 20);
        this.crear_animacion("nave_girando_a_la_derecha", ["nave_derecha_1", "nave_derecha_2"], 20);
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
            var laser_1 = this.pilas.actores.laser();
            laser_1.x = this.x;
            laser_1.y = this.y;
            laser_1.rotacion = this.rotacion;
            laser_1.z = this.z + 1;
            this.cuadros_desde_el_ultimo_disparo = 0;
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
    return nave;
}(Actor));
var nube = (function (_super) {
    __extends(nube, _super);
    function nube() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            imagen: "nube"
        };
        return _this;
    }
    nube.prototype.iniciar = function () { };
    return nube;
}(Actor));
var pared = (function (_super) {
    __extends(pared, _super);
    function pared() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "rectangulo",
            imagen: "pared",
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
            imagen: "pelota",
            figura: "circulo",
            figura_radio: 25
        };
        return _this;
    }
    pelota.prototype.iniciar = function () { };
    return pelota;
}(Actor));
var plataforma = (function (_super) {
    __extends(plataforma, _super);
    function plataforma() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "rectangulo",
            imagen: "plataforma",
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
var suelo = (function (_super) {
    __extends(suelo, _super);
    function suelo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propiedades = {
            figura: "rectangulo",
            imagen: "suelo",
            figura_ancho: 600,
            figura_alto: 25,
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
            imagen: "techo",
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
            imagen: "invisible",
            texto: "Hola mundo",
            es_texto: true
        };
        return _this;
    }
    return texto;
}(ActorTextoBase));
var EscenaBase = (function () {
    function EscenaBase(pilas) {
        this.pilas = pilas;
        this.actores = [];
        this.pilas.utilidades.obtener_id_autoincremental();
        this.camara = new Camara(pilas);
        this.pilas.escenas.definir_escena_actual(this);
        this.control = new Control(pilas);
    }
    EscenaBase.prototype.agregar_actor = function (actor) {
        this.actores.push(actor);
    };
    EscenaBase.prototype.obtener_nombre_para = function (nombre_propuesto) {
        var nombres_que_pueden_colisionar = this.actores
            .map(function (e) { return e.nombre; })
            .filter(function (e) { return e.startsWith(nombre_propuesto); });
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
            fondo: this.fondo
        };
    };
    EscenaBase.prototype.actualizar = function () { };
    EscenaBase.prototype.actualizar_actores = function () {
        var _this = this;
        var actores_a_eliminar = [];
        this.actores.map(function (actor) {
            if (!actor._vivo) {
                actor.sprite.destroy();
                if (actor._texto) {
                    actor._texto.destroy();
                }
                actores_a_eliminar.push(actor);
                return;
            }
            actor.pre_actualizar();
            actor.actualizar_sensores();
            actor.actualizar_habilidades();
            actor.actualizar();
        });
        actores_a_eliminar.map(function (actor) {
            _this.quitar_actor_luego_de_eliminar(actor);
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
        this.actores.map(function (e) { return e.eliminar(); });
        this.actualizar();
        this.actualizar_actores();
        this.control.terminar();
    };
    EscenaBase.prototype.cuando_hace_click = function (x, y, evento_original) { };
    EscenaBase.prototype.cuando_mueve = function (x, y, evento_original) { };
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
var Modo = (function (_super) {
    __extends(Modo, _super);
    function Modo(data) {
        var _this = _super.call(this, data) || this;
        _this._nombre_del_fondo = "";
        return _this;
    }
    Modo.prototype.create = function (datos, ancho, alto) {
        this.ancho = ancho;
        this.alto = alto;
        this.fps = this.add.bitmapText(5, 10, "impact", "FPS");
        this.fps.scrollFactorX = 0;
        this.fps.scrollFactorY = 0;
        this.fps_extra = this.add.bitmapText(5, 34, "mini-impact", "ACTORES:");
        this.fps_extra.scrollFactorX = 0;
        this.fps_extra.scrollFactorY = 0;
        this.crear_canvas_de_depuracion();
        this.pilas = datos.pilas;
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
    Modo.prototype.update = function (actores) {
        var _this = this;
        this.graphics.clear();
        actores = actores || this.actores;
        if (this.pilas.depurador.modo_posicion_activado) {
            actores.map(function (sprite) {
                _this.dibujar_punto_de_control(_this.graphics, sprite.x, sprite.y);
            });
        }
        if (this.fps) {
            if (this.pilas.depurador.mostrar_fps) {
                this.fps.alpha = 1;
                this.fps.text = "FPS: " + Math.round(this.pilas.game.loop["actualFps"]);
                var x = this.pilas.cursor_x;
                var y = this.pilas.cursor_y;
                this.fps_extra.alpha = 1;
                this.fps_extra.text = [
                    "ACTORES: " + actores.length,
                    "CURSOR X: " + x,
                    "CURSOR Y: " + y
                ].join("\n");
            }
            else {
                this.fps.alpha = 0;
                this.fps_extra.alpha = 0;
            }
        }
        this.posicionar_fondo();
    };
    Modo.prototype.posicionar_fondo = function () {
        var posicion_de_la_camara = this.obtener_posicion_de_la_camara();
        this.fondo.x = posicion_de_la_camara.x;
        this.fondo.y = posicion_de_la_camara.y;
        this.fondo.tilePositionX = posicion_de_la_camara.x;
        this.fondo.tilePositionY = posicion_de_la_camara.y;
    };
    Modo.prototype.obtener_posicion_de_la_camara = function () {
        var x = pilas.modo.cameras.cameras[0].scrollX;
        var y = pilas.modo.cameras.cameras[0].scrollY;
        return { x: x, y: y };
    };
    Modo.prototype.crear_fondo = function (fondo) {
        this._nombre_del_fondo = fondo;
        this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, fondo);
        this.fondo.depth = -20000;
        this.fondo.setOrigin(0);
    };
    Modo.prototype.cambiar_fondo = function (fondo) {
        if (fondo !== this._nombre_del_fondo) {
            this.fondo.destroy();
            this.fondo = null;
            this.crear_fondo(fondo);
        }
    };
    Modo.prototype.obtener_actor_por_id = function (id) {
        return this.pilas.modo.actores.filter(function (e) { return e.id === id; })[0];
    };
    Modo.prototype.actualizar_sprite_desde_datos = function (sprite, actor) {
        var _this = this;
        var coordenada = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(actor.x, actor.y);
        sprite.setTexture(actor.imagen);
        sprite.id = actor.id;
        sprite.x = coordenada.x;
        sprite.y = coordenada.y;
        sprite.angle = -actor.rotacion;
        sprite.scaleX = actor.escala_x;
        sprite.scaleY = actor.escala_y;
        sprite.depth = -actor.z || 0;
        sprite.setOrigin(actor.centro_x, actor.centro_y);
        sprite.alpha = 1 - actor.transparencia / 100;
        if (sprite.figura) {
            this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, sprite.figura);
        }
        if (actor.figura) {
            sprite.figura = this.crear_figura_estatica_para(actor);
        }
        sprite.setFlipX(actor.espejado);
        sprite.setFlipY(actor.espejado_vertical);
        if (actor.es_texto) {
            if (!sprite["texto"]) {
                sprite["texto"] = this.add.text(0, 0, actor.texto);
                sprite["texto"].setFontFamily("verdana");
                sprite.update = function () {
                    _this.copiar_valores_de_sprite_a_texto(sprite);
                };
            }
            sprite["texto"].setText(actor.texto);
            this.copiar_valores_de_sprite_a_texto(sprite);
        }
    };
    Modo.prototype.copiar_valores_de_sprite_a_texto = function (sprite) {
        sprite["texto"].x = sprite.x;
        sprite["texto"].y = sprite.y;
        sprite["texto"].angle = sprite.angle;
        sprite["texto"].scaleX = sprite.scaleX;
        sprite["texto"].scaleY = sprite.scaleY;
        sprite["texto"].alpha = sprite.alpha;
        sprite["texto"].flipX = sprite.flipX;
        sprite["texto"].flipY = sprite.flipY;
        sprite["texto"].setOrigin(sprite.originX, sprite.originY);
    };
    Modo.prototype.crear_figura_estatica_para = function (actor) {
        var coordenada = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(actor.x, actor.y);
        var angulo = this.pilas.utilidades.convertir_angulo_a_radianes(-actor.rotacion);
        if (actor.figura === "rectangulo") {
            return this.matter.add.rectangle(coordenada.x, coordenada.y, actor.figura_ancho, actor.figura_alto, {
                isStatic: true,
                angle: angulo
            });
        }
        if (actor.figura === "circulo") {
            return this.matter.add.circle(coordenada.x, coordenada.y, actor.figura_radio, { isStatic: true });
        }
        throw Error("No se reconoce la figura " + actor.figura + " en este modo.");
    };
    Modo.prototype.posicionar_la_camara = function (datos_de_la_escena) {
        this.cameras.cameras[0].setScroll(datos_de_la_escena.camara_x, -datos_de_la_escena.camara_y);
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
        this.pilas = pilas;
        this.load.crossOrigin = "anonymous";
        for (var i = 0; i < pilas.recursos.imagenes.length; i++) {
            var item = pilas.recursos.imagenes[i];
            this.load.image(item.nombre, item.ruta);
        }
        for (var i = 0; i < pilas.recursos.sonidos.length; i++) {
            var sonido = pilas.recursos.sonidos[i];
            this.load.audio(sonido.nombre, sonido.ruta, {});
        }
        for (var i = 0; i < pilas.recursos.fuentes.length; i++) {
            var fuente = pilas.recursos.fuentes[i];
            this.load.bitmapFont(fuente.nombre, fuente.imagen, fuente.fuente, null, null);
        }
        this.load.on("progress", this.cuando_progresa_la_carga, this);
    };
    ModoCargador.prototype.create = function () {
        _super.prototype.create.call(this, { pilas: this.pilas }, 500, 500);
        this.pilas.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos");
        var msg = "Carga finalizada\nTiene que enviar la señal 'ejecutar_proyecto'";
        this.add.bitmapText(5, 5, "impact", msg);
    };
    ModoCargador.prototype.cuando_progresa_la_carga = function (progreso) {
        this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", {
            progreso: Math.ceil(progreso * 100)
        });
    };
    ModoCargador.prototype.update = function () { };
    return ModoCargador;
}(Modo));
var ModoEditor = (function (_super) {
    __extends(ModoEditor, _super);
    function ModoEditor() {
        return _super.call(this, { key: "ModoEditor" }) || this;
    }
    ModoEditor.prototype.preload = function () { };
    ModoEditor.prototype.create = function (datos) {
        var _this = this;
        _super.prototype.create.call(this, datos, datos.proyecto.ancho, datos.proyecto.alto);
        this.actores = [];
        this.pilas = datos.pilas;
        this.crear_fondo(datos.escena.fondo);
        this.posicionar_la_camara(datos.escena);
        this.crear_actores_desde_los_datos_de_la_escena(datos.escena);
        this.crear_manejadores_para_hacer_arrastrables_los_actores();
        this.matter.systems.matterPhysics.world.createDebugGraphic();
        this.input.on("pointermove", function (cursor) {
            var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
            _this.pilas.cursor_x = Math.trunc(posicion.x);
            _this.pilas.cursor_y = Math.trunc(posicion.y);
        });
    };
    ModoEditor.prototype.crear_manejadores_para_hacer_arrastrables_los_actores = function () {
        var matter = this.pilas.Phaser.Physics.Matter.Matter;
        var escena = this;
        this.input.on("dragstart", function (pointer, gameObject) {
            escena.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_mover_un_actor", { id: gameObject.id });
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
            if (gameObject.figura) {
                matter.Body.setPosition(gameObject.figura, {
                    x: dragX,
                    y: dragY
                });
            }
        });
        this.input.on("dragend", function (pointer, gameObject) {
            escena.pilas.game.canvas.style.cursor = "default";
            var posicion = escena.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(gameObject.x, gameObject.y);
            escena.pilas.mensajes.emitir_mensaje_al_editor("termina_de_mover_un_actor", { id: gameObject.id, x: posicion.x, y: posicion.y });
        });
    };
    ModoEditor.prototype.crear_actores_desde_los_datos_de_la_escena = function (escena) {
        var _this = this;
        escena.actores.map(function (actor) {
            _this.crear_sprite_desde_actor(actor);
        });
    };
    ModoEditor.prototype.crear_sprite_desde_actor = function (actor) {
        var _this = this;
        var sprite = this.add.sprite(0, 0, actor.imagen);
        sprite["setInteractive"]();
        sprite["actor"] = actor;
        sprite["destacandose"] = false;
        sprite["destacar"] = function () {
            if (sprite["destacandose"]) {
                return;
            }
            sprite["destacandose"] = true;
            _this.tweens.add({
                targets: sprite,
                scaleX: sprite.scaleX + 0.1,
                scaleY: sprite.scaleY + 0.1,
                duration: 100,
                ease: "Power2",
                yoyo: true,
                delay: 0,
                onComplete: function () {
                    sprite["destacandose"] = false;
                }
            });
        };
        this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
        this.input.setDraggable(sprite, undefined);
        this.actores.push(sprite);
    };
    ModoEditor.prototype.aplicar_atributos_de_actor_a_sprite = function (actor, sprite) {
        this.actualizar_sprite_desde_datos(sprite, actor);
    };
    ModoEditor.prototype.update = function () {
        _super.prototype.update.call(this, this.actores);
        if (this.pilas.depurador.mostrar_fisica) {
            this.matter.systems.matterPhysics.world.debugGraphic.setAlpha(1);
        }
        else {
            this.matter.systems.matterPhysics.world.debugGraphic.setAlpha(0);
        }
        this.actores.map(function (a) {
            a.update();
        });
    };
    ModoEditor.prototype.eliminar_actor_por_id = function (id) {
        var indice = this.actores.findIndex(function (e) { return e.id === id; });
        var actor_a_eliminar = this.actores.splice(indice, 1);
        if (actor_a_eliminar[0].figura) {
            this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, actor_a_eliminar[0].figura);
        }
        actor_a_eliminar[0].destroy();
        if (actor_a_eliminar[0]["texto"]) {
            actor_a_eliminar[0]["texto"].destroy();
        }
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
        return _this;
    }
    ModoEjecucion.prototype.preload = function () { };
    ModoEjecucion.prototype.create = function (datos) {
        var _this = this;
        _super.prototype.create.call(this, datos, datos.proyecto.ancho, datos.proyecto.alto);
        this.actores = [];
        try {
            this.guardar_parametros_en_atributos(datos);
            var escena = this.obtener_escena_inicial();
            this.clases = this.obtener_referencias_a_clases();
            this.instanciar_escena(this.nombre_de_la_escena_inicial);
            this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_iniciar_ejecucion", {});
            this.pilas.historia.limpiar();
            this.modo_fisica_activado = false;
            if (this.pilas.depurador.mostrar_fisica) {
                this.modo_fisica_activado = true;
                this.matter.systems.matterPhysics.world.createDebugGraphic();
            }
            this.input.on("pointermove", function (cursor) {
                var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
                _this.pilas.cursor_x = Math.trunc(posicion.x);
                _this.pilas.cursor_y = Math.trunc(posicion.y);
                if (_this._escena_en_ejecucion) {
                    try {
                        _this._escena_en_ejecucion.cuando_mueve(posicion.x, posicion.y, cursor);
                    }
                    catch (e) {
                        console.error(e);
                        _this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_mueve");
                        _this.pausar();
                    }
                }
            });
            this.input.keyboard.on("keyup", function (evento) {
                if (evento.key === "Escape") {
                    _this.pilas.mensajes.emitir_mensaje_al_editor("pulsa_la_tecla_escape", {});
                }
            });
            this.input.on("pointerdown", function (cursor) {
                var posicion = _this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(cursor.x, cursor.y);
                if (_this._escena_en_ejecucion) {
                    try {
                        _this._escena_en_ejecucion.cuando_hace_click(posicion.x, posicion.y, cursor);
                    }
                    catch (e) {
                        console.error(e);
                        _this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_hace_click");
                        _this.pausar();
                    }
                }
            });
            this.vincular_eventos_de_colision();
        }
        catch (e) {
            console.error(e);
            this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
            this.pausar();
        }
    };
    ModoEjecucion.prototype.cambiar_escena = function (nombre) {
        if (this._escena_en_ejecucion) {
            this._escena_en_ejecucion.terminar();
        }
        this.instanciar_escena(nombre);
    };
    ModoEjecucion.prototype.vincular_eventos_de_colision = function () {
        var _this = this;
        this.matter.world.on("collisionstart", function (event) {
            try {
                for (var i = 0; i < event.pairs.length; i++) {
                    var colision = event.pairs[i];
                    var figura_1 = colision.bodyA;
                    var figura_2 = colision.bodyB;
                    if (figura_1.gameObject &&
                        figura_1.gameObject.actor &&
                        figura_2.gameObject &&
                        figura_2.gameObject.actor) {
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
                        if (figura_2.sensor_del_actor &&
                            figura_1.gameObject &&
                            figura_2.sensor_del_actor !== figura_1.gameObject.actor) {
                            figura_2.colisiones.push(figura_1.gameObject.actor);
                        }
                        if (figura_1.sensor_del_actor &&
                            figura_2.gameObject &&
                            figura_1.sensor_del_actor !== figura_2.gameObject.actor) {
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
                if (figura_1.gameObject &&
                    figura_1.gameObject.actor &&
                    figura_2.gameObject &&
                    figura_2.gameObject.actor) {
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
                    if (figura_1.gameObject &&
                        figura_1.gameObject.actor &&
                        figura_2.gameObject &&
                        figura_2.gameObject.actor) {
                        var actor_a = figura_1.gameObject.actor;
                        var actor_b = figura_2.gameObject.actor;
                        actor_a.colisiones.splice(actor_a.colisiones.indexOf(actor_b), 1);
                        actor_b.colisiones.splice(actor_b.colisiones.indexOf(actor_a), 1);
                        actor_a.cuando_termina_una_colision(actor_b);
                        actor_b.cuando_termina_una_colision(actor_a);
                    }
                    else {
                        if (figura_2.sensor_del_actor &&
                            figura_1.gameObject &&
                            figura_2.colisiones.indexOf(figura_1.gameObject.actor) > -1) {
                            figura_2.colisiones.splice(figura_2.colisiones.indexOf(figura_1.gameObject.actor), 1);
                        }
                        if (figura_1.sensor_del_actor &&
                            figura_2.gameObject &&
                            figura_1.colisiones.indexOf(figura_2.gameObject.actor) > -1) {
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
        if (escenas_encontradas.length === 0) {
            throw Error("No se puede encontrar la escena '" + nombre + "'.");
        }
        else {
            if (escenas_encontradas.length > 1) {
                throw Error("Hay m\u00E1s de una escena llamada '" + nombre + "'.");
            }
        }
        return escenas_encontradas[0];
    };
    ModoEjecucion.prototype.instanciar_escena = function (nombre) {
        var escena = this.obtener_escena_por_nombre(nombre);
        this.crear_fondo(escena.fondo);
        this.crear_escena(escena);
    };
    ModoEjecucion.prototype.crear_escena = function (datos_de_la_escena) {
        var _this = this;
        var escena = new this.clases[datos_de_la_escena.nombre](this.pilas);
        escena.camara.x = datos_de_la_escena.camara_x;
        escena.camara.y = datos_de_la_escena.camara_y;
        escena.fondo = datos_de_la_escena.fondo;
        escena.iniciar();
        this.actores = datos_de_la_escena.actores.map(function (e) {
            return _this.crear_actor(e);
        });
        this._escena_en_ejecucion = escena;
    };
    ModoEjecucion.prototype.crear_actor = function (entidad) {
        var x = entidad.x;
        var y = entidad.y;
        var imagen = entidad.imagen;
        var actor = null;
        var clase = this.clases[entidad.nombre];
        if (clase) {
            actor = new this.clases[entidad.nombre](this.pilas);
            var p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);
            p = this.pilas.utilidades.combinar_propiedades(p, entidad);
            actor.pre_iniciar(p);
            actor.iniciar();
        }
        else {
            var nombres_de_clases = Object.getOwnPropertyNames(this.clases);
            throw new Error("No existe c\u00F3digo para crear un actor de la clase " + entidad.tipo + ". Las clases disponibles son [" + nombres_de_clases.join(", ") + "]");
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
            lista_de_clases = codigo
                .match(re_creacion_de_clase)
                .map(function (e) { return e.match(re_solo_clase)[1]; });
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
        if (this.pilas.depurador.mostrar_fisica) {
            if (!this.modo_fisica_activado) {
                this.modo_fisica_activado = true;
                this.matter.systems.matterPhysics.world.createDebugGraphic();
            }
        }
        else {
            this.pilas.modo.matter.systems.matterPhysics.world.debugGraphic.destroy();
        }
        try {
            if (this.permitir_modo_pausa) {
                this.guardar_foto_de_entidades();
            }
            this.pilas.escena.actualizar();
            this.pilas.escena.actualizar_actores();
        }
        catch (e) {
            console.error(e);
            this.pilas.mensajes.emitir_mensaje_al_editor("error_de_ejecucion", {
                mensaje: e.message,
                stack: e.stack.toString()
            });
            this.pausar();
        }
    };
    ModoEjecucion.prototype.pausar = function () {
        console.warn("Pausando la escena a causa del error anterior.");
        this.scene.pause(undefined);
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
        return _super.call(this, { key: "ModoPausa" }) || this;
    }
    ModoPausa.prototype.preload = function () { };
    ModoPausa.prototype.create = function (datos) {
        _super.prototype.create.call(this, datos, datos.pilas._ancho, datos.pilas._alto);
        this.pilas = datos.pilas;
        this.posicion = this.pilas.historia.obtener_cantidad_de_posiciones();
        this.total = this.pilas.historia.obtener_cantidad_de_posiciones();
        this.sprites = [];
        var foto = this.pilas.historia.obtener_foto(1);
        this.crear_fondo(foto.escena.fondo);
        this.crear_sprites_desde_historia(this.posicion);
        this.crear_canvas_de_depuracion_modo_pausa();
        this.matter.systems.matterPhysics.world.createDebugGraphic();
        this.tecla_izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.tecla_derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        var t = this.pilas.historia.obtener_cantidad_de_posiciones();
        var datos_para_el_editor = { minimo: 0, posicion: t, maximo: t };
        this.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_depurar_en_modo_pausa", datos_para_el_editor);
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
            sprite.destroy();
        });
        this.posicionar_la_camara(foto.escena);
        this.fondo.setAlpha(0.6);
        this.sprites = foto.actores.map(function (entidad) {
            return _this.crear_sprite_desde_entidad(entidad);
        });
    };
    ModoPausa.prototype.update = function () {
        var _this = this;
        this.graphics.clear();
        if (this.fps) {
            this.fps.alpha = 0;
            this.fps_extra.alpha = 0;
        }
        if (this.pilas.depurador.mostrar_fisica) {
            this.matter.systems.matterPhysics.world.debugGraphic.setAlpha(1);
        }
        else {
            this.matter.systems.matterPhysics.world.debugGraphic.setAlpha(0);
        }
        if (this.pilas.depurador.modo_posicion_activado) {
            var foto = this.pilas.historia.obtener_foto(this.posicion);
            foto.actores.map(function (sprite) {
                var _a = _this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(sprite.x, sprite.y), x = _a.x, y = _a.y;
                _this.dibujar_punto_de_control(_this.graphics, x, y);
            });
        }
        if (this.tecla_derecha.isDown) {
            this.avanzar_posicion();
        }
        if (this.tecla_izquierda.isDown) {
            this.retroceder_posicion();
        }
        this.posicionar_fondo();
    };
    ModoPausa.prototype.crear_sprite_desde_entidad = function (entidad) {
        var _a = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y), x = _a.x, y = _a.y;
        var sprite = this.add.sprite(x, y, entidad.imagen);
        sprite.angle = -entidad.rotacion;
        sprite.setOrigin(entidad.centro_x, entidad.centro_y);
        sprite.scaleX = entidad.escala_x;
        sprite.scaleY = entidad.escala_y;
        sprite.alpha = 1 - entidad.transparencia / 100;
        sprite.setFlipX(entidad.espejado);
        sprite.setFlipY(entidad.espejado_vertical);
        sprite.depth = -entidad.z;
        if (entidad.texto) {
            sprite["texto"] = this.pilas.modo.add.text(0, 0, entidad.texto);
            sprite["texto"].setFontFamily("verdana");
            this.copiar_valores_de_sprite_a_texto(sprite);
        }
        if (entidad.figura) {
            sprite["figura"] = this.crear_figura_estatica_para(entidad);
        }
        return sprite;
    };
    ModoPausa.prototype.actualizar_posicion = function (posicion) {
        this.posicion = posicion;
        this.posicion = Math.min(this.posicion, this.total);
        this.posicion = Math.max(this.posicion, 0);
        this.crear_sprites_desde_historia(this.posicion);
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
