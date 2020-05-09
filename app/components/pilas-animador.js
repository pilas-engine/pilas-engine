import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { observer } from "@ember/object";
import { run } from "@ember/runloop";

const NOMBRE_DE_LA_ESCENA = "demo";

export default Component.extend({
  animacion: null,
  contexto: null,
  pilas: null,
  pausado: true,
  mostrarModalDeImagenes: false,
  nombre_del_contexto: "pilas-en-el-animador",
  filtro: "",
  iniciando: true,
  recursos: service(),
  servicioProyecto: service("proyecto"),
  lista_visible: true,

  bus: service(),
  compilador: service(),
  cuadro_actual: 0,
  tagName: "",

  init() {
    this._super(...arguments);

    /*
    this.set("animacion", {
      nombre: "caminar",
      cuadros: [
        {
          nombre: "imagenes:conejo/conejo_camina1",
          sprite: "conejo-conejo_camina1"
        },
        {
          nombre: "imagenes:aliens/alien_verde",
          sprite: "aliens-alien_verde"
        },
        {
          nombre: "imagenes:aliens/alien_azul",
          sprite: "aliens-alien_azul"
        }
      ],
      velocidad: 15
    });
    */

    this.crear_proyecto();
  },

  didInsertElement() {
    this.bus.on(`${this.nombre_del_contexto}:cuando_cambia_cuadro_de_animacion`, this, "cuando_cambia_cuadro");
  },

  didDestroyElement() {
    this.bus.off(`${this.nombre_del_contexto}:cuando_cambia_cuadro_de_animacion`, this, "cuando_cambia_cuadro");
  },

  tiene_mas_de_un_cuadro: computed("animacion.cuadros.length", function() {
    return this.animacion.cuadros.length > 1;
  }),

  cuando_cambia_cuadro(pilas, datos) {
    this.set("cuadro_actual", datos.cuadro);
  },

  cargar_animacion_en_el_canvas() {
    let r = Math.random();
    let actor = this.pilas.obtener_actor_por_nombre("aceituna");
    let nombres = this.animacion.cuadros.map(e => e.nombre);

    if (nombres.length === 0) {
      nombres = ["imagenes:basicos/invisible"];
    }

    actor.crear_animacion("demo" + r, nombres, this.animacion.velocidad);
    actor.animacion = "demo" + r;
    window.actor = actor;

    actor.transparencia = 0;
    this.send("pausar");
  },

  cuando_cambia_velocidad: observer("animacion.velocidad", function() {
    this.cargar_animacion_en_el_canvas();
  }),

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
        proyecto: "class Proyecto { iniciar() {} }",
        escenas: [
          {
            nombre: NOMBRE_DE_LA_ESCENA,
            codigo: `

              class ${NOMBRE_DE_LA_ESCENA} extends Escena {
                index: number = -1;

                iniciar() {
                  let actor = this.pilas.actores.aceituna();
                  this.actor = actor;
                  this.actor.transparencia = 100;

                  window.actor = actor;
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
    cuando_cambia_orden(orden) {
      this.set("lista_visible", false);
      let cuadros_originales = this.animacion.cuadros;
      let cuadros_ordenados = [];

      orden.map(indice => {
        cuadros_ordenados.pushObject(cuadros_originales[indice]);
      });

      this.set("animacion.cuadros", cuadros_ordenados);

      run.scheduleOnce("afterRender", this, () => {
        this.set("lista_visible", true);
      });

      this.cargar_animacion_en_el_canvas();
      this.set("cuadro_actual", 0);
    },
    cuando_termina_de_cargar(/*pilas, contexto*/) {
      this.crear_proyecto();
      let resultado = this.compilador.compilar_proyecto(this.proyecto);

      let datos = {
        nombre_de_la_escena_inicial: NOMBRE_DE_LA_ESCENA,
        codigo: resultado.codigo,
        permitir_modo_pausa: false,
        proyecto: resultado.proyecto_serializado
      };

      this.bus.trigger(`${this.nombre_del_contexto}:ejecutar_proyecto`, datos);
      this.bus.trigger(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, {});
    },

    cuando_termina_de_iniciar_ejecucion(pilas, contexto) {
      this.set("contexto", contexto);
      this.set("pilas", pilas);
      this.set("iniciando", false);
      this.cargar_animacion_en_el_canvas();
    },

    pausar() {
      let actor = this.pilas.obtener_actor_por_nombre("aceituna");
      this.pilas.animaciones.animaciones[actor.animacion].pause();
      this.set("pausado", true);
    },

    resumir() {
      let actor = this.pilas.obtener_actor_por_nombre("aceituna");
      this.pilas.animaciones.animaciones[actor.animacion].resume();
      this.set("pausado", false);

      // reinicia la animación del actor.
      actor.sprite.anims.restart();
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
      this.set("cuadro_actual", 0);
    },

    seleccionar_cuadro(indice) {
      this.send("pausar");
      let actor = this.pilas.obtener_actor_por_nombre("aceituna");
      var frame = actor.sprite.anims.currentAnim.getFrameAt(indice);

      if (frame.textureFrame) {
        actor.imagen = `${frame.textureKey}:${frame.textureFrame}`;
      } else {
        actor.imagen = frame.textureKey;
      }
      this.set("cuadro_actual", indice);
    }
  }
});
