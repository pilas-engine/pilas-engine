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
    let colores = [0x82e0aa, 0xf8c471, 0xf0b27a, 0xf4f6f7, 0xb2babb, 0x85c1e9, 0xbb8fce, 0xf1948a, 0xd98880];
    return colores;
  }

  obtener_color_al_azar() {
    let colores = this.obtener_rampa_de_colores();
    let cantidad_de_colores = colores.length;
    return colores[Math.floor(Math.random() * cantidad_de_colores)];
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

  combinar_propiedades(propiedades_iniciales, propiedades) {
    function extend(obj, src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
      }
      return obj;
    }

    return extend(JSON.parse(JSON.stringify(propiedades_iniciales)), propiedades);
  }
}
