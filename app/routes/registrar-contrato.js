import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        let data = {
            clientes: this.store.findAll('cliente'),
            inmuebles: this.store.findAll('inmueble'),            
        };
        return data;
    }
});
