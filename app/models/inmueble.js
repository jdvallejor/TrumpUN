import DS from 'ember-data';

export default DS.Model.extend({
    direccion: DS.attr('date'),
    estrato: DS.attr('number'),
    area_total: DS.attr('number'),
    nro_pisos: DS.attr('number'),
    nro_balcones: DS.attr('number'),
    nro_banos: DS.attr('number'),
    estado: DS.attr('string'),
    
    //cuarto: DS.hasMany('cuarto'),
    //bano: DS.hasMany('bano'),
    contratos: DS.hasMany('contrato'),
});
