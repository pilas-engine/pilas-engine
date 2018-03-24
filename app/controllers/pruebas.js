import { inject as service } from "@ember/service";
import Controller from "@ember/controller";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Controller.extend({
  bus: service(),
  compilador: service(),

  proyecto: null,

  iniciar() {
    this.set("proyecto", {
      titulo: "Proyecto demo",
      ancho: 640,
      alto: 480,
      codigos: {
        escenas: [
          {
            nombre: NOMBRE_DE_LA_ESCENA,
            codigo: `class ${NOMBRE_DE_LA_ESCENA} extends Escena {
              iniciar() {
                this.pilas.conejo = pilas.actores.Conejo();
                this.pilas.conejo = pilas.actores.suelo());
                this.pilas.conejo = pilas.actores.techo();
                let pared_izquierda = pilas.actores.pared();
                let pared_derecha = pilas.actores.pared();

                pared_izquierda.x = -300;
                pared_derecha.x = 300;
              }

              actualizar() {

              }
            }`
          }
        ],
        actores: [
          {
            tipo: "Pelota",
            codigo: `class Pelota  extends ActorBase {
            propiedades = {
              figura: 'rectangulo',
              transparencia: 50
            }

            iniciar() {
            }

            actualizar() {
            }
          }`
          }
        ]
      },
      escenas: [
        {
          nombre: NOMBRE_DE_LA_ESCENA,
          id: 1,
          camara_x: 0,
          camara_y: 0,
          actores: [
            {
              id: 3,
              x: 100,
              y: -100,
              centro_x: 0.5,
              centro_y: 0.5,
              rotacion: 45,
              escala_x: 1,
              escala_y: 1,
              tipo: "Pelota",
              imagen: "pelota",
              transparencia: 0,
              figura: "circulo",
              figura_radio: 25,
              figura_dinamica: false
            }
          ]
        }
      ]
    });
  },

  actions: {
    cuando_termina_de_cargar() {
      let resultado = this.get("compilador").compilar_proyecto(this.get("proyecto"));

      let datos = {
        nombre_de_la_escena_inicial: NOMBRE_DE_LA_ESCENA,
        codigo: resultado.codigo,
        permitir_modo_pausa: false,
        proyecto: resultado.proyecto_serializado
      };

      this.get("bus").trigger("ejecutar_proyecto", datos);
      this.get("bus").trigger("hacer_foco_en_pilas", {});
    }
  }
});
