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

  this.set("instancia_seleccionada", {
    id: 123,
    x: 20,
    y: 30,
    imagen: "demo"
  });

  this.set("tipo_de_la_instancia_seleccionada", "actor");

  this.render(hbs`{{pilas-inspector 
    instancia_seleccionada=instancia_seleccionada 
    tipo_de_la_instancia_seleccionada=tipo_de_la_instancia_seleccionada}}`);

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
