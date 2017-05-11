import Ember from 'ember';

export default Ember.Service.extend({

  iniciar() {
    let idCanvas = 'canvas';
    let elemento = document.getElementById(idCanvas);
    let pilas = pilasengine.iniciar(elemento);


    pilas.eventos.cuando_carga.conectar(() => {
      pilas.definir_cuadros_por_segundo(60, 10);

      let id = pilas.crear_entidad('MiActor');
      let x = pilas.azar(-100, 100);
      let y = pilas.azar(-100, 100);

      pilas.agregar_componente(id, 'posicion', {x, y});
      pilas.agregar_componente(id, 'apariencia', {imagen: 'ember'});

      console.log({x, y});

    });

    window['pilas'] = pilas;
  }
});
