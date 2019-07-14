import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  mostrar: false,
  bus: service(),

  recetas_filtradas_por_tipo: computed("tipo_de_la_instancia_seleccionada", "recetas", function() {
    return this.recetas.filterBy("para", this.tipo_de_la_instancia_seleccionada).sortBy("titulo");
  }),

  es_proyecto: computed("tipo_de_la_instancia_seleccionada", function() {
    return this.tipo_de_la_instancia_seleccionada === "proyecto";
  }),

  didInsertElement() {
    this._super(...arguments);
    this.set("recetas", [
      {
        titulo: "Crear actores cada determinado tiempo en segundos",
        icono: "receta_tiempo",
        para: "escena",
        etiquetas: ["tiempo", "crear", "contar", "temporizado", "paso", "segundos"],
        codigo: `
          cada_segundo(segundos) {
              this.pilas.observar("Segundos transcurridos", segundos);

              // Crea un actor Caja cada 5 segundos.
              if (this.pilas.es_multiplo(segundos, 5)) {
                  this.pilas.actores.caja();
              }

              // Crea un actor Pelota cada 3 segundos.
              if (this.pilas.es_multiplo(segundos, 3)) {
                  this.pilas.actores.pelota()
              }
          }
      `
      },
      {
        titulo: "Detecta el paso del tiempo en segundos",
        icono: "receta_tiempo",
        para: "actor",
        etiquetas: ["tiempo", "crear", "contar", "temporizado", "paso", "segundos"],
        codigo: `
          cada_segundo(segundos) {
              this.decir("Pasaron " + segundos + " segundos")

              // cada 5 segundos cambia el mensaje
              if (this.pilas.es_multiplo(segundos, 5)) {
                  this.decir("Múltiplo de 5 !!!")
              }
          }
      `
      },

      {
        titulo: "Cuando colisiona emitir un mensaje y eliminar si es enemigo",
        icono: "receta_colision",
        para: "actor",
        etiquetas: ["colisión", "toca", "golpea"],
        codigo: `
          // Se invoca si entran en contacto dos actores con figuras dinámicas
          // o uno con figura dinámica y otro con figura no dinámica.
          cuando_comienza_una_colision(otro_actor: Actor) {

            this.decir("He colisionado con actor de etiqueta: " + otro_actor.etiqueta);

            if (otro_actor.etiqueta == "enemigo") {
              this.eliminar();
            }
          }
      `
      },
      {
        titulo: "Cuando colisiona eliminar al otro actor",
        icono: "receta_colision",
        para: "actor",
        etiquetas: ["colisión", "toca", "golpea"],
        codigo: `
          // Se invoca si entran en contacto dos actores con figuras dinámicas
          // o uno con figura dinámica y otro con figura no dinámica.
          cuando_comienza_una_colision(otro_actor: Actor) {
            otro_actor.eliminar();
          }
      `
      },
      {
        titulo: "Crear un actor en la posición en donde se hace click",
        icono: "receta_click",
        para: "escena",
        etiquetas: ["mouse", "cursor", "crear", "actor", "click"],
        codigo: `
          cuando_hace_click(x: number, y: number, evento) {
            let actor = this.pilas.actores.pelota();
            actor.x = x;
            actor.y = y;
        }
      `
      },
      {
        titulo: "Observar el movimiento del mouse o cursor",
        icono: "receta_mueve",
        para: "escena",
        etiquetas: ["mouse", "cursor", "mover", "observar"],
        codigo: `
        cuando_mueve(x: number, y: number, evento: any) {
          this.pilas.observar("Posición x", x);
          this.pilas.observar("Posición y", y);
        }
      `
      },

      {
        titulo: "Mover al actor hacia la izquierda y eliminar si sale de la pantalla",
        icono: "receta_mover_izquierda",
        para: "actor",
        etiquetas: ["mover"],
        codigo: `
        actualizar() {
          let velocidad = 5;
          this.x -= velocidad;

          if (this.x < -250) {
            this.eliminar();
          }
        }
      `
      },
      {
        titulo: "Controlar el movimiento del actor",
        icono: "receta_pad",
        para: "actor",
        etiquetas: ["mover"],
        codigo: `
      actualizar() {
        let velocidad = 5;

        if (this.pilas.control.izquierda) {
          this.x -= velocidad;
        }

        if (this.pilas.control.derecha) {
          this.x += velocidad;
        }

        if (this.pilas.control.arriba) {
          this.y += velocidad;
        }

        if (this.pilas.control.abajo) {
          this.y -= velocidad;
        }
      }
    `
      },
      {
        titulo: "Clonar cuando hacen click sobre este actor",
        icono: "receta_clonar",
        para: "actor",
        etiquetas: ["click", "clonar"],
        codigo: `
      cuando_hace_click(x: number, y: number, evento) {
        let clonacion = this.pilas.clonar(this.nombre);

        // Pone al actor clonado en una posición muy similar
        // a la del actor actual (del que se genera la clonación).
        clonacion.x = this.x + 5;
        clonacion.y = this.y;
      }
    `
      },
      {
        titulo: "Controlar al actor como si fuera un automóvil",
        icono: "receta_pad",
        para: "actor",
        etiquetas: ["mover", "control"],
        codigo: `
          actualizar() {
             let velocidad = 5;
             let velocidad_para_doblar = 5;

             if (this.pilas.control.arriba) {
                 this.avanzar(this.rotacion, velocidad)
             }

             if (this.pilas.control.izquierda) {
                 this.rotacion += velocidad_para_doblar;
             }

             if (this.pilas.control.derecha) {
                 this.rotacion -= velocidad_para_doblar;
             }
         }
      `
      },

      {
        titulo: "Saltar o impulsar cuando hacen click",
        icono: "receta_saltar",
        para: "actor",
        etiquetas: ["fisica", "impulsar", "saltar"],
        codigo: `
          cuando_hace_click(x: number, y: number, evento) {
            this.impulsar(0, 10);
          }
      `
      },
      {
        titulo: "Cambiar la posición del actor al azar cuando comienza",
        icono: "receta_azar",
        para: "actor",
        etiquetas: ["azar"],
        codigo: `
        iniciar() {
          this.x = this.pilas.azar(-200, 200);
          this.y = this.pilas.azar(-230, 230);
        }
    `
      },
      {
        titulo: "Crear 10 actores en posiciones al azar cuando comienza",
        icono: "receta_azar",
        para: "escena",
        etiquetas: ["azar", "crear"],
        codigo: `
        iniciar() {
          for (i=0; i<10; i++) {
            let actor: Actor = this.pilas.actores.aceituna();
            actor.x = this.pilas.azar(-200, 200);
            actor.y = this.pilas.azar(-230, 230);
          }
        }
    `
      },

      {
        titulo: "Reproducir sonido al comenzar",
        icono: "receta_sonido",
        para: "actor",
        etiquetas: ["sonido"],
        codigo: `
        iniciar() {
          this.pilas.reproducir_sonido("moneda");

          // Otras opciones:

          //this.pilas.reproducir_sonido("laser");
          //this.pilas.reproducir_sonido("salto-largo");
          //this.pilas.reproducir_sonido("salto-corto");
        }
    `
      }
    ]);
  },

  actions: {
    ocultar() {
      this.set("mostrar", false);
    },

    mostrar() {
      this.set("mostrar", true);
    },

    usar_receta(receta) {
      this.bus.trigger("usar_receta", receta);
      this.send("ocultar");
    }
  }
});
