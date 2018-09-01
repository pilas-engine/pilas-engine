import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas previsualizacion de actor", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    let actor = {
      nombre: "pelota",
      codigo: 'class pelota extends Actor {\n  propiedades = {\n    imagen: "pelota",\n    figura: "circulo",\n    figura_radio: 25\n  };\n\n  iniciar() {}\n}\n',
      imagen: "pelota",
      propiedades: {
        x: 0,
        y: 0,
        imagen: "pelota",
        centro_x: 0.5,
        centro_y: 0.5,
        rotacion: 0,
        escala_x: 1,
        escala_y: 1,
        transparencia: 0,
        etiqueta: "actor",
        espejado: false,
        espejado_vertical: false,
        figura: "circulo",
        figura_dinamica: true,
        figura_ancho: 100,
        figura_alto: 100,
        figura_radio: 25,
        figura_sin_rotacion: false,
        figura_rebote: 1,
        figura_sensor: false
      }
    };

    this.set("actor", actor);

    await render(hbs`{{pilas-previsualizacion-de-actor actor=actor mantener_foco=false}}`);
    assert.dom("*").hasText("Iniciando: 0 %");
  });
});
