/// <reference path="../_references.ts" />

class SistemaHabilidades extends Sistema {
  mapa_de_habilidades: any;

  iniciar() {
    this.requisitos = ['habilidades'];
    this.mapa_de_habilidades = {};

    this.pilas.eventos.cuando_vincula_habilidad.conectar((datos) => {
      this._cuando_vincula_habilidad(datos);
    });
  }

  private _cuando_vincula_habilidad(datos) {
    this.mapa_de_habilidades[datos.nombre] = datos.objeto;
  }

  procesar(entidades: Entidades) {
    let entidades_filtradas = entidades.obtener_entidades_con(this.requisitos);

    entidades_filtradas.map((entidad) => {
      let habilidades_de_la_entidad = entidad.componentes.habilidades.habilidades;
      let actor = this.pilas.crear_actor_desde_entidad(entidad.id);

      habilidades_de_la_entidad.forEach((nombre_de_la_habilidad) => {
        let habilidad_del_mapa = this.mapa_de_habilidades[nombre_de_la_habilidad];

        habilidad_del_mapa.actor = actor;

        if (habilidad_del_mapa.actualizar) {
          habilidad_del_mapa.actualizar(actor);
        }

        this.pilas.eventos._eventos.map((evento) => {
          this._procesar_evento_sobre_habilidad(evento, habilidad_del_mapa, actor);
        });

      });

    });

  }

  /**
   * Procesará un evento pendiente de manejo.
   *
   */
  _procesar_evento_sobre_habilidad(evento, habilidad, actor) {
    let manejador_de_evento = habilidad[evento.tipo];

    if (manejador_de_evento) {
      manejador_de_evento.call({actor}, evento);
    }

  }
}
