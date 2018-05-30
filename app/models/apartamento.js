import DS from 'ember-data';

export default DS.Model.extend({
  nro_piso: DS.attr('number'),
  torre: DS.belongsTo('torre', {inverse: 'apartamentos'}),
  inmueble: DS.belongsTo('inmueble', {inverse: 'apartamento', polymorphic: true})
});
