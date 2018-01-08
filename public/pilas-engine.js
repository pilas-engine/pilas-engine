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
var Control = (function () {
    function Control(pilas) {
        this.pilas = pilas;
        this.teclaIzquierda = pilas.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.teclaDerecha = pilas.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
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
    return Control;
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
        this._agregarManejadorDeMensajes();
        this.capturar_errores_y_reportarlos_al_editor();
    }
    Pilas.prototype.obtener_entidades = function () {
        return this.game.state.getCurrentState()["entidades"];
    };
    Pilas.prototype._conectarAtajosDeTeclado = function () {
        var _this = this;
        this.game.input.keyboard.onUpCallback = function (evento) {
            if (evento.keyCode == Phaser.Keyboard.ESC && (_this.game.state.current === "estadoEjecucion" || _this.game.state.current === "estadoPausa")) {
                console.log("pulsa pausa.");
                _this.emitir_mensaje_al_editor("cuando_pulsa_escape", {});
            }
        };
    };
    Pilas.prototype._agregarManejadorDeMensajes = function () {
        var _this = this;
        window.addEventListener("message", function (e) { return _this._atenderMensaje(e); }, false);
    };
    Pilas.prototype.emitir_error_y_detener = function (error) {
        this.emitir_mensaje_al_editor("error", { mensaje: error.message, stack: error.stack });
        this.game.paused = true;
        console.error(error);
    };
    Pilas.prototype.capturar_errores_y_reportarlos_al_editor = function () {
    };
    Pilas.prototype._atenderMensaje = function (e) {
        var _this = this;
        this.log.debug("Llega un mensaje desde el editor: " + e.data.tipo, e);
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
            var ancho = e.data.ancho;
            var alto = e.data.alto;
            this.game = new Phaser.Game(ancho, alto, Phaser.AUTO, "game", {
                preload: function (e) { return _this._preload(); },
                create: function (e) { return _this._create(); }
            });
        }
    };
    Pilas.prototype._preload = function () {
        this.game.load.image("ember", "imagenes/ember.png");
        this.game.load.image("pelota", "imagenes/pelota.png");
        this.game.load.image("logo", "imagenes/logo.png");
        this.game.load.image("sin_imagen", "imagenes/sin_imagen.png");
        this.game.load.image("caja", "imagenes/caja.png");
        this.game.load.image("aceituna", "imagenes/aceituna.png");
    };
    Pilas.prototype._create = function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.stage.disableVisibilityChange = true;
        this.game.renderer.renderSession.roundPixels = true;
        this.game.state.add("editorState", EstadoEditor);
        this.game.state.add("estadoEjecucion", EstadoEjecucion);
        this.game.state.add("estadoPausa", EstadoPausa);
        this.game.scale.trackParentInterval = 1;
        this.emitir_mensaje_al_editor("finaliza_carga_de_recursos", {});
        this._conectarAtajosDeTeclado();
        this.control = new Control(this);
    };
    Pilas.prototype.emitir_mensaje_al_editor = function (nombre, datos) {
        datos = datos || {};
        datos.tipo = nombre;
        window.parent.postMessage(datos, HOST);
    };
    return Pilas;
}());
var pilas = new Pilas();
var Actor = (function () {
    function Actor(pilas, x, y, imagen) {
        var _this = this;
        this.pilas = pilas;
        this.sprite = new Phaser.Sprite(pilas.game, x, y, imagen);
        this.sprite.update = function () {
            try {
                _this.actualizar();
            }
            catch (e) {
                _this.pilas.emitir_error_y_detener(e);
            }
        };
    }
    Actor.prototype.iniciar = function () {
    };
    Actor.prototype.serializar = function () {
        return {
            tipo: this.tipo,
            x: this.sprite.x,
            y: this.sprite.y,
            centro_x: this.sprite.anchor.x,
            centro_y: this.sprite.anchor.y,
            imagen: this.sprite.key,
            rotacion: this.sprite.angle
        };
    };
    Actor.prototype.actualizar = function () {
        this.sprite.x += 1;
    };
    return Actor;
}());
var Caja = (function (_super) {
    __extends(Caja, _super);
    function Caja() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Caja.prototype.iniciar = function () {
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
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sprite.prototype.iniciar = function (entidad) {
        this.key = entidad.imagen;
        this.id = entidad.id;
        this.x = entidad.x;
        this.y = entidad.y;
        this.pivot.x = entidad.centro_x;
        this.pivot.y = entidad.centro_y;
        this.inputEnabled = true;
        this.input.enableDrag();
        this.crear_sombra();
        this["depurable"] = true;
        this.conectar_eventos_arrastrar_y_soltar();
    };
    Sprite.prototype.conectar_eventos_arrastrar_y_soltar = function () {
        this.events.onDragStart.add(this.cuando_comienza_a_mover, this);
        this.events.onDragStart.add(this.activar_sombra, this);
        this.events.onDragStop.add(this.ocultar_sombra, this);
        this.events.onDragStop.add(this.cuando_termina_de_mover, this);
    };
    Sprite.prototype.al_terminar_de_arrastrar = function (a) { };
    Sprite.prototype.al_comenzar_a_arrastrar = function (a) { };
    Sprite.prototype.cuando_comienza_a_mover = function () {
        if (this.al_comenzar_a_arrastrar) {
            this.al_comenzar_a_arrastrar({ id: this.id, x: this.x, y: this.y });
        }
    };
    Sprite.prototype.cuando_termina_de_mover = function () {
        if (this.al_terminar_de_arrastrar) {
            this.al_terminar_de_arrastrar({ id: this.id, x: this.x, y: this.y });
        }
    };
    Sprite.prototype.activar_sombra = function () {
        this.shadow.alpha = 0.3;
    };
    Sprite.prototype.ocultar_sombra = function () {
        this.shadow.alpha = 0.0;
    };
    Sprite.prototype.update = function () {
        this.shadow.key = this.key;
        this.shadow.anchor.x = this.anchor.x;
        this.shadow.anchor.y = this.anchor.y;
        this.shadow.x = this.x + 5;
        this.shadow.y = this.y + 5;
    };
    Sprite.prototype.crear_sombra = function () {
        this.shadow = this.game.add.sprite(10, 10, this.key);
        this.shadow.tint = 0x000000;
        this.ocultar_sombra();
    };
    return Sprite;
}(Phaser.Sprite));
var SpriteSimple = (function (_super) {
    __extends(SpriteSimple, _super);
    function SpriteSimple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SpriteSimple;
}(Phaser.Sprite));
var Estado = (function (_super) {
    __extends(Estado, _super);
    function Estado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Estado.prototype.render = function () {
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
                var x = Math.round(sprite.x);
                var y = Math.round(sprite.y);
                debug.text("(" + x + ", " + y + ")", x + 5, y + 15, "white");
                dibujarPuntoDeControl(debug, sprite.x, sprite.y);
            }
        });
    };
    Estado.prototype.actualizarPosicionDeFormaExterna = function (pos) { };
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
                sprite = new Sprite(_this.game, 0, 0, e.imagen);
                sprite.iniciar(e);
                sprite.al_terminar_de_arrastrar = _this.cuando_termina_de_mover;
                sprite.al_comenzar_a_arrastrar = _this.cuando_comienza_a_mover;
                _this.world.add(sprite);
                _this.sprites[e.id] = sprite;
            }
            else {
                sprite = _this.sprites[e.id];
            }
            e.x = sprite.x;
            e.y = sprite.y;
            sprite.anchor.set(e.centro_x, e.centro_y);
            return e;
        });
        this.actualizar_texto_con_posicion_del_mouse();
    };
    EstadoEditor.prototype.actualizar_texto_con_posicion_del_mouse = function () {
        var x = Math.round(this.input.mousePointer.x);
        var y = Math.round(this.input.mousePointer.y);
        if (x !== -1 && y !== -1) {
            this.texto.text = "  Mouse: (" + x + ", " + y + ") ";
        }
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
        var lista_de_clases = codigo.match(re_creacion_de_clase).map(function (e) { return e.match(re_solo_clase)[1]; });
        var diccionario = {};
        for (var i = 0; i < lista_de_clases.length; i++) {
            var item = lista_de_clases[i];
            diccionario[item] = item;
        }
        var diccionario_como_cadena = JSON.stringify(diccionario).replace(/"/g, "");
        return "\n__clases = " + diccionario_como_cadena + ";\n__clases;";
    };
    EstadoEjecucion.prototype.create = function () {
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
    EstadoEjecucion.prototype.update = function () {
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
        this.game.stage.backgroundColor = "555";
        this.crear_sprites_desde_historia(this.posicion);
        this.actualizar_texto();
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
    };
    EstadoPausa.prototype.actualizarPosicionDeFormaExterna = function (posicion) {
        this.posicion = posicion;
        this.posicion = Math.min(this.posicion, this.total);
        this.posicion = Math.max(this.posicion, 0);
        this.crear_sprites_desde_historia(this.posicion);
        this.actualizar_texto();
    };
    EstadoPausa.prototype.actualizar_texto = function () {
        var ayuda = "Cambiar con las teclas izquierda y derecha";
        var texto = " Posici\u00F3n " + this.posicion + "/" + this.total + " - " + ayuda;
        this.texto.text = texto;
    };
    EstadoPausa.prototype.crear_sprite_desde_entidad = function (entidad) {
        var sprite = new SpriteSimple(this.game, entidad.x, entidad.y, entidad.imagen);
        sprite.angle = entidad.rotacion;
        sprite.anchor.set(entidad.centro_x, entidad.centro_y);
        sprite["depurable"] = true;
        this.world.add(sprite);
        return sprite;
    };
    EstadoPausa.prototype.render = function () {
        _super.prototype.render.call(this);
        this.dibujarLineaDeCoordenadasRecorridas();
    };
    EstadoPausa.prototype.dibujarLineaDeCoordenadasRecorridas = function () {
        var _this = this;
        var color = "rgba(255,255,255,0.5)";
        this.historia.map(function (historia) {
            historia.map(function (entidad) {
                _this.game.debug.pixel(entidad.x, entidad.y, color);
            });
        });
    };
    return EstadoPausa;
}(Estado));
