import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-test", "Integration | Component | pilas test", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-test}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    "Iniciando: 0 %"
  );
});
