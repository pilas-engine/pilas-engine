export default {
  nombre_de_la_escena_inicial: "escena1",
  codigo:
    'var __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    }\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar escena1 = /** @class */ (function (_super) {\r\n    __extends(escena1, _super);\r\n    function escena1() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    escena1.prototype.iniciar = function () {\r\n    };\r\n    escena1.prototype.actualizar = function () {\r\n    };\r\n    return escena1;\r\n}(Escena));\r\nvar escena2 = /** @class */ (function (_super) {\r\n    __extends(escena2, _super);\r\n    function escena2() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    escena2.prototype.iniciar = function () {\r\n    };\r\n    escena2.prototype.actualizar = function () {\r\n    };\r\n    return escena2;\r\n}(Escena));\r\nvar plataforma = /** @class */ (function (_super) {\r\n    __extends(plataforma, _super);\r\n    function plataforma() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.propiedades = {\r\n            figura: "rectangulo",\r\n            imagen: "plataforma",\r\n            y: 0,\r\n            figura_ancho: 250,\r\n            figura_alto: 40,\r\n            figura_dinamica: false,\r\n            figura_rebote: 0\r\n        };\r\n        return _this;\r\n    }\r\n    plataforma.prototype.iniciar = function () { };\r\n    return plataforma;\r\n}(Actor));\r\nvar caja = /** @class */ (function (_super) {\r\n    __extends(caja, _super);\r\n    function caja() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.propiedades = {\r\n            x: 0,\r\n            y: 0,\r\n            imagen: "caja",\r\n            etiqueta: "caja",\r\n            figura: "rectangulo",\r\n            figura_ancho: 45,\r\n            figura_alto: 45,\r\n            figura_rebote: 0.9\r\n        };\r\n        return _this;\r\n    }\r\n    caja.prototype.iniciar = function () { };\r\n    return caja;\r\n}(Actor));\r\nvar pelota = /** @class */ (function (_super) {\r\n    __extends(pelota, _super);\r\n    function pelota() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.propiedades = {\r\n            imagen: "pelota",\r\n            figura: "circulo",\r\n            figura_radio: 25\r\n        };\r\n        return _this;\r\n    }\r\n    pelota.prototype.iniciar = function () { };\r\n    return pelota;\r\n}(Actor));\r\nvar techo = /** @class */ (function (_super) {\r\n    __extends(techo, _super);\r\n    function techo() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.propiedades = {\r\n            figura: "rectangulo",\r\n            imagen: "techo",\r\n            y: +255,\r\n            figura_ancho: 600,\r\n            figura_alto: 25,\r\n            figura_dinamica: false\r\n        };\r\n        return _this;\r\n    }\r\n    techo.prototype.iniciar = function () { };\r\n    return techo;\r\n}(Actor));\r\nvar suelo = /** @class */ (function (_super) {\r\n    __extends(suelo, _super);\r\n    function suelo() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.propiedades = {\r\n            figura: "rectangulo",\r\n            imagen: "suelo",\r\n            y: -250,\r\n            figura_ancho: 600,\r\n            figura_alto: 25,\r\n            figura_dinamica: false\r\n        };\r\n        return _this;\r\n    }\r\n    suelo.prototype.iniciar = function () { };\r\n    return suelo;\r\n}(Actor));\r\nvar texto = /** @class */ (function (_super) {\r\n    __extends(texto, _super);\r\n    function texto() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.propiedades = {\r\n            imagen: "imagenes:basicos/invisible",\r\n            texto: "Hola mundo",\r\n            es_texto: true\r\n        };\r\n        return _this;\r\n    }\r\n    return texto;\r\n}(ActorTextoBase));\r\nvar logo = /** @class */ (function (_super) {\r\n    __extends(logo, _super);\r\n    function logo() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.propiedades = {\r\n            imagen: "imagenes:basicos/logo"\r\n        };\r\n        return _this;\r\n    }\r\n    logo.prototype.iniciar = function () { };\r\n    return logo;\r\n}(Actor));\r\n',
  permitir_modo_pausa: true,
  proyecto: {
    titulo: "Proyecto demo",
    ancho: 500,
    alto: 500,
    escena_inicial: 1,
    codigos: {
      escenas: [
        {
          nombre: "escena1",
          codigo:
            "class escena1 extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
        }
      ],
      actores: [
        {
          nombre: "texto",
          codigo:
            'class texto extends ActorTextoBase {\n    propiedades = {\n        imagen: "imagenes:basicos/invisible",\n        texto: "Hola mundo",\n        es_texto: true\n    };\n}'
        },
        {
          nombre: "logo",
          codigo:
            'class logo extends Actor {\n    propiedades = {\n        imagen: "imagenes:basicos/logo"\n    };\n\n    iniciar() {}\n}'
        }
      ]
    },
    escenas: [
      {
        nombre: "escena1",
        id: 1,
        camara_x: 0,
        camara_y: 0,
        gravedad_x: 0,
        gravedad_y: 1,
        fondo: "decoracion:fondos/fondo-plano",
        actores: [
          {
            x: 0,
            y: 0,
            z: 0,
            imagen: "imagenes:basicos/invisible",
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
            es_texto: true,
            texto: "¡Pulsá el botón ejecutar para comenzar!",
            id: 1127,
            nombre: "texto",
            habilidades: [],
            fondo: "imagenes:redimensionables/dialogo"
          },
          {
            x: 195,
            y: -57,
            z: 0,
            imagen: "imagenes:mono/mono_reir",
            centro_x: 0.5,
            centro_y: 0.5,
            rotacion: 0,
            escala_x: 0.5,
            escala_y: 0.5,
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
            id: 1873,
            nombre: "logo",
            habilidades: []
          }
        ]
      }
    ]
  }
};
