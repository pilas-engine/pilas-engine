import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | mis-juegos/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:mis-juegos/index');
    assert.ok(route);
  });
});