interface Color {
  nombre: string;
  hexa: number;
  ingles: string;
}

class Colores {
  pilas: Pilas;
  _lista_de_colores: Color[];

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this._lista_de_colores = [
      {
        nombre: "rojo",
        hexa: 0xff0000,
        ingles: "red"
      },
      {
        nombre: "verde",
        hexa: 0x00ff00,
        ingles: "green"
      },
      {
        nombre: "azul",
        hexa: 0x0000ff,
        ingles: "blue"
      },
      {
        nombre: "negro",
        hexa: 0x000000,
        ingles: "black"
      },
      {
        nombre: "amarillo",
        hexa: 0xffff00,
        ingles: "yellow"
      },
      {
        nombre: "rosa",
        hexa: 0xffc0cb,
        ingles: "PINK"
      },
      {
        nombre: "naranja",
        hexa: 0xffa500,
        ingles: "orange"
      },
      {
        nombre: "violeta",
        hexa: 0xee82ee,
        ingles: "violet"
      },
      {
        nombre: "cyan",
        hexa: 0x00ffff,
        ingles: "cyan"
      },
      {
        nombre: "marron",
        hexa: 0xa52a2a,
        ingles: "brown"
      },
      {
        nombre: "blanco",
        hexa: 0xffffff,
        ingles: "white"
      },
      {
        nombre: "gris",
        hexa: 0x808080,
        ingles: "gray"
      }
    ];
  }

  convertir_a_hexa(color: any) {
    if (typeof color === "number") {
      return color;
    }

    this.validar_color(color);
    let elemento = this._lista_de_colores.filter(e => e.nombre == color.toLowerCase());
    return elemento[0].hexa;
  }

  validar_color(color: string) {
    if (this.colores.indexOf(color) > -1) {
      return true;
    } else {
      throw Error(`El color ${color} es inválido`);
    }
  }

  get colores() {
    return this._lista_de_colores.map(e => e.nombre);
  }

  generar(rojo: number, verde: number, azul: number) {
    return Phaser.Display.Color.GetColor(rojo, verde, azul);
  }
}
