class ModoCargando {
  constructor() {
    this.es_modo_pausa = false;
    this.es_modo_ejecucion = false;
    this.es_modo_edicion = false;
    this.es_modo_cargando = true;

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
    this.puede_modificar_depurador = false;
  }

  cuandoTerminoDeCargarPilas() {
    return new ModoEdicion();
  }
}

class ModoEdicion {
  constructor() {
    this.es_modo_pausa = false;
    this.es_modo_ejecucion = false;
    this.es_modo_edicion = true;
    this.es_modo_cargando = false;

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
    this.puede_modificar_depurador = true;
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
    this.es_modo_pausa = false;
    this.es_modo_ejecucion = true;
    this.es_modo_edicion = false;
    this.es_modo_cargando = false;

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
    this.puede_modificar_depurador = false;
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
    this.es_modo_pausa = true;
    this.es_modo_ejecucion = false;
    this.es_modo_edicion = false;
    this.es_modo_cargando = false;

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
    this.puede_modificar_depurador = true;
  }

  detener() {
    return new ModoEdicion();
  }

  cuandoTerminoDeCargarPilas() {
    console.warn("No aplica, este es el ModoPausa");
  }
}

export default { ModoCargando, ModoEdicion, ModoEjecucion, ModoPausa };
