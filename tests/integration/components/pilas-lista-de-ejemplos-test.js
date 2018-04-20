import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-lista-de-ejemplos", "Integration | Component | pilas lista de ejemplos", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-lista-de-ejemplos}}`);
  assert.ok(this.$());
});
