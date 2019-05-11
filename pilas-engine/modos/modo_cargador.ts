/// <reference path="modo.ts"/>

class ModoCargador extends Modo {
  pilas: Pilas;
  contador: number;

  constructor() {
    super({ key: "ModoCargador" });
  }

  init(data) {
    this.pilas = data.pilas;
  }

  preload() {
    this.load.crossOrigin = "anonymous";
    this.contador = 0;

    this.load.multiatlas("imagenes", "imagenes.json", "./");

    /*
    for (let i = 0; i < this.pilas.recursos.imagenes.length; i++) {
      let item = this.pilas.recursos.imagenes[i];
      this.load.image(item.nombre, item.ruta);
    }
    */

    for (let i = 0; i < this.pilas.recursos.sonidos.length; i++) {
      let sonido = this.pilas.recursos.sonidos[i];
      this.load.audio(sonido.nombre, sonido.ruta, {});
    }

    /*
    this.load.atlas({
      key: "spritesheet",
      texture: "imagenes_agrupadas/spritesheet.png",
      data: "imagenes_agrupadas/spritesheet.json"
    });

;
    */

    for (let i = 0; i < this.pilas.recursos.fuentes.length; i++) {
      let fuente = this.pilas.recursos.fuentes[i];
      this.load.bitmapFont(
        fuente.nombre,
        fuente.imagen,
        fuente.fuente,
        null,
        null
      );
    }

    this.load.on("progress", this.cuando_progresa_la_carga, this);
  }

  update() {
    this.contador += 1;

    // Solo si transcurre cerca de 1 segundo sin cambiar esta escena se
    // emite un mensaje de error
    if (this.contador === 60) {
      let msg =
        "Carga finalizada\nTiene que enviar la señal 'ejecutar_proyecto'";
      this.add.bitmapText(5, 5, "impact", msg);
    }
  }

  create() {
    super.create({ pilas: this.pilas }, 500, 500);

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
      this.pilas.mensajes.emitir_mensaje_al_editor(
        "finaliza_carga_de_recursos"
      );
    }
  }

  cuando_progresa_la_carga(progreso) {
    if (this.pilas.opciones.modo_simple) {
      console.log(`Progreso: ${progreso}`);
    } else {
      this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", {
        progreso: Math.ceil(progreso * 100)
      });
    }
  }
}
