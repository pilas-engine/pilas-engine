/// <reference path="modo.ts"/>

class ModoCargador extends Modo {
  pilas: Pilas;

  constructor() {
    super({ key: "ModoCargador" });
  }

  preload() {
    this.pilas = pilas;

    this.load.image("pelota", "imagenes/pelota.png");
    this.load.image("logo", "imagenes/logo.png");
    this.load.image("sin_imagen", "imagenes/sin_imagen.png");
    this.load.image("caja", "imagenes/caja.png");
    this.load.image("aceituna", "imagenes/aceituna.png");
    this.load.image("plano", "imagenes/fondos/plano.png");
    this.load.image("nave", "imagenes/nave.png");

    this.load.image("nave", "imagenes/nave.png");

    this.load.image("conejo", "imagenes/conejo.png");
    this.load.image("conejo_muere", "imagenes/conejo/muere.png");
    this.load.image("conejo_salta", "imagenes/conejo/salta.png");
    this.load.image("conejo_parado1", "imagenes/conejo/parado1.png");
    this.load.image("conejo_parado2", "imagenes/conejo/parado2.png");
    this.load.image("conejo_camina1", "imagenes/conejo/camina1.png");
    this.load.image("conejo_camina2", "imagenes/conejo/camina2.png");

    this.load.image("nave_en_reposo", "imagenes/nave/nave_reposo.png");
    this.load.image("nave_avanza_1", "imagenes/nave/nave_avanza_1.png");
    this.load.image("nave_avanza_2", "imagenes/nave/nave_avanza_2.png");
    this.load.image("nave_derecha_1", "imagenes/nave/nave_derecha_1.png");
    this.load.image("nave_derecha_2", "imagenes/nave/nave_derecha_2.png");
    this.load.image("nave_izquierda_1", "imagenes/nave/nave_izquierda_1.png");
    this.load.image("nave_izquierda_2", "imagenes/nave/nave_izquierda_2.png");

    this.load.image("suelo", "imagenes/suelo.png");
    this.load.image("techo", "imagenes/techo.png");
    this.load.image("pared", "imagenes/pared.png");

    this.load.image("plataforma", "imagenes/plataforma.png");
    this.load.image("moneda", "imagenes/moneda.png");

    this.load.image("nube1", "imagenes/nubes/nube1.png");
    this.load.image("nube2", "imagenes/nubes/nube2.png");
    this.load.image("fondo_cielo_1", "imagenes/fondos/cielo.png");

    this.load.atlas({
      key: "spritesheet",
      texture: "imagenes_agrupadas/spritesheet.png",
      data: "imagenes_agrupadas/spritesheet.json"
    });

    this.load.audio("laser", "sonidos/laser.wav", {});
    this.load.audio("moneda", "sonidos/moneda.wav", {});
    this.load.audio("salto-corto", "sonidos/salto-corto.wav", {});
    this.load.audio("salto-largo", "sonidos/salto-largo.wav", {});
    this.load.audio("seleccion-aguda", "sonidos/seleccion-aguda.wav", {});
    this.load.audio("seleccion-grave", "sonidos/seleccion-grave.wav", {});

    this.load.bitmapFont(
      "font",
      "fuentes/font.png",
      "fuentes/font.fnt",
      null,
      null
    );
    this.load.bitmapFont(
      "verdana3",
      "fuentes/verdana3.png",
      "fuentes/verdana3.fnt",
      null,
      null
    );
    this.load.bitmapFont(
      "azul",
      "fuentes/azul.png",
      "fuentes/azul.fnt",
      null,
      null
    );
    this.load.bitmapFont(
      "impact",
      "fuentes/impact.png",
      "fuentes/impact.fnt",
      null,
      null
    );

    this.load.on("progress", this.cuando_progresa_la_carga, this);
  }

  create() {
    this.pilas.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos");

    let msg = "Carga finalizada\nTiene que enviar la señal 'ejecutar_proyecto'";
    this.add.bitmapText(5, 5, "impact", msg);
  }

  cuando_progresa_la_carga(progreso) {
    this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", {
      progreso: Math.ceil(progreso * 100)
    });
  }
}
