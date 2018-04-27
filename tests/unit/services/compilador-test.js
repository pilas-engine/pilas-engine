import { module, test } from 'qunit';
import { setupTest } from "ember-qunit";

module("Unit | Service | compilador", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    let proyecto = {};
    let compilador = this.owner.lookup("service:compilador");
    assert.ok(compilador);

    function eliminarEspacios(str) {
      return str.replace(/\s\s+/g, " ").trim();
    }

    let resultado = compilador.compilar(`class Actor {}`, proyecto);
    let codigoEsperado = `
      var Actor = /** @class */ (function () {
        function Actor() {
        }
        return Actor;
      }());
    `;

    assert.equal(eliminarEspacios(resultado.codigo), eliminarEspacios(codigoEsperado));

    resultado = compilador.compilar(`class MiActor extends Actor {}`, proyecto);
    assert.ok(resultado.codigo.indexOf("var extendStatics = Object.setPrototypeOf") > -1);
  });
});
