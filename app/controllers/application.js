import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import {inject as service} from '@ember/service';

export default Controller.extend({
  isBienvenida: equal('currentRouteName', 'bienvenida'),
  usuarioActual: service('usuario-actual'),
  usuario: computed('usuarioActual.usuario', function () {
    return this.get('usuarioActual').getActiveUser();
  }),
  rol: computed('usuarioActual.usuario.rol', function () {
    return this.get('usuarioActual').getRol();
  }),
  mainPage: computed('usuarioActual.usuario.page', function () {
    return this.get('usuarioActual').getPage();
  }),
});
