import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  isBienvenida: Ember.computed.equal('currentRouteName', 'bienvenida')
});
