class Utilidades {
  pilas: Pilas;
  id: number;
  navegador: string;

  constructor(pilas) {
    this.pilas = pilas;
    this.id = 1;
    this.navegador = navigator.appCodeName;
  }

  obtener_id_autoincremental() {
    this.id = this.id + 1;
    return this.id;
  }

  acceso_incorrecto(v) {
    console.error(`No se puede definir esta propiedad (valor ${v}) porque es de solo lectura.`);
  }

  obtener_rampa_de_colores() {
    let colores = ["#82E0AA", "#F8C471", "#F0B27A", "#F4F6F7", "#B2BABB", "#85C1E9", "#BB8FCE", "#F1948A", "#D98880"];
    return colores;
  }

  obtener_color_al_azar(opacidad) {
    let colores = this.obtener_rampa_de_colores();
    let cantidad_de_colores = colores.length;
    return colores[Math.floor(Math.random() * cantidad_de_colores)] + opacidad;
  }

  limitar(valor: number, minimo: number, maximo: number) {
    return Math.min(Math.max(valor, minimo), maximo);
  }

  validar_numero(valor: number) {
    if (typeof valor !== "number") {
      throw new Error(`El valor enviado no corresponde con un número: ${valor}`);
    }
  }

  convertir_angulo_a_radianes(grados: number) {
    return grados * Math.PI / 180;
  }

  convertir_radianes_a_angulos(radianes: number) {
    return radianes * 180 / Math.PI;
  }

  es_firefox() {
    return /Firefox/.test(navigator.userAgent);
  }

  convertir_coordenada_de_pilas_a_phaser(x, y) {
    return { x: x + this.pilas._ancho / 2, y: this.pilas._alto / 2 - y };
  }

  convertir_coordenada_de_phaser_a_pilas(x, y) {
    return { x: x - this.pilas._ancho / 2, y: this.pilas._ancho / 2 - y };
  }
}
