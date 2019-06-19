class robot extends Actor {
  propiedades = {
    imagen: "imagenes:basicos/invisible"
  };

  contenedor: any;
  huesos: Huesos;

  iniciar() {
    this.contenedor = this.pilas.modo.add.container();
    this.huesos = new Huesos(this.pilas, "robot", "atlas-robot", this.contenedor);
    this.huesos.definir_animacion("run");
  }

  actualizar() {
    this.huesos.actualizar_animacion(20);
  }

  pre_actualizar() {
    this.pilas.utilidades.sincronizar_contenedor(this.contenedor, this.sprite);
  }
}
