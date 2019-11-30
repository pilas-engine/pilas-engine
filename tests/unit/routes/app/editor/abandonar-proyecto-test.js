import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | app/editor/abandonar-proyecto', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:app/editor/abandonar-proyecto');
    assert.ok(route);
  });
});
