import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-previsualizacion-de-actor", "Integration | Component | pilas previsualizacion de actor", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-previsualizacion-de-actor}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    "Iniciando: 0 %"
  );
});
