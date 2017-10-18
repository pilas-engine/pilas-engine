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
var EstadoEditor = (function (_super) {
    __extends(EstadoEditor, _super);
    function EstadoEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EstadoEditor;
}(Phaser.State));
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
    };
    Pilas.prototype._create = function () {
        this.game.stage.disableVisibilityChange = true;
        this.game.state.add("editorState", EstadoEditor);
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
