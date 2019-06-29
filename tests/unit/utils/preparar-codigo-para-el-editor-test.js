import prepararCodigoParaElEditor from "pilas-engine/utils/preparar-codigo-para-el-editor";
import { module, test } from "qunit";

module("Unit | Utility | preparar_codigo_para_el_editor", function() {
  // Replace this with your real tests.
  test("it works", function(assert) {
    let result = prepararCodigoParaElEditor("class demo {}");
    assert.equal(result, "// @ts-ignore\nclass demo {}");

    let result2 = prepararCodigoParaElEditor(`class demo {
    propiedades = {
      test: 123
    };
    iniciar() {}
}`);

    assert.equal(result2, "// @ts-ignore\nclass demo {\n    iniciar() {}\n}");
  });
});
