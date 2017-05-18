import Ember from 'ember';

class ModoCargando {
  constructor() {
    this.ModoCargando = true;
    this.nombreDeEstado = "ModoCargando";
    this.puedeEjecutar = false;
    this.puedeDetener = false;
    this.editorDeshabilitado = true;
    this.codigo = "Demo";
  }

  onReady() {
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


export default Ember.Component.extend({

  didInsertElement() {
    this.set('model', new ModoCargando());
  },

  actions: {
    cuandoCambiaElCodigo(codigo) {
      console.log(codigo);
    },

    cuandoCargaPilas(/*pilas*/) {
      this.set('model', this.get('model').onReady());
    },

    cuandoCargaMonacoEditor() {
      // TODO: debería funcionar conjuntamente con el método onReady de
      //       pilas. Así el editor se logra mantener en ModoCargando mientras
      //       dure la carga del editor y pilas conjuntamente.
    },

    ejecutar() {
      this.set('model', this.get('model').ejecutar());
    },

    detener() {
      this.set('model', this.get('model').detener());
    },
  }
});
