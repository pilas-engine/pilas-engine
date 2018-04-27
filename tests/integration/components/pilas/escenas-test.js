import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | escenas", function(hooks) {
  setupRenderingTest(hooks);

  test("puede crear escenas y actores", async function(assert) {
    const done = assert.async();

    this.set("cuandoInicia", pilas => {
      assert.ok(pilas.escenas, "Existe el acceso a las escenas");
      assert.ok(pilas.escenas.Normal, "Existe la escena Normal");

      let escena = pilas.escenas.Normal();
      assert.equal(escena.actores.length, 0, "La escena comienza sin actores");

      pilas.actores.caja();

      assert.equal(escena.actores.length, 1, "El actor se agrega a la escena automáticamente");
      assert.equal(escena.id, pilas.escena_actual().id);

      escena = pilas.escenas.Normal();
      assert.equal(escena.actores.length, 0, "Al crear otra escena vuelve a estar limpia de actores");

      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
  });

  test("puede crear escenas personalizadas", async function(assert) {
    const done = assert.async();

    this.set("proyecto", {
      titulo: "Proyecto para pilas-test",
      ancho: 500,
      alto: 500,
      codigos: {
        escenas: [
          {
            nombre: "principal",
            codigo: `class principal extends Escena {
              iniciar() {
              }

            }`
          }
        ],
        actores: []
      },
      escenas: [
        {
          nombre: "principal",
          id: 1,
          camara_x: 0,
          camara_y: 0,
          actores: []
        }
      ]
    });

    this.set("cuandoInicia", (pilas, contexto) => {
      assert.ok(pilas.escenas, "Existe el acceso a las escenas");

      pilas.escenas.vincular(contexto.__clases.principal);
      pilas.escenas.principal();

      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia proyecto=proyecto}}`);
  });
});
