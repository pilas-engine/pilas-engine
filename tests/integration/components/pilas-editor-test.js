import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-editor", "Integration | Component | pilas editor nuevo", {
  integration: true
});

test("it renders", function(assert) {
  this.set("proyecto", {});
  this.set("ocultarEditor", false);
  this.set("ocultarPropiedades", false);
  this.set("escenaActual", 1);
  this.set("alGuardar", () => {});

  this.render(hbs`{{pilas-editor
    proyecto=proyecto
    ocultarEditor=ocultarEditor
    ocultarPropiedades=ocultarPropiedades
    escenaActual=escenaActual
    cuandoIntentaGuardar=alGuardar
  }}`);

  assert.ok(
    this.$()
      .text()
      .trim()
  );
});
