import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr('number'),
  is_cerrada: DS.attr('boolean'),
  tiene_aseo: DS.attr('boolean'),
  tiene_vigilancia: DS.attr('boolean'),
  tiene_piscina: DS.attr('boolean'),
  tiene_gimnasio: DS.attr('boolean'),
  tiene_salonsocial: DS.attr('boolean'),
  tiene_parquerecreacional: DS.attr('boolean'),
  tiene_zonasverdes: DS.attr('boolean'),

  torres: DS.hasMany('torre', {inverse: 'unidad'})

})
;
