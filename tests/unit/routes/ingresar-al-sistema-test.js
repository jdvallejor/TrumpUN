import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | ingresar-al-sistema', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:ingresar-al-sistema');
    assert.ok(route);
  });
});
