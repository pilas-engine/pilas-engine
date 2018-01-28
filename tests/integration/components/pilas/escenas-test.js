import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | escenas", {
  integration: true
});

test("puede crear escenas y actores", function(assert) {
  const done = assert.async();

  this.set("cuandoInicia", pilas => {
    assert.ok(pilas.escenas, "Existe el acceso a las escenas");
    assert.ok(pilas.escenas.Normal, "Existe la escena Normal");

    let escena = pilas.escenas.Normal();
    assert.equal(escena.actores.length, 0, "La escena comienza sin actores");

    pilas.actores.Caja();

    assert.equal(escena.actores.length, 1, "El actor se agrega a la escena automáticamente");
    assert.equal(escena.id, pilas.escena_actual().id);

    escena = pilas.escenas.Normal();
    assert.equal(escena.actores.length, 0, "Al crear otra escena vuelve a estar limpia de actores");

    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
});

test("puede crear escenas personalizadas", function(assert) {
  const done = assert.async();

  this.set("cuandoInicia", (pilas, compilador) => {
    assert.ok(pilas.escenas, "Existe el acceso a las escenas");

    let resultado = compilador.compilar(`class MiEscena extend Escena {
      iniciar() {
        alert("inicia mi escena!");
      }
    }

    MiEscena;`);

    //let a = eval(resultado.codigo);
    //console.log(a);

    //assert.ok(pilas.escenas.Normal2, "Existe la escena Normal2");

    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
});
