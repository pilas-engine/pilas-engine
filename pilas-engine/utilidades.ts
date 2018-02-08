class Utilidades {
  pilas: Pilas;
  id: number;

  constructor(pilas) {
    this.pilas = pilas;
    this.id = 1;
  }

  obtener_id_autoincremental() {
    this.id = this.id + 1;
    return this.id;
  }

  acceso_incorrecto(v) {
    console.error(`No se puede definir esta propiedad (valor ${v}) porque es de solo lectura.`);
  }

  obtener_rampa_de_colores() {
    let colores = ["#0080FF", "#178BE7", "#2E97D0", "#45A2B9", "#5CAEA2", "#73B98B", "#8BC573", "#A2D05C", "#B9DC45", "#D0E72E", "#E7F317", "#FFFF00", "#FFF300", "#FFE700", "#FFDC00", "#FFD000", "#FFC500", "#FFB900", "#FFAE00", "#FFA200", "#FF9700", "#FF8B00", "#FF8000", "#FF7000", "#FF6000", "#FF5000", "#FF4000", "#FF3000", "#FF2000", "#FF1000", "#FF0000", "#E71717", "#D02E2E", "#B94545", "#A25C5C", "#8B7373", "#738B8B", "#5CA2A2", "#45B9B9", "#2ED0D0", "#17E7E7", "#00FFFF", "#00FFD4", "#00FFAA", "#00FF7F", "#00FF55", "#00FF2A", "#00FF00", "#17E70B", "#2ED017", "#45B922", "#5CA22E", "#738B3A", "#8B7345", "#A25C51", "#B9455D", "#D02E68", "#E71774", "#FF0080"];
    return colores;
  }

  obtener_color_al_azar(transparencia) {
    let colores = this.obtener_rampa_de_colores();
    let cantidad_de_colores = colores.length;
    return colores[Math.floor(Math.random() * cantidad_de_colores)] + transparencia;
  }
}
