import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-boton-preferencias", "Integration | Component | pilas boton preferencias", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-boton-preferencias}}`);
  assert.ok(
    this.$()
      .text()
      .trim()
  );
});
