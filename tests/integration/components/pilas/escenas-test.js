import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | escenas", {
  integration: true
});

test("it renders", function(assert) {
  const done = assert.async();

  this.set("cuandoInicia", pilas => {
    assert.ok(pilas.escenas);
    assert.ok(pilas.escenas.Normal);

    let escena = pilas.escenas.Normal();
    assert.equal(escena.actores.length, 0);

    pilas.actores.Caja();

    assert.equal(escena.actores.length, 1);
    assert.equal(escena.id, pilas.escena_actual().id);

    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
});
