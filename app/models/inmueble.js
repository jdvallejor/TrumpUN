import DS from 'ember-data';

export default DS.Model.extend({
  identificador: DS.attr('string'),
  direccion: DS.attr('string'),
  estrato: DS.attr('number'),
  area_total: DS.attr('number'),
  nro_pisos: DS.attr('number'),
  nro_balcones: DS.attr('number'),
  nro_banos: DS.attr('number'),
  estado: DS.attr('string'),
  tipo: DS.attr('string'),

  cuartos: DS.hasMany('cuarto', {inverse: 'inmueble'}),
  banos: DS.hasMany('bano', {inverse: 'inmueble'}),

  arrendatario: DS.belongsTo('cliente', {inverse: 'inmueblesArrienda', polymorphic: true}),
  arrendador: DS.belongsTo('cliente', {inverse: 'inmueblesOfrece', polymorphic: true}),
  contratos: DS.hasMany('contrato'),
});
