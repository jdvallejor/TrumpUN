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
    
    //cuarto: DS.hasMany('cuarto'),
    //bano: DS.hasMany('bano'),
    arrendatario: DS.belongsTo('cliente', { inverse: 'inmueblesArrienda' , key: 'documento'}),
    arrendador: DS.belongsTo('cliente', { inverse: 'inmueblesOfrece' , key: 'documento'}),
    contratos: DS.hasMany('contrato'),
});
