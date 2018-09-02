import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | app/abrir_proyecto', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:app/abrir-proyecto');
    assert.ok(route);
  });
});
