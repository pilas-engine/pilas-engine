import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-modal", "Integration | Component | pilas modal", {
  integration: true
});

test("it renders", function(assert) {
  this.set("visible", false);

  this.set("cerrar", () => {
    this.set("visible", false);
  });

  this.render(hbs`{{pilas-modal visible=visible  itulo="Demo" alCerrar=cerrar}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    ""
  );

  this.set("visible", true);

  this.render(hbs`{{pilas-modal visible=visible titulo="Demo" alCerrar=cerrar}}`);
  assert.equal(this.$("#titulo").text(), "Demo");

  this.$("#cerrar").click();
  assert.equal(
    this.$()
      .text()
      .trim(),
    ""
  );
});
