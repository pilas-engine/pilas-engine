/// <reference path="modo.ts"/>

class ModoCargador extends Modo {
  pilas: Pilas;
  contador: number;
  barra_de_progreso: any;
  x: number;
  modo_simple: boolean;

  constructor() {
    super({ key: "ModoCargador" });
  }

  preload() {
    this.load.crossOrigin = "anonymous";
    this.contador = 0;

    this.crear_indicador_de_carga();

    if (!this.pilas.opciones.omitir_imagenes_de_pilas) {
      this.load.multiatlas("imagenes", "imagenes.json", "./");
      this.load.multiatlas("bloques", "bloques.json", "./");
      this.load.multiatlas("decoracion", "decoracion.json", "./");

      this.load.multiatlas("fuentes", "fuentes.json", "./");
      this.load.json("fuentes-datos-json", "fuentes-datos.json");
    }

    if (this.pilas.recursos.sonidos) {
      for (let i = 0; i < this.pilas.recursos.sonidos.length; i++) {
        let sonido = this.pilas.recursos.sonidos[i];

        this.pilas.sonidos.agregar_sonido(sonido.nombre);

        if (sonido.contenido) {
          this.convertir_sonido_en_array_buffer(sonido, buffer => {
            this.cache.audio.add(sonido.nombre, buffer);
          });
        } else {
          this.load.audio(sonido.nombre, sonido.ruta, {});
        }
      }
    }

    if (this.pilas.recursos.atlas) {
      for (let i = 0; i < this.pilas.recursos.atlas.length; i++) {
        let atlas = this.pilas.recursos.atlas[i];
        this.load.multiatlas(atlas.nombre, atlas.archivo, atlas.ruta);
      }
    }

    if (this.pilas.recursos.huesos) {
      for (let i = 0; i < this.pilas.recursos.huesos.length; i++) {
        let hueso = this.pilas.recursos.huesos[i];
        this.load.json(hueso.nombre, hueso.ruta);
      }
    } else {
      if (this.pilas.recursos.huesos === undefined) {
        this.load.multiatlas("atlas-robot", "robot.json", "./");
        this.load.json("robot", "robot.scon");
      }
    }

    if (this.pilas.recursos.imagenes) {
      for (let i = 0; i < this.pilas.recursos.imagenes.length; i++) {
        let imagen = this.pilas.recursos.imagenes[i];
        this.load.image(imagen.nombre, imagen.ruta);
      }
    }

    if (this.pilas.imagenes) {
      this.pilas.imagenes.map(item => {
        if (item.contenido) {
          this.textures.addBase64(item.nombre, item.contenido);
        } else {
          if (item.ruta) {
            this.load.image(item.nombre, item.ruta);
          } else {
            throw Error("No se puede cargar una imagen sin contenido ni ruta.");
          }
        }
      });
    }

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
      y: height / 2 - 100,
      text: "Iniciando ...",
      style: {
        font: "14px verdana",
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
      this.add.text(5, 5, msg);
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
    if (!this.pilas.opciones.omitir_imagenes_de_pilas) {
      this.crear_fuente_bitmap("color-negro");
      this.crear_fuente_bitmap("color-blanco");
      this.crear_fuente_bitmap("color-blanco-con-sombra-chico");
      this.crear_fuente_bitmap("color-blanco-con-sombra-grande");
      this.crear_fuente_bitmap("color-blanco-con-sombra-medio");
      this.crear_fuente_bitmap("color-blanco-con-sombra");
      this.crear_fuente_bitmap("pixel-color-negro");
      this.crear_fuente_bitmap("pixel-color-blanco");
    }

    super.create({ pilas: this.pilas }, this.pilas._ancho, this.pilas._alto);
    this.notificar_imagenes_cargadas();

    let fondo = undefined;

    if (this.pilas.opciones.modo_simple) {
      this.pilas.definir_modo("ModoEjecucion", {
        pilas: this.pilas,
        nombre_de_la_escena_inicial: "principal",
        es_cambio_de_escena: false,
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
          alto: this.pilas._alto,
          ancho: this.pilas._ancho,
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
              ancho: this.pilas._ancho,
              alto: this.pilas._alto,
              fondo: fondo,
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

  private crear_fuente_bitmap(nombre) {
    let ParseXMLBitmapFont = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont;
    let frame = this.sys.textures.getFrame("fuentes", nombre);
    let json = this.sys.cache.json.get("fuentes-datos-json");

    let parser = new DOMParser();
    var xmlDoc = parser.parseFromString(json[nombre].contenido, "application/xml");

    var data = ParseXMLBitmapFont(xmlDoc, frame, undefined, undefined);
    this.sys.cache.bitmapFont.add(nombre, { data: data, texture: "fuentes", frame: nombre });
  }

  cuando_progresa_la_carga(progreso) {
    this.barra_de_progreso.clear();
    this.barra_de_progreso.fillStyle(0xffffff, 1);
    this.barra_de_progreso.fillRect(this.x + 5, 220 + 5, 300 * progreso, 10);
  }

  convertir_sonido_en_array_buffer(sonido, callback) {
    var Base64Binary = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

      removePaddingChars: function(input: any) {
        var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));

        if (lkey == 64) {
          return input.substring(0, input.length - 1);
        }

        return input;
      },

      decode: function(input: any) {
        //get last chars to see if are valid
        input = this.removePaddingChars(input);
        input = this.removePaddingChars(input);

        var bytes = parseInt("" + (input.length / 4) * 3, 10);

        var uarray;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        var j = 0;

        uarray = new Uint8Array(bytes);

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        for (i = 0; i < bytes; i += 3) {
          //get the 3 octects in 4 ascii chars
          enc1 = this._keyStr.indexOf(input.charAt(j++));
          enc2 = this._keyStr.indexOf(input.charAt(j++));
          enc3 = this._keyStr.indexOf(input.charAt(j++));
          enc4 = this._keyStr.indexOf(input.charAt(j++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          uarray[i] = chr1;
          if (enc3 != 64) uarray[i + 1] = chr2;
          if (enc4 != 64) uarray[i + 2] = chr3;
        }

        return uarray;
      }
    };

    var buffer2 = Base64Binary.decode(sonido.contenido.split("64,")[1]).buffer;

    var audioCtx = new (window["AudioContext"] || window["webkitAudioContext"])();
    audioCtx.decodeAudioData(
      buffer2,
      (buffer: any) => {
        callback.call(this, buffer);
      },
      e => {
        console.log("Error with decoding audio data" + e.err);
      }
    );
  }
}
