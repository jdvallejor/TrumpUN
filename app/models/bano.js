import DS from 'ember-data';

export default DS.Model.extend({
    area: DS.attr('number'),
    tiene_ducha: DS.attr('string'),

    inmueble: DS.belongsTo('inmueble'),
});
