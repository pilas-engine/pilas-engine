import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { later } from "@ember/runloop";
import { computed } from "@ember/object";
import { observer } from "@ember/object";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Component.extend({
  animacion: null,
  contexto: null,
  pilas: null,
  pausado: false,
  mostrarModalDeImagenes: false,
  filtro: "",

  bus: service(),
  compilador: service(),

  init() {
    this._super(...arguments);

    this.set("animacion", {
      nombre: "caminar",
      cuadros: [
        {
          nombre: "imagenes:conejo/conejo_camina1",
          sprite: "conejo-conejo_camina1"
        },
        {
          nombre: "imagenes:conejo/conejo_camina2",
          sprite: "conejo-conejo_camina2"
        }
      ],
      velocidad: 6
    });

    this.crear_proyecto();
  },

  tiene_mas_de_un_cuadro: computed("animacion.cuadros.length", function() {
    return this.animacion.cuadros.length > 1;
  }),

  cargar_animacion_en_el_canvas() {
    let r = Math.random();
    let actor = this.pilas.obtener_actor_por_nombre("aceituna");
    let nombres = this.animacion.cuadros.map(e => e.nombre);
    actor.crear_animacion("demo" + r, nombres, this.animacion.velocidad);
    actor.animacion = "demo" + r;
    window.actor = actor;
    this.set("pausado", false);
  },

  cuando_cambia_velocidad: observer("animacion.velocidad", function() {
    this.cargar_animacion_en_el_canvas();
  }),

  crear_proyecto() {
    this.set("proyecto", {
      titulo: "Proyecto demo",
      ancho: 480,
      alto: 480,
      imagenes: [],
      codigos: {
        escenas: [
          {
            nombre: NOMBRE_DE_LA_ESCENA,
            codigo: `

              class ${NOMBRE_DE_LA_ESCENA} extends Escena {
                iniciar() {
                  let actor = this.pilas.actores.aceituna();
                  this.actor = actor;

                  window.actor = actor;
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
          fondo: "imagenes:fondos/fondo-plano",
          actores: []
        }
      ]
    });
  },

  actions: {
    cuando_termina_de_cargar(pilas, contexto) {
      let mensaje = "listo";
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

    cuando_termina_de_iniciar_ejecucion(pilas, contexto) {
      this.set("contexto", contexto);
      this.set("pilas", pilas);
      this.cargar_animacion_en_el_canvas();
    },

    pausar() {
      let actor = this.pilas.obtener_actor_por_nombre("aceituna");
      this.pilas.animaciones.animaciones[actor.id + "-" + actor.animacion].pause();
      this.set("pausado", true);
    },

    resumir() {
      let actor = this.pilas.obtener_actor_por_nombre("aceituna");
      this.pilas.animaciones.animaciones[actor.id + "-" + actor.animacion].resume();
      this.set("pausado", false);
    },

    ocultar() {
      this.set("mostrarModalDeImagenes", false);
    },

    cuando_selecciona_imagen_en_el_modal(imagen) {
      this.animacion.cuadros.pushObject(imagen);
      this.cargar_animacion_en_el_canvas();
      this.send("ocultar");
    },

    abrir_modal_para_agregar_imagen() {
      this.set("mostrarModalDeImagenes", true);
    },

    eliminar_cuadro(cuadro) {
      let indice = this.animacion.cuadros.indexOf(cuadro);
      this.animacion.cuadros.removeAt(indice);
      this.cargar_animacion_en_el_canvas();
    }
  }
});
