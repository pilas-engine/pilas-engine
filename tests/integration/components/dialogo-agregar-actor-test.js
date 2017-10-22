import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "dialogo-agregar-actor",
  "Integration | Component | dialogo agregar actor",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  this.set("agregarUnActor", () => {});
  this.render(hbs`{{dialogo-agregar-actor agregarUnActor=agregarUnActor}}`);
  assert.ok(this.$().text());
});
