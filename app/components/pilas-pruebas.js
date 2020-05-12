import Component from "@ember/component";
import { inject as service } from "@ember/service";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Component.extend({
  bus: service(),
  compilador: service(),
  electron: service(),
  recursos: service(),
  objeto: null,

  proyecto: null,
  demoraSuperada: false,

  didInsertElement() {
    this.set("instancia_seleccionada", { numero: 3 });

    this.set("proyecto", {
      titulo: "Proyecto demo",
      ancho: 480,
      alto: 480,
      imagenes: [
        {
          nombre: "link",
          contenido:
            "data:image/png;base64,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"
        }
      ],
      codigos: {
        proyecto: `
        class Proyecto {
          iniciar() {
          }

        }`,
        escenas: [
          {
            nombre: NOMBRE_DE_LA_ESCENA,
            codigo: `

            class ${NOMBRE_DE_LA_ESCENA} extends Escena {
              iniciar() {
                let actor = this.pilas.actores.aceituna();
                this.actor = actor;
                this.actor.aprender("moverse con el teclado");

                actor.decir("Texto largo")


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
          nombre: NOMBRE_DE_LA_ESCENA,
          id: 1,
          camara_x: 0,
          camara_y: 0,
          fondo: "decoracion:fondos/fondo-plano",
          actores: []
        }
      ]
    });
  },

  actions: {
    cuando_termina_de_cargar(/*pilas, contexto*/) {
      let resultado = this.compilador.compilar_proyecto(this.proyecto);

      let datos = {
        nombre_de_la_escena_inicial: NOMBRE_DE_LA_ESCENA,
        contexto: "prueba",
        codigo: resultado.codigo,
        permitir_modo_pausa: false,
        proyecto: resultado.proyecto_serializado
      };

      this.bus.trigger("pruebas:ejecutar_proyecto", datos);
      this.bus.trigger("pruebas:hacer_foco_en_pilas", {});
    }
  }
});
