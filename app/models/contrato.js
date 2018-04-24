import DS from 'ember-data';

export default DS.Model.extend({
    fecha: DS.attr('date'),
    valor: DS.attr('number'),
    
    arrendador: DS.belongsTo('cliente'),
    arrendatario: DS.belongsTo('cliente'),
    inmueble: DS.belongsTo('inmueble'),
    //funcionario: DS.belongsTo('cliente'),
});
