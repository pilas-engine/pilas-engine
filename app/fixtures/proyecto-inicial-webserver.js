import animaciones_iniciales from "./animaciones-iniciales";
import fixture_sonidos_iniciales from "./sonidos-iniciales";
import fixture_workspace_bloques_de_escena_nueva from "./workspace-bloques-de-escena-nueva";

export default {
  nombre_de_la_escena_inicial: "escena2",
  codigo: `
      var __extends = (this && this.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      }
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      })();

      var Proyecto = /** @class */ (function () {
          function Proyecto() {
          }
          Proyecto.prototype.iniciar = function () {
          };
          return Proyecto;
      }());

      var escena2 = /** @class */ (function (_super) {
          __extends(escena2, _super);
          function escena2() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          escena2.prototype.iniciar = function () {
          };
          escena2.prototype.actualizar = function () {
          };
          return escena2;
      }(Escena)); // @ts-ignore

      // @ts-ignore
      var actor = /** @class */ (function (_super) {
          __extends(actor, _super);
          function actor() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          actor.prototype.iniciar = function () { };
          actor.prototype.actualizar = function () { };
          return actor;
      }(Actor));

      // @ts-ignore
      var texto = /** @class */ (function (_super) {
          __extends(texto, _super);
          function texto() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          return texto;
      }(ActorTextoBase));

      // @ts-ignore
      var texto1 = /** @class */ (function (_super) {
          __extends(texto1, _super);
          function texto1() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          return texto1;
      }(ActorTextoBase));
    `,
  permitir_modo_pausa: false,
  proyecto: {
    titulo: "Proyecto demo",
    ancho: 500,
    alto: 500,
    tamaño: "500x500",
    nombre_de_la_escena_inicial: "escena2",
    imagenes: [],
    animaciones: animaciones_iniciales,
    codigos: {
      escenas: [
        {
          nombre: "escena2",
          codigo: "class escena2 extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}",
        },
      ],
      actores: [
        {
          nombre: "actor",
          codigo: "// @ts-ignore\nclass actor extends Actor {\n\n  iniciar() {}\n\n  actualizar() {}\n}\n",
        },
        {
          nombre: "texto",
          codigo: "// @ts-ignore\nclass texto extends ActorTextoBase {\n}\n",
        },
        {
          nombre: "texto1",
          codigo: "// @ts-ignore\nclass texto1 extends ActorTextoBase {\n}\n",
        },
      ],
      proyecto: "class Proyecto {\n    iniciar() {\n    }\n}",
    },
    escenas: [
      {
        nombre: "escena2",
        id: 2,
        ancho: 1000,
        alto: 1000,
        camara_x: 0,
        camara_y: 0,
        gravedad_x: 0,
        gravedad_y: 1,
        fondo: "decoracion:fondos/fondo-plano",
        actores: [
          {
            x: -187.30124734026458,
            y: 14.044799955302466,
            z: 0,
            imagen: "imagenes:mono/mono_reir",
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
            color: "white",
            id: 10478182473955260,
            activo: true,
            nombre: "actor",
            habilidades: [],
            sensores: [],
          },
          {
            x: 20.470068955241913,
            y: 28.613399013860885,
            z: -10,
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
            texto_con_borde: false,
            color: "white",
            texto: "Pulsá el botón ejecutar en",
            fuente: "color-blanco-con-sombra-chico",
            id: 17657515648711366,
            activo: true,
            nombre: "texto",
            habilidades: [],
            sensores: [],
          },
          {
            x: 50.636427550436,
            y: -7.9316686609832345,
            z: -10,
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
            texto_con_borde: false,
            color: "white",
            texto: "la computadora para comenzar",
            fuente: "color-blanco-con-sombra-chico",
            id: 12451044496293666,
            activo: true,
            nombre: "texto1",
            habilidades: [],
            sensores: [],
          },
        ],
      },
    ],
    fps: 60,
    modo_de_video: "suavizado",
    sonidos: fixture_sonidos_iniciales,
    bloques: {
      proyecto: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="actor_inicia" id="ZC`*TK^}PI+^~52^ak!H" x="35" y="44"></block></xml>',
      escenas: [
        {
          nombre: "escena1",
          bloques: {
            texto: fixture_workspace_bloques_de_escena_nueva,
            codigo_de_bloques:
              "if (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('^BS9[_V!D30$Klp?G]Nt', this.id);\n}\nactor._bloques_iniciar = function() {\n\n  };\n\nif (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('D[i2{g4SjDY+sAT7f=W@', this.id);\n}\nactor._bloques_actualizar = function() {\n\n  };\n",
          },
        },
      ],
      actores: [
        {
          nombre: "actor",
          bloques: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="actor_inicia" id="^BS9[_V!D30$Klp?G]Nt" x="-217" y="-205"></block><block type="actor_actualizar" id="D[i2{g4SjDY+sAT7f=W@" x="-212" y="-36"></block></xml>',
          codigo_de_bloques:
            "if (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('^BS9[_V!D30$Klp?G]Nt', this.id);\n}\nactor._bloques_iniciar = function() {\n\n  };\n\nif (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('D[i2{g4SjDY+sAT7f=W@', this.id);\n}\nactor._bloques_actualizar = function() {\n\n  };\n",
        },
        {
          nombre: "texto",
          bloques: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="actor_inicia" id="^BS9[_V!D30$Klp?G]Nt" x="-217" y="-205"></block><block type="actor_actualizar" id="D[i2{g4SjDY+sAT7f=W@" x="-212" y="-36"></block></xml>',
          codigo_de_bloques:
            "if (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('^BS9[_V!D30$Klp?G]Nt', this.id);\n}\nactor._bloques_iniciar = function() {\n\n  };\n\nif (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('D[i2{g4SjDY+sAT7f=W@', this.id);\n}\nactor._bloques_actualizar = function() {\n\n  };\n",
        },
        {
          nombre: "texto1",
          bloques: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
          codigo_de_bloques: "",
        },
      ],
    },

    escena_inicial: 2,
  },
  pixelart: false,
};
