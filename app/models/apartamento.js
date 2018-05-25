import DS from 'ember-data';
import Inmueble from './inmueble';

export default Inmueble.extend({
  nro_piso: DS.attr('number'),

  torre: DS.belongsTo('torre', {inverse: 'apartamentos'}),
});
