// Esta clase sirve para mantener funcionando el código que se
// inicia animaciones en un actor que dejó de estar vivo.
//
// La idea es mantener esta clase sincronizada con la clase
// AnimaciónDePropiedad y evitar que el código falle si se
// elimina un actor con animaciones pendientes.
class AnimacionNula extends AnimacionDePropiedad {

  constructor() {
    super(null, null, null, null, null);
  }

  cuando_finaliza() {}

  explotar() {
    return this;
  }

  mover_x() {
    return this;
  }

  mover_y() {
    return this;
  }

  mover_hasta() {
    return this;
  }

  mover_x_hasta() {
    return this;
  }

  mover_y_hasta() {
    return this;
  }

  rotar() {
    return this;
  }

  rotar_hasta() {
    return this;
  }

  eliminar() {
    return this;
  }

  funcion() {
    return this;
  }

  decir() {
    return this;
  }

  esperar() {
    return this;
  }

  escalar_x() {
    return this;
  }

  escalar_y() {
    return this;
  }

  escalar() {
    return this;
  }

  escalar_x_hasta() {
    return this;
  }

  escalar_y_hasta() {
    return this;
  }

  escalar_hasta() {
    return this;
  }

  transparencia_hasta() {
    return this;
  }

  ocultar() {
    return this;
  }

  mostrar() {
    return this;
  }
}

