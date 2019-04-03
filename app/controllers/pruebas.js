import { inject as service } from "@ember/service";
import Controller from "@ember/controller";
import { later } from "@ember/runloop";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Controller.extend({
  bus: service(),
  compilador: service(),
  electron: service(),

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

                /*
                console.log("Se va a cambiar de escena");

                pilas.luego(3, (e) => {
                  console.log("Cambió la escena!");
                  pilas.cambiar_escena('gameover');
                });

                let l = pilas.actores.suelo();
                l.y = -230;
                */

                let a = pilas.actores.nave();

                a.aprender("rotar constantemente");
                a.aprender("rotar constantemente");
                a.aprender("arrastrable");


                /*

                let b = pilas.actores.texto()
                b.texto = "Has click sobre algún actor para ver que dicen";
                b.sombra = true;


                let texto = pilas.actores.texto()

                texto.y = 100
                texto.texto = "..."
                texto.color = "white"
                texto.magnitud = 30
                texto.x = [100]

                texto.escala = 0;
                texto.escala = [1]

                pilas.luego(3, (e) => {
                  texto.x = [-200];
                })

                pilas.luego(6, (e) => {
                  texto.eliminar();
                })

                let t = pilas.actores.aceituna();
                t.y=100;
                t.decir("hola mundo !!!");
                */

                /*

                let plataforma = pilas.actores.plataforma();
                plataforma.x = 0;
                plataforma.y = -100;

                let moneda = pilas.actores.moneda();
                moneda.x = 100;

                pilas.actores.nave();

                let suelo = pilas.actores.suelo());
                suelo.y = -250;

                let techo = pilas.actores.techo();
                techo.y = 250;

                let pared_izquierda = pilas.actores.pared();
                pared_izquierda.x = -300;

                let pared_derecha = pilas.actores.pared();
                pared_derecha.x = 300;
                */

              }

              actualizar() {
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
    imagen: "invisible",
    texto: "Hola mundo",
    es_texto: true
  };

  _texto: any = null;

  iniciar() {}

  actualizar() {}
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
          fondo: "plano",
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
              imagen: "aceituna",
              transparencia: 0,
              figura: "circulo",
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
    },

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
  }
});
