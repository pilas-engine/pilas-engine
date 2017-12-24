import utils from "../utils/utils";

class EstadoCarga {
  constructor() {
    this.nombre = "Cargando ...";
    this.cargando = true;
  }

  definirEscena() {
    throw new Error("Este método no se puede llamar desde este estado.", this);
  }
}

class EstadoEdicion {
  constructor(contexto, entidades) {
    this.nombre = "Edición";
    this.contexto = contexto;
    this.puedeEjecutar = true;
    this.entidades = entidades;
    this.cargando = false;

    let data = {
      tipo: "define_escena",
      nombre: "editorState",
      entidades: entidades
    };

    this.contexto.postMessage(data, utils.HOST);
  }

  ejecutar() {
    let entidades = this.contexto.pilas.obtener_entidades();
    return new EstadoEjecucion(this.contexto, entidades);
  }

  definirEscena(escena) {
    return new EstadoEdicion(this.contexto, escena.actores);
  }

  detener() {
    return this;
  }

  agregarActor(nombre) {
    var entidades = this.contexto.pilas.obtener_entidades();

    entidades.push({
      id: "demo_123" + Math.random(),
      nombre: "demo",
      tipo: nombre,
      x: 250,
      y: 50,
      imagen: nombre,
      centro_x: 30,
      centro_y: 30
    });

    return new EstadoEdicion(this.contexto, entidades);
  }
}

class EstadoEjecucion {
  constructor(contexto, entidades) {
    this.nombre = "Ejecucion";
    this.contexto = contexto;
    this.puedeEjecutar = false;
    this.entidades = entidades;
    this.cargando = false;

    this.entidadesOriginales = entidades;

    let data = {
      tipo: "define_escena",
      nombre: "estadoEjecucion",
      entidades: entidades
    };

    this.contexto.postMessage(data, utils.HOST);
  }

  ejecutar() {
    return this;
  }

  detener() {
    let entidades = this.entidades;
    return new EstadoEdicion(this.contexto, entidades);
  }
}

export default { EstadoCarga, EstadoEdicion, EstadoEjecucion };
