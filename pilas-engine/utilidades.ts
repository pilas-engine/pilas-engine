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

  validar_que_este_vivo(actor: ActorBase) {
    if (!actor || !actor.esta_vivo()) {
      throw new Error(`El actor "${actor.nombre}" ha sido eliminado, usá el método esta_vivo() del actor antes de acceder a el.`);
    }
  }

  es_animacion(valor: any) {
    return (
      Array.isArray(valor) &&
      valor.every(e => {
        return typeof e === "number";
      })
    );
  }

  validar_parametro_numero_positivo(parametro: string, valor: number) {
    if (typeof valor !== "number" || valor < 0) {
      throw new Error(`El valor enviado como parámetro "${parametro}" tiene que ser un número mayor a 0, se envió: ${valor}`);
    }
  }

  validar_parametro_booleano(parametro: string, valor: number) {
    if (typeof valor !== "boolean") {
      throw new Error(`El valor enviado como parámetro "${parametro}" tiene que ser true o false, se envió: ${valor}`);
    }
  }

  validar_parametro_lista_de_numeros_pares(parametro: string, valor: Array<any>) {
    if (!Array.isArray(valor)) {
      throw new Error(`El valor enviado como parámetro "${parametro}" tiene que ser una lista de números, se envió: ${valor}`);
    }

    if (valor.length % 2 !== 0) {
      throw new Error(`El valor enviado como parámetro "${parametro}" tiene que tener una cantidad par de números, se contaron ${valor.length} números en la lista enviada.`);
    }
  }

  validar_parametro_numero_entero_cero_o_positivo(parametro: string, valor: number) {
    if (typeof valor !== "number" || valor !== parseInt(`${valor}`, 10) || valor < 0) {
      throw new Error(`El valor enviado como parámetro "${parametro}" tiene que ser un número entero mayor o igual a 0, se envió: ${valor}`);
    }
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

    return extend(JSON.parse(JSON.stringify(propiedades_iniciales)), propiedades);
  }

  obtener_distancia_entre(desde_x: number, desde_y: number, hasta_x: number, hasta_y: number) {
    return Math.sqrt(Math.abs(desde_x - hasta_x) ** 2 + Math.abs(desde_y - hasta_y) ** 2);
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

  /**
   * Dado un nombre y una lista de posibilidades retorna la mas similar.
   *
   * Por ejemplo:
   *
   *  > let opciones =  ["¡hola mundo!", "¡hola mundo, este es otro mensaje!"]
   *  > pilas.utilidades.obtener_mas_similar("holamund", opciones)
   *  "¡hola mundo!"
   */

  obtener_mas_similar(nombre, posibilidades) {
    let similitudes = posibilidades.map(h => {
      return {
        similitud: this.obtener_similaridad(h, nombre),
        posiblidad: h
      };
    });

    similitudes = similitudes.sort((a, b) => {
      if (a.similitud > b.similitud) {
        return 1;
      } else {
        return -1;
      }
    });

    return similitudes[0].posiblidad;
  }

  validar_que_existe_imagen(nombre) {
    if (this.pilas.imagenes_precargadas.indexOf(nombre) === -1) {
      let sugerencia = this.pilas.utilidades.obtener_mas_similar(nombre, this.pilas.imagenes_precargadas);
      throw Error(`No se encuentra la imagen "${nombre}"\n¿Quisiste decir "${sugerencia}"?`);
    }
  }

  /**
   * Se asegura de sincronizar las propiedades del contenedor respecto del
   * sprite. Copia propiedades como escala, posición etc...
   */
  sincronizar_contenedor(contenedor, sprite) {
    contenedor.x = sprite.x;
    contenedor.y = sprite.y;

    if (sprite.flipX) {
      contenedor.scaleX = -sprite.scaleX;
    } else {
      contenedor.scaleX = sprite.scaleX;
    }

    if (sprite.flipY) {
      contenedor.scaleY = -sprite.scaleY;
    } else {
      contenedor.scaleY = sprite.scaleY;
    }

    contenedor.angle = sprite.angle;
    contenedor.alpha = sprite.alpha;

    contenedor.setDepth(sprite.depth);
  }

  obtener_nombre_de_la_tecla_desde_un_evento(evento) {
    let tecla = evento.key;

    if (!tecla) {
      tecla = tecla.code;
    }

    let traducciones = {
      " ": "espacio",
      ArrowLeft: "izquierda",
      ArrowRight: "derecha",
      ArrowUp: "arriba",
      ArrowDown: "abajo",
      Alt: "alt",
      Control: "control",
      Shift: "shift",
      Tab: "tab",
      Backspace: "backspace",
      Meta: "meta",
      Escape: "escape",
      Enter: "enter"
    };

    if (traducciones[tecla]) {
      return traducciones[tecla];
    }

    return tecla;
  }
}
