import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-celda-de-actor", "Integration | Component | pilas celda de actor", {
  integration: true
});

test("it renders", function(assert) {
  this.set("actor", {
    nombre: "aceituna",
    imagen: "aceituna.png"
  });

  this.set("f", function() {});

  this.render(hbs`{{pilas-celda-de-actor actor=actor cuandoQuiereCrearActor=f}}`);
  assert.ok(this.$("img").length, 1);
});
