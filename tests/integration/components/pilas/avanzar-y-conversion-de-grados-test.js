import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | avanzar y conversion de grados", {
  integration: true
});

test("it renders", function(assert) {
  const done = assert.async();

  this.set("espera", 2);
  this.set("codigo", ``);

  this.set("cuandoInicia", pilas => {
    let actor = pilas.actores.aceituna(0, 0);

    assert.equal(actor.y, 0, "Está en la posición inicial.");

    actor.avanzar(90);
    assert.equal(actor.y, 1, "Avanzó un solo pixel.");

    actor.avanzar(0, 50);
    assert.equal(actor.y, 1, "Mantiene y=1.");
    assert.equal(actor.x, 50, "Avanzó 50 pixeles porque se movió en el ángulo 0.");

    assert.equal(pilas.utilidades.convertir_radianes_a_angulos(0), 0);
    assert.equal(pilas.utilidades.convertir_radianes_a_angulos(Math.PI), 180);
    assert.equal(pilas.utilidades.convertir_angulo_a_radianes(90), Math.PI / 2);
    assert.equal(pilas.utilidades.convertir_angulo_a_radianes(180), Math.PI);
  });

  this.set("cuandoTerminaLaEspera", pilas => {
    assert.equal(pilas.obtener_cantidad_de_actores(), 1);
    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
});
