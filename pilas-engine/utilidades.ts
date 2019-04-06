class Utilidades {
  pilas: Pilas;
  id: number;
  navegador: string;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.id = 1;
    this.navegador = navigator.appCodeName;
  }

  obtener_id_autoincremental() {
    this.id = this.id + 1;
    return this.id;
  }

  acceso_incorrecto(v) {
    console.error(
      `No se puede definir esta propiedad (valor ${v}) porque es de solo lectura.`
    );
  }

  obtener_rampa_de_colores() {
    let colores = [
      0x82e0aa,
      0xf8c471,
      0xf0b27a,
      0xf4f6f7,
      0xb2babb,
      0x85c1e9,
      0xbb8fce,
      0xf1948a,
      0xd98880
    ];
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
      throw new Error(
        `El valor enviado no corresponde con un número: ${valor}`
      );
    }
  }

  es_animacion(valor: any) {
    return Array.isArray(valor) && valor.every(e => Number.isInteger(e));
  }

  convertir_angulo_a_radianes(grados: number) {
    return (grados * Math.PI) / 180;
  }

  convertir_radianes_a_angulos(radianes: number) {
    return (radianes * 180) / Math.PI;
  }

  es_firefox() {
    return /Firefox/.test(navigator.userAgent);
  }

  convertir_coordenada_de_pilas_a_phaser(x: number, y: number) {
    return { x: x + this.pilas._ancho / 2, y: this.pilas._alto / 2 - y };
  }

  convertir_coordenada_de_phaser_a_pilas(x: number, y: number) {
    return { x: x - this.pilas._ancho / 2, y: -y + this.pilas._alto / 2 };
  }

  combinar_propiedades(propiedades_iniciales, propiedades) {
    function extend(obj, src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
      }
      return obj;
    }

    return extend(
      JSON.parse(JSON.stringify(propiedades_iniciales)),
      propiedades
    );
  }

  obtener_distancia_entre(desde_x: number, desde_y: number, hasta_x: number, hasta_y: number) {
    return Math.sqrt(
      Math.abs(desde_x - hasta_x) ** 2 + Math.abs(desde_y - hasta_y) ** 2
    );
  }

  obtener_similaridad(cadena1: string, cadena2: string) {
    function levenshtein_distance_b(a, b) {
      if (a.length == 0) return b.length;
      if (b.length == 0) return a.length;

      var matrix = [];

      // increment along the first column of each row
      var i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      // increment each column in the first row
      var j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) == a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              Math.min(
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1
              )
            ); // deletion
          }
        }
      }

      return matrix[b.length][a.length];
    }

    return levenshtein_distance_b(cadena1, cadena2);
  }
}
