import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr('string'),
  documento: DS.attr('string'),
  celular: DS.attr('number')
});
