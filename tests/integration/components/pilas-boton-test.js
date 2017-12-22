import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-boton", "Integration | Component | pilas boton", {
  integration: true
});

test("it renders", function(assert) {
  this.set("demo", function() {});

  this.render(hbs`{{pilas-boton accion=demo texto="Ejemplo"}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    "Ejemplo"
  );
});
