import { inject as service } from "@ember/service";
import Controller from "@ember/controller";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Controller.extend({
  bus: service(),
  compilador: service(),
  electron: service(),

  proyecto: null,

  iniciar() {
    this.set("instancia_seleccionada", { numero: 3 });
    this.set("propiedad", { propiedad: "Un número" });

    this.set("proyecto", {
      titulo: "Proyecto demo",
      ancho: 480,
      alto: 480,
      codigos: {
        escenas: [
          {
            nombre: NOMBRE_DE_LA_ESCENA,
            codigo: `class ${NOMBRE_DE_LA_ESCENA} extends Escena {
              iniciar() {

                //this.crear_nave_simulada();
              }

              crear_nave_simulada() {
                this.pilas.actores.nave();

                this.pilas.control.simular_pulsacion('arriba', true);

                this.pilas.luego(0.5, () => {
                  this.pilas.control.simular_pulsacion('arriba', false);
                  this.pilas.control.simular_pulsacion('izquierda', true);
                });

                this.pilas.luego(1, () => {
                  this.pilas.control.simular_pulsacion('izquierda', false);
                  this.pilas.control.simular_pulsacion('espacio', true);
                });

                this.pilas.luego(1.1, () => {
                  this.pilas.control.simular_pulsacion('espacio', false);
                });

              }

              actualizar() {
                this.pilas.observar("cursor_x", this.pilas.cursor_x);
                this.pilas.observar("cursor_y", this.pilas.cursor_y);
                this.pilas.observar("¿pulsa la tecla arriba?", this.pilas.control.arriba);
              }
            }`
          },
          {
            nombre: "gameover",
            codigo: `class gameover extends Escena {
              iniciar() {
                console.log("escena gameover")
              }

              actualizar() {
              }
            }`
          }
        ],
        actores: [
          {
            nombre: "texto",
            codigo: `class texto extends Actor {
  propiedades = {
    imagen: "invisible",
    texto: "Hola mundo",
    es_texto: true
  };

  _texto: any = null;

  iniciar() {}

  actualizar() {}
}`
          },

          {
            nombre: "aceituna",
            codigo: `class aceituna extends Actor {
  propiedades = {
    imagen: "invisible.png",
    texto: "Hola mundo",
    es_texto: true
  };

  _texto: any = null;

  iniciar() {
    this.x = -100;
    this.y = 70;
  }

  actualizar() {
    this.x += 0.1;
    this.pilas.observar("mi actor", this)
    this.pilas.observar("rotación", this.rotacion)
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
          fondo: "imagenes:fondo-plano.png",
          actores: [
            {
              id: 4,
              x: 100,
              y: -100,
              centro_x: 0.5,
              centro_y: 0.5,
              rotacion: 45,
              escala_x: 1,
              escala_y: 1,
              tipo: "aceituna",
              nombre: "aceituna",
              imagen: "imagenes:aceituna.png",
              transparencia: 0,
              figura: "", // "circulo"
              figura_radio: 25,
              texto: "",
              es_texto: false,
              figura_dinamica: true
            }
          ]
        },
        {
          nombre: "gameover",
          id: 2,
          camara_x: 0,
          camara_y: 0,
          fondo: "nubes",
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
              tipo: "aceituna",
              nombre: "aceituna",
              imagen: "aceituna",
              transparencia: 0,
              figura: "",
              figura_radio: 25,
              texto: "",
              es_texto: false,
              figura_dinamica: true
            }
          ]
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

    /*
    abrir_proyecto() {
      this.electron.abrir_proyecto().then(ruta => {
        let electron = this.electron;
        try {
          let proyecto = electron.abrir_proyecto_desde_archivo(ruta);

          this.set("ocultar_canvas", true);

          later(() => {
            this.set("proyecto", proyecto);
            this.set("ocultar_canvas", false);
          }, 10);
        } catch (err) {
          console.error(err);
          alert("Error, el archivo está mal formateado: " + err.name);
        }
      });
    },

    guardar_proyecto() {
      this.electron.guardar_proyecto().then(ruta => {
        let proyecto = this.proyecto;
        let electron = this.electron;

        electron.guardar_proyecto_en_archivo(proyecto, ruta);
      });
    }
    */
  }
});
