import DS from 'ember-data';

export default DS.Model.extend({
  tiene_terraza: DS.attr('boolean'),
  tiene_garaje: DS.attr('boolean'),
  inmueble: DS.belongsTo('inmueble', {inverse: 'casa', polymorphic: true})
});
