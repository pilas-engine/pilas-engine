import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-crear-actor", "Integration | Component | pilas crear actor", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-crear-actor}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    "+ A"
  );
});
