class ModoCargando {
  constructor() {
    this.puede_editar = false;
    this.ModoCargando = true;
    this.nombreDeEstado = "ModoCargando";
    this.puedeEjecutar = false;
    this.puedeDetener = false;
    this.pausaActivada = false;
    this.editorDeshabilitado = true;
    this.codigo = "Demo";
    this.mantenerFoco = false;
    this.puedePausar = false;
    this.puede_usar_el_interprete = false;
  }

  cuandoTerminoDeCargarPilas() {
    return new ModoEdicion();
  }
}

class ModoEdicion {
  constructor() {
    this.puede_editar = true;
    this.ModoCargando = false;
    this.nombreDeEstado = "ModoEdicion";
    this.puedeEjecutar = true;
    this.puedeDetener = false;
    this.pausaActivada = false;
    this.editorDeshabilitado = false;
    this.codigo = "Demo";
    this.mantenerFoco = false;
    this.puedePausar = false;
    this.puede_usar_el_interprete = false;
  }

  ejecutar() {
    return new ModoEjecucion();
  }

  cuandoTerminoDeCargarPilas() {
    console.warn("No aplica, este es el ModoEdicion");
  }
}

class ModoEjecucion {
  constructor() {
    this.puede_editar = false;
    this.ModoCargando = false;
    this.nombreDeEstado = "ModoEjecucion";
    this.puedeEjecutar = false;
    this.puedeDetener = true;
    this.pausaActivada = false;
    this.editorDeshabilitado = true;
    this.mantenerFoco = true;
    this.puedePausar = true;
    this.puede_usar_el_interprete = true;
  }

  detener() {
    return new ModoEdicion();
  }

  pausar() {
    return new ModoPausa();
  }

  cuandoTerminoDeCargarPilas() {
    console.warn("No aplica, este es el ModoEjecucion");
  }
}

class ModoPausa {
  constructor() {
    this.puede_editar = false;
    this.ModoCargando = false;
    this.nombreDeEstado = "ModoPausa";
    this.puedeEjecutar = false;
    this.puedeDetener = true;
    this.pausaActivada = true;
    this.editorDeshabilitado = true;
    this.mantenerFoco = true;
    this.puedePausar = false;
    this.puede_usar_el_interprete = false;
  }

  detener() {
    return new ModoEdicion();
  }

  cuandoTerminoDeCargarPilas() {
    console.warn("No aplica, este es el ModoPausa");
  }
}

export default { ModoCargando, ModoEdicion, ModoEjecucion, ModoPausa };
