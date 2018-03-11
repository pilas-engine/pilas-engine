import Ember from "ember";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Ember.Controller.extend({
  bus: Ember.inject.service(),
  compilador: Ember.inject.service(),

  proyecto: {
    titulo: "Proyecto demo",
    ancho: 640,
    alto: 480,
    codigos: {
      escenas: [
        {
          nombre: NOMBRE_DE_LA_ESCENA,
          codigo: `class ${NOMBRE_DE_LA_ESCENA} extends Escena {
              iniciar() {
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

            iniciar() {
              this.crear_figura_rectangular();
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
            id: 2,
            x: 100,
            y: 100,
            centro_x: 0.5,
            centro_y: 0.5,
            rotacion: 45,
            escala_x: 1,
            escala_y: 1,
            tipo: "Pelota",
            imagen: "pelota",
            transparencia: 0
          }
        ]
      }
    ]
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
