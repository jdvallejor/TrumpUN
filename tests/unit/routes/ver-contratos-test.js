import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | ver-contratos', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:ver-contratos');
    assert.ok(route);
  });
});
