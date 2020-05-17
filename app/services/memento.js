import Service from "@ember/service";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

const LIMITE = 10;

export default Service.extend({
  ultima_accion: "",
  ultima_llamada: null,
  bus: service(),

  iniciar() {
    this.set("historial", []);
    window.memento = this;

    this.set("ultima_llamada", new Date());
  },

  pasos: computed("historial.length", function() {
    return this.get("historial.length");
  }),

  puede_deshacer: computed("pasos", function() {
    return this.pasos > 0;
  }),

  accion(nombre, datos) {
    if (this.pasos >= LIMITE) {
      this.historial.removeAt(0);
    }

    this.historial.pushObject({ nombre, datos });
    this.registrar_ultima_accion(nombre);
  },

  // Similar al método "accion", pero previene que se ejecute muchas
  // veces repetidas.
  accion_repetida(nombre, datos) {
    let ahora = new Date();
    let segundos_a_esperar = 1;

    if (ahora - this.ultima_llamada > segundos_a_esperar * 1000) {
      this.accion(nombre, datos);
      this.set("ultima_llamada", ahora);
    }
  },

  deshacer(editor) {
    let paso = this.historial.popObject();

    if (this.historial.lastObject) {
      this.registrar_ultima_accion(this.historial.lastObject.nombre);
    } else {
      this.set("ultima_accion", "");
    }

    this.aplicar_paso_de_memento(paso, editor);
  },

  aplicar_paso_de_memento(paso, editor) {
    let escena = null;
    let actor = null;

    switch (paso.nombre) {
      case "mueve_actor":
        escena = editor.obtener_la_escena_actual();
        actor = escena.actores.findBy("id", paso.datos.id);
        actor.set("x", paso.datos.x);
        actor.set("y", paso.datos.y);

        this.bus.trigger(`${editor.nombre_del_contexto}:actualizar_actor_desde_el_editor`, {
          id: actor.id,
          actor: actor
        });
        break;

      case "agrega_actor":
        if (editor.obtenerDetalleDeActorPorIndice(paso.datos.id)) {
          editor.eliminar_actor(paso.datos.id, true);
        }
        break;

      case "elimina_actor":
        // caso particular, el id del actor que se eliminó se guarda dentro
        // de las propiedades del actor para que la función agregar actor conserve
        // ese id, ya que pueden haber otras acciones vinculadas a ese id en el historial
        // de memento.
        paso.datos.actor.id = paso.datos.id;
        editor.send("agregar_actor", editor.proyecto, paso.datos.actor, true);
        break;

      case "propiedad_de_actor":
        escena = editor.obtener_la_escena_actual();
        actor = escena.actores.findBy("id", paso.datos.id);

        actor.set(paso.datos.propiedad, paso.datos.valor);

        this.bus.trigger(`${editor.nombre_del_contexto}:actualizar_actor_desde_el_editor`, {
          id: paso.datos.id,
          actor: actor
        });
        break;

      default:
        throw Error(`Caso no contemplado ${paso.nombre}`);
    }
  },

  limpiar() {
    this.set("historial", []);
  },

  registrar_ultima_accion(nombre) {
    this.set("ultima_accion", "acción " + nombre.replace(/_/g, " "));
  }
});
