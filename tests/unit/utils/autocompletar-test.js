import autocompletar from "pilas-engine/utils/autocompletar";
import { module, test } from "qunit";

module("Unit | Utility | autocompletar", function() {
  test("it works", function(assert) {
    let contexto = {
      window: {},
      console: {},
      pilas: {
        actores: {
          Actor: function() {},
          Aceituna: function() {}
        },
        actualizar: function() {}
      }
    };

    assert.deepEqual(autocompletar(contexto, "pi"), ["pilas"]);
    assert.deepEqual(autocompletar(contexto, "pilas.actor"), ["pilas.actores"]);
    assert.deepEqual(autocompletar(contexto, "pilas.ac"), ["pilas.actores", "pilas.actualizar"]);
    assert.deepEqual(autocompletar(contexto, "pilas.actores.Ac"), ["pilas.actores.Actor", "pilas.actores.Aceituna"]);
  });
});
