import Component from "@ember/component";
import { inject as service } from "@ember/service";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Component.extend({
  bus: service(),
  compilador: service(),
  electron: service(),
  objeto: null,

  proyecto: null,

  didInsertElement() {
    this.set("instancia_seleccionada", { numero: 3 });

    this.set("proyecto", {
      titulo: "Proyecto demo",
      ancho: 480,
      alto: 480,
      codigos: {
        escenas: [
          {
            nombre: NOMBRE_DE_LA_ESCENA,
            codigo: `


            class ActorDePrueba extends Actor {

                contenedor: any;
                huesos: Huesos;

                iniciar() {
                  this.imagen = "imagenes:basicos/invisible";
                  this.contenedor = this.pilas.modo.add.container();
                  this.huesos = new Huesos(this.pilas, "protagonista", undefined, this.contenedor);
                  this.huesos.definir_animacion("idle");
                }

                actualizar() {
                  this.huesos.actualizar_animacion(20);
                }

                pre_actualizar() {
                  this.pilas.utilidades.sincronizar_contenedor(this.contenedor, this.sprite);
                }

            }


            class ${NOMBRE_DE_LA_ESCENA} extends Escena {
              iniciar() {
                //let ceferino = this.pilas.actores.pizarra();
                this.pilas.actores.vincular('actor_de_prueba', ActorDePrueba);
                let actor = this.pilas.actores.actor_de_prueba();

                actor.transparencia = 50;

                /*
                actor.hacer("mover", {x: 100, y: 100, demora: 1});
                actor.hacer("mover", {x: 0, y: 0, demora: 1});

                for (i=0; i<50; i++) {
                  actor.hacer("aparecer", {velocidad: 10});
                  actor.hacer("desaparecer", {velocidad: 10});
                }
                */

                //actor.hacer("aparecer", {velocidad: 1});
                //actor.hacer("eliminar");

                this.actor = actor;
              }

              actualizar() {
                this.pilas.observar("posicion", "1")
                this.pilas.observar("transparencia", this.actor.transparencia);
              }

            }


            `
          }
        ],
        actores: []
      },
      escenas: [
        {
          nombre: NOMBRE_DE_LA_ESCENA,
          id: 1,
          camara_x: 0,
          camara_y: 0,
          fondo: "imagenes:fondos/fondo-plano",
          actores: []
        }
      ]
    });
  },

  actions: {
    cuando_termina_de_cargar() {
      let resultado = this.compilador.compilar_proyecto(this.proyecto);

      let datos = {
        nombre_de_la_escena_inicial: NOMBRE_DE_LA_ESCENA,
        codigo: resultado.codigo,
        permitir_modo_pausa: false,
        proyecto: resultado.proyecto_serializado
      };

      this.bus.trigger("ejecutar_proyecto", datos);
      this.bus.trigger("hacer_foco_en_pilas", {});
    }
  }
});
