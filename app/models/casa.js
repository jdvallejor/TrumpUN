import DS from 'ember-data';
import Inmueble from './inmueble';


export default Inmueble.extend({
  tiene_terraza: DS.attr('boolean'),
  tiene_garaje: DS.attr('boolean'),
});
