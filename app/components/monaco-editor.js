import { observer } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import utils from "../utils/utils";
import { later } from "@ember/runloop";

export default Component.extend({
  classNames: ["monaco-editor", "w-100", "flex1", "flex"],
  code: "// demo",
  loading: true,
  readOnly: false,
  editor: null,
  bus: service(),
  linenumbers: true,
  modoVim: false,
  window: null,

  cuandoCambiaDeArchivo: observer("titulo", function() {
    this.cargar_codigo();
  }),

  cargar_codigo() {
    let editor = this.editor;

    if (editor) {
      let pos = editor.getPosition();
      editor.getModel().setValue(this.code);
      editor.setPosition(pos);
    }
  },

  /*
   * Se encarga de mantener actualizado el estado del editor con respecto al
   * atributo readOnly.
   */
  sincronizarReadOnly: observer("readOnly", function() {
    if (this.editor) {
      this.editor.updateOptions({ readOnly: this.readOnly });
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
      this.editor.updateOptions({ fontSize: this.tamano });
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
          this.onChange(event.data.updatedCode);
        }
      }

      if (event.source === this.frame && event.data && event.data.message) {
        if (event.data.message === "load-complete") {
          this.cuandoCargaElEditor(this.frame.editor, this.frame.monaco, this.frame.window);
        }

        if (event.data.message === "on-save") {
          this.editor.getAction("editor.action.formatDocument").run();
          later(() => {
            this.onSave(this.frame.editor);
          }, 100);
        }
      }
    };

    this.set("_subscription", subscription);
    window.addEventListener("message", subscription);
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

    //let rootURL = this.rootURL;

    this.bus.on("hacerFocoEnElEditor", this, "hacerFoco");
    this.bus.on("usar_receta", this, "usar_receta");
  },

  cuandoCargaElEditor(editor, monaco, window) {
    this.set("editor", editor);
    this.set("monaco", monaco);
    this.set("window", window);

    if (this.code) {
      this.cargar_codigo();
    }

    this.editor.updateOptions({ fontSize: this.tamano });

    if (this.modoVim) {
      this.window.activar_vim();
    }

    if (this.cuandoCarga) {
      this.cuandoCarga();
    }

    this.definirTema();

    this.set("loading", false);
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
    this.editor.getAction("editor.action.formatDocument").run();
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener("message", this._subscription);
    this.bus.off("hacerFocoEnElEditor", this, "hacerFoco");
  }
});
