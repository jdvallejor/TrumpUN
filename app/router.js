import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('bienvenida');
  this.route('ingresar-al-sistema');
  this.route('crear-cuenta');
  this.route('menu-cliente');
  this.route('menu-funcionario');
  this.route('menu-jefe');
  this.route('consultar-pago');
  this.route('registrar-contrato');
  this.route('crear-funcionario');
  this.route('consultar-pago-funcionarios');
  this.route('ver-inmuebles');
  this.route('ver-contratos', {path: '/ver-contratos/:id'});
  this.route('registrar-inmueble');
  this.route('ver-todos-inmuebles');
});

export default Router;
