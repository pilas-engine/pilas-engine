import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Route.extend({
  proyecto: service(),

  afterModel() {
    later(
      () => {
        this.proyecto.eliminar_proyectos_guardados();
        this.transitionTo("editor");
      },
      1
    );
  }

});
