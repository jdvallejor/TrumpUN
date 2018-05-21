import DS from 'ember-data';

export default DS.Model.extend({
    area: DS.attr('number'),
    tiene_armario: DS.attr('string'),
    tiene_bano: DS.attr('string'),

    inmueble: DS.belongsTo('inmueble'),
});
