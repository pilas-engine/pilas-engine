import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas ejemplo", function(hooks) {
  setupRenderingTest(hooks);

  let proyecto = {
    titulo: "Proyecto demo",
    ancho: 500,
    alto: 500,
    codigos: {
      escenas: [
        {
          nombre: "principal",
          codigo: "class principal extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
        }
      ],
      actores: [
        {
          nombre: "nube",
          codigo: 'class nube extends Actor {\n    propiedades = {\n        imagen: "nube"\n    };\n\n    iniciar() {}\n\n    actualizar() {\n        this.x -= 1;\n\n        if (this.x < -500) {\n            this.x = 500;\n        }\n    }\n}'
        }
      ]
    },
    escenas: [
      {
        nombre: "principal",
        id: 2,
        camara_x: 0,
        camara_y: 0,
        fondo: "fondo_cielo_1",
        actores: [
          {
            x: -30.785562632696383,
            y: 59.44798301486199,
            imagen: "nube",
            centro_x: 0.5,
            centro_y: 0.5,
            rotacion: 0,
            escala_x: 1,
            escala_y: 1,
            transparencia: 0,
            etiqueta: "actor",
            espejado: false,
            espejado_vertical: false,
            figura: "",
            figura_dinamica: true,
            figura_ancho: 100,
            figura_alto: 100,
            figura_radio: 40,
            figura_sin_rotacion: false,
            figura_rebote: 1,
            figura_sensor: false,
            id: 1443,
            nombre: "nube"
          }
        ]
      }
    ]
  };

  test("it renders", async function(assert) {
    this.set("proyecto", proyecto);

    await render(hbs`{{pilas-ejemplo debe_mantener_foco=false proyecto=proyecto}}`);
    assert.ok(this.$());
  });
});
