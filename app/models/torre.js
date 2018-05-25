import DS from 'ember-data';

export default DS.Model.extend({
  numero: DS.attr('number'),
  tiene_ascensor: DS.attr('boolean'),
  nro_pisos: DS.attr('number'),

  unidad: DS.belongsTo('unidad', {inverse: 'torres'}),
  apartamentos: DS.hasMany('apartamento', {inverse: 'torre'}),
});
