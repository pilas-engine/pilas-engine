/// <reference path="modo.ts"/>

class ModoCargador extends Modo {
  pilas: Pilas;

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
    this.load.image("muere", "imagenes/conejo/muere.png");
    this.load.image("salta", "imagenes/conejo/salta.png");
    this.load.image("parado1", "imagenes/conejo/parado1.png");
    this.load.image("parado2", "imagenes/conejo/parado2.png");
    this.load.image("camina1", "imagenes/conejo/camina1.png");
    this.load.image("camina2", "imagenes/conejo/camina2.png");

    this.load.audio("laser", "sonidos/laser.wav", {});
    this.load.audio("moneda", "sonidos/moneda.wav", {});
    this.load.audio("salto-corto", "sonidos/salto-corto.wav", {});
    this.load.audio("salto-largo", "sonidos/salto-largo.wav", {});
    this.load.audio("seleccion-aguda", "sonidos/seleccion-aguda.wav", {});
    this.load.audio("seleccion-grave", "sonidos/seleccion-grave.wav", {});

    this.load.bitmapFont("font", "fuentes/font.png", "fuentes/font.fnt", null, null);
    this.load.bitmapFont("verdana3", "fuentes/verdana3.png", "fuentes/verdana3.fnt", null, null);

    this.load.on("progress", this.cuando_progresa_la_carga, this);
  }

  create() {
    this.pilas.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos");
    this.add.bitmapText(5, 5, "verdana3", "Carga finalizada\nEnviá la señal 'ejecutar_proyecto' para continuar.");
  }

  cuando_progresa_la_carga(progreso) {
    this.pilas.mensajes.emitir_mensaje_al_editor("progreso_de_carga", { progreso: Math.ceil(progreso * 100) });
  }
}
