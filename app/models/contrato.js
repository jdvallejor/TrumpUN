import DS from 'ember-data';

export default DS.Model.extend({
    fecha: DS.attr('string'),
    valor: DS.attr('number'),
    
    arrendador: DS.belongsTo('cliente', { inverse: null}),
    arrendatario: DS.belongsTo('cliente', { inverse: null}),
    inmueble: DS.belongsTo('inmueble'),
    
    //funcionario: DS.belongsTo(''),
    funcionario: DS.attr('string'),
});
