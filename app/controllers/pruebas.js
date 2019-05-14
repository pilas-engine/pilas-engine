import { inject as service } from "@ember/service";
import Controller from "@ember/controller";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Controller.extend({
  bus: service(),
  compilador: service(),
  electron: service(),

  proyecto: null,

  iniciar() {
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

                /*
                pilas.luego(3, (e) => {
                  pilas.cambiar_escena('gameover');
                });
                */

                this.pilas.actores.conejo();

                let p = this.pilas.actores.plataforma();
                p.y = -200;

                //let a = this.pilas.actores.nave();

                //console.log(this.pilas.listar_imagenes())

                /*
                this.pilas.actores.pelota();
                this.pilas.actores.nave();

                let plataforma = this.pilas.actores.plataforma();
                plataforma.y = -200;
                plataforma.aprender("arrastrable");
                */

                /*

                this.pilas.actores.deslizador();

                let actor = this.pilas.actores.texto();
                actor.texto = "demo texto\\nsuper\\nsuper\\nsuper \\nsuper largo en varias lineas";
                actor.color = "negro";
                actor.magnitud = 16;
                actor.x = 130;
                actor.y = 130;
                actor.fondo = "dialogo";
                actor.fondo = "gris";
                actor.z = 2;

                actor.escala_y = 0
                actor.escala_y = [1]

                window.actor = actor;

                this.pilas.obtener_actor_por_nombre("aceituna").decir("¿hola?\\n¿cómo estás?");


                actor.aprender("arrastrable");

                console.log(actor.ancho)

                window.actor = actor;
                */


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
    imagen: "invisible.png",
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
