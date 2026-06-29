import Service from "@ember/service";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import copiar from "../utils/copiar";

const LIMITE = 10;

export default Service.extend({
  ultima_accion: "",
  ultima_llamada: null,
  bus: service(),
  proyecto: service(),

  iniciar() {
    this.set("historial", []);
    this.set("pila_de_rehacer", []);
    window.memento = this;

    this.set("ultima_llamada", new Date());
  },

  pasos: computed("historial.length", function() {
    return this.get("historial.length");
  }),

  puede_deshacer: computed("pasos", function() {
    return this.pasos > 0;
  }),

  puede_rehacer: computed("pila_de_rehacer.length", function() {
    return this.get("pila_de_rehacer.length") > 0;
  }),

  accion(nombre, datos) {
    if (this.pasos >= LIMITE) {
      this.historial.removeAt(0);
    }

    this.historial.pushObject({ nombre, datos });
    this.set("pila_de_rehacer", []);
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

    if (!paso) {
      return;
    }

    if (this.historial.lastObject) {
      this.registrar_ultima_accion(this.historial.lastObject.nombre);
    } else {
      this.set("ultima_accion", "");
    }

    let paso_para_rehacer = this.crear_paso_inverso(paso, editor);
    this.pila_de_rehacer.pushObject(paso_para_rehacer);
    this.aplicar_paso_de_memento(paso, editor);
  },

  rehacer(editor) {
    let paso = this.pila_de_rehacer.popObject();

    if (!paso) {
      return;
    }

    let paso_para_deshacer = this.crear_paso_inverso(paso, editor);
    this.historial.pushObject(paso_para_deshacer);
    this.registrar_ultima_accion(paso.nombre);
    this.aplicar_paso_de_memento(paso, editor);
  },

  crear_paso_inverso(paso, editor) {
    let escena;
    let actor;

    switch (paso.nombre) {
      case "mueve_actor":
        escena = editor.obtener_la_escena_actual();
        actor = escena.actores.findBy("id", paso.datos.id);
        return { nombre: "mueve_actor", datos: { id: paso.datos.id, x: actor.x, y: actor.y } };

      case "agrega_actor": {
        escena = editor.obtener_la_escena_actual();
        actor = escena.actores.findBy("id", paso.datos.id);
        let codigo = editor.proyecto.codigos.actores.findBy("nombre", actor.nombre);
        return { nombre: "elimina_actor", datos: { actor: { nombre: actor.nombre, codigo: copiar(codigo.codigo), imagen: actor.imagen, propiedades: copiar(actor) }, id: paso.datos.id } };
      }

      case "elimina_actor":
        return { nombre: "agrega_actor", datos: { id: paso.datos.id } };

      case "propiedad_de_actor":
        escena = editor.obtener_la_escena_actual();
        actor = escena.actores.findBy("id", paso.datos.id);
        return { nombre: "propiedad_de_actor", datos: { id: paso.datos.id, propiedad: paso.datos.propiedad, valor: actor.get(paso.datos.propiedad) } };

      case "cambia_actor_de_escena":
        return { nombre: "cambia_actor_de_escena", datos: { id: paso.datos.id, escena_anterior: paso.datos.escena_nueva, escena_nueva: paso.datos.escena_anterior } };

      case "cambia_actor_de_carpeta":
        return { nombre: "cambia_actor_de_carpeta", datos: { id: paso.datos.id, carpeta_anterior: paso.datos.carpeta_nueva, carpeta_nueva: paso.datos.carpeta_anterior } };

      default:
        throw Error(`Caso no contemplado para crear_paso_inverso: ${paso.nombre}`);
    }
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

      case "cambia_actor_de_escena": {
        let actor_id = paso.datos.id;
        let escena_anterior = paso.datos.escena_anterior;
        let escena_nueva = paso.datos.escena_nueva;

        this.proyecto.agregar_actor_a_la_escena(actor_id, escena_nueva, escena_anterior, true);
        break;
      }

      case "cambia_actor_de_carpeta": {
        let actor_id = paso.datos.id;
        let carpeta_anterior = paso.datos.carpeta_anterior;

        this.proyecto.agregar_actor_a_la_carpeta(actor_id, carpeta_anterior, true);
        break;
      }

      default:
        throw Error(`Caso no contemplado ${paso.nombre}`);
    }
  },

  limpiar() {
    this.set("historial", []);
    this.set("pila_de_rehacer", []);
  },

  registrar_ultima_accion(nombre) {
    this.set("ultima_accion", "acción " + nombre.replace(/_/g, " "));
  }
});
