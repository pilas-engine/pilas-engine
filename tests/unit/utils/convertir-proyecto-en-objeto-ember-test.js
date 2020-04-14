import convertirProyectoEnObjetoEmber from "pilas-engine/utils/convertir-proyecto-en-objeto-ember";
import { module, test } from "qunit";

module("Unit | Utility | convertirProyectoEnObjetoEmber", function() {
  // Replace this with your real tests.
  test("it works", function(assert) {
    let result = convertirProyectoEnObjetoEmber({ nombre: "demo", escenas: [], codigos: { escenas: [], actores: [] } });
    assert.ok(result.get("nombre") === "demo");
  });
});
