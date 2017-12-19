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
    }
    Pilas.prototype.obtener_entidades = function () {
        return this.game.state.getCurrentState()["entidades"];
    };
    Pilas.prototype._agregarManejadorDeMensajes = function () {
        var _this = this;
        window.addEventListener("message", function (e) { return _this._atenderMensaje(e); }, false);
    };
    Pilas.prototype._atenderMensaje = function (e) {
        var _this = this;
        this.log.debug("Llega un mensaje desde el editor: " + e.data.tipo, e);
        if (e.origin != HOST) {
            return;
        }
        if (e.data.tipo === "define_escena") {
            this.game.state.start(e.data.nombre, true, false, {
                entidades: e.data.entidades
            });
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
    };
    Pilas.prototype._create = function () {
        this.game.stage.disableVisibilityChange = true;
        this.game.state.add("editorState", EstadoEditor);
        this.game.state.add("estadoEjecucion", EstadoEjecucion);
        this._emitirMensajeAlEditor("finaliza_carga_de_recursos", {});
    };
    Pilas.prototype._emitirMensajeAlEditor = function (nombre, datos) {
        datos = datos || {};
        datos.tipo = nombre;
        window.parent.postMessage(datos, HOST);
    };
    return Pilas;
}());
var pilas = new Pilas();
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Actor.prototype.iniciar = function () { };
    return Actor;
}(Phaser.Sprite));
var Pelota = (function (_super) {
    __extends(Pelota, _super);
    function Pelota() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pelota.prototype.iniciar = function () {
        this.vy = 0;
    };
    Pelota.prototype.update = function () {
        this.y += this.vy;
        this.vy += 0.1;
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
        this.x = entidad.x;
        this.y = entidad.y;
        this.pivot.x = entidad.centro_x;
        this.pivot.y = entidad.centro_y;
        this.inputEnabled = true;
        this.input.enableDrag();
        this.crear_sombra();
        this.conectar_eventos_arrastrar_y_soltar();
    };
    Sprite.prototype.conectar_eventos_arrastrar_y_soltar = function () {
        this.events.onDragStart.add(this.activar_sombra, this);
        this.events.onDragStop.add(this.ocultar_sombra, this);
        this.events.onDragStop.add(this.cuando_termina_de_mover, this);
    };
    Sprite.prototype.al_terminar_de_arrastrar = function (a) {
    };
    Sprite.prototype.cuando_termina_de_mover = function () {
        if (this.al_terminar_de_arrastrar) {
            this.al_terminar_de_arrastrar(this);
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
        this.shadow.pivot.x = this.pivot.x;
        this.shadow.pivot.y = this.pivot.y;
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
var EstadoEditor = (function (_super) {
    __extends(EstadoEditor, _super);
    function EstadoEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EstadoEditor.prototype.init = function (datos) {
        this.entidades = datos.entidades;
        this.sprites = {};
        this.crear_texto_con_posicion_del_mouse();
    };
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
                sprite.al_terminar_de_arrastrar = function (s) { };
                _this.world.add(sprite);
                _this.sprites[e.id] = sprite;
            }
            else {
                sprite = _this.sprites[e.id];
            }
            e.x = sprite.x;
            e.y = sprite.y;
            return e;
        });
        this.actualizar_texto_con_posicion_del_mouse();
    };
    EstadoEditor.prototype.actualizar_texto_con_posicion_del_mouse = function () {
        var x = this.input.mousePointer.x;
        var y = this.input.mousePointer.y;
        if (x !== -1 && y !== -1) {
            this.texto.text = "  Mouse: (" + x + ", " + y + ") ";
        }
    };
    return EstadoEditor;
}(Phaser.State));
var EstadoEjecucion = (function (_super) {
    __extends(EstadoEjecucion, _super);
    function EstadoEjecucion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EstadoEjecucion.prototype.init = function (datos) {
        this.entidades = datos.entidades;
        this.sprites = {};
    };
    EstadoEjecucion.prototype.create = function () {
        this.game.stage.backgroundColor = "F99";
        this.crear_actores_desde_entidades();
    };
    EstadoEjecucion.prototype.crear_actores_desde_entidades = function () {
        var _this = this;
        this.entidades.map(function (e) {
            _this.crear_actor(e);
        });
    };
    EstadoEjecucion.prototype.crear_actor = function (entidad) {
        var x = entidad.x;
        var y = entidad.y;
        var imagen = entidad.imagen;
        var actor = null;
        if (entidad.tipo === "pelota") {
            actor = new Pelota(this.game, x, y, imagen);
            this.world.add(actor);
            actor.iniciar();
        }
        else {
            actor = this.add.sprite(x, y, imagen);
        }
        actor.pivot.x = entidad.centro_x;
        actor.pivot.y = entidad.centro_y;
    };
    EstadoEjecucion.prototype.update = function () { };
    return EstadoEjecucion;
}(Phaser.State));
