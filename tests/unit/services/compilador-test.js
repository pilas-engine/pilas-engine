import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | compilador", function(hooks) {
  setupTest(hooks);

  function eliminar_espacios(str) {
    return str.replace(/\s\s+/g, " ").trim();
  }

  test("puede convertir código TypeScript a JavaScript", function(assert) {
    let proyecto = {};
    let compilador = this.owner.lookup("service:compilador");
    assert.ok(compilador);

    let resultado = compilador.compilar(`class Actor {}`, proyecto);
    let codigoEsperado = `
      var Actor = /** @class */ (function () {
        function Actor() {
        }
        return Actor;
      }());
    `;

    assert.equal(eliminar_espacios(resultado.codigo), eliminar_espacios(codigoEsperado));

    resultado = compilador.compilar(`class MiActor extends Actor {}`, proyecto);
    assert.ok(resultado.codigo.indexOf("@class") > -1);
  });

  test("puede instrumentar una sentencia simple", function(assert) {
    let compilador = this.owner.lookup("service:compilador");
    assert.ok(compilador);

    // Prueba que a una linea de código sencilla con una sentencia se
    // le aplique el instrumentado de código.

    let entrada = `
      this.impulsar(10, 0);
    `;

    let salida_esperada = `
      if (this.pilas) { this.pilas.notificar_traza_de_ejecucion(this.id, 2) }
      this.impulsar(10, 0);
    `;

    let resultado = compilador.instrumentar_codigo_de_actor({ codigo: entrada });

    assert.equal(eliminar_espacios(resultado), eliminar_espacios(salida_esperada));
  });

  test("puede instrumentar un método", function(assert) {
    let compilador = this.owner.lookup("service:compilador");
    assert.ok(compilador);

    // Prueba que a una linea de código sencilla con una sentencia se
    // le aplique el instrumentado de código.

    let entrada = `
      class plataforma extends Actor {
        iniciar() {
          console.log("asdasd");
        }
      }
    `;

    let salida_esperada = `
      class plataforma extends Actor {
          iniciar() {
              if (this.pilas) { this.pilas.notificar_traza_de_ejecucion(this.id, 3) }
              if (this.pilas) { this.pilas.notificar_traza_de_ejecucion(this.id, 4) }
              console.log("asdasd");
          }
      }
    `;

    let resultado = compilador.instrumentar_codigo_de_actor({ codigo: entrada });

    assert.equal(eliminar_espacios(resultado), eliminar_espacios(salida_esperada));
  });
});
