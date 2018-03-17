import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import Ember from "ember";

moduleForComponent("pilas-propiedad/combo", "Integration | Component | pilas propiedad/combo", {
  integration: true
});

test("it renders", function(assert) {
  let objeto = Ember.Object.create({ figura: "circulo" });
  let propiedad = {
    tipo: "combo",
    propiedad: "figura",
    opciones: [
      {
        valor: "",
        texto: "ninguna"
      },
      {
        valor: "circulo",
        texto: "círculo"
      },
      {
        valor: "rectangulo",
        texto: "rectángulo"
      }
    ]
  };

  this.set("propiedad", propiedad);
  this.set("objeto", objeto);

  this.render(hbs`{{pilas-propiedad/combo objeto=objeto propiedad=propiedad opciones=propiedad.opciones}}`);

  assert.equal(
    this.$("select option:selected")
      .text()
      .trim(),
    "círculo"
  );
});
