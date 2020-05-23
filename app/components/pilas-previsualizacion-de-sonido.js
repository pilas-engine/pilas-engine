import Component from "@ember/component";
import { observer } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  nombre_del_contexto: "pilas-previsualizacion-de-sonido",
  servicioProyecto: service("proyecto"),
  compilador: service(),
  bus: service(),
  pixelart: false,
  tagName: "",

  cuandoCambiaElSonido: observer("sonido", "id", function() {
    if (!this.iniciando) {
      this.reproducir_el_sonido_actual();
    }
  }),

  init() {
    this._super(...arguments);
    this.crear_proyecto();
  },

  didInsertElement() {
    this.bus.on(`${this.nombre_del_contexto}:termina_de_reproducir_sonido`, this, "atender_fin_de_reproduccion_de_sonido");
  },

  willDestroyElement() {
    this.bus.off(`${this.nombre_del_contexto}:termina_de_reproducir_sonido`, this, "atender_fin_de_reproduccion_de_sonido");
  },

  atender_fin_de_reproduccion_de_sonido(datos) {
    this.cuando_termina_de_reproducir(datos.sonido);
  },

  crear_proyecto() {
    let imagenes_heredadas = [];

    if (this.servicioProyecto.proyecto) {
      imagenes_heredadas = this.servicioProyecto.proyecto.imagenes;
    }

    this.set("proyecto", {
      titulo: "Proyecto demo",
      ancho: 50,
      alto: 50,
      imagenes: imagenes_heredadas,
      codigos: {
        proyecto: "class Proyecto { iniciar () {} }",
        escenas: [
          {
            nombre: "EscenaDeSonidos",
            codigo: `

              class EscenaDeSonidos extends Escena {
                index: number = -1;

                iniciar() {
                  let actor = this.pilas.actores.aceituna();
                  this.actor = actor;
                  this.actor.transparencia = 100;
                }

                actualizar() {
                }

              }


              `
          }
        ],
        actores: []
      },
      escenas: [
        {
          nombre: "EscenaDeSonidos",
          id: 1,
          camara_x: 0,
          camara_y: 0,
          fondo: "decoracion:fondos/fondo-plano",
          actores: []
        }
      ]
    });
  },

  reproducir_el_sonido_actual() {
    let actor = this.pilas.obtener_actor_por_nombre("aceituna");
    let sonido = this.sonido;

    actor.pilas.reproducir_sonido(sonido.nombre);
    actor.transparencia = 0;
    actor.transparencia = [100];

    this.bus.trigger(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, {});
  },

  actions: {
    cuando_termina_de_cargar(/*pilas, contexto*/) {
      this.crear_proyecto();
      let resultado = this.compilador.compilar_proyecto(this.proyecto);

      let datos = {
        nombre_de_la_escena_inicial: "EscenaDeSonidos",
        codigo: resultado.codigo,
        permitir_modo_pausa: false,
        proyecto: resultado.proyecto_serializado
      };

      this.bus.trigger(`${this.nombre_del_contexto}:ejecutar_proyecto`, datos);
      this.bus.trigger(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, {});
    },

    cuando_termina_de_iniciar_ejecucion(pilas /*, contexto*/) {
      this.set("pilas", pilas);
      this.set("iniciando", false);
    }
  }
});
