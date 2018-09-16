/// <reference path="modo.ts"/>

class ModoCargador extends Modo {
  pilas: Pilas;

  constructor() {
    super({ key: "ModoCargador" });
  }

  preload() {
    this.pilas = pilas; // TODO: Este acceso no debería existir, pilas es una variable global a fines de depuración en chrome, el código de pilas no debería asumir que esta variable exista de forma global.
    this.load.crossOrigin = "anonymous";

    for (let i = 0; i < pilas.recursos.imagenes.length; i++) {
      let item = pilas.recursos.imagenes[i];
      this.load.image(item.nombre, item.ruta);
    }

    for (let i = 0; i < pilas.recursos.sonidos.length; i++) {
      let sonido = pilas.recursos.sonidos[i];
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

    for (let i = 0; i < pilas.recursos.fuentes.length; i++) {
      let fuente = pilas.recursos.fuentes[i];
      this.load.bitmapFont(fuente.nombre, fuente.imagen, fuente.fuente, null, null);
    }

    this.load.on("progress", this.cuando_progresa_la_carga, this);
  }

  create() {
    super.create({ pilas: this.pilas }, 500, 500);
    this.pilas.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos");

    let msg = "Carga finalizada\nTiene que enviar la señal 'ejecutar_proyecto'";
    this.add.bitmapText(5, 5, "impact", msg);
  }

  cuando_progresa_la_carga(progreso) {
    this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", {
      progreso: Math.ceil(progreso * 100)
    });
  }

  update() {}
}
