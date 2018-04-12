import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "pilas-boton-duplicar-actor",
  "Integration | Component | pilas boton duplicar actor",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  this.set("accion", function() {});

  this.render(hbs`{{pilas-boton-duplicar-actor accion=accion}}`);

  assert.ok(this.$().text());
});
