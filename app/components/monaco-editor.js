import Ember from "ember";
import layout from "ember-monaco-editor/templates/components/monaco-editor";
import getFrameById from "ember-monaco-editor/utils/get-frame-by-id";

export default Ember.Component.extend({
  layout,
  classNames: ["monaco-editor", "w-100", "h-100", "ba"],
  code: "// demo",
  loading: true,
  readOnly: false,
  editor: null,

  /*
   * Se encarga de mantener actualizado el estado del editor con respecto al
   * atributo readOnly.
   */
  sincronizarReadOnly: Ember.observer("readOnly", function() {
    if (this.get("editor")) {
      this.get("editor").updateOptions({ readOnly: this.get("readOnly") });
    }
  }),

  init() {
    this._super(...arguments);

    const subscription = event => {
      // Ignore messages not coming from this iframe
      if (event.source === this.get("frame") && event.data && event.data.updatedCode) {
        if (this.attrs.onChange) {
          this.attrs.onChange(event.data.updatedCode);
        }
      }

      if (event.source === this.get("frame") && event.data && event.data.message) {
        if (event.data.message === "load-complete") {
          this.onLoadEditor(this.get("frame").editor);
        }
      }
    };

    this.set("_subscription", subscription);
    window.addEventListener("message", subscription);
  },

  didInsertElement() {
    const frame = getFrameById(this.get("elementId"));
    const frameDoc = frame.document;
    this.set("frame", frame);

    frameDoc.open();
    frameDoc.write(`


      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" id="print-modal-content">
      <head>
        <script src="vs/loader.js"></script>


        <style type="text/css">
          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
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
              'vs': 'vs'
            }
          });

          window.require(['vs/editor/editor.main'], function () {
            if (typeof monaco !== "undefined") {
              var editor = monaco.editor.create(document.getElementById('monaco-editor-wrapper'), {
                language: 'typescript',
                minimap: true,
                readOnly: ${this.get("readOnly")},
              });

              var origin = window.location.origin;

              editor.onDidChangeModelContent(function (event) {
                window.top.postMessage({updatedCode: editor.getValue()}, origin);
              });

              window.top.postMessage({message: "load-complete"}, origin);
              window.editor = editor;

              window.onresize = function() {
                editor.layout();
              };

            }
          });
          </script>
      </head>
      <body>
        <div id="monaco-editor-wrapper"  style="width:100%;height:100%"></div>
      </body>
      </html>

      `);
    frameDoc.close();
  },

  onLoadEditor(editor) {
    this.set("editor", editor);

    if (this.get("code")) {
      editor.setValue(this.get("code"));
    }

    if (this.get("cuandoCarga")) {
      this.get("cuandoCarga")();
    }

    this.set("loading", false);
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener("message", this.get("_subscription"));
  }
});
