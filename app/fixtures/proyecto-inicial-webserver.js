export default {
    "nombre_de_la_escena_inicial": "escena2",
    "codigo": `
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

      var plataforma = /** @class */ (function (_super) {
          __extends(plataforma, _super);
          function plataforma() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          plataforma.prototype.iniciar = function () {
          };
          return plataforma;
      }(Actor));

      // @ts-ignore
      var caja = /** @class */ (function (_super) {
          __extends(caja, _super);
          function caja() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          caja.prototype.iniciar = function () {
          };
          return caja;
      }(Actor));

      // @ts-ignore
      var pelota = /** @class */ (function (_super) {
          __extends(pelota, _super);
          function pelota() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          pelota.prototype.iniciar = function () {
          };
          return pelota;
      }(Actor));

      // @ts-ignore
      var techo = /** @class */ (function (_super) {
          __extends(techo, _super);
          function techo() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          techo.prototype.iniciar = function () {
          };
          return techo;
      }(Actor));

      // @ts-ignore
      var suelo = /** @class */ (function (_super) {
          __extends(suelo, _super);
          function suelo() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          suelo.prototype.iniciar = function () {
          };
          return suelo;
      }(Actor));

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
    "permitir_modo_pausa": false,
    "proyecto": {
      "titulo": "Proyecto demo",
      "ancho": 500,
      "alto": 500,
      "tamaño": "500x500",
      "nombre_de_la_escena_inicial": "escena2",
      "imagenes": [],
      "animaciones": [
        {
          "nombre": "explosion",
          "cuadros": [
            {
              "nombre": "imagenes:explosion/explosion_001",
              "sprite": "imagenes-explosion-explosion_001"
            },
            {
              "nombre": "imagenes:explosion/explosion_002",
              "sprite": "imagenes-explosion-explosion_002"
            },
            {
              "nombre": "imagenes:explosion/explosion_003",
              "sprite": "imagenes-explosion-explosion_003"
            },
            {
              "nombre": "imagenes:explosion/explosion_004",
              "sprite": "imagenes-explosion-explosion_004"
            },
            {
              "nombre": "imagenes:explosion/explosion_005",
              "sprite": "imagenes-explosion-explosion_005"
            },
            {
              "nombre": "imagenes:explosion/explosion_006",
              "sprite": "imagenes-explosion-explosion_006"
            },
            {
              "nombre": "imagenes:explosion/explosion_007",
              "sprite": "imagenes-explosion-explosion_007"
            },
            {
              "nombre": "imagenes:explosion/explosion_008",
              "sprite": "imagenes-explosion-explosion_008"
            },
            {
              "nombre": "imagenes:explosion/explosion_009",
              "sprite": "imagenes-explosion-explosion_009"
            },
            {
              "nombre": "imagenes:explosion/explosion_010",
              "sprite": "imagenes-explosion-explosion_010"
            },
            {
              "nombre": "imagenes:explosion/explosion_011",
              "sprite": "imagenes-explosion-explosion_011"
            },
            {
              "nombre": "imagenes:explosion/explosion_012",
              "sprite": "imagenes-explosion-explosion_012"
            },
            {
              "nombre": "imagenes:explosion/explosion_013",
              "sprite": "imagenes-explosion-explosion_013"
            },
            {
              "nombre": "imagenes:explosion/explosion_014",
              "sprite": "imagenes-explosion-explosion_014"
            },
            {
              "nombre": "imagenes:explosion/explosion_015",
              "sprite": "imagenes-explosion-explosion_015"
            }
          ],
          "velocidad": "30"
        },
        {
          "nombre": "mini_explosion",
          "cuadros": [
            {
              "nombre": "imagenes:mini-explosion/explosion_0",
              "sprite": "imagenes-mini-explosion-explosion_0"
            },
            {
              "nombre": "imagenes:mini-explosion/explosion_1",
              "sprite": "imagenes-mini-explosion-explosion_1"
            },
            {
              "nombre": "imagenes:mini-explosion/explosion_2",
              "sprite": "imagenes-mini-explosion-explosion_2"
            },
            {
              "nombre": "imagenes:mini-explosion/explosion_3",
              "sprite": "imagenes-mini-explosion-explosion_3"
            },
            {
              "nombre": "imagenes:mini-explosion/explosion_4",
              "sprite": "imagenes-mini-explosion-explosion_4"
            },
            {
              "nombre": "imagenes:mini-explosion/explosion_5",
              "sprite": "imagenes-mini-explosion-explosion_5"
            },
            {
              "nombre": "imagenes:mini-explosion/explosion_6",
              "sprite": "imagenes-mini-explosion-explosion_6"
            }
          ],
          "velocidad": "20"
        },
        {
          "nombre": "golpe",
          "cuadros": [
            {
              "nombre": "imagenes:efectos/golpe-1",
              "sprite": "imagenes-efectos-golpe-1"
            },
            {
              "nombre": "imagenes:efectos/golpe-2",
              "sprite": "imagenes-efectos-golpe-2"
            },
            {
              "nombre": "imagenes:efectos/golpe-3",
              "sprite": "imagenes-efectos-golpe-3"
            },
            {
              "nombre": "imagenes:efectos/golpe-4",
              "sprite": "imagenes-efectos-golpe-4"
            },
            {
              "nombre": "imagenes:efectos/golpe-5",
              "sprite": "imagenes-efectos-golpe-5"
            },
            {
              "nombre": "imagenes:efectos/golpe-6",
              "sprite": "imagenes-efectos-golpe-6"
            }
          ],
          "velocidad": "15"
        },
        {
          "nombre": "chispa",
          "cuadros": [
            {
              "nombre": "imagenes:efectos/chispa-1",
              "sprite": "imagenes-efectos-chispa-1"
            },
            {
              "nombre": "imagenes:efectos/chispa-2",
              "sprite": "imagenes-efectos-chispa-2"
            },
            {
              "nombre": "imagenes:efectos/chispa-3",
              "sprite": "imagenes-efectos-chispa-3"
            },
            {
              "nombre": "imagenes:efectos/chispa-4",
              "sprite": "imagenes-efectos-chispa-4"
            },
            {
              "nombre": "imagenes:efectos/chispa-5",
              "sprite": "imagenes-efectos-chispa-5"
            }
          ],
          "velocidad": "20"
        },
        {
          "nombre": "humo",
          "cuadros": [
            {
              "nombre": "imagenes:efectos/humo-01",
              "sprite": "imagenes-efectos-humo-01"
            },
            {
              "nombre": "imagenes:efectos/humo-02",
              "sprite": "imagenes-efectos-humo-02"
            },
            {
              "nombre": "imagenes:efectos/humo-03",
              "sprite": "imagenes-efectos-humo-03"
            },
            {
              "nombre": "imagenes:efectos/humo-04",
              "sprite": "imagenes-efectos-humo-04"
            },
            {
              "nombre": "imagenes:efectos/humo-05",
              "sprite": "imagenes-efectos-humo-05"
            },
            {
              "nombre": "imagenes:efectos/humo-06",
              "sprite": "imagenes-efectos-humo-06"
            },
            {
              "nombre": "imagenes:efectos/humo-07",
              "sprite": "imagenes-efectos-humo-07"
            },
            {
              "nombre": "imagenes:efectos/humo-08",
              "sprite": "imagenes-efectos-humo-08"
            },
            {
              "nombre": "imagenes:efectos/humo-09",
              "sprite": "imagenes-efectos-humo-09"
            },
            {
              "nombre": "imagenes:efectos/humo-10",
              "sprite": "imagenes-efectos-humo-10"
            }
          ],
          "velocidad": "15"
        },
        {
          "nombre": "hombre_pixel_camina",
          "cuadros": [
            {
              "nombre": "imagenes:pixelados/pixel_player_1",
              "sprite": "imagenes-pixelados-pixel_player_1"
            },
            {
              "nombre": "imagenes:pixelados/pixel_player_2",
              "sprite": "imagenes-pixelados-pixel_player_2"
            }
          ],
          "velocidad": "15"
        },
        {
          "nombre": "hombre_pixel_parado",
          "cuadros": [
            {
              "nombre": "imagenes:pixelados/pixel_player_0",
              "sprite": "imagenes-pixelados-pixel_player_0"
            }
          ],
          "velocidad": 10
        },
        {
          "nombre": "fantasma_azul_camina",
          "cuadros": [
            {
              "nombre": "imagenes:pacman/fantasma_azul_0",
              "sprite": "imagenes-pacman-fantasma_azul_0"
            },
            {
              "nombre": "imagenes:pacman/fantasma_azul_1",
              "sprite": "imagenes-pacman-fantasma_azul_1"
            }
          ],
          "velocidad": "10"
        },
        {
          "nombre": "fantasma_camina",
          "cuadros": [
            {
              "nombre": "imagenes:pacman/fantasma_6",
              "sprite": "imagenes-pacman-fantasma_6"
            },
            {
              "nombre": "imagenes:pacman/fantasma_7",
              "sprite": "imagenes-pacman-fantasma_7"
            }
          ],
          "velocidad": "10"
        },
        {
          "nombre": "moneda",
          "cuadros": [
            {
              "nombre": "imagenes:monedas/moneda_0",
              "sprite": "imagenes-monedas-moneda_0"
            },
            {
              "nombre": "imagenes:monedas/moneda_1",
              "sprite": "imagenes-monedas-moneda_1"
            },
            {
              "nombre": "imagenes:monedas/moneda_2",
              "sprite": "imagenes-monedas-moneda_2"
            },
            {
              "nombre": "imagenes:monedas/moneda_3",
              "sprite": "imagenes-monedas-moneda_3"
            },
            {
              "nombre": "imagenes:monedas/moneda_4",
              "sprite": "imagenes-monedas-moneda_4"
            },
            {
              "nombre": "imagenes:monedas/moneda_5",
              "sprite": "imagenes-monedas-moneda_5"
            },
            {
              "nombre": "imagenes:monedas/moneda_6",
              "sprite": "imagenes-monedas-moneda_6"
            },
            {
              "nombre": "imagenes:monedas/moneda_7",
              "sprite": "imagenes-monedas-moneda_7"
            }
          ],
          "velocidad": "30"
        },
        {
          "nombre": "pacman_come",
          "cuadros": [
            {
              "nombre": "imagenes:pacman/pacman_4",
              "sprite": "imagenes-pacman-pacman_4"
            },
            {
              "nombre": "imagenes:pacman/pacman_5",
              "sprite": "imagenes-pacman-pacman_5"
            },
            {
              "nombre": "imagenes:pacman/pacman_6",
              "sprite": "imagenes-pacman-pacman_6"
            }
          ],
          "velocidad": "20"
        },
        {
          "nombre": "pacman_espera",
          "cuadros": [
            {
              "nombre": "imagenes:pacman/pacman_4",
              "sprite": "imagenes-pacman-pacman_4"
            }
          ],
          "velocidad": 10
        },
        {
          "nombre": "nave_girando_a_la_derecha",
          "cuadros": [
            {
              "nombre": "imagenes:nave/nave_derecha_1",
              "sprite": "imagenes-nave-nave_derecha_1"
            },
            {
              "nombre": "imagenes:nave/nave_derecha_2",
              "sprite": "imagenes-nave-nave_derecha_2"
            }
          ],
          "velocidad": "20"
        },
        {
          "nombre": "nave_girando_a_la_izquierda",
          "cuadros": [
            {
              "nombre": "imagenes:nave/nave_izquierda_1",
              "sprite": "imagenes-nave-nave_izquierda_1"
            },
            {
              "nombre": "imagenes:nave/nave_izquierda_2",
              "sprite": "imagenes-nave-nave_izquierda_2"
            }
          ],
          "velocidad": "20"
        },
        {
          "nombre": "nave_avanzando",
          "cuadros": [
            {
              "nombre": "imagenes:nave/nave_avanza_1",
              "sprite": "imagenes-nave-nave_avanza_1"
            },
            {
              "nombre": "imagenes:nave/nave_avanza_2",
              "sprite": "imagenes-nave-nave_avanza_2"
            }
          ],
          "velocidad": "20"
        },
        {
          "nombre": "nave_en_reposo",
          "cuadros": [
            {
              "nombre": "imagenes:nave/nave_reposo",
              "sprite": "imagenes-nave-nave_reposo"
            }
          ],
          "velocidad": 10
        },
        {
          "nombre": "gallina_vuela",
          "cuadros": [
            {
              "nombre": "imagenes:gallina/gallina_vuela_1",
              "sprite": "imagenes-gallina-gallina_vuela_1"
            },
            {
              "nombre": "imagenes:gallina/gallina_vuela_2",
              "sprite": "imagenes-gallina-gallina_vuela_2"
            },
            {
              "nombre": "imagenes:gallina/gallina_vuela_3",
              "sprite": "imagenes-gallina-gallina_vuela_3"
            },
            {
              "nombre": "imagenes:gallina/gallina_vuela_2",
              "sprite": "imagenes-gallina-gallina_vuela_2"
            }
          ],
          "velocidad": "20"
        },
        {
          "nombre": "nave_avanza",
          "cuadros": [
            {
              "nombre": "imagenes:nave/nave_avanza_1",
              "sprite": "imagenes-nave-nave_avanza_1"
            },
            {
              "nombre": "imagenes:nave/nave_avanza_2",
              "sprite": "imagenes-nave-nave_avanza_2"
            }
          ],
          "velocidad": 10
        },
        {
          "nombre": "conejo_salta",
          "cuadros": [
            {
              "nombre": "imagenes:conejo/conejo_salta",
              "sprite": "imagenes-conejo-conejo_salta"
            }
          ],
          "velocidad": 10
        },
        {
          "nombre": "conejo_parado",
          "cuadros": [
            {
              "nombre": "imagenes:conejo/conejo_parado1",
              "sprite": "imagenes-conejo-conejo_parado1"
            },
            {
              "nombre": "imagenes:conejo/conejo_parado2",
              "sprite": "imagenes-conejo-conejo_parado2"
            }
          ],
          "velocidad": "2"
        },
        {
          "nombre": "conejo_camina",
          "velocidad": 15,
          "cuadros": [
            {
              "nombre": "imagenes:conejo/conejo_camina1",
              "sprite": "imagenes-conejo-conejo_camina1"
            },
            {
              "nombre": "imagenes:conejo/conejo_camina2",
              "sprite": "imagenes-conejo-conejo_camina2"
            }
          ]
        },
        {
          "nombre": "bmo_camina",
          "velocidad": 15,
          "cuadros": [
            {
              "nombre": "imagenes:bmo/bmo_camina_1",
              "sprite": "imagenes-bmo-bmo_camina_1"
            },
            {
              "nombre": "imagenes:bmo/bmo_camina_2",
              "sprite": "imagenes-bmo-bmo_camina_2"
            }
          ]
        },
        {
          "nombre": "bmo_escala",
          "cuadros": [
            {
              "nombre": "imagenes:bmo/bmo_escala_1",
              "sprite": "imagenes-bmo-bmo_escala_1"
            },
            {
              "nombre": "imagenes:bmo/bmo_escala_2",
              "sprite": "imagenes-bmo-bmo_escala_2"
            }
          ],
          "velocidad": 10
        },
        {
          "nombre": "bmo_salta",
          "cuadros": [
            {
              "nombre": "imagenes:bmo/bmo_salta",
              "sprite": "imagenes-bmo-bmo_salta"
            }
          ],
          "velocidad": 10
        },
        {
          "nombre": "bmo_parado",
          "cuadros": [
            {
              "nombre": "imagenes:bmo/bmo_parado",
              "sprite": "imagenes-bmo-bmo_parado"
            }
          ],
          "velocidad": 10
        }
      ],
      "codigos": {
        "escenas": [
          {
            "nombre": "escena2",
            "codigo": "class escena2 extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
          }
        ],
        "actores": [
          {
            "nombre": "plataforma",
            "codigo": "// @ts-ignore\nclass plataforma extends Actor {\n    iniciar() {\n\n    }\n}"
          },
          {
            "nombre": "caja",
            "codigo": "// @ts-ignore\nclass caja extends Actor {\n    iniciar() {\n\n    }\n}"
          },
          {
            "nombre": "pelota",
            "codigo": "// @ts-ignore\nclass pelota extends Actor {\n    iniciar() {\n\n    }\n}"
          },
          {
            "nombre": "techo",
            "codigo": "// @ts-ignore\nclass techo extends Actor {\n    iniciar() {\n\n    }\n}"
          },
          {
            "nombre": "suelo",
            "codigo": "// @ts-ignore\nclass suelo extends Actor {\n    iniciar() {\n\n    }\n}"
          },
          {
            "nombre": "actor",
            "codigo": "// @ts-ignore\nclass actor extends Actor {\n\n  iniciar() {}\n\n  actualizar() {}\n}\n"
          },
          {
            "nombre": "texto",
            "codigo": "// @ts-ignore\nclass texto extends ActorTextoBase {\n}\n"
          },
          {
            "nombre": "texto1",
            "codigo": "// @ts-ignore\nclass texto1 extends ActorTextoBase {\n}\n"
          }
        ],
        "proyecto": "class Proyecto {\n    iniciar() {\n    }\n}"
      },
      "escenas": [
        {
          "nombre": "escena2",
          "id": 2,
          "ancho": 1000,
          "alto": 1000,
          "camara_x": 0,
          "camara_y": 0,
          "gravedad_x": 0,
          "gravedad_y": 1,
          "fondo": "decoracion:fondos/fondo-plano",
          "actores": [
            {
              "x": -187.30124734026458,
              "y": 14.044799955302466,
              "z": 0,
              "imagen": "imagenes:mono/mono_reir",
              "centro_x": 0.5,
              "centro_y": 0.5,
              "rotacion": 0,
              "escala_x": 1,
              "escala_y": 1,
              "transparencia": 0,
              "etiqueta": "actor",
              "espejado": false,
              "espejado_vertical": false,
              "figura": "",
              "figura_dinamica": true,
              "figura_ancho": 100,
              "figura_alto": 100,
              "figura_radio": 40,
              "figura_sin_rotacion": false,
              "figura_rebote": 1,
              "figura_sensor": false,
              "es_texto": false,
              "texto_con_borde": false,
              "color": "white",
              "id": 10478182473955260,
              "activo": true,
              "nombre": "actor",
              "habilidades": [],
              "sensores": []
            },
            {
              "x": 20.470068955241913,
              "y": 28.613399013860885,
              "z": -10,
              "imagen": "imagenes:basicos/invisible",
              "centro_x": 0.5,
              "centro_y": 0.5,
              "rotacion": 0,
              "escala_x": 1,
              "escala_y": 1,
              "transparencia": 0,
              "etiqueta": "actor",
              "espejado": false,
              "espejado_vertical": false,
              "figura": "",
              "figura_dinamica": true,
              "figura_ancho": 100,
              "figura_alto": 100,
              "figura_radio": 40,
              "figura_sin_rotacion": false,
              "figura_rebote": 1,
              "figura_sensor": false,
              "es_texto": true,
              "texto_con_borde": false,
              "color": "white",
              "texto": "Pulsá el botón ejecutar en",
              "fuente": "color-blanco-con-sombra-chico",
              "id": 17657515648711366,
              "activo": true,
              "nombre": "texto",
              "habilidades": [],
              "sensores": []
            },
            {
              "x": 50.636427550436,
              "y": -7.9316686609832345,
              "z": -10,
              "imagen": "imagenes:basicos/invisible",
              "centro_x": 0.5,
              "centro_y": 0.5,
              "rotacion": 0,
              "escala_x": 1,
              "escala_y": 1,
              "transparencia": 0,
              "etiqueta": "actor",
              "espejado": false,
              "espejado_vertical": false,
              "figura": "",
              "figura_dinamica": true,
              "figura_ancho": 100,
              "figura_alto": 100,
              "figura_radio": 40,
              "figura_sin_rotacion": false,
              "figura_rebote": 1,
              "figura_sensor": false,
              "es_texto": true,
              "texto_con_borde": false,
              "color": "white",
              "texto": "la computadora para comenzar",
              "fuente": "color-blanco-con-sombra-chico",
              "id": 12451044496293666,
              "activo": true,
              "nombre": "texto1",
              "habilidades": [],
              "sensores": []
            }
          ]
        }
      ],
      "fps": 60,
      "modo_de_video": "suavizado",
      "sonidos": [
        {
          "nombre": "laser",
          "ruta": "sonidos/laser.mp3"
        },
        {
          "nombre": "explosion",
          "ruta": "sonidos/explosion.mp3"
        },
        {
          "nombre": "gallina",
          "ruta": "sonidos/gallina.mp3"
        },
        {
          "nombre": "moneda",
          "ruta": "sonidos/moneda.mp3"
        },
        {
          "nombre": "salto-corto",
          "ruta": "sonidos/salto-corto.mp3"
        },
        {
          "nombre": "salto-largo",
          "ruta": "sonidos/salto-largo.mp3"
        },
        {
          "nombre": "seleccion-aguda",
          "ruta": "sonidos/seleccion-aguda.mp3"
        },
        {
          "nombre": "seleccion-grave",
          "ruta": "sonidos/seleccion-grave.mp3"
        },
        {
          "nombre": "comer",
          "ruta": "sonidos/comer.mp3"
        }
      ],
      "escena_inicial": 2
    },
    "pixelart": false
};
