import { observer } from "@ember/object";
import { inject as service } from "@ember/service";
import { later } from "@ember/runloop";
import { debounce } from "@ember/runloop";
import Component from "@ember/component";
import utils from "../utils/utils";

export default Component.extend({
  classNames: ["monaco-editor", "w-100", "flex1", "flex"],
  code: "",
  loading: true,
  readOnly: false,
  editor: null,
  bus: service(),
  linenumbers: true,
  modoVim: false,
  window: null,
  titulo: "",
  identificador: "",

  cuandoCargaElEditor(editor, monaco, window) {
    this.set("editor", editor);
    this.set("monaco", monaco);
    this.set("window", window);

    window.editor = editor;

    this.set("lineas_para_resaltar", []);
    this.set("decorations", []);

    if (this.code) {
      this.cargar_codigo();
    }

    this.editor.updateOptions({
      fontSize: this.tamano
    });

    if (this.modoVim) {
      this.window.activar_vim();
    }

    if (this.cuandoCarga) {
      this.cuandoCarga();
    }

    this.definirTema();

    this.editor._contributions["editor.contrib.folding"].foldingModel.onDidChange(e => {
      if (e.collapseStateChanged) {
        // Solo toma en cuenta este evento si el usuario
        // cambió el estado del plegado de código.
        //
        // Hago esta comprobación porque si no el evento
        // también se llama cuando cambia el modelo de código
        // del editor.

        let estado = this.editor.saveViewState(); 
        this.bus.trigger("cambia_folding_en_el_editor", {titulo: this.titulo, estado: estado});
      }
    });

    this.set("loading", false);
  },

  cuandoCambiaDeArchivo: observer("titulo", function() {
    this.cargar_codigo();
  }),

  cargar_codigo() {
    let editor = this.editor;

    if (editor) {
      let pos = editor.getPosition();
      editor.getModel().setValue(this.code);
      editor.setPosition(pos);

      // si hay estado de plegado del código intenta cargarlo. Este
      // atributo "plegado_del_codigo" se guarda dentro de pilas-editor.js
      if (this.plegado_del_codigo) {
        this.editor.restoreViewState(this.plegado_del_codigo); 
      }
    }
  },

  /**
   * Se ejecuta cuando llega la señal "codigo_ejecutado" con el mapa de archivos
   * y lineas ejecutadas.
   *
   * Este método se encarga de resaltar esas lineas para mostrarle al usuario cómo
   * se está ejecutando el código.
   */
  codigo_ejecutado(datos_de_instrumentacion) {
    let data = datos_de_instrumentacion.instrumentacion;

    this.limpiar_resaltado();

    // En data debería guardar el ID del actor que se instrumentó.
    if (this.identificador) {
      let id_actor_seleccionado = this.identificador;

      if (id_actor_seleccionado && data[id_actor_seleccionado]) {
        data[id_actor_seleccionado].map(linea => {
          this.resaltarLinea(linea);
        });
      }

      this.resaltarLineasEjecutadas();
    }
  },

  /*
   * Se encarga de mantener actualizado el estado del editor con respecto al
   * atributo readOnly.
   */
  sincronizarReadOnly: observer("readOnly", function() {
    if (this.editor) {
      this.editor.updateOptions({
        readOnly: this.readOnly
      });
    }
  }),

  sincronizarOscuro: observer("oscuro", function() {
    this.definirTema();
  }),

  definirTema() {
    var theme = "vs";

    if (this.oscuro) {
      theme = "vs-dark";
    }

    if (this.monaco) {
      this.monaco.editor.setTheme(theme);
    }
  },

  sincronizarModoVim: observer("modoVim", function() {
    if (this.window) {
      if (this.modoVim) {
        this.window.activar_vim();
      } else {
        this.window.desactivar_vim();
      }
    }
  }),

  sincronizarTamano: observer("tamano", function() {
    if (this.monaco) {
      this.editor.updateOptions({
        fontSize: this.tamano
      });
    }
  }),

  init() {
    this._super(...arguments);

    const subscription = event => {
      if (event.origin != utils.HOST && event.origin != utils.HOST.replace("http:", "https:")) {
        return;
      }

      if (event.source === this.frame && event.data && event.data.updatedCode) {
        if (this.onChange) {
          debounce(this, "analizarErrores", 1000);
          // esta llamada a onChange hace referencia al método 
          // "cuando_cambia_el_codigo" de "app/components/pilas-editor.js"
          this.onChange(event.data.updatedCode, this.titulo);
        }
      }

      if (event.source === this.frame && event.data && event.data.message) {

        if (event.data.message === "load-complete") {
          this.cuandoCargaElEditor(this.frame.editor, this.frame.monaco, this.frame.window);
        }

        if (event.data.message === "on-save") {
          this.bus.trigger("formatear_y_guardar");
        }

        if (event.data.message === "abrir-selector-de-codigos") {
          this.bus.trigger("abrir_selector_de_codigos");
        }
      }
    };


    this.set("_subscription", subscription);
    window.addEventListener("message", subscription);
  },

  analizarErrores() {
    let errores = this.frame.monaco.editor.getModelMarkers({});
    this.cuandoTerminaDeComprobarErrores(errores);
  },

  didInsertElement() {
    this.iniciarEditor();
  },

  getFrameById(id) {
    for (var i = 0; i < window.frames.length; i++) {
      try {
        if (window.frames[i].name === id) {
          return window.frames[i];
        }
      } catch (err) {
        console.error(err);
      }
    }
  },

  iniciarEditor() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    const frame = this.getFrameById(this.elementId);
    this.set("frame", frame);

    this.bus.on("hacerFocoEnElEditor", this, "hacerFoco");
    this.bus.on("usar_receta", this, "usar_receta");
    this.bus.on("codigo_ejecutado", this, "codigo_ejecutado");
    this.bus.on("regresa_al_modo_editor", this, "regresa_al_modo_editor");
    this.bus.on("formatear_y_guardar", this, "formatear_y_guardar");
    this.bus.on("formatear", this, "formatear");
  },

  resaltarLinea(linea) {
    this.lineas_para_resaltar.pushObject(linea);
  },

  formatear_y_guardar() {
    if (this.editor) {
      this.editor.getAction("editor.action.formatDocument").run();
    }

    later(() => {
      this.onSave(this.frame.editor);
    }, 100);
  },

  formatear() {
    if (this.editor) {
      this.editor.getAction("editor.action.formatDocument").run();
    }
  },

  resaltarLineasEjecutadas() {
    if (this.monaco) {
      let listado = this.lineas_para_resaltar.map(numero => {
        return {
          range: new this.monaco.Range(numero, 1, numero, 1),
          options: {
            isWholeLine: true,
            className: "linea"
          }
        };
      });

      this.decorations = this.editor.deltaDecorations(this.decorations, listado);
    }
  },

  limpiar_resaltado() {
    if (this.monaco) {
      let rango = new this.monaco.Range(1, 1, 1, 1);
      this.set("lineas_para_resaltar", []);

      this.editor.deltaDecorations(this.decorations, [
        {
          range: rango,
          options: {}
        }
      ]);
    }
  },

  regresa_al_modo_editor() {
    later(this, "limpiar_resaltado", 1000);
  },

  hacerFoco() {
    let editor = this.editor;
    let iframe = this.element.querySelector("iframe");

    setTimeout(() => {
      if (iframe) {
        iframe.contentWindow.focus();
      }

      if (editor) {
        editor.focus();
        window.editor = editor;
      }
    }, 100);
  },

  /*
   * Inserta la receta de código al final del código actual.
   */
  usar_receta(receta) {
    let codigo = this.editor.getModel().getValue();

    let posicionFinal = codigo.lastIndexOf("}");
    codigo = codigo.substring(0, posicionFinal) + "\n" + receta.codigo + "\n}";

    let pos = this.editor.getPosition();
    this.editor.getModel().setValue(codigo);
    this.editor.setPosition(pos);

    if (this.editor) {
      this.editor.getAction("editor.action.formatDocument").run();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener("message", this._subscription);

    this.bus.off("hacerFocoEnElEditor", this, "hacerFoco");
    this.bus.off("usar_receta", this, "usar_receta");
    this.bus.off("codigo_ejecutado", this, "codigo_ejecutado");
    this.bus.off("regresa_al_modo_editor", this, "regresa_al_modo_editor");
    this.bus.off("formatear_y_guardar", this, "formatear_y_guardar");
    this.bus.off("formatear", this, "formatear");
  }
});
