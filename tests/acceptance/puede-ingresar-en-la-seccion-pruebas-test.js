import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from "qunit";
import { setupApplicationTest } from 'ember-qunit';

module("Acceptance | puede ingresar en la seccion pruebas", function(hooks) {
  setupApplicationTest(hooks);

  test("visiting /puede-ingresar-en-la-seccion-pruebas", async function(assert) {
    await visit("/pruebas");

    assert.equal(currentURL(), "/pruebas");
  });
});
