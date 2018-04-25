import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr('string'),
  documento: DS.attr('string'),
  celular: DS.attr('number'),
  salario: DS.attr('number'),

  contratos: DS.hasMany('contrato'),
  inmueblesArrienda: DS.hasMany('inmueble', {inverse: 'arrendatario'}),
  inmueblesOfrece: DS.hasMany('inmueble', {inverse: 'arrendador'}),
});
