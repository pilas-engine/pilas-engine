import Component from "@ember/component";
import { observer } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  nombre_del_contexto: "pilas-previsualizacion-de-animacion",
  servicioProyecto: service("proyecto"),
  compilador: service(),
  bus: service(),
  pixelart: false,
  tagName: "",

  cuandoCambiaLaAnimación: observer("animación.cuadros.[]", "animación.velocidad", "animación.nombre", function() {
    if (!this.iniciando) {
      this.mostrar_animación_seleccionada();
    }
  }),

  init() {
    this._super(...arguments);
    this.crear_proyecto();
  },

  crear_proyecto() {
    let imagenes_heredadas = [];

    if (this.servicioProyecto.proyecto) {
      imagenes_heredadas = this.servicioProyecto.proyecto.imagenes;
    }

    this.set("proyecto", {
      titulo: "Proyecto demo",
      ancho: 350,
      alto: 350,
      imagenes: imagenes_heredadas,
      codigos: {
        proyecto: "class Proyecto { iniciar () {} }",
        escenas: [
          {
            nombre: "EscenaDemoDeAnimacion",
            codigo: `

              class EscenaDemoDeAnimacion extends Escena {
                index: number = -1;

                iniciar() {
                  let actor = this.pilas.actores.aceituna();
                  this.actor = actor;
                  this.actor.transparencia = 100;
                }

                actualizar() {
                  if (this.actor.sprite.anims.currentFrame) {
                    let cuadro_actual = this.actor.sprite.anims.currentFrame.index -1;

                    if (this.index != cuadro_actual)  {
                      this.index = cuadro_actual;
                      this.pilas.mensajes.emitir_mensaje_al_editor("cambia_cuadro_de_animacion", {cuadro: cuadro_actual});
                    }
                  }
                }

              }


              `
          }
        ],
        actores: []
      },
      escenas: [
        {
          nombre: "EscenaDemoDeAnimacion",
          id: 1,
          camara_x: 0,
          camara_y: 0,
          fondo: "decoracion:fondos/fondo-plano",
          actores: []
        }
      ]
    });
  },

  mostrar_animación_seleccionada() {
    let r = Math.random();
    let actor = this.pilas.obtener_actor_por_nombre("aceituna");
    let nombres = this.animación.cuadros.map(e => e.nombre);

    if (nombres.length === 0) {
      nombres = ["imagenes:basicos/invisible"];
    }

    actor.crear_animacion("demo" + r, nombres, this.animación.velocidad);
    actor.animacion = "demo" + r;
    window.actor = actor;

    actor.transparencia = 0;
  },

  actions: {
    cuando_termina_de_cargar(/*pilas, contexto*/) {
      this.crear_proyecto();
      let resultado = this.compilador.compilar_proyecto(this.proyecto);

      let datos = {
        nombre_de_la_escena_inicial: "EscenaDemoDeAnimacion",
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
      this.mostrar_animación_seleccionada();
    }
  }
});
