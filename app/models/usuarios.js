import DS from 'ember-data';

export default DS.Model.extend({
    documento: DS.attr('string'),
    salario: DS.attr('number'),

    contrato: DS.hasMany('contrato'),
});
