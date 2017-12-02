import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-boton-regresar", "Integration | Component | pilas boton regresar", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-boton-regresar}}`);

  assert.ok(
    this.$()
      .text()
      .trim()
  );
});
