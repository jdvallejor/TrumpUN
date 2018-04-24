import Controller from '@ember/controller';
import Ember from 'ember';
import {inject as service} from '@ember/service';

export default Controller.extend({
  isBienvenida: Ember.computed.equal('currentRouteName', 'bienvenida'),
  usuarioActual: service('usuario-actual'),
  usuario: Ember.computed('usuarioActual.usuario', function () {
    return this.get('usuarioActual').getUsuario();
  }),
  rol: Ember.computed('usuarioActual.usuario.rol', function () {
    return this.get('usuarioActual').getRol();
  })
});
