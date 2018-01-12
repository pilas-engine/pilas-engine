import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-inspector", "Integration | Component | pilas inspector", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-inspector}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    ""
  );

  this.set("instanciaActorSeleccionado", {
    id: 123,
    x: 20,
    y: 30,
    imagen: "demo"
  });

  this.render(hbs`{{pilas-inspector instanciaActorSeleccionado=instanciaActorSeleccionado}}`);

  function tiene_texto(t, texto) {
    return (
      t
        .$()
        .text()
        .indexOf(texto) > -1
    );
  }

  assert.ok(tiene_texto(this, "tipo"));
  assert.ok(tiene_texto(this, "imagen"));
  assert.ok(tiene_texto(this, "demo"));
  assert.ok(tiene_texto(this, "x"));
  assert.ok(tiene_texto(this, "y"));
});
