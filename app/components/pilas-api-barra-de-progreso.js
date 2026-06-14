import Component from '@ember/component';
import { inject as service } from "@ember/service";
import { computed } from '@ember/object';

export default Component.extend({
  api: service(),

  debe_mostrar: computed('progreso', function() {
    return this.get("progreso") > 0;
  }),

  progreso: computed(
    'api.{ultimo_proyecto_cargando,tamano_ultimo_proyecto,bytes_cargados_del_ultimo_proyecto}', 
    function() {
      let total = this.get("api.tamano_ultimo_proyecto");
      let cargado = this.get("api.bytes_cargados_del_ultimo_proyecto");

      if (total !== 0) {
        return Math.min((cargado / total) * 100, 100);
      }

      return 0;
  }),

  tamano_total: computed('api.{ultimo_proyecto_cargando,tamano_ultimo_proyecto}', function() {
    let t = this.get("api.tamano_ultimo_proyecto");

    if (t < 1024) {
      let s = parseInt(t, 10);
      return `${s} bytes`;
    }

    if (t < 1024*1024) {
      let s = parseInt(t / (1024*1024), 10);
      return `${s} KB`;
    }

    let s = parseInt(t / (1024*1024), 10);

    return `${s} MB`;
  }),


});
