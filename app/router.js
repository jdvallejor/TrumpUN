import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('bienvenida');
  this.route('ingresar-al-sistema');
  this.route('crear-cuenta');
  this.route('menu-cliente');
  this.route('menu-funcionario');
  this.route('menu-jefe');
});

export default Router;
