import Service from "@ember/service";
import EmberObject from "@ember/object";
import { A } from "@ember/array";
import fixture_animaciones_iniciales from "../fixtures/animaciones-iniciales";
import fixture_sonidos_iniciales from "../fixtures/sonidos-iniciales";
import fixture_workspace_bloques_de_escena_nueva from "../fixtures/workspace-bloques-de-escena-nueva";

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

        // migracion 2020-10-05: los actores ahora tienen una lista de lasers.
        if (!actor.get("lasers")) {
          actor.set("lasers", []);
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

        if (!actor.get("identificador")) {
          console.log("🔥 El actor no tiene identificador, guardando en base 36");
          actor.set("identificador", parseInt(actor.get("id"), 10).toString(36));
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

    // migración 2020-05-28: hacer que el proyecto tenga guardado el modo de video.
    if (!proyecto.get("modo_de_video")) {
      proyecto.set("modo_de_video", "suavizado");
    }

    // migración 2020-06-02: agregando sonidos al proyecto para que se puedan editar.
    if (!proyecto.get("sonidos")) {
      proyecto.set("sonidos", fixture_sonidos_iniciales);
    }

    // migración 2021-03-20: hacer que el proyecto siempre tenga animaciones
    if (!proyecto.get("animaciones")) {
      proyecto.set("animaciones", fixture_animaciones_iniciales);
    }

    // migración 2021-01-31: hacer que el proyecto ahora almacene código de blockly
    if (!proyecto.bloques) {
      proyecto.set("bloques", EmberObject.create({}));
      proyecto.set("bloques.proyecto", `<xml xmlns="https://developers.google.com/blockly/xml"><block type="actor_inicia" id="ZC\`*TK^}PI+^~52^ak!H" x="35" y="44"></block></xml>`);
      proyecto.set(
        "bloques.escenas",
        A(
          proyecto.codigos.escenas.map(e => {
            return EmberObject.create({
              nombre: e.get("nombre"),
              bloques: fixture_workspace_bloques_de_escena_nueva,
            });
          })
        )
      );

      proyecto.set(
        "bloques.actores",
        A(
          proyecto.codigos.actores.map(e => {
            return EmberObject.create({
              nombre: e.get("nombre"),
              bloques: `<xml xmlns="https://developers.google.com/blockly/xml"><block type="actor_inicia" id="^BS9[_V!D30$Klp?G]Nt" x="-217" y="-205"></block><block type="actor_actualizar" id="D[i2{g4SjDY+sAT7f=W@" x="-212" y="-36"></block></xml>`
            });
          })
        )
      );
    }

    // migración 2021-10-22: Haciendo que se guarde el estado de plegado.
    if (!proyecto.get("plegados")) {
      proyecto.set("plegados", {});
    }

    // migración 2021-12-19: hacer que el proyecto tenga titulo
    if (!proyecto.get("titulo")) {
      proyecto.set("titulo", "Sin asignar");
    }

    // migración 2021-12-19: hacer que el proyecto tenga etiquetas
    if (!proyecto.get("etiquetas")) {
      proyecto.set("etiquetas", A([]));
    }


    // Migracion 2023-10-19: si no tiene datos de la cámara en el editor
    if (!proyecto.editor_camara_x) {
      proyecto.set("editor_camara_x", 0);
    }

    // Migracion 2023-10-19: si no tiene datos de la cámara en el editor
    if (!proyecto.editor_camara_y) {
      proyecto.set("editor_camara_y", 0);
    }

    // Migracion 2023-10-19: si no tiene datos de la cámara en el editor
    if (!proyecto.editor_camara_zoom) {
      proyecto.set("editor_camara_zoom", 1);
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
