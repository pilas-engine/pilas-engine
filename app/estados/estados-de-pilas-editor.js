class ModoCargando {
  constructor() {
    this.ModoCargando = true;
    this.nombreDeEstado = "ModoCargando";
    this.puedeEjecutar = false;
    this.puedeDetener = false;
    this.editorDeshabilitado = true;
    this.codigo = "Demo";
  }

  cuandoTerminoDeCargarPilas() {
    return new ModoEdicion();
  }
}

class ModoEdicion {
  constructor() {
    this.ModoCargando = false;
    this.nombreDeEstado = "ModoEdicion";
    this.puedeEjecutar = true;
    this.puedeDetener = false;
    this.editorDeshabilitado = false;
    this.codigo = "Demo";
  }

  ejecutar() {
    return new ModoEjecucion();
  }
}

class ModoEjecucion {
  constructor() {
    this.ModoCargando = false;
    this.nombreDeEstado = "ModoEjecucion";
    this.puedeEjecutar = false;
    this.puedeDetener = true;
    this.editorDeshabilitado = true;
  }

  detener() {
    return new ModoEdicion();
  }
}

export default { ModoCargando, ModoEdicion, ModoEjecucion };
