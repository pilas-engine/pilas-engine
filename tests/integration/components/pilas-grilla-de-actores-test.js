import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-grilla-de-actores", "Integration | Component | pilas grilla de actores", {
  integration: true
});

test("it renders", function(assert) {
  this.set("actores", [
    {
      nombre: "aceituna",
      imagen: "aceituna.png"
    }
  ]);

  this.set("f", function() {});

  this.render(hbs`{{pilas-grilla-de-actores actores=actores cuandoQuiereCrearActor=f}}`);

  assert.equal(
    this.$("")
      .text()
      .trim(),
    "aceituna"
  );
});
