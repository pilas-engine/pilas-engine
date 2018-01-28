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
var Actores = (function () {
    function Actores(pilas) {
        this.pilas = pilas;
    }
    Actores.prototype.Caja = function (x, y) {
        return new Caja(this.pilas, x, y, "caja");
    };
    Actores.prototype.Aceituna = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new Aceituna(this.pilas, x, y);
    };
    return Actores;
}());
var Control = (function () {
    function Control(pilas) {
        this.pilas = pilas;
        this.teclaIzquierda = pilas.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.teclaDerecha = pilas.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.teclaArriba = pilas.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.teclaAbajo = pilas.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    }
    Object.defineProperty(Control.prototype, "izquierda", {
        get: function () {
            return this.teclaIzquierda.isDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "derecha", {
        get: function () {
            return this.teclaDerecha.isDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "arriba", {
        get: function () {
            return this.teclaArriba.isDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "abajo", {
        get: function () {
            return this.teclaAbajo.isDown;
        },
        enumerable: true,
        configurable: true
    });
    return Control;
}());
var Escenas = (function () {
    function Escenas(pilas) {
        this.escena_actual = null;
        this.pilas = pilas;
    }
    Escenas.prototype.Normal = function () {
        this.escena_actual = new Normal(this.pilas);
        return this.escena_actual;
    };
    return Escenas;
}());
var Log = (function () {
    function Log(pilas) {
        this.pilas = pilas;
    }
    Log.prototype.debug = function () {
        var mensaje = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mensaje[_i] = arguments[_i];
        }
        console.debug.apply(console, ["DEBUG"].concat(mensaje));
    };
    Log.prototype.info = function () {
        var mensaje = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mensaje[_i] = arguments[_i];
        }
        console.info.apply(console, ["INFO"].concat(mensaje));
    };
    return Log;
}());
var HOST = "file://";
if (window.location.host) {
    HOST = "http://" + window.location.host;
}
var Pilas = (function () {
    function Pilas() {
        this.log = new Log(this);
        this.agregar_manejador_de_eventos();
        this.capturar_errores_y_reportarlos_al_editor();
    }
    Pilas.prototype.iniciar = function () {
        this.game.state.add("editorState", EstadoEditor);
        this.game.state.add("estadoEjecucion", EstadoEjecucion);
        this.game.state.add("estadoPausa", EstadoPausa);
        this.game.scale.trackParentInterval = 1;
        this.conectar_atajos_de_teclado();
        this.control = new Control(this);
        this.actores = new Actores(this);
        this.escenas = new Escenas(this);
        this.utilidades = new Utilidades(this);
        this.escenas.Normal();
    };
    Pilas.prototype.obtener_entidades = function () {
        return this.game.state.getCurrentState()["entidades"];
    };
    Pilas.prototype.escena_actual = function () {
        return this.escenas.escena_actual;
    };
    Pilas.prototype.conectar_atajos_de_teclado = function () {
        var _this = this;
        this.game.input.keyboard.onUpCallback = function (evento) {
            if (evento.keyCode == Phaser.Keyboard.ESC && (_this.game.state.current === "estadoEjecucion" || _this.game.state.current === "estadoPausa")) {
                console.log("pulsa pausa.");
                _this.emitir_mensaje_al_editor("cuando_pulsa_escape", {});
            }
        };
    };
    Pilas.prototype.agregar_manejador_de_eventos = function () {
        var _this = this;
        window.addEventListener("message", function (e) { return _this.antender_mensaje_desde_el_editor(e); }, false);
    };
    Pilas.prototype.emitir_error_y_detener = function (error) {
        this.emitir_mensaje_al_editor("error", { mensaje: error.message, stack: error.stack });
        this.game.paused = true;
        console.error(error);
    };
    Pilas.prototype.capturar_errores_y_reportarlos_al_editor = function () {
    };
    Pilas.prototype.antender_mensaje_desde_el_editor = function (e) {
        var _this = this;
        if (e.origin != HOST) {
            return;
        }
        if (e.data.tipo === "define_escena") {
            this.game.state.start("editorState", true, false, {
                pilas: this,
                escena: e.data.escena,
                cuando_termina_de_mover: function (datos) {
                    _this.emitir_mensaje_al_editor("termina_de_mover_un_actor", datos);
                },
                cuando_comienza_a_mover: function (datos) {
                    _this.emitir_mensaje_al_editor("comienza_a_mover_un_actor", datos);
                }
            });
        }
        if (e.data.tipo === "ejecutar_escena") {
            this.game.state.start("estadoEjecucion", true, false, {
                pilas: this,
                escena: e.data.escena,
                codigo: e.data.codigo
            });
        }
        if (e.data.tipo === "cambiar_posicion") {
            var pos = +e.data.posicion;
            if (this.game.state.getCurrentState()["actualizarPosicionDeFormaExterna"]) {
                this.game.state.getCurrentState()["actualizarPosicionDeFormaExterna"](pos);
            }
        }
        if (e.data.tipo === "selecciona_actor_desde_el_editor") {
            var id = +e.data.id;
            var actores = this.obtener_actores();
            var sprites = this.game.state.getCurrentState().obtener_sprites();
            var sprite = sprites[id];
            if (sprite) {
                sprite.destacar();
            }
        }
        if (e.data.tipo === "pausar_escena") {
            var historia = this.game.state.getCurrentState()["historia"];
            this.game.state.start("estadoPausa", true, false, {
                pilas: this,
                historia: historia,
                cuando_cambia_posicion: function (datos) {
                    _this.emitir_mensaje_al_editor("cambia_posicion_dentro_del_modo_pausa", datos);
                }
            });
            var t = historia.length - 1;
            var datos = { minimo: 0, posicion: t, maximo: t };
            this.emitir_mensaje_al_editor("comienza_a_depurar_en_modo_pausa", datos);
        }
        if (e.data.tipo === "iniciar_pilas") {
            this.iniciar_pilas_desde_el_editor(+e.data.ancho, +e.data.alto);
        }
    };
    Pilas.prototype.iniciar_pilas_desde_el_editor = function (ancho, alto) {
        var _this = this;
        this._ancho = ancho;
        this._alto = alto;
        this.game = new Phaser.Game(this._ancho, this._alto, Phaser.AUTO, "game", {
            preload: function (e) { return _this._preload(); },
            create: function (e) { return _this._create(); }
        });
    };
    Pilas.prototype._preload = function () { };
    Pilas.prototype._create = function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.stage.disableVisibilityChange = true;
        this.game.renderer.renderSession.roundPixels = true;
        this.game.load.onLoadStart.add(this._cuando_comienza_a_cargar, this);
        this.game.load.onFileComplete.add(this._cuando_carga_archivo, this);
        this.game.load.onLoadComplete.add(this._cuando_termina_de_cargar, this);
        this.start();
    };
    Pilas.prototype.start = function () {
        this.game.load.image("ember", "imagenes/ember.png");
        this.game.load.image("pelota", "imagenes/pelota.png");
        this.game.load.image("logo", "imagenes/logo.png");
        this.game.load.image("sin_imagen", "imagenes/sin_imagen.png");
        this.game.load.image("caja", "imagenes/caja.png");
        this.game.load.image("aceituna", "imagenes/aceituna.png");
        this.game.load.start();
    };
    Pilas.prototype._cuando_comienza_a_cargar = function () { };
    Pilas.prototype._cuando_carga_archivo = function (progreso) {
        this.emitir_mensaje_al_editor("progreso_de_carga", { progreso: progreso });
    };
    Pilas.prototype._cuando_termina_de_cargar = function () {
        this.iniciar();
        this.emitir_mensaje_al_editor("finaliza_carga_de_recursos", {});
    };
    Pilas.prototype.emitir_mensaje_al_editor = function (nombre, datos) {
        datos = datos || {};
        datos.tipo = nombre;
        window.parent.postMessage(datos, HOST);
    };
    Pilas.prototype.obtener_actores = function () {
        return pilas.game.world.children.map(function (s) { return s["actor"]; }).filter(function (s) { return s !== undefined; });
    };
    Pilas.prototype.obtener_cantidad_de_actores = function () {
        return this.obtener_actores().length;
    };
    Pilas.prototype.obtener_actores_en = function (_x, _y) {
        var actores = this.obtener_actores();
        var _a = this.convertir_coordenada_de_pilas_a_phaser(_x, _y), x = _a.x, y = _a.y;
        return actores.filter(function (actor) {
            return actor.sprite.getBounds().contains(x - actor.sprite.x, y - actor.sprite.y);
        });
    };
    Pilas.prototype.convertir_coordenada_de_pilas_a_phaser = function (x, y) {
        return { x: x + this._ancho / 2, y: this._alto / 2 - y };
    };
    Pilas.prototype.convertir_coordenada_de_phaser_a_pilas = function (x, y) {
        return { x: x - this._ancho / 2, y: this._ancho / 2 - y };
    };
    return Pilas;
}());
var pilas = new Pilas();
var Utilidades = (function () {
    function Utilidades(pilas) {
        this.pilas = pilas;
        this.id = 1;
    }
    Utilidades.prototype.obtener_id_autoincremental = function () {
        this.id = this.id + 1;
        return this.id;
    };
    return Utilidades;
}());
var ActorBase = (function () {
    function ActorBase(pilas, x, y, imagen) {
        if (imagen === void 0) { imagen = "sin_imagen"; }
        var _this = this;
        this.pilas = pilas;
        this.sprite = new Phaser.Sprite(pilas.game, 0, 0, imagen);
        this.x = x;
        this.y = y;
        this.rotacion = 0;
        this.pilas.game.world.add(this.sprite);
        this.sprite["actor"] = this;
        this.iniciar();
        this.sprite.update = function () {
            try {
                _this.actualizar();
            }
            catch (e) {
                _this.pilas.emitir_error_y_detener(e);
            }
        };
        this.pilas.escena_actual().agregar_actor(this);
    }
    ActorBase.prototype.iniciar = function () { };
    ActorBase.prototype.serializar = function () {
        return {
            tipo: this.tipo,
            x: Math.round(this.x),
            y: Math.round(this.y),
            centro_x: this.sprite.anchor.x,
            centro_y: this.sprite.anchor.y,
            imagen: this.sprite.key,
            rotacion: this.sprite.angle
        };
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
            var x = this.pilas.convertir_coordenada_de_phaser_a_pilas(this.sprite.x, 0).x;
            return x;
        },
        set: function (_x) {
            var x = this.pilas.convertir_coordenada_de_pilas_a_phaser(_x, 0).x;
            this.sprite.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "y", {
        get: function () {
            var y = this.pilas.convertir_coordenada_de_phaser_a_pilas(0, this.sprite.y).y;
            return y;
        },
        set: function (_y) {
            var y = this.pilas.convertir_coordenada_de_pilas_a_phaser(0, _y).y;
            this.sprite.y = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorBase.prototype, "rotacion", {
        get: function () {
            return this._rotacion;
        },
        set: function (angulo) {
            this._rotacion = angulo % 360;
            this.sprite.angle = -this._rotacion;
        },
        enumerable: true,
        configurable: true
    });
    ActorBase.prototype.toString = function () {
        var clase = this.constructor["name"];
        return "<" + clase + " en (" + this.x + ", " + this.y + ")>";
    };
    return ActorBase;
}());
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Actor.prototype.iniciar = function () {
    };
    Actor.prototype.actualizar = function () {
    };
    return Actor;
}(ActorBase));
var Aceituna = (function (_super) {
    __extends(Aceituna, _super);
    function Aceituna() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Aceituna.prototype.iniciar = function () {
        this.imagen = "aceituna";
    };
    return Aceituna;
}(Actor));
var Caja = (function (_super) {
    __extends(Caja, _super);
    function Caja() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Caja.prototype.iniciar = function () {
        this.sprite.game.physics.p2.enable([this.sprite], true);
        this.sprite.body.static = false;
    };
    return Caja;
}(Actor));
var Pelota = (function (_super) {
    __extends(Pelota, _super);
    function Pelota() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pelota.prototype.iniciar = function () {
    };
    return Pelota;
}(Actor));
var ActorDentroDelEditor = (function (_super) {
    __extends(ActorDentroDelEditor, _super);
    function ActorDentroDelEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorDentroDelEditor.prototype.iniciar = function (pilas, entidad) {
        this.key = entidad.imagen;
        this.id = entidad.id;
        this.pilas = pilas;
        var _a = this.pilas.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y), x = _a.x, y = _a.y;
        this.x = x;
        this.y = y;
        this.pivot.x = entidad.centro_x;
        this.pivot.y = entidad.centro_y;
        this.inputEnabled = true;
        this.input.enableDrag();
        this.crear_sombra();
        this["depurable"] = true;
        this.conectar_eventos_arrastrar_y_soltar();
    };
    ActorDentroDelEditor.prototype.conectar_eventos_arrastrar_y_soltar = function () {
        this.events.onDragStart.add(this.cuando_comienza_a_mover, this);
        this.events.onDragStart.add(this.activar_sombra, this);
        this.events.onInputOver.add(this.cuando_posiciona_el_mouse_sobre_el_actor, this);
        this.events.onInputOut.add(this.cuando_deja_de_posicionar_el_mouse_sobre_el_actor, this);
        this.events.onDragStop.add(this.ocultar_sombra, this);
        this.events.onDragStop.add(this.cuando_termina_de_mover, this);
    };
    ActorDentroDelEditor.prototype.al_terminar_de_arrastrar = function (a) { };
    ActorDentroDelEditor.prototype.al_comenzar_a_arrastrar = function (a) { };
    ActorDentroDelEditor.prototype.cuando_comienza_a_mover = function () {
        if (this.al_comenzar_a_arrastrar) {
            var _a = this.pilas.convertir_coordenada_de_phaser_a_pilas(this.x, this.y), x = _a.x, y = _a.y;
            this.definir_puntero("-webkit-grabbing");
            this.al_comenzar_a_arrastrar({ id: this.id, x: x, y: y });
        }
    };
    ActorDentroDelEditor.prototype.cuando_posiciona_el_mouse_sobre_el_actor = function () {
        this.definir_puntero("-webkit-grab");
    };
    ActorDentroDelEditor.prototype.cuando_deja_de_posicionar_el_mouse_sobre_el_actor = function () {
        this.definir_puntero("default");
    };
    ActorDentroDelEditor.prototype.cuando_termina_de_mover = function () {
        if (this.al_terminar_de_arrastrar) {
            var _a = this.pilas.convertir_coordenada_de_phaser_a_pilas(this.x, this.y), x = _a.x, y = _a.y;
            this.definir_puntero("-webkit-grab");
            this.al_terminar_de_arrastrar({ id: this.id, x: x, y: y });
        }
    };
    ActorDentroDelEditor.prototype.definir_puntero = function (nombre) {
        this.game.canvas.style.cursor = nombre;
    };
    ActorDentroDelEditor.prototype.activar_sombra = function () {
        this.shadow.alpha = 0.3;
    };
    ActorDentroDelEditor.prototype.ocultar_sombra = function () {
        this.shadow.alpha = 0.0;
    };
    ActorDentroDelEditor.prototype.update = function () {
        this.shadow.key = this.key;
        this.shadow.anchor.x = this.anchor.x;
        this.shadow.anchor.y = this.anchor.y;
        this.shadow.x = this.x + 5;
        this.shadow.y = this.y + 5;
        this.shadow.scale = this.scale;
    };
    ActorDentroDelEditor.prototype.crear_sombra = function () {
        this.shadow = this.game.add.sprite(10, 10, this.key);
        this.shadow.tint = 0x000000;
        this.ocultar_sombra();
    };
    ActorDentroDelEditor.prototype.destacar = function () {
        var i = Phaser.Easing.Linear.None;
        var y0 = 1;
        var y1 = 1.05;
        var y2 = 0.95;
        var x0 = 1;
        var x1 = 0.95;
        var x2 = 1.05;
        var t = 70;
        var a = this.game.add.tween(this.scale).to({ y: y1, x: x1 }, t, i);
        var b = this.game.add.tween(this.scale).to({ y: y0, x: x0 }, t, i);
        var c = this.game.add.tween(this.scale).to({ y: y2, x: x2 }, t, i);
        var d = this.game.add.tween(this.scale).to({ y: y0, x: x0 }, t, i);
        a.chain(b);
        b.chain(c);
        c.chain(d);
        a.start();
    };
    return ActorDentroDelEditor;
}(Phaser.Sprite));
var ActorDentroDelModoPausa = (function (_super) {
    __extends(ActorDentroDelModoPausa, _super);
    function ActorDentroDelModoPausa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActorDentroDelModoPausa;
}(Phaser.Sprite));
var EscenaBase = (function () {
    function EscenaBase(pilas) {
        this.pilas = pilas;
        this.actores = [];
        this.pilas.utilidades.obtener_id_autoincremental();
    }
    EscenaBase.prototype.agregar_actor = function (actor) {
        this.actores.push(actor);
    };
    return EscenaBase;
}());
var Escena = (function (_super) {
    __extends(Escena, _super);
    function Escena() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Escena.prototype.iniciar = function () { };
    Escena.prototype.actualizar = function () { };
    return Escena;
}(EscenaBase));
var Normal = (function (_super) {
    __extends(Normal, _super);
    function Normal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Normal.prototype.iniciar = function () {
        console.log("ha iniciando la escena!");
    };
    return Normal;
}(Escena));
var Estado = (function (_super) {
    __extends(Estado, _super);
    function Estado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Estado.prototype.render = function () {
        var _this = this;
        var debug = this.game.debug;
        function dibujarPuntoDeControl(debug, x, y) {
            var rect = new Phaser.Rectangle(x - 3, y - 3, 7, 7);
            var line1 = new Phaser.Line(x - 2, y - 2, x + 2, y + 2);
            var line2 = new Phaser.Line(x - 2, y + 2, x + 2, y - 2);
            debug.geom(rect, "black", true);
            debug.geom(line1, "white", false);
            debug.geom(line2, "white", false);
        }
        this.game.world.children.forEach(function (sprite) {
            if (sprite["depurable"]) {
                var _x = Math.round(sprite.x);
                var _y = Math.round(sprite.y);
                var _a = _this.pilas.convertir_coordenada_de_phaser_a_pilas(_x, _y), x = _a.x, y = _a.y;
                debug.text("(" + x + ", " + y + ")", _x + 5, _y + 15, "white");
                dibujarPuntoDeControl(debug, sprite.x, sprite.y);
            }
        });
    };
    Estado.prototype.create = function () {
        this.canvas = this.game.add.graphics(0, 0);
    };
    Estado.prototype.obtener_sprites = function () {
        return this.sprites;
    };
    Estado.prototype.actualizarPosicionDeFormaExterna = function (pos) { };
    Estado.prototype.dibujarLineaDeCoordenadasRecorridas = function () {
        var _this = this;
        this.canvas.clear();
        this.canvas.beginFill(0xffffff, 1);
        this.historia.map(function (historia) {
            historia.map(function (entidad) {
                var _a = _this.pilas.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y), x = _a.x, y = _a.y;
                _this.canvas.drawRect(x, y, 2, 2);
            });
        });
    };
    return Estado;
}(Phaser.State));
var EstadoEditor = (function (_super) {
    __extends(EstadoEditor, _super);
    function EstadoEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EstadoEditor.prototype.init = function (datos) {
        this.pilas = datos.pilas;
        this.entidades = datos.escena.actores;
        this.cuando_termina_de_mover = datos.cuando_termina_de_mover;
        this.cuando_comienza_a_mover = datos.cuando_comienza_a_mover;
        this.sprites = {};
        this.crear_texto_con_posicion_del_mouse();
    };
    EstadoEditor.prototype.cuando_termina_de_mover = function (a) { };
    EstadoEditor.prototype.cuando_comienza_a_mover = function (a) { };
    EstadoEditor.prototype.crear_texto_con_posicion_del_mouse = function () {
        var style = {
            font: "16px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "top"
        };
        var texto = this.game.add.text(0, 5, "", style);
        texto.setShadow(1, 1, "rgba(0, 0, 0, 0.5)", 3);
        this.texto = texto;
    };
    EstadoEditor.prototype.create = function () {
        this.game.stage.backgroundColor = "5b5";
    };
    EstadoEditor.prototype.update = function () {
        var _this = this;
        this.entidades = this.entidades.map(function (e) {
            var sprite = null;
            if (!_this.sprites[e.id]) {
                sprite = new ActorDentroDelEditor(_this.game, 0, 0, e.imagen);
                sprite.iniciar(pilas, e);
                sprite.al_terminar_de_arrastrar = _this.cuando_termina_de_mover;
                sprite.al_comenzar_a_arrastrar = _this.cuando_comienza_a_mover;
                _this.world.add(sprite);
                _this.sprites[e.id] = sprite;
            }
            else {
                sprite = _this.sprites[e.id];
            }
            var _a = _this.pilas.convertir_coordenada_de_phaser_a_pilas(sprite.x, sprite.y), x = _a.x, y = _a.y;
            e.x = x;
            e.y = y;
            sprite.anchor.set(e.centro_x, e.centro_y);
            return e;
        });
        this.actualizar_texto_con_posicion_del_mouse();
    };
    EstadoEditor.prototype.actualizar_texto_con_posicion_del_mouse = function () {
        var _x = Math.round(this.input.mousePointer.x);
        var _y = Math.round(this.input.mousePointer.y);
        var _a = this.pilas.convertir_coordenada_de_phaser_a_pilas(_x, _y), x = _a.x, y = _a.y;
        if (x !== -1 && y !== -1) {
            this.texto.text = "  Mouse: (" + x + ", " + y + ") ";
        }
        this.game.world.bringToTop(this.texto);
    };
    return EstadoEditor;
}(Estado));
var EstadoEjecucion = (function (_super) {
    __extends(EstadoEjecucion, _super);
    function EstadoEjecucion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EstadoEjecucion.prototype.init = function (datos) {
        this.pilas = datos.pilas;
        this.entidades = datos.escena.actores;
        this.codigo = datos.codigo;
        var codigoDeExportacion = this.obtenerCodigoDeExportacion(this.codigo);
        var codigoCompleto = this.codigo + codigoDeExportacion;
        try {
            this.clasesDeActores = eval(codigoCompleto);
        }
        catch (e) {
            this.pilas.emitir_mensaje_al_editor("error_de_ejecucion", { mensaje: e.message, stack: e.stack.toString() });
        }
        this.sprites = {};
        this.historia = [];
        this.actores = [];
    };
    EstadoEjecucion.prototype.obtenerCodigoDeExportacion = function (codigo) {
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
    EstadoEjecucion.prototype.create = function () {
        _super.prototype.create.call(this);
        this.game.stage.backgroundColor = "F99";
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 400;
        this.game.physics.p2.restitution = 0.75;
        this.game.physics.p2.friction = 499;
        try {
            this.crear_actores_desde_entidades();
        }
        catch (e) {
            this.pilas.emitir_mensaje_al_editor("error_de_ejecucion", { mensaje: e.message, stack: e.stack.toString() });
        }
        this.pilas.emitir_mensaje_al_editor("termina_de_iniciar_ejecucion", {});
    };
    EstadoEjecucion.prototype.crear_actores_desde_entidades = function () {
        var _this = this;
        this.actores = this.entidades.map(function (e) {
            return _this.crear_actor(e);
        });
    };
    EstadoEjecucion.prototype.crear_actor = function (entidad) {
        var x = entidad.x;
        var y = entidad.y;
        var imagen = entidad.imagen;
        var actor = null;
        var clase = this.clasesDeActores[entidad.tipo];
        if (clase) {
            actor = new this.clasesDeActores[entidad.tipo](this.pilas, x, y, imagen);
            actor.tipo = entidad.tipo;
            actor.sprite.anchor.set(entidad.centro_x, entidad.centro_y);
            actor.iniciar();
            this.world.add(actor.sprite);
        }
        else {
            throw new Error("No existe c\u00F3digo para crear un actor de la clase " + entidad.tipo);
        }
        return actor;
    };
    EstadoEjecucion.prototype.preRender = function () {
        try {
            this.guardar_foto_de_entidades();
        }
        catch (e) {
            this.pilas.emitir_mensaje_al_editor("error_de_ejecucion", { mensaje: e.message, stack: e.stack.toString() });
        }
    };
    EstadoEjecucion.prototype.guardar_foto_de_entidades = function () {
        var entidades = this.actores.map(function (actor) {
            return actor.serializar();
        });
        this.historia.push(entidades);
    };
    return EstadoEjecucion;
}(Estado));
var EstadoPausa = (function (_super) {
    __extends(EstadoPausa, _super);
    function EstadoPausa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EstadoPausa.prototype.init = function (datos) {
        this.pilas = datos.pilas;
        this.historia = datos.historia;
        this.posicion = this.historia.length - 1;
        this.total = this.historia.length - 1;
        this.sprites = [];
        this.cuando_cambia_posicion = datos.cuando_cambia_posicion;
        this.izquierda = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.derecha = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.crear_texto();
    };
    EstadoPausa.prototype.create = function () {
        _super.prototype.create.call(this);
        this.game.stage.backgroundColor = "555";
        this.crear_sprites_desde_historia(this.posicion);
        this.actualizar_texto();
        this.dibujarLineaDeCoordenadasRecorridas();
    };
    EstadoPausa.prototype.crear_texto = function () {
        var style = {
            font: "16px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "top"
        };
        var texto = this.game.add.text(0, 5, "", style);
        texto.setShadow(1, 1, "rgba(0, 0, 0, 0.5)", 3);
        this.texto = texto;
    };
    EstadoPausa.prototype.crear_sprites_desde_historia = function (posicion) {
        var _this = this;
        var entidades = this.historia[posicion];
        this.sprites.map(function (sprite) { return sprite.destroy(); });
        this.sprites = entidades.map(function (entidad) {
            return _this.crear_sprite_desde_entidad(entidad);
        });
    };
    EstadoPausa.prototype.update = function () {
        var debeActualizar = false;
        if (this.izquierda.isDown) {
            this.posicion -= 1;
            debeActualizar = true;
        }
        if (this.derecha.isDown) {
            this.posicion += 1;
            debeActualizar = true;
        }
        if (debeActualizar) {
            this.posicion = Math.min(this.posicion, this.total);
            this.posicion = Math.max(this.posicion, 0);
            this.cuando_cambia_posicion({ posicion: this.posicion });
            this.crear_sprites_desde_historia(this.posicion);
            this.actualizar_texto();
        }
        this.pilas.game.world.bringToTop(this.canvas);
    };
    EstadoPausa.prototype.actualizarPosicionDeFormaExterna = function (posicion) {
        this.posicion = posicion;
        this.posicion = Math.min(this.posicion, this.total);
        this.posicion = Math.max(this.posicion, 0);
        this.crear_sprites_desde_historia(this.posicion);
        this.actualizar_texto();
        this.game.world.bringToTop(this.canvas);
    };
    EstadoPausa.prototype.actualizar_texto = function () {
        var ayuda = "Cambiar con las teclas izquierda y derecha";
        var texto = " Posici\u00F3n " + this.posicion + "/" + this.total + " - " + ayuda;
        this.texto.text = texto;
    };
    EstadoPausa.prototype.crear_sprite_desde_entidad = function (entidad) {
        var _a = this.pilas.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y), x = _a.x, y = _a.y;
        var sprite = new ActorDentroDelModoPausa(this.game, x, y, entidad.imagen);
        sprite.angle = entidad.rotacion;
        sprite.anchor.set(entidad.centro_x, entidad.centro_y);
        sprite["depurable"] = true;
        this.world.add(sprite);
        return sprite;
    };
    return EstadoPausa;
}(Estado));
