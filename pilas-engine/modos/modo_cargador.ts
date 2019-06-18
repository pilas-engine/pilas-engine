/// <reference path="modo.ts"/>

class ModoCargador extends Modo {
  pilas: Pilas;
  contador: number;
  barra_de_progreso: any;
  x: number;

  constructor() {
    super({ key: "ModoCargador" });
  }

  preload() {
    this.load.crossOrigin = "anonymous";
    this.contador = 0;

    this.crear_indicador_de_carga();

    this.load.multiatlas("imagenes", "imagenes.json", "./");

    for (let i = 0; i < this.pilas.recursos.sonidos.length; i++) {
      let sonido = this.pilas.recursos.sonidos[i];
      this.load.audio(sonido.nombre, sonido.ruta, {});
    }

    for (let i = 0; i < this.pilas.recursos.fuentes.length; i++) {
      let fuente = this.pilas.recursos.fuentes[i];
      this.load.bitmapFont(fuente.nombre, fuente.imagen, fuente.fuente, null, null);
    }

    this.load.multiatlas("atlas-ceferino", "ceferino.json", "./");
    this.load.json("ceferino", "ceferino.scon");

    this.load.multiatlas("atlas-robot", "robot.json", "./");
    this.load.json("robot", "robot.scon");

    this.load.on("progress", this.cuando_progresa_la_carga, this);
  }

  init(data) {
    this.pilas = data.pilas;
  }

  private crear_indicador_de_carga() {
    var progressBox = this.add.graphics();
    var borde = this.add.graphics();
    this.barra_de_progreso = this.add.graphics();

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
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
  }

  update() {
    this.contador += 1;

    // Solo si transcurre cerca de 1 segundo sin cambiar esta escena se
    // emite un mensaje de error
    if (this.contador === 60) {
      let msg = "Carga finalizada\nTiene que enviar la señal 'ejecutar_proyecto'";
      this.add.bitmapText(5, 5, "impact", msg);
    }
  }

  notificar_imagenes_cargadas() {
    let imagenes = [];

    for (let key in this.game.textures.list) {
      if (key.indexOf("__") === -1 && key) {
        let contenido = this.game.textures.list[key];

        if (contenido.frameTotal === 1) {
          imagenes.push(key);
        } else {
          let frames = contenido.getFrameNames();

          for (let i = 0; i < frames.length; i++) {
            imagenes.push(key + ":" + frames[i]);
          }
        }
      }
    }

    this.pilas.imagenes_precargadas = imagenes;
  }

  create() {
    super.create({ pilas: this.pilas }, 500, 500);

    this.notificar_imagenes_cargadas();

    if (this.pilas.opciones.modo_simple) {
      console.log("Finalizó la carga en modo simple");

      this.pilas.definir_modo("ModoEjecucion", {
        pilas: this.pilas,
        nombre_de_la_escena_inicial: "principal",
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
      var principal = /** @class */ (function (_super) {
          __extends(principal, _super);
          function principal() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          principal.prototype.iniciar = function () {
          };
          principal.prototype.actualizar = function () {
          };
          return principal;
      }(Escena));
      `,
        proyecto: {
          alto: 200,
          ancho: 200,
          titulo: "sin usar",
          escena_inicial: 3,
          codigos: {
            escenas: [
              {
                nombre: "principal",
                codigo: `
                  class principal extends Escena {
                    iniciar() {

                    }

                    actualizar() {

                    }
                  }`
              }
            ],
            actores: []
          },
          escenas: [
            {
              nombre: "principal",
              id: 3,
              actores: [],
              camara_x: 0,
              camara_y: 0
            }
          ]
        }
      });
    } else {
      this.pilas.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos");
    }
  }

  cuando_progresa_la_carga(progreso) {
    this.barra_de_progreso.clear();
    this.barra_de_progreso.fillStyle(0xffffff, 1);
    this.barra_de_progreso.fillRect(this.x + 5, 220 + 5, 300 * progreso, 10);

    if (this.pilas.opciones.modo_simple) {
      //console.log(`Progreso: ${progreso}`);
    } else {
      // TODO: eliminar esta señal
      this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", {
        progreso: Math.ceil(progreso * 100)
      });
    }
  }
}
