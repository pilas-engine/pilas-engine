/// <reference path="modo.ts"/>

class ModoError extends Modo {
  pilas: Pilas;
  permitir_modo_pausa: boolean;

  constructor() {
    super({ key: "ModoError" });
  }

  preload() {
    this.permitir_modo_pausa = true;
  }

  create(datos: any) {
    let espaciado: number;
    this.pilas = datos.pilas;

    this.conectar_eventos();
    this.crear_fondo();
    this.crear_titulo();
    espaciado = this.crear_subtitulo(datos.pilas._ancho, datos.error.message);
    this.crear_detalle_del_error(espaciado, datos);

    console.error(datos.error);
  }

  private traducir_mensaje_de_error(mensaje: string) {
    let error_undefined = /(.*) is not defined/;
    let error_position = /Cannot read property 'position' of undefined/;
    let error_metodo = /Cannot read property '(.*)' of undefined/;

    // mensaje tipo: "a is not defined"
    if (mensaje.match(error_undefined)) {
      return mensaje.replace(error_undefined, `La variable '$1' no está definida`);
    }

    // mensaje tipo: "Cannot read propery 'position' of undefined"
    if (mensaje.match(error_position)) {
      return mensaje.replace(error_position, `Se intentó acceder a un actor eliminado`);
    }

    // mensaje tipo: "TypeError: Cannot read property 'clonar_en' of undefined"
    if (mensaje.match(error_metodo)) {
      return mensaje.replace(error_metodo, `No se puede llamar a '$1' de una variable que tiene el valor undefined`);
    }


    return mensaje;
  }

  crear_fondo() {
    let fondo = this.add.graphics();

    fondo.fillStyle(0x588bae, 0.75);
    fondo.fillRect(0, 0, 3000, 3000);
    fondo.setDepth(500000);
    fondo.setScrollFactor(0, 0);
  }

  private crear_titulo() {
    let texto = this.add.bitmapText(10, 10, "color-blanco-con-sombra-grande", "uy!");

    texto.setDepth(500001);
    texto.setScrollFactor(0, 0);
  }

  private crear_subtitulo(ancho: number, mensaje: string) {
    mensaje = this.traducir_mensaje_de_error(mensaje);

    let texto = this.add.bitmapText(10, 90, "color-blanco-con-sombra-chico", mensaje);
    (<any>texto).setMaxWidth(ancho - 20);

    texto.setDepth(500001);
    texto.setScrollFactor(0, 0);

    return 20 + texto.y + texto.getTextBounds().local.height;
  }

  private crear_detalle_del_error(espaciado: number, datos: any) {
    let texto = "Hacé click en este mensaje para ver el mensaje de error completo.";

    let funcion =
      datos.stacktrace
        .split("\n")[1]
        .trim()
        .replace("- ", "") + "(...)";

    texto = `El error se produjo cuando se llamó al método: \n${funcion} \n\n${texto}`;
    let fuente = "color-blanco-con-sombra";
    let texto_stack = this.add.bitmapText(10, espaciado, fuente, texto).setInteractive({ cursor: "pointer" });

    let modo = this;

    texto_stack.on("pointerdown", function() {
      this.destroy();
      modo.add.bitmapText(10, espaciado, "color-blanco-con-sombra", datos.stacktrace).setDepth(500000);
    });

    texto_stack.setDepth(500001);

    texto_stack.setScrollFactor(0, 0);
  }

  update() {}

  guardar_foto_de_entidades() {}

  conectar_eventos() {
    this.input.keyboard.on("keyup", this.manejar_evento_key_up.bind(this));
  }

  private manejar_evento_key_up(evento: any) {
    if (evento.key === "Escape") {
      this.pilas.mensajes.emitir_mensaje_al_editor("pulsa_la_tecla_escape", {});
    }
  }
}
