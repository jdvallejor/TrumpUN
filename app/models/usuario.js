import DS from 'ember-data';

export default DS.Model.extend({
  correo: DS.attr('string'),
  contrasena: DS.attr('string'),
  rol: DS.attr('number')
});
