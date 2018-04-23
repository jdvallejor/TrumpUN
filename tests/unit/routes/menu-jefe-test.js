import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | menu-jefe', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:menu-jefe');
    assert.ok(route);
  });
});
