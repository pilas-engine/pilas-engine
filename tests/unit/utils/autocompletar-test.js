import autocompletar from "pilas-engine/utils/autocompletar";
import { module, test } from "qunit";

module("Unit | Utility | autocompletar", function() {
  test("autocompletar simple", function(assert) {
    let contexto = {
      window: {},
      console: {},
      pilas: {
        actores: {
          Actor: function() {},
          Aceituna: function() {}
        },
        actualizar: function() {}
      },
      actor: {},
      actores: {}
    };

    assert.deepEqual(autocompletar(contexto, "pi"), ["pilas"]);
    assert.deepEqual(autocompletar(contexto, "pilas.actor"), ["pilas.actores"]);
    assert.deepEqual(autocompletar(contexto, "pilas.ac"), [
      "pilas.actores",
      "pilas.actualizar"
    ]);
    assert.deepEqual(autocompletar(contexto, "pilas.actores.Ac"), [
      "pilas.actores.Actor",
      "pilas.actores.Aceituna"
    ]);

    assert.deepEqual(autocompletar(contexto, "acto"), ["actor", "actores"]);
  });

  test("autocompletar cuando varias variables tienen el mismo comienzo", function(assert) {
    let contexto = {
      actor: { a: 1 },
      actores: { b: 1 },
      demo: { c: 1 }
    };

    assert.deepEqual(autocompletar(contexto, "actor"), ["actor", "actores"]);
  });

  test("autocompletar si termina con punto", function(assert) {
    let contexto = {
      window: {},
      console: {},
      pilas: {
        actores: {
          Actor: function() {},
          Aceituna: function() {}
        },
        actualizar: function() {}
      },
      actor: {},
      actores: {}
    };

    assert.deepEqual(autocompletar(contexto, "pilas."), [
      "pilas.actores",
      "pilas.actualizar"
    ]);
  });
});
