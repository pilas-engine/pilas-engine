import { observer } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import formatear from "pilas-engine/utils/formatear";
import utils from "../utils/utils";

function getFrameById(id) {
  for (var i = 0; i < window.frames.length; i++) {
    try {
      if (window.frames[i].name === id) {
        return window.frames[i];
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default Component.extend({
  classNames: ["monaco-editor", "w-100", "flex1", "ba", "b--light-gray"],
  code: "// demo",
  loading: true,
  readOnly: false,
  editor: null,
  bus: service(),
  declaraciones: service(),
  linenumbers: true,

  cuandoCambiaDeArchivo: observer("titulo", function() {
    this.cargarCodigo();
  }),

  cargarCodigo() {
    let editor = this.editor;
    let code = this.code;
    let codigoFormateado = formatear(code);
    if (editor) {
      let pos = editor.getPosition();
      editor.getModel().setValue(codigoFormateado);
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
    var theme = "vs";

    if (this.oscuro) {
      theme = "vs-dark";
    }

    if (this.monaco) {
      this.monaco.editor.setTheme(theme);
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
          this.onLoadEditor(this.frame.editor, this.frame.monaco);
        }

        if (event.data.message === "on-save") {
          this.cargarCodigo();
          this.onSave(this.frame.editor);
        }
      }
    };

    this.set("_subscription", subscription);
    window.addEventListener("message", subscription);
  },

  didInsertElement() {
    this.declaraciones.iniciar().then(() => {
      this.iniciarEditor();
    });
  },

  iniciarEditor() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    const frame = getFrameById(this.elementId);
    const frameDoc = frame.document;
    let oscuro = this.oscuro;
    this.set("frame", frame);

    let declaraciones_de_pilas_engine_ts = this.declaraciones.obtener();
    let rootURL = this.rootURL;

    frameDoc.open();
    frameDoc.write(`

      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" id="print-modal-content">
      <head>

        <script>
        var HOST = "file://";

        if (window.location.host) {
          HOST = window.location.protocol + "//" + window.location.host;
        }
        </script>

        <script src="${rootURL}vs/loader.js"></script>


        <style type="text/css">
          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          .view-overlays {
            opacity: 0.0;
          }
        </style>

        <script>
          window.require.config({
            'vs/nls' : {
              availableLanguages: {
                '*': 'es'
              }
            },
            paths: {
              'vs': '${rootURL}vs'
            }
          });

          window.require(['${rootURL}vs/editor/editor.main'], function () {

            if (typeof monaco !== "undefined") {

              monaco.languages.typescript.typescriptDefaults.addExtraLib(\`'${declaraciones_de_pilas_engine_ts}\`, 'pilas-engine.d.ts');

              var theme = 'vs';

              if (${oscuro}) {
                theme = 'vs-dark';
              }


              var editor = monaco.editor.create(document.getElementById('monaco-editor-wrapper'), {
                language: 'typescript',
                minimap: {
                  enabled: false
                },
                fontSize: 14,
                theme: theme,
                tabSize: 4,
                autoClosingBrackets: true,
                folding: true,
                insertSpaces: true,
                tabWidth: 4,
                lineNumbers: ${this.linenumbers},
                readOnly: ${this.readOnly},
              });

              editor.onDidChangeModelContent(function (event) {
                window.top.postMessage({updatedCode: editor.getValue()}, HOST);
              });

              window.top.postMessage({message: "load-complete"}, HOST);
              window.editor = editor;
              window.monaco = monaco;

              window.onresize = function() {
                editor.layout();
              };

              var myBinding = editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
                window.top.postMessage({message: "on-save"}, HOST);
              });

            }
          });
          </script>

      </head>
      <body>
        <div id="monaco-editor-wrapper" style="width:100%;height:100%"></div>
      </body>
      </html>

      `);
    frameDoc.close();

    this.bus.on("hacerFocoEnElEditor", this, "hacerFoco");
  },

  onLoadEditor(editor, monaco) {
    this.set("editor", editor);
    this.set("monaco", monaco);

    if (this.code) {
      this.cargarCodigo();
    }

    if (this.cuandoCarga) {
      this.cuandoCarga();
    }

    this.set("loading", false);
  },

  hacerFoco() {
    let editor = this.editor;
    let iframe = this.$("iframe");

    if (iframe) {
      iframe[0].contentWindow.focus();
    }

    if (editor) {
      editor.focus();
      window.editor = editor;
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener("message", this._subscription);
    this.bus.on("hacerFocoEnElEditor", this, "hacerFoco");
  }
});
