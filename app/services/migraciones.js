import Service from "@ember/service";

export default Service.extend({
  /**
   * Adapta el código del proyecto a esta versión asumiendo que se
   * pudo haber creado con una versión anterior de pilas. Este código
   * de migración o migraciones se ejecutará siempre que se abra
   * un proyecto.
   */
  migrar(proyecto) {
    // Migración 2020-03-19: hacer que las escenas tengan definida el area
    //                       del escenario.
    proyecto.get("escenas").forEach(escena => {
      if (!escena.get("ancho")) {
        escena.set("ancho", 1000);
        escena.set("alto", 1000);
      }
    });

    // Migracion 2020-03-29: hacer cambios de nombres de imágenes
    proyecto.get("escenas").forEach(escena => {
      escena.set("fondo", this.convertir_nombre_de_imagenes(escena.get("fondo")));

      escena.get("actores").forEach(actor => {
        actor.set("imagen", this.convertir_nombre_de_imagenes(actor.get("imagen")));

        // migracion 2020-04-18: los actores ahora tienen una lista de sensores.
        if (!actor.get("sensores")) {
          actor.set("sensores", []);
        }

        // miración 2020-04-12: hacer que los actores de texto tengan una fuente por omisión.
        if (actor.get("es_texto") && !actor.get("fuente")) {
          if (actor.get("fondo") === "imagenes:redimensionables/gris") {
            // caso particular, los botones tienen que tener una fuente de color negro.
            actor.set("fuente", "color-negro");
          } else {
            actor.set("fuente", "color-blanco-con-sombra");
          }
        }
      });
    });

    // migración 2020-04-12: hacer que el proyecto tenga almacenados los FPS
    if (!proyecto.get("fps")) {
      proyecto.set("fps", 60);
    }

    // Migracion 2020-05-08: Agrega el nombre de la escena inicial a ejecutar
    if (!proyecto.nombre_de_la_escena_inicial) {
      proyecto.set("nombre_de_la_escena_inicial", proyecto.escenas.firstObject.get("nombre"));
    }

    // Migracion 2020-05-08: Elimina el atributo escena_inicial en desuso.
    if (proyecto.escena_inicial) {
      proyecto.set("escena_inicial", undefined);
    }

    // Migracion 2020-05-08: si el proyecto no tiene código se lo agrega.
    if (!proyecto.codigos.proyecto) {
      proyecto.codigos.proyecto = `class Proyecto {
        iniciar() {

        }
      }`;
    }

    // Migracion 2020-05-08: si el proyecto no tiene tamaño lo agrega.
    if (!proyecto.tamaño) {
      proyecto.set("tamaño", `${proyecto.ancho}x${proyecto.alto}`);
    }

    // Migracion 2020-05-09: Corrige el nombre de la escena.
    let escena_encontrada = proyecto.escenas.filterBy("nombre", proyecto.nombre_de_la_escena_inicial);

    if (escena_encontrada.length === 0) {
      proyecto.set("nombre_de_la_escena_inicial", proyecto.escenas.firstObject.get("nombre"));
    }

    return proyecto;
  },

  convertir_nombre_de_imagenes(imagen) {
    let reemplazos = [
      {
        origen: "imagenes:fondos/",
        destino: "decoracion:fondos/"
      },
      {
        origen: "imagenes:decoracion/",
        destino: "decoracion:objetos/"
      }
    ];

    for (let i = 0; i < reemplazos.length; i++) {
      let item = reemplazos[i];

      if (imagen.includes(item.origen)) {
        return imagen.replace(item.origen, item.destino);
      }
    }

    return imagen;
  }
});
