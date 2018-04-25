import DS from 'ember-data';

export default DS.Model.extend({
    fecha: DS.attr('string'),
    valor: DS.attr('number'),
    
    arrendador: DS.belongsTo('cliente', { inverse: null , key: 'documento'}),
    arrendatario: DS.belongsTo('cliente', { inverse: null , key: 'documento'}),
    inmueble: DS.belongsTo('inmueble'),
    //funcionario: DS.belongsTo('cliente'),
});
